import { Button,useNotification } from "web3uikit";
import { contractABI,contractAddress } from "../Constants/index"
import {Checkmark} from '@web3uikit/icons'
import { useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
export default function Aproval({requestingAddress,name}){

    const {isWeb3Enabled} = useMoralis()
    const [courseAproval, setCourseAproval] = useState(false)
    const dispatch = useNotification()
    const {runContractFunction:AproveCourse} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"AproveCertification",
        params:{
            requester: requestingAddress,
            courseName: name
        }
    })

    const handleSuccessNotification = (courseName) =>{
                   
        dispatch({
            type: "info",
            message: `You have successfully completed ${courseName} Course.`,
            title: "Congratulations.",
            position: "topR",
            icon: <Checkmark fontSize='25px'/>,
        })    
    }

    function handleSuccess(){
        handleSuccessNotification(name)
    }

    function handleError(data){
        let result
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
    }
    

    return(
        <Button theme="secondary" text={`Approve ${name} Course.`} 
                        
            onClick={()=>{
                
                AproveCourse({
                    onError:(error)=> handleError(error.data),                             
                    onSuccess:handleSuccess
                })
            }}
            >

            </Button>

    )
}