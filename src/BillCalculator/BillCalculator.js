import React from "react";
import sty from './BillCalculator.module.css'
import CalculatorSection from '../components/CalculatorSection';

class BillCalculator extends React.Component{
    render(){
        return(
            <div className={sty.fondo}>
                <h1  className={sty.text}>SPLITTER</h1>
                <div className={sty.contenedor}>
                    <div><CalculatorSection/></div>
                </div>
            </div>        
        )
    }

}
export default BillCalculator