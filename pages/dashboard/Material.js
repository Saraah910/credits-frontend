import { result } from "../test"
import { useWeb3Contract,useMoralis } from "react-moralis"
import { contractABI,contractAddress } from "../../Constants/index"
import { Button,useNotification,TabList,Tab } from "web3uikit"
import { useState } from "react"
import Link from "next/link"

export default function Material(){
    console.log(result)
    const dispatch = useNotification()
    const {account} = useMoralis()
    const [isDisabled, setIsDisabled] = useState(false)
    const {runContractFunction: RequestCertification} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"requestDegree",
        params:{
            requester:account,
            courseName: result
        }

    })
    function handleSuccess(event){
        setIsDisabled(true)
        handleSuccessNotification(result)
    }
    const handleSuccessNotification = (courseName) => {
        dispatch({
            type: "info",
            message: `${courseName} course requested for Approval.`,
            title: "Requested!",
            position: "topR",
            icon: "🔔",
        })
    };

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
    return(
            <div style={{display:"flex",flexDirection:"column",gap:"10px",fontFamily:"ariel"}}>
                <h2>{result} Course Study Material Available Here</h2>
                <br></br>
                <TabList
                    defaultActiveKey={1}
                    isVertical
                    onChange={function noRefCheck(){}}
                    tabStyle="bar"
                    >
                    <Tab
                        tabKey={1}
                        tabName="Module 1: Introduction"
                    >
                        <div style={{marginLeft:"200px", lineHeight:"30px"}}>
                            <ul>
                                <li>
                                    <Link href={""}><b>Chapter 1</b></Link>
                                </li>
                                <li>
                                    <Link href={""}><b>Chapter 2</b></Link>
                                </li>
                                <li>
                                    <Link href={""}><b>Chapter 3</b></Link>
                                </li>
                                

                            </ul>
                                
                                
                            
                        </div>
                    </Tab>
                    <Tab
                        tabKey={2}
                        tabName="Module 2: Learning Basics"
                    >
                        <div style={{marginLeft:"200px", lineHeight:"30px"}}>
                            <ul>
                                <li>
                                    <Link href={""}><b>Chapter 1</b></Link>
                                </li>
                                <li>
                                    <Link href={""}><b>Chapter 2</b></Link>
                                </li>
                                <li>
                                    <Link href={""}><b>Chapter 3</b></Link>
                                </li>
                                <li>
                                    <Link href={""}><b>Chapter 4</b></Link>
                                </li>
                                
                                <li>
                                    <Link href={""}><b>Chapter 5</b></Link>
                                </li>
                                <li>
                                    <Link href={""}><b>Chapter 6</b></Link>
                                </li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab
                        tabKey={3}
                        tabName="Module 3: Practical Knowledge"
                    >
                        <div style={{marginLeft:"200px", lineHeight:"30px"}}>
                            <ul>
                                <li>
                                    <Link href={""}><b>Assignment 1</b></Link>
                                </li>
                                <li>
                                    <Link href={""}><b>Assignment 2</b></Link>
                                </li>
                                <li>
                                    <Link href={""}><b>Assignment 3</b></Link>
                                </li>
                                <li>
                                    <Link href={""}><b>Assignment 4</b></Link>
                                </li>
                                <li>
                                    <Link href={""}><b>Assignment 5</b></Link>
                                </li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab
                        tabKey={4}
                        tabName="Module 4: Skill Competancy Examination"
                    >
                        <div style={{marginLeft:"200px", lineHeight:"30px"}}>
                            <ul>
                                <li>
                                    <Link href={""}><b>Give Exam</b></Link>
                                </li>
                                
                            </ul>
                        </div>
                    </Tab>
                </TabList>

                <Button disabled={isDisabled} theme="outline" text="Finish" onClick={()=>{
                    RequestCertification({
                        onError:(error)=>handleError(error.data),                                                                                                                                               
                        onSuccess: handleSuccess
                    })
                    
                }}
                
                />
            </div>
            
            
            
        
    )
}