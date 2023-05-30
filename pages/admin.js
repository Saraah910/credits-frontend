import { useEffect, useState } from "react"
import { contractABI, contractAddress } from "../Constants/index"
import { useMoralis, useWeb3Contract } from "react-moralis"
import Temp from "./Temp"
import { myArray } from "./EnrolledCourse"
import { Badge, Button, Card, Tab, TabList, Table,useNotification} from "web3uikit"
import {MoreVert} from '@web3uikit/icons'

export default function Admin(){
    let allStudentDetailsFunctionCall, RequestedCertificationFunctionCall,withdrawFundsFunctionCall
    let myArray = []
    const dispatch = useNotification()
    const {isWeb3Enabled,account,isAuthenticated} = useMoralis()
    const [accountAddress, setAccountAddress] = useState([])
    const [courseName, setCourseName] = useState("")
    const [clicked,setClicked] = useState(false)
    const [changedAccount,setChangedAccount] = useState(false)
    const [requestingAccount,setRequestingAccount] = useState("")
    const [isAdmin,setIsAdmin] = useState(false)
    const [withdraw, setWithdraw] = useState(false)

    const {runContractFunction:showAllStudentsData} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"showAllStudents",
        params:{}
    })
    const {runContractFunction:AproveCourse} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"AproveCertification",
        params:{
            requester: account,
            courseName: courseName
        }
    })

    const {runContractFunction:WithdrawFunds} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"withDrawFunds",
        params:{}
    })
    
    

    function dataForTable(accountAddress){
        let i
        for(i =0; i<accountAddress.length; i++){
            myArray.push([accountAddress[i]])
            
        }

        return myArray
    }

    async function handleWithdrawButton(){
        withdrawFundsFunctionCall = await WithdrawFunds({onError:(error)=>console.log(error)})
        console.log(withdrawFundsFunctionCall,typeof withdrawFundsFunctionCall) 
        
    }
    
    async function UpdateUIValues(){        
        
        allStudentDetailsFunctionCall = await showAllStudentsData({onError:(error)=>console.log(error.data)})
        console.log(typeof allStudentDetailsFunctionCall)
        if(typeof allStudentDetailsFunctionCall === "undefined"){
            console.log(allStudentDetailsFunctionCall)
            setIsAdmin(false)
        }else{
            setIsAdmin(true)
            setAccountAddress(allStudentDetailsFunctionCall)
            console.log(accountAddress)
        }
 
    }

    const handleErrorNotification = (data) => {
        console.log(data.message)
        dispatch({
            type: "info",
            message: `${data.message}.`,
            title: "Error!",
            position: "topR",
            icon: "🚫",
        })
    };
    useEffect(()=>{
        if(isWeb3Enabled && isAdmin || account){
            UpdateUIValues()
        }
    },[isWeb3Enabled,isAdmin,account])
    return(
        <div style={{backgroundImage:"10th-grade.jpg"}}>
            {isWeb3Enabled ? (
                <div style={{fontFamily:"cursive",marginBottom:"2px"}}>
                    {isAdmin ? (<>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:"15px"}}>
                            <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
                                <div style={{padding:"9px",backgroundColor:"coral",borderRadius:"8px"}}>All students associated with National Credit System</div>
                                <Button text={"Reset"} theme="outline" onClick={()=>{window.location.reload(false)}}/>
                                {accountAddress.map((item,index)=>{
                                        return(
                                            <div key={index} style={{display:"-ms-grid",gap:"10px"}}>
                                                {console.log(item)}
                                                <Button theme="primary" text={item} onClick={()=>{
                                                    setClicked(true)
                                                    setChangedAccount(!changedAccount)
                                                    setRequestingAccount(item)
                                                    }}></Button>
                                            </div>
                                        
                                        )}                                    
                                )}
                                <h3>Withdraw All the funds.</h3>
                                <Button theme="moneyPrimary" text="Withdraw" onClick={handleWithdrawButton}/>
                            </div>
                            {/* <div style={{borderLeft:"2px solid grey", position:"fixed", marginLeft:"38%",height:"400px"}}></div> */}
                            <div>
                                <div style={{display:"flex",flexDirection:"column",gap:"25px",justifyContent:"flex-end"}}>
                                    <p style={{padding:"9px",backgroundColor:"Highlight",width:"600px",textAlign:"center"}}>All pending Courses to authorize.</p>                                
                                    {clicked?(<><Temp changingAccount={changedAccount}requestingAddress={requestingAccount}/></>):(<></>)}
                                    
                                </div>
                            </div>
                        
                            </div>
                    </>) : (<>You are not the admin.</>)}
    
                </div>
            ):(
                <div>Connect wallet</div>
            )}
        </div>
        
    )
}