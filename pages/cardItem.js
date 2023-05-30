export default function CardItem({id}){
    const data = [{content:"Making education more holistic and effective and lay emphasis on the integration of general (academic) education, vocational education and Experiential learning including relevant experience and professional levels acquired, it becomes imperative to establish and formalize a national credit accumulationand transfer system which will integrate both general & vocational education whileensuring mobility of candidates between the two systems."},
                  {content:"The National Credit Framework (NCrF) has been jointly developed by UGC, AICTE, NCVET, NIOS, CBSE, NCERT, Ministry of Education, DGT, and Ministry of Skill Development to achieve this vision and intent of NEP. "},
                  {content:"The implementation of NCrF would be a game changer in realising the vision and intent of NEP by removing distinction, ensuring flexibility & mobility and establishing academic equivalence between general and vocational education. Such integration shall open numerous options for further progression of students and inter-mingling of school & higher education with vocational education & Experiential learning including relevant experience and professional levels acquired, to further enable entry and re-entry from vocational stream to general education and vice-versa, thus mainstreaming the vocational education and skilling. "}
                ]
    
    return(
        
            
        <div style={{                
            display:'flex',
            width:'45%',
            height:"fit-content",
            padding:'15px',
            lineHeight:"24px",
            backgroundColor:'#ffe6ee',
            borderRadius:'20px',
            boxShadow:"1px 1px 1px 1px"
        }} key={id}>
            {data[id - 1].content}
        </div>
        
    )
}