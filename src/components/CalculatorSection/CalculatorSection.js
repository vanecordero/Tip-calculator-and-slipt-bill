import React from "react";
import sty from './CalculatorSection.module.css'
import Percents from "./Percents/Percents";

class CalculatorSection extends React.Component{

    constructor(){
        super()

        const METHODS = [
            'setBill',
            'setPercent',
            'reset',
            'changePeople'
        ]
        METHODS.forEach((methods)=>{
            this[methods] = this[methods].bind(this)
        })
        this.entrada = React.createRef()

        this.state={
            TipAmount: 0.00,
            totalBill: 0.00,
            percent: false,
            radioValue:'',
            numOfPeople: 1,
            TotalPerson:0
        }

    }

    setBill(e){
        this.setState({
            totalBill: e.target.value
        },()=>{
            this.totalAmount(this.state.percent)
        })
    }

    setPercent(e){
        console.log('setPErcent')
    /*    const value = e.target.value
        if(e.target.checked && this.state.radioValue !== value){
            console.log('Dio true')
            this.setState({
                percent:true,
                radioValue:value
            },()=>{
                this.calculatePercent(value,true)
            })
        }else if(e.target.checked && this.state.radioValue === e.target.value){
            console.log('Dio falso')
            e.target.checked = false;
            this.setState({
                percent:false,
                radioValue:''
            },()=>{
                this.calculatePercent(value,false)
            })
        }   */
    }

    calculatePercent(value, go){
        const totalPe = parseInt(this.state.numOfPeople)
        let percent
        go ? percent = parseFloat(value) : percent = 0
        const tip = parseFloat(this.state.totalBill) * (percent/100)
        const tipAmount = tip / totalPe
        this.setState({
            TipAmount: tipAmount
        })
    }

    reset(){
        this.entrada.current.value = ''
        this.setState({
            TipAmount: 0.00,
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
        console.log(this.state.TipAmount)
        go? tip = this.state.TipAmount : tip = 0
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
                        <Percents onClick={this.setPercent}/>
                           {/* <input type="radio" value='5' name='percent' id='fivePer'
                            onClick={this.setPercent}
                            />
                            <label htmlFor='fivePer'>5%</label>

                            <input type="radio" value='10' name='percent' id='tenPerc'
                            onClick={this.setPercent}/>
                            <label htmlFor='tenPerc'>10%</label>

                            <input type="radio" value='15' name='percent' id='fivtePerc'
                            onClick={this.setPercent}/>
                            <label htmlFor='fivtePerc'>15%</label>

                            <input type="radio" value='25' name='percent' id='twnfivPerc'
                            onClick={this.setPercent}/>
                            <label htmlFor='twnfivPerc'>25%</label>

                            <input type="radio" value='50' name='percent' id='fifPerc'
                            onClick={this.setPercent}/>
        <label htmlFor='fifPerc'>50%</label>*/}

                            <input type='number' onChange={this.setPercent} placeholder='Custom' className={`${sty.customPercent} ${sty.hideArrow}`}/>
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
                        <p>Tip Amount <span>$ {this.state.TipAmount}</span></p>
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