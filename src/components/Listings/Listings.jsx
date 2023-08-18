import React, {useState} from "react";
import Listing from "./Listing";
import './Listings.css';

const Listings=()=>{
    const [listings, setListings]=useState([
        {
           id: 1,
           name: 'Megalodon',
           img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
           hour: 20.30,
           price: 900
        },
        {
            id: 2,
            name: 'Barbie',
            img: 'https://images.bonanzastatic.com/afu/images/ab36/5c65/7059_11974648131/__57.jpg',
            hour: 20.30,
            price: 900
         },
        {
            id: 3,
            name: 'Elemento',
            img: 'https://th.bing.com/th/id/OIP.4V0ocXh4Iwx1B6Nbi4JGYAHaEL?pid=ImgDet&rs=1',
            hour: 20.30,
            price: 900
         },
         {
            id: 4,
            name: 'Megalodon',
            img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
            hour: 20.30,
            price: 900
         }/* ,
         {
            id: 5,
            name: 'Megalodon',
            img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
            hour: 20.30,
            price: 900
         },
         {
            id: 6,
            name: 'Megalodon',
            img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
            hour: 20.30,
            price: 900
         },
         {
            id: 7,
            name: 'Megalodon',
            img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
            hour: 20.30,
            price: 900
         },
         {
            id: 8,
            name: 'Megalodon',
            img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
            hour: 20.30,
            price: 900
         },
         {
            id: 9,
            name: 'Megalodon',
            img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
            hour: 20.30,
            price: 900
         },
         {
            id: 10,
            name: 'Megalodon',
            img: 'https://th.bing.com/th/id/OIP.MegsP9H-NNgTiv9WkQQiIQHaJ4?pid=ImgDet&w=899&h=1200&rs=1',
            hour: 20.30,
            price: 900
         }  */
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