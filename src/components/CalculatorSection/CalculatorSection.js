import React from "react";
import sty from './CalculatorSection.module.css'
import Percents from "./Percents/Percents";

class CalculatorSection extends React.Component{

    constructor(){
        super()

        const METHODS = [
            'setBill',
            'reset',
            'changePeople',
            'changeTip'
        ]
        METHODS.forEach((methods)=>{
            this[methods] = this[methods].bind(this)
        })
        this.entrada = React.createRef()

        this.state={
            slipTip: 0.00,            
            numOfPeople: 1,
            TotalPerson:0,
            totalBill: 10.00
        }

    }

    setBill(e){
        this.setState({
            totalBill: e.target.value
        },()=>{
            this.totalAmount(this.state.percent)
        })
           }    

    reset(){
        this.entrada.current.value = ''
        this.setState({
            slipTip: 0.00,
            TotalPerson: 0.00
       })
    }
   
    changePeople(e){
        let value
        if(e.target.value <= 0 || e.target.value==='' ){
            value = 1
         }else{
            value = e.target.value
        }
        this.setState({
            numOfPeople: value
       },()=>{
            this.totalAmount(this.state.percent)
       })
    }

    totalAmount(go){
        const sliptTotal = this.state.totalBill / this.state.numOfPeople
        let tip
        console.log(this.state.slipTip)
        go? tip = this.state.slipTip : tip = 0
        const total = sliptTotal + tip
        this.setState({
            TotalPerson: total.toFixed(2)
        })
    }


    render(){
        
        return (
            <div className={sty.container}>
                <div>
                    <div>
                        <label>Bill</label>
                        <input type='number' onChange={this.setBill} ref={this.entrada}/>
                    </div>
                    <div>
                        <label>Select Tip %</label>
                        <div className={sty.radioToolbar}>
                            <Percents  
                            bill={this.state.totalBill}
                            persons={this.state.numOfPeople}
                            />                          
                        </div>
                    </div>
                    <div>
                        <label>Number of people</label>
                        <input type='number'
                        onChange={this.changePeople}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Tip Amount $ <span id='sliptTip'></span></p>
                    </div>
                    <div>
                        <p>Total <span>$ {this.state.TotalPerson}</span></p>
                    </div>
                    <div>
                        <button onClick={this.reset}>Reset</button>
                    </div>
                </div>
            </div>
            )
    }
}


export default CalculatorSection