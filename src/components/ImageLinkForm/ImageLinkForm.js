import React from "react";
import './ImageLinkForm.css'
const ImageLinkForm = ({onInputChange,onButtonClick}) => {
    return(
        <div>
            <p className="f3">
                {'This magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div style={{display:"flex", justifyContent:"center"}} className="parentdiv">
            <div  className="pa4 pv5 custombg br3 shadow-5" style={{display:"flex", justifyContent:"center"}} >
                {/* w-70 =  width 70% of parent elemen, grow on hover, paddingvertical pv,  ph, displayinlineblock(dib), fontcolor=white*/}
                <input type="text" className="w-70 f4 pa2 center" id="inputbox" onChange={onInputChange}/>
                <button className="ml2 grow w-30 shadow-5 ph3 pv2 dib white" onClick={onButtonClick} >Detect</button>
            </div>
            </div>
        </div>

    )
}

export default ImageLinkForm