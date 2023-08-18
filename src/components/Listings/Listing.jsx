import React from "react";
import './Listing.css';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import price from '../../assets/icons/price.svg'
import ticket from '../../assets/icons/ticket.svg'
import clock from '../../assets/icons/clock.svg'

const Listing=(props)=>{
    return(
        <div className="listing">
        <Card variant="outlined" sx={{ width: 320 }}>
        
        <AspectRatio minHeight="320px" maxHeight="400px">
          <img src={props.img} srcSet={props.img} loading="lazy" alt="pelicula"/>          
        </AspectRatio>

        <CardContent orientation="horizontal">
          <div className="lista">
            <Typography level="title-lg">{props.name}</Typography>
            <Typography level="body-xs">Duración:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
            <img src={clock} alt="" style={{width:'30px'}}/>
            {props.hour}
            </Typography>
            <Typography level="body-xs">Precio:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
            <img src={price} alt="" style={{width:'30px'}}/>
            {props.price}
            </Typography>
            
          </div>
        </CardContent>
          
          <Button
            variant="soft"
            size="md"
            color="neutral"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          >
            <img src={ticket} alt="" style={{width:'30px'}}/>
            COMPRAR TICKETS
          </Button>
      </Card>
        </div> 
    )
}

export default Listing;