import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { Badge, Button, Card, Dropdown, Toggle} from "web3uikit";
import Admin from "./admin";
import Temp from "./Temp";


var myArray = []

export default function EnrolledCourse({AllCourses}){
    const {account} = useMoralis()
    const[temp, gotoTemp] = useState(false)
    const[requestPending, setRequestPending] = useState(false)
    
    const [value, setValue] = useState(0)
    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
      };
    
    const handleStateChange = (event) =>{
        
    }
    return(
        <>
        {/* {console.log("course started")} */}
            {AllCourses.map((item)=>(
                <Card style={{width:"350px", height:"250px", marginBottom:"7px"}} 
                    title={`${item} Grade (High School)`}
                    // onClick={handleClick(item)}    
                >   
                {/* <input
                    type="range"
                    min={0}
                    max={100}
                    value={value}
                    onChange={handleChange}
                />
                <Dropdown
                    
                    label="Status : "
                    onChange={(event) => {
                        console.log(event.id)
                        if(event.id === "Completed"){
                            myArray.push([account,item])
                        }
                        console.log(myArray)
                        
                    }}
                    onComplete={function noRefCheck(){}}
                    options={[
                        {
                            id: 'Completed',
                            label: 'Course Completed'
                        },
                        {
                            id: 'Incomplete',
                            label: 'Course Incomplete'
                        }
                        
                    ]}
                    /> */}
                    <Toggle/>
                
                </Card>
                
            ))}
        </>
        
    
    )
}
export var myArray 