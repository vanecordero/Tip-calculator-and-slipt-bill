
function GroupPercents(props){
    return (
        <>
            <input type="radio" id={`${props.value}Per`} value={props.value} name='percent'/>
            <label htmlFor={`${props.value}Per`}>{props.value}%</label>  
        </>
        )
}
function Percents(){   
    const PERCENTAGES =[5, 10, 15, 25, 50]
    return (
         <>
            {
                PERCENTAGES.map((number)=>(
                    <GroupPercents key={number.toString()} value={number}/>
                ))
            }
         </>
       
    )
}


export default Percents