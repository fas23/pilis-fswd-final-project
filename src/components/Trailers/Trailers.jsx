import React, {useState} from "react";
import Trailer from "./Trailer";

const Trailers=()=>{
    const [trailers, setTrailers]=useState([
        {
           id: 1,
           name: 'Megalodon',
           link: 'https://www.youtube.com/embed/uzrF5lgiwKY' 
        },
        {
            id: 2,
            name: 'Barbie',
            link: 'https://www.youtube.com/embed/zh4KhVSMwtQ' 
         },
        {
            id: 3,
            name: 'Elemento',
            link: 'https://www.youtube.com/embed/MgzHRIeaOL8' 
         }
    ]);
    return(
         <div>
            {trailers.map((trailer)=>{
                return <Trailer key={trailer.id} name={trailer.name} link={trailer.link}/>
            })}
        </div> 
    );
};

export default Trailers;