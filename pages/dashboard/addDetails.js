import { useEffect, useState } from "react"
import { contractABI,contractAddress } from "../../Constants/index"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Button, Form, useNotification, Upload, Event } from "web3uikit"
import axios from "axios"

export default function addDetails(){
    let result
    const {runContractFunction} = useWeb3Contract()
    const dispatch = useNotification()
    const {isWeb3Enabled,account} = useMoralis()
    const [detailsAdded, setDetailsAdded] = useState(false)
    const [profilePic, setProfilePic] = useState('')

    const handleDataAddedNotification = () =>{
        dispatch({
            type: "info",
            message: `Successfully Added Your Details`,
            title: "Successfully Created Profile!",
            position: "topR",
            icon: "🔔"
        })
    }

    async function handleSubmit(data){
        const NameInput = data.data[0].inputResult
        const AgeInput = data.data[1].inputResult
        const CollegeInput = data.data[2].inputResult
        console.log(NameInput,AgeInput,CollegeInput)

        const dataTransaction = await runContractFunction({
            params:{
                abi:contractABI,
                contractAddress:contractAddress,
                functionName:"addStudentDetails",
                params:{
                    name: NameInput,
                    age: AgeInput,
                    college: CollegeInput
                }
            },
            onError:(error)=>handleError(error.data),
            
        })

        await dataTransaction.wait()
        
        setDetailsAdded(true)
        console.log("Data added !")
        handleDataAddedNotification()
    }

    const handleError = (data) => {
        try{
            if(data !== "undefined"){
                result = data.message
            }
        }catch(error){
            console.log(error)
            result = "Signer rejected"
        }
        dispatch({
            type: "info",
            message: `${result}.`,
            title: "Error!",
            position: "topR",
            icon: "🚫",
        })
        
    };

    function resetDetails(){
        window.location.reload(false)
    }
    function handleChange(event){
        if(event){
            const url = event.name
            setProfilePic(url)
            console.log(profilePic)
            
        }       
    
    }
    useEffect(()=>{
        if(detailsAdded && isWeb3Enabled){
            window.location = "/dashboard"
        }
    },[isWeb3Enabled,detailsAdded,account])
    return(
        <div style={{marginLeft:"22%",marginRight:"10%", backgroundImage:"/9th-grade-2.jpg", gap:"10px"}}>
            <h4 style={{textAlign:"center",marginBottom:"20px"}}>Upload your profile photo</h4>

                <Upload
                    acceptedFiles="image/jpg"
                    descriptionText="Only .jpg files are accepted"
                    onChange={handleChange}
                    style={{}}
                    theme="withIcon"
                />
           
            <Form
                buttonConfig={{
                    theme: 'primary'
                }}
                
                data={[
                    
                    {
                        inputWidth: '60%',
                        name: 'Full Name',
                        type: 'text',
                        value: ''
                    },
                    {
                        name: 'Your Age',
                        type: 'number',
                        validation: {
                            numberMax: 100,
                            numberMin: 12,
                            required: true
                        },
                        value: ''
                    },
                    {
                        inputWidth: '60%',
                        name: 'College Name',
                        type: 'text',
                        value: ''
                    },
                    
                    
                ]}
                
                onSubmit={handleSubmit}
                title="Student Details."
            >
                
            </Form>    
            
                
            <Button text="Reset" theme="primary" style={{marginLeft:"15px"}} onClick={resetDetails}/>
        </div>
    )
}