import React from "react";
import './Listing.css';

const Listing=(props)=>{
    return(
        <div className="listing">
            
            <img src={props.img} alt="img" />
            <h5>{props.name}</h5>
            <h5>{props.hour}</h5>
            <h5>{props.price}</h5>
            <button>COPRAR TICKETS</button>
        </div>
    )
}

export default Listing;