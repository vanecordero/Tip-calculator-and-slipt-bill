import React , { Fragment } from "react";
import { Component } from "react";
import sty from './CalculatorSection.module.css'
//import { ReactDOM } from "react";
//import reactDom from "react-dom";
//import Percents from "./Percents/Percents";
//import { SliptTip } from "./Percents/Percents";

class CalculatorSection extends Component{

    constructor(){
        super()

        const METHODS = [
            'setBill',
            'reset',
            'changePeople',
            'setPercent',
            'calculatePercent'
        ]
        //this.calculatePercent.bind(this)
        //this.setPercent.bind(this)
        METHODS.forEach((methods)=>{
            this[methods] = this[methods].bind(this);
        })
        this.entrada = React.createRef();
        this.inputPerson = React.createRef();
        this.percentCustom = React.createRef();

        this.state={
            sliptTip: 0.00,            
            numOfPeople: 1,
            TotalPerson:0,
            totalBill: 0.00,
            PERCENTAGES :[5, 10, 15, 25, 50],
            percent:false,
            radioValue: 0,
            idRadio:'',
            wasCheck: false
        }

    }

    setBill(e){
        this.setState({
            totalBill: e.target.value
        },()=>{
            this.totalAmount(this.state.percent);
            this.calculatePercent(this.state.radioValue,this.state.percent, this.state.totalBill, this.state.numOfPeople);
        })
    }    

    reset(){
        this.entrada.current.value = '';
        this.inputPerson.current.value = '';
        if(this.state.wasCheck) {
            document.getElementById(this.state.idRadio).checked = false;
        }
        this.setState({
            sliptTip: 0.00,            
            numOfPeople: 1,
            TotalPerson:0,
            totalBill: 0.00,
            percent:false,
            radioValue: 0,
            idRadio:'',
            wasCheck: false
       })
    }
   
    changePeople(e){
        let value
        if(e.target.value <= 0 || e.target.value==='' ){
            value = 1;
            this.inputPerson.current.value = '';
         }else{
            value = e.target.value;
        }
        this.setState({
            numOfPeople: value
       },()=>{
            this.totalAmount(this.state.percent);
            this.calculatePercent(this.state.radioValue,this.state.percent, this.state.totalBill, this.state.numOfPeople)
       })
    }

    totalAmount(go){
        const sliptTotal = this.state.totalBill / this.state.numOfPeople
        let tip
        console.log(this.state.sliptTip)
        go? tip = this.state.sliptTip : tip = 0
        let total = sliptTotal + tip
        this.setState({
            TotalPerson: total
        })
    }

    setPercent = (e, custom) =>{
        let value = e.target.value;
        const bill = this.state.totalBill;
        const persons = this.state.numOfPeople;
        if(!custom){
            this.percentCustom.current.value=''
            this.setState({
                idRadio: e.target.id,
                wasCheck: true
            })
        }
        if((this.percentCustom.current.value===''&&custom)||(this.percentCustom.current.value<1&&custom)){
            this.percentCustom.current.value='';
            value=0
        }
        if((e.target.checked && this.state.radioValue !== value) || custom){
            if(custom && this.state.wasCheck) {
                document.getElementById(this.state.idRadio).checked = false;
            }
            this.setState({
                percent:true,
                radioValue:value,
            },()=>{
                this.calculatePercent(value,true, bill, persons)
            })
        }else if(e.target.checked && this.state.radioValue === e.target.value){
            console.log('son iguales')
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
        const tipAmount = tip / totalPe;
        console.log('tip amount:');
        console.log(tipAmount);
        this.setState({
             sliptTip: tipAmount
        },()=>{this.totalAmount(this.state.percent);})
    }

    render(){
        
        return (
            <div className={sty.container}>
                <div>
                    <div className={sty.billCnt}>
                        <label>Bill</label>
                        
                        <input type='number' 
                        onChange={this.setBill} 
                        ref={this.entrada}
                        className={`${sty.billNPeop} ${sty.hideArrow}`}/>
                    </div>
                    <div className={sty.ctnPercentage}>
                        <label>Select Tip %</label>
                        <div className={sty.radioToolbar}>
                        {               
                            this.state.PERCENTAGES.map((number)=>(
                            <Fragment key={number.toString()}>                           
                            <input 
                            type="radio" 
                            id={`${number}Per`} 
                            value={number} 
                            name='percent' 
                            onClick={(e)=>{this.setPercent(e, false)}}                   
                               />
                            <label 
                            htmlFor={`${number}Per`}>
                                {number}%</label>  
                            </Fragment>
                            ))
                            
                        }
                        <input type='number' 
                         placeholder='Custom'  
                         ref={this.percentCustom}
                         className={`${sty.customPercent} ${sty.hideArrow}`}
                         onChange={(e)=>{this.setPercent(e, true)}}
                         />
                    </div>
                    </div>
                    <div>
                        <label>Number of people</label>
                        <input type='number'
                        className={`${sty.billNPeop} ${sty.hideArrow}`}
                        onChange={this.changePeople}
                        placeholder='1'  
                        ref={this.inputPerson}                      
                        />
                    </div>
                </div>
                <div className={sty.cntTotal}>
                    <div>
                        <p>Tip Amount </p>
                        <p>${this.state.sliptTip.toFixed(2)}</p>
                    </div>
                    <div>
                        <p>Total </p>
                        <p>${this.state.TotalPerson.toFixed(2)}</p>
                    </div>
                    <div>
                        <button onClick={this.reset}>Reset</button>
                    </div>
                </div>
            </div>
            )
    }
}

/*class Percents extends React.Component {

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
        const tipAmount = tip / totalPe;
        console.log('tip amount:');
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


const SliptTip= (val)=> {
    console.log('see the slipt function')
    console.log(val)
    reactDom.render(
        <span>{val}</span>, document.getElementById('sliptTip')
    )
}*/

export default CalculatorSection