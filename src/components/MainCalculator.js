import React from "react";
import CalculatorSection from "./CalculatorSection";
import style from './MainCalculator.module.css'

class MainCalculator extends React.Component{

    render(){return (
        <div className={style.fondo}>
            <h1  className={style.text}>SPLITTER</h1>
            <div className={style.contenedor}>
                <div><CalculatorSection/></div>
            </div>
        </div> 
    )}

   
}

export default MainCalculator