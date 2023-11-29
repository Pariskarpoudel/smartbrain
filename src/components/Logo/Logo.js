import React from "react";
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import brain from './brain.png'  // brain will  be the default name given to the img
const Logo = () => {
    return(
        <div className="pa3 pl5" style={{border:"none"}}>
        <Tilt className="Tilt shadow-5" style={{height:"135px",width:"135px" }} tiltMaxAngleX={45} tiltMaxAngleY={45} scale={1.2} transitionSpeed={2000}>
            <div className="ma4 mt0">
                <img src={brain} alt="logo" style={{paddingTop: '31px'}}/>
            </div>  
        </Tilt>
        </div>

    )
}
// mt0  means margintop 0
export default Logo