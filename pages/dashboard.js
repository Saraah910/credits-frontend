import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import {contractABI,contractAddress} from "../Constants/index"
import { BannerStrip, Button, Card, Slider, Toggle, useNotification} from "web3uikit"
import EnrolledCourse from "./EnrolledCourse"
import CoursesGallary from "./CourseGallary"
import Link from "next/link"
import {AtomicApi} from '@web3uikit/icons'
import Image from "next/image"
import Material from "./dashboard/Material"
import Test from "./test"


export default function Dashboard(){
    const dispatch = useNotification()
    const {isWeb3Enabled, account} = useMoralis()
    const [isDetailsAdded, setIsDetailsAdded] = useState(false)
    const [data, setData] = useState([])
    const [ApproveddCertificates, setApprovedCertificates] = useState([])
    const [AllCourses, setAllCourses] = useState(false)
    const [CourseData, setCourseData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [displayCredits, setDisplayCredits] = useState("")
    const [requested, setRequested] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [requestQueue, setRequestQueue] = useState([])
    const [courseName, setCourseName] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const [newName,setNewName] = useState("")
    

    let displayDataFuctionCall,showAllEnrolledCourses,approveddCertificatesCall,showRequestedFunctionCall

    const {runContractFunction: dataDisplay} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"ShowDetailsofStudent",
        params:{
            requester: account
        }
    })

    const {runContractFunction : coursesEnrolled} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"showAllEnrolledCourses",
        params:{
            requester:account
        }
    })

    const {runContractFunction: showRequestedCertifications} = useWeb3Contract({
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "showRequestedCertifications",
        params:{
            requester: account
        }
    })

    const {runContractFunction: showAvailableCredits} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"showAvailableCredits",
        params:{
            requester:account
        }

    })

    const {runContractFunction: showAllAprovedDegrees} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"showApprovedCertification",
        params:{
            requester:account
        }

    })
    const {runContractFunction: RequestCertification} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"requestDegree",
        params:{
            requester:account,
            courseName: courseName
        }

    })

    async function updateUI(){
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
        showAllEnrolledCourses = await coursesEnrolled({onError:(error)=>console.log(error)}) 
        // console.log(showAllEnrolledCourses) 

            if(typeof showAllEnrolledCourses === "undefined"|| showAllEnrolledCourses.length === 0){
                setAllCourses(false)
                console.log("No courses enrolled till now.")
            }else{
                setAllCourses(false)
                setAllCourses(true)
                setCourseData(showAllEnrolledCourses)
                console.log(CourseData)
            }
        approveddCertificatesCall = await showAllAprovedDegrees({onError:(error)=>console.log(error)})
        setApprovedCertificates(approveddCertificatesCall)
        console.log(approveddCertificatesCall)

        showRequestedFunctionCall = await showRequestedCertifications({onError:(error)=>console.log(error)})
        if(typeof showRequestedFunctionCall === "undefined" || showRequestedFunctionCall.length === 0){
            setRequested(false)
        }else{
            // setRequested(false)
            setRequested(true)
            setRequestQueue(showRequestedFunctionCall)
        }
        
    }
    
    function coursePurchess(){
        setShowModal(true)
    }
    function handleClose(){
        setShowModal(false)
    }

    async function showCredits(){
        const creditsCall = (await showAvailableCredits({onError:(error)=>console.log(error)})).toString()
        setDisplayCredits(creditsCall)
        
    }
    const handleSuccess = (courseName) => {
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

    // const imageLoader = () =>{
    //     const image = encodeURI('https://ipfs.moralis.io:2053/ipfs/QmP9SMjPV6G2oUM4csiK7PEjCRFmb4vw4D8N92xNcf8EZb/WIN_20230218_19_30_26_Pro.jpg')
    //     return image
    // }

    useEffect(()=>{
        if(isWeb3Enabled || account || requested || AllCourses ){
            updateUI()
        }
    },[isWeb3Enabled, isDetailsAdded, account, AllCourses, requested, displayCredits])
    return (
        <>
        {isWeb3Enabled ? (
            <>
                {isDetailsAdded ? (
                    <div>
                        <h4 style={{color:"purple", fontFamily:"roboto", backgroundColor:"pink", padding:"6px", textAlign:"center",borderRadius:"7px"}}>
                            Warning: Once enrolled in the course, you cannot unenroll it untill you finish.</h4>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:"20px"}}>        
                            <p style={{color:"red", fontFamily:"cursive", fontWeight:"bold"}}>DETAILS OF THE STUDENT </p>
                            <div style={{display:"flex",flexDirection:"column", gap:"20px"}}>
                                <p style={{color:"red", fontFamily:"cursive",fontWeight:"bold"}}>COURSES ENROLLED</p>
                                <Button  text="Purchess course." theme="outline" size="larger" onClick={coursePurchess}/>
                            </div>
                            
                        </div>
                        
                        <div style={{borderLeft:"2px solid grey", position:"absolute", marginLeft:"38%",height:"700px"}}></div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"20px", alignItems:"center"}}>   
                            <div style={{display:"flex", flexDirection:"column", gap:"10px", alignItems:"center"}}>
                                {console.log('https://ipfs.moralis.io:2053/ipfs/QmP9SMjPV6G2oUM4csiK7PEjCRFmb4vw4D8N92xNcf8EZb/resume_pic.jpg')}
                                <Image src={"/resume_pic.jpg"}
                                    width={250}
                                    height={250}
                                    alt="Resume_image"
                                ></Image>
                                <Card style={{width:"400px",fontFamily:"roboto"}}
                                    title="Student Details"
                                    description="Your details will be shared by Course Aproving authorities"
                                >
                                    <div style={{
                                            display: "flex",
                                            flexDirection:"column",
                                            alignItems:"center",
                                            marginLeft:"1.5%",
                                        }}>
                                        <h3>Name: {data[0]}</h3>
                                        <h3>Age:{data[1].toString()}</h3>
                                        <h3>College Name:{data[2]}</h3>
                                    </div>
                                </Card>
                                <Button theme="colored" color="blue" text="Available credits" onClick={showCredits}/>
                                {displayCredits}
                                
                                <h3 style={{fontFamily:"times new roman"}}>Approved Degrees/Certification</h3>
                                {/* <b style={{display:"flex",flexDirection:"row", gap:"10px",
                                            width:"50",padding:"10px",
                                            borderRadius:"7px",backgroundColor:"#ffffb2",fontSize:"bold",fontSmooth:"auto"}}>
                                            {`${ApproveddCertificates} Course.`}</b> */}
                                {console.log(ApproveddCertificates, typeof ApproveddCertificates)}
                                {ApproveddCertificates.map((item)=>(
                                    <div key={item} style={{display:"flex",flexDirection:"row", gap:"10px",
                                            width:"50",padding:"10px",
                                            borderRadius:"7px",backgroundColor:"#ffffb2",fontSize:"bold",fontSmooth:"auto"}}>
                                        <h5>{item} Course</h5>
                                    </div>
                                ))}
                                
                            </div>     
                            
                            <div style={{ color:"red", fontFamily:"cursive",fontWeight:"bold"}}>
                                <div style={{display:"flex", flexDirection:"column", gap:"10px",justifyContent:"flex-end"}}>

                                    {!AllCourses ? (
                                    
                                        <div style={{display:"flex", flexDirection:"column", gap:"10px", justifyContent:"center"}}>
                                            <h3 style={{color:"black"}}>You have not erolled in any course.</h3>      
                                                                        
                                        </div>
                                        
                                    ) : (
                                        <>
                                            <div style={{display:"flex",flexDirection:"row", gap:"20px",justifyContent:"flex-end",
                                                overflowX:"scroll",whiteSpace:"wrap",position:"relative",direction:"rtl"}}>
                                                    
                                                {CourseData.map((item)=>(
                                                    <div>
                                                        <Card style={{width:"250px", height:"300px"}} title={item} onClick={()=>{
                                                            setToggle(!toggle)
                                                            setCourseName(item)
                                                                                                                       
                                                        }}>
                                                            {toggle?(<>
                                                                
                                                                <Link href={"/dashboard/Material"}>
                                                                    <Button theme="primary" text="Complete the course."/>
                                                                    {/* <Button disabled={isDisabled} theme="outline" text="Complete course." onClick={()=>{
                                                                        RequestCertification({
                                                                            onError:(error)=>handleError(error.data),                                                                                                                                               
                                                                            onSuccess: handleSuccess(courseName)
                                                                        })
                                                                        setIsDisabled(true)
                                                                    }}
                                                                    
                                                                    /> */}
                                                                    {console.log(courseName)}
                                                                    <Test courseName={courseName}/>
                                                                </Link>
                                                                
                                                                
                                                                
                                                                
                                                            </>):(<div style={{alignItems:"center"}}><AtomicApi fontSize='20px'/> Complete the course.</div>)}
                                                            
                                                            
                                                        </Card>
                                                    </div>
                                                ))}
                                                
                                            </div>
                                            
                                        </>
                                        
                                    )}
                                
                                    <CoursesGallary
                                        isVisible={showModal}
                                        onClose={handleClose}
                                    />
                                    <hr style={{width:"650px"}}></hr>
                                    <h3>Requested courses:</h3>
                                    {requested ? (<>
                                        {console.log("Request Queue.")}
                                        {requestQueue.map((item)=>(
                                            <div>{item}</div>
                                        ))}
                                    </>) : (<>You have not requested for any certificate.</>)}

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                <div style={
                    {textAlign:"center",paddingTop:"105px"}
                }>
                    <p>The details have not been added.</p>
                    <Link href={"/dashboard/addDetails"} prefetch={true}><b>Click to add details.</b></Link>
                </div>
                    
                )}
                
            </>
        ) : (
        <div>
            Connect to wallet
        </div>
        )}
        
        </>
        
    )
}
