import React from "react";
import './FaceRecognizer.css'

const FaceRecognizer = ({imageurl, boxes}) => {
    return(
       <div style={{display:"flex",  justifyContent: "center"}} className="ma2">
        <div style={{position: "relative"}}>
        <img src={imageurl} id="inputimage" alt="" width='500px' height='auto'/> 
        {/* esari auta chijlai auto diyesi dami hunxa, width anusar image nafatni gari height adjust garxa  */}
        {boxes.map((item)=>{
            return(<div className="bounding-box" style={{left: item.leftCol, top: item.topRow, right: item.rightCol, bottom: item.bottomRow}}></div>)
        })}
        {/* relative garaepar laskarai hunthyo, image paxi div hunthyo
        absolute garayesi, comes out of the flow , ani esko lagi space ni xuttako hunna, wrt parent, positions dini aba , overlap gardinxa aru kuralai  */}
        </div>
        {/* clarifai ma boundry box kasari dekhaxa , inspect garera same style chor  */}
       </div>

    )
}

export default FaceRecognizer