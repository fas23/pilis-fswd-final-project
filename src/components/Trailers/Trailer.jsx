import React from "react";
/* import './Trailer.css' */


const Trailer=(props)=>{
    return(
        <div className="trailer">
            
            <h5>{props.name}</h5>
            {/* <YouTube videoId={props.link}/> */}
            {/* <a href={props.link}></a> */}
            {/* <video src={props.link}></video> */}
            <iframe src={props.link} allowfullscreen></iframe>
        </div>
    )
}
export default Trailer;