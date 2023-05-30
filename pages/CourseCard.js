import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
export default function CourseCard({courseName,image, courseInfo, fees, Syllabus}){
    const [seeCourse, setSeeCourse] = useState(true)
    const handleClick = () => {
        console.log("see the course")
        setSeeCourse(!seeCourse)
    }
   
    return(
        <div>
            
            {seeCourse ? (<Link href={'/dashboard'}>
                <div style={
                    {
                        margin:"10px 10px 10px 10px",
                        display:"block",
                        padding:"10px",
                        lineHeight:"25px",
                        textAlign:"center",
                        alignItems:"center",
                        height: "400px",
                        width:"350px",
                        boxShadow:"20px",
                        borderRadius:'30px',
                        boxShadow:"1px 1px 2px 2px",
                        cursor:"pointer"
                    }
                }
                onClick={handleClick}
                >
                    <h4>{courseName}</h4>
                    <p>{courseInfo}</p>
                    <Image src={image} width={100} height={100} style={{border:"1px solid black"}}></Image>
                    <p>Fees structure: <b>{fees}</b></p>
                    <p>Syllabus of the course: {Syllabus}</p>
                </div>
            </Link>):(<>
                <div style={
                    {
                        margin:"10px 10px 10px 10px",
                        display:"block",
                        padding:"10px",
                        lineHeight:"25px",
                        textAlign:"center",
                        height: "400px",
                        boxShadow:"20px",
                        borderRadius:'30px',
                        boxShadow:"1px 1px 2px 2px",
                        cursor:"pointer"
                    }
                }
                onClick={handleClick}
                >
                    <h4>{courseName}</h4>
                    <p>Information of the course: {courseInfo}</p>
                    <Image src={image} width={200} height={200} style={{border:"1px solid black"}}></Image>
                    <p>Fees structure: <b>{fees}</b></p>
                    <p>Syllabus of the course: {Syllabus}</p>
                </div>
            </>)}
        </div>
        
    )
}