import { contractABI, contractAddress } from "../Constants/index"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Form, Modal, Radios, Input, useNotification } from "web3uikit"
export default function CoursesGallary({isVisible, onClose}){
    const [courseName, setCourseName] = useState("")
    const dispatch = useNotification()
    const {isWeb3Enabled} = useMoralis()

    const handleErrorNotification = (data)=>{
        console.log(data.message)
        dispatch({
            type: "info",
            message: `${data.message}`,
            title: "Error Message!",
            position: "topR",
            icon: "🚫",
        })
    }
    const handleCourseNotiification = (courseName)=>{
        dispatch({
            type: "info",
            message: `Successfully Enrolled for ${courseName} course`,
            title: "Successfully Erolled!",
            position: "topR",
            icon: "🔔",
        })
    }
    let courseFees
    if(courseName === "9th" || courseName === "10th"){
        courseFees = 2000000000000000000
    }else if(courseName === "11th" || courseName === "12th"){
        courseFees = 4000000000000000000
    }else if(courseName === "Diploma" || courseName === "Degree" || courseName === "hm" || courseName === "art"){
        courseFees = 6000000000000000000
    }
    console.log(courseName, courseFees)
    const {runContractFunction: courseSelected} = useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"enrollIntoCourse",
        msgValue:courseFees,
        params:{
            courseName: courseName
        }
        
    })

    async function handleError(data){
        onClose()
        await handleErrorNotification(data)
         
    }

    async function handleCourseSelected(){
        onClose() 
        await handleCourseNotiification(courseName)
        await window.location.reload(false)
           
    }
    
    return(
        <div>
            <Modal
                isVisible={isVisible}
                cancelText="Discard Changes"
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                okButtonColor="green"
                onOk={()=>{
                    onClose()
                    console.log("function started")
                    courseSelected({
                        onError:(error)=>handleError(error.data),
                        onSuccess: handleCourseSelected
                    })
                    
                }}
                title={"Purchess the mandatory course from the following."}
                
            >
                <div style={{display:"flex", flexDirection:"column", gap:"2px"}}>
                    <input
                        type="radio"
                        name="options"
                        value='9th'
                        onChange={(event)=>{
                            setCourseName(event.target.value)
                        }} />9th standard (High School)
                    <input
                        type="radio"
                        name="options"
                        value='10th'
                        onChange={(event)=>{
                            setCourseName(event.target.value)
                        }} />10th standard (High School)
                    <input
                        type="radio"
                        name="options"
                        value='11th'
                        onChange={(event)=>{
                            setCourseName(event.target.value)
                        }} />11th standard (Junion College)
                    <input
                        type="radio"
                        name="options"
                        value='12th'
                        onChange={(event)=>{
                            setCourseName(event.target.value)
                        }} />12th standard (Junion College)
                    <br></br>
                    <h4>Degree Programs</h4>
                    <br></br>
                    <input
                        type="radio"
                        name="options"
                        value='Diploma'
                        onChange={(event)=>{
                            setCourseName(event.target.value)
                        }} />Diploma In Archiology (Integrated Diploma Course)
                    <input
                        type="radio"
                        name="options"
                        value='Degree'
                        onChange={(event)=>{
                            setCourseName(event.target.value)
                        }} />B.Tech in Computer Science and Engineering
                    <input
                        type="radio"
                        name="options"
                        value='hm'
                        onChange={(event)=>{
                            setCourseName(event.target.value)
                        }} />Hotel And Hospitality Management
                    <input
                        type="radio"
                        name="options"
                        value='art'
                        onChange={(event)=>{
                            setCourseName(event.target.value)
                        }} />Fine Arts (Degree Program)
                </div>
            </Modal>
        </div>
    )
}