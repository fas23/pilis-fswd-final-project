import React, {useState} from "react";
import Trailer from "./Trailer";

const Trailers=()=>{
    const [trailers, setTrailers]=useState([
        {
           id: 1,
           name: 'Megalodon',
           link: 'https://www.youtube.com/embed/uzrF5lgiwKY',
           img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
           description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' 
        },
        {
            id: 2,
            name: 'Barbie',
            link: 'https://www.youtube.com/embed/zh4KhVSMwtQ',            
           img: 'https://images.bonanzastatic.com/afu/images/ab36/5c65/7059_11974648131/__57.jpg',
           description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' 
         },
        {
            id: 3,
            name: 'Elemento',
            link: 'https://www.youtube.com/embed/MgzHRIeaOL8',            
           img: 'https://th.bing.com/th/id/OIP.4V0ocXh4Iwx1B6Nbi4JGYAHaEL?pid=ImgDet&rs=1 ',
           description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' 
         }
    ]);
    return(
         <div>
            {trailers.map((trailer)=>{
                return <Trailer key={trailer.id} name={trailer.name} link={trailer.link} img={trailer.img} description={trailer.description}/>
            })}
        </div> 
    );
};

export default Trailers;