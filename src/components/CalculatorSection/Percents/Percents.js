import { Fragment,  } from "react"
import { Component } from "react"
import { ReactDOM } from "react"

import sty from '../CalculatorSection.module.css'

class Percents extends Component {

    constructor(props){
        super(props)

        const METHODS = [
            'setPercent',
            'calculatePercent'
        ]
        METHODS.forEach((methods)=>{
            this[methods] = this[methods].bind(this)
        })
        this.state={
            PERCENTAGES :[5, 10, 15, 25, 50],
            percent:false,
            radioValue: 0,
            sliptTip: 0.00
        }
    }
    
    setPercent = (e, bill = 0.00, persons = 1, func) =>{
        const value = e.target.value
        if(e.target.checked && this.state.radioValue !== value){
            console.log('Dio true')
            this.setState({
                percent:true,
                radioValue:value
            },()=>{
                this.calculatePercent(value,true, bill, persons)
            })
        }else if(e.target.checked && this.state.radioValue === e.target.value){
            console.log('Dio falso')
            e.target.checked = false;
            this.setState({
                percent:false,
                radioValue:''
            },()=>{
                this.calculatePercent(value,false, bill, persons)
            })
        }  
    }

    calculatePercent(value, go, bills, persons){
        const totalPe = parseInt(persons)
        let percent
        go ? percent = parseFloat(value) : percent = 0
        const tip = parseFloat(bills) * (percent/100)
        const tipAmount = tip / totalPe
        console.log(tipAmount);
        this.setState({
             sliptTip: tipAmount
        })
        SliptTip(tipAmount)
    }


    render (){return (
         <>
            {               
                this.state.PERCENTAGES.map((number)=>(
                <Fragment key={number.toString()}>                           
                <input 
                type="radio" 
                id={`${number}Per`} 
                value={number} 
                name='percent' 
                onClick={(e)=>{
                    this.setPercent(e, this.props.bill, this.props.persons)}}
                   
                    />
                <label 
                htmlFor={`${number}Per`}>
                    {number}%</label>  
                </Fragment>
                ))
                
            }
            <input type='number' onChange={this.setPercent} placeholder='Custom' className={`${sty.customPercent} ${sty.hideArrow}`}/>
         </>
       
    )}

}

function SliptTip(value) {
    console.log('see the slipt function')
    ReactDOM.render(
        <>{value}</>, document.getElementById('sliptTip')
    )
}

export default Percents

