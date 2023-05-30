import { Badge, Button, Card,useNotification } from "web3uikit"
import EnrolledCourse from "./EnrolledCourse"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { contractABI,contractAddress } from "../Constants/index"
import { useEffect, useState } from "react"
import {Checkmark} from '@web3uikit/icons'
import Aproval from "./Aproval"


export default function Temp({requestingAddress,changingAccount}){
    let displayDataFuctionCall,requestingCourseFunction
    const dispatch = useNotification()
    const [requestedCourse,setRequestedCourse] = useState([])
    const {isWeb3Enabled} = useMoralis()
    const [data,setData] = useState([])
    const [isdetailsAdded,setIsDetailsAdded] = useState(false)
    const [courseName, setCourseName] = useState("")
    const [isCourseLengthNonZero, setIsCourseLengthNonZero] = useState(false)

    const {runContractFunction:RequestedCertificationFunction} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"showRequestedCertifications",
        params:{
            requester: requestingAddress,
        }
    })

    const {runContractFunction: dataDisplay} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"ShowDetailsofStudent",
        params:{
            requester: requestingAddress
        }
    })

    const {runContractFunction:AproveCourse} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"AproveCertification",
        params:{
            requester: requestingAddress,
            courseName: courseName
        }
    })

    async function updateValues(){
        displayDataFuctionCall = await dataDisplay({onError:(error)=>console.log(error)})
        console.log(typeof displayDataFuctionCall)
        
            if(typeof displayDataFuctionCall === "undefined"){
                setIsDetailsAdded(false)                
                console.log(displayDataFuctionCall)
            }
            else{
                setIsDetailsAdded(true)
                setData(displayDataFuctionCall)
                console.log(data)
            }
        requestingCourseFunction = await RequestedCertificationFunction({onError:(error)=>console.log(error)})
            if(typeof requestingCourseFunction === "undefined" || requestingCourseFunction.length === 0){
                setIsCourseLengthNonZero(false)
            }else{
                setIsCourseLengthNonZero(true)
                setRequestedCourse(requestingCourseFunction)
            }
            console.log(isCourseLengthNonZero,requestedCourse)
    }
    const handleError = (data) => {
        console.log(data.message)
        dispatch({
            type: "info",
            message: `${data.message}.`,
            title: "Error!",
            position: "topR",
            icon: "🚫",
        })
    };
        
    const handleSuccessNotification = (data,courseName) =>{
        if(data == "undefined"){
            console.log(typeof data)
            dispatch({
                type: "info",
                message: `You have successfully completed ${courseName} Course.`,
                title: "Congratulations.",
                position: "topR",
                icon: <Checkmark fontSize='50px'/>,
            })
        }
        
    }
        
    useEffect(()=>{
        if(isWeb3Enabled || isdetailsAdded || changingAccount || isCourseLengthNonZero){
            updateValues()
        }
    },[isWeb3Enabled,isdetailsAdded,changingAccount,isCourseLengthNonZero])
    return(
        <>
            <p>Make sure you are the admin of this smart contract.</p>
            
            <h3>Student data:</h3>
            <ul>
                {data.map((item)=>(
                    <li key={item}>
                        {item.toString()}
                    </li>
                ))}
            </ul>
            
            {/* <Button theme="colored" color="red" text="Show Count" onClick={handleSubmit}></Button> */}
            <h3>Requesting certifications: 
                {requestedCourse.map((item)=>(
                    
                    <div style={{display:"flex",gap:"30px"}} key={item} >
                        <Aproval requestingAddress={requestingAddress} name={item}/>
                        {/* <Button theme="secondary" text={`Approve ${item} Course.`} 
                        
                        onClick={()=>{
                            
                            setCourseName(item)
                            console.log(courseName)
                            AproveCourse({
                                onError:(error)=> console.log(error),                             
                                onSuccess:(error)=> handleSuccessNotification(error,item)
                            })
                        }}
                        >

                        </Button> */}
                        {/* <>{courseName}</> */}
                    </div>
                    
                ))}
                
            </h3>
            
        </>
        
    )
}