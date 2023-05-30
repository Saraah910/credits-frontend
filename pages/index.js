import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BannerStrip,Button } from 'web3uikit'
import { useMoralis } from 'react-moralis'
import { useState } from 'react'
import Dashboard from './dashboard'
import CardItem from './cardItem'
import CourseCard from './CourseCard'
import Test from './test'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const Data = [
    {
      id:1,
      courseName:"9th Grade Highschool.",
      img:"/9th-grade-2.jpg",
      desc:"The course is designed by maharashtra state board. Course content is according to the latest education pattern approved by UGC.",
      fees: "2 ETH",
      Syllabus: "4 modules with 5 credits each."
    },
    {
      id:2,
      courseName:"10th Grade Highschool.",
      img:"/10th-grade.jpg",
      desc:"The course is designed by maharashtra state board. Course content is according to the latest education pattern approved by UGC.",
      fees: "2 ETH",
      Syllabus: "4 modules with 5 credits each."
    },
    {
      id:3,
      courseName:"11th Grade Jr. College.",
      img:"/11th-grade.png",
      desc:"The course is designed by Central Board of Secondary Education. Course content is according to the latest education pattern approved by UGC.",
      fees: "4 ETH",
      Syllabus: "5 modules with 8 credits each."
    },
    {
      id:4,
      courseName:"12th Grade Jr. College.",
      img:"/12th-grade.jpg",
      desc:"The course is designed by Central Board of Secondary Education. Course content is according to the latest education pattern approved by UGC.",
      fees: "4 ETH",
      Syllabus: "5 modules with 8 credits each."
    }

  ]

  const Higher = [
    {
      id:1,
      courseName:"Diploma In Archiology.",
      img:"/9th-grade-2.jpg",
      desc:"The Archiology diploma course syllabus is designed by the archeology department of Mumbai University.",
      fees: "6 ETH",
      Syllabus: "6 modules with 10 credits in each module."
    },
    {
      id:2,
      courseName:"B.Tech in Computer Science and Engg.",
      img:"/9th-grade-2.jpg",
      desc:"Computer Science Engineering is a course that deals with the design, implementation, and management of both software & hardware processes.",
      fees: "6 ETH",
      Syllabus: "6 modules with 10 credits in each module."
    },
    {
      id:3,
      courseName:"Hotel And Hospitality Management",
      img:"/9th-grade-2.jpg",
      desc:"This business degree provides you industry specific knowledge on top of a very solid foundation of business and economics, as well as Mospitality skills.",
      fees: "6 ETH",
      Syllabus: "6 modules with 10 credits in each module."
    },
    {
      id:4,
      courseName:"Fine Arts (Degree Program)",
      img:"/9th-grade-2.jpg",
      desc:"Fine art degree courses are the conversion of your imagination to an intangible/tangible art form. The program is offered by National School of Fine Arts.",
      fees: "6 ETH",
      Syllabus: "6 modules with 10 credits in each module."
    }
    
  ]
  
  return (
    <div>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", gap:"60px"}}>
        <div style={{lineHeight:"27px"}}>
          <h2>Principals and the agenda of the Choice Based Credit System</h2>
          <br></br>
          <br></br>
          <p>The amount of credits assigned for each course is different. By raising the bar for their skills, this program's main goal is to inspire children to be all-rounders.</p>
          <br></br>
          <p>The credits grading system is thus, more effective than the conventional percentage system. University Grants Commission has introduced a 10 point grading system, with 0 being absent/fail and 10 being outstanding.</p>
          <br></br>
          <Button size='xl' theme='link' text='Request a Demo'/>
        </div>
        <Image src={'/imp-home.jpg'} width={700} height={500} alt=''/>
      </div>
      
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",alignItems:"center"}}>
        <Image src={'/home-logo.jpg'} width={500} height={600} style={{justifyContent:"flex-end",marginLeft:"60px"}}></Image>
        <CardItem id = {1}/>
      </div>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <CardItem id = {2}/>
        <Image src={"/man-laptop.jpg"} width={380} height={380} style={{justifyContent:"flex-end"}}></Image>
        
      </div>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <Image src={"/pencil.jpg"} width={400} height={400} style={{justifyContent:"flex-end",marginLeft:"60px"}}></Image>
        <CardItem id = {3}/>
  
      </div>
      <h3 style={{fontFamily:"cursive", textAlign:"center"}}>Course Gallary</h3>
      <h3 style={{fontFamily:"cursive",color:"brown",marginTop:"10px",marginBottom:"20px"}}>Available Mandatory Courses</h3>
      <div
        key="1"
        style={{
          display: 'flex',
          flexDirection: 'column',
          transform: 'scale(1)',
          marginBottom:"60px"
        }}
      >
        <BannerStrip
          onCloseBtnClick={function noRefCheck(){}}
          text="The courses listed below are mandatory to enroll in order to go for higher qualiifying studies."
          type="standard"
        />
        
      </div>
      <div style={{display:"flex",flexDirection:"row",overflowX:"scroll"}}>
        {Data.map((item)=>(
          <div key={item.id}>
            <CourseCard 
              courseName={item.courseName}
              courseInfo={item.desc}
              image={item.img}
              fees={item.fees}
              Syllabus={item.Syllabus}
            />
          </div>
        )
        )}
      </div>

      <div style={{display:"flex",flexDirection:"row",overflowX:"scroll", marginTop:"60px"}}>
        {Higher.map((item)=>(
          <div key={item.id}>
            <CourseCard 
              courseName={item.courseName}
              courseInfo={item.desc}
              image={item.img}
              fees={item.fees}
              Syllabus={item.Syllabus}
            />
          </div>
        )
        )}
      </div>
      
    </div>
    
  )
}
