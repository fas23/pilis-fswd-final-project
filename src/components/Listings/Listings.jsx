import React, {useState} from "react";
import Listing from "./Listing";

const Listings=()=>{
    const [listings, setListings]=useState([
        {
           id: 1,
           name: 'Megalodon',
           img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
           hour: 2030,
           price: 900
        },
        {
            id: 2,
            name: 'Barbie',
            img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
            hour: 2030,
            price: 900
         },
        {
            id: 3,
            name: 'Elemento',
            img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
            hour: 2030,
            price: 900
         }
    ]);
    return(
         <div className="listings">
            {listings.map((listing)=>{
                return <Listing key={listing.id} name={listing.name} img={listing.img} hour={listing.hour} price={listing.price}/>
            })}
        </div> 
    );
};

export default Listings;