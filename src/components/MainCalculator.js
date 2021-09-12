import React from "react";
import CalculatorSection from "./CalculatorSection";
import style from './MainCalculator.module.css'

class MainCalculator extends React.Component{

    render(){return (
        <div className={style.fondo}>
            <div className={style.text}>
                <span className={style.splitRight}>SPLITTER</span>
                <span className={style.splitLeft}>SPLITTER</span>
            </div>
            <div className={style.contenedor}>
                <div><CalculatorSection/></div>
            </div>
        </div> 
    )}

   
}

export default MainCalculator