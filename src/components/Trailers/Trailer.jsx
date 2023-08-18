import React from "react";
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import ListItemContent from '@mui/joy/ListItemContent';
import IconButton from '@mui/joy/IconButton';
import './Trailer.css' 


const Trailer=(props)=>{
    return(
        <div className="trailer">
          <Box sx={{ width: 320 }}>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
        <ListItem >
 
          <ListItemDecorator>
             <AspectRatio minHeight="220px" maxHeight="300px">
                <img src={props.img} srcSet={props.img} loading="lazy" alt=""/>          
              </AspectRatio>
          </ListItemDecorator> 
          <ListItemContent>
          <IconButton variant="plain">
 
</IconButton>
            <Typography level="title-md">{props.name}</Typography>
            <Typography level="body-sm">{props.description}.</Typography>
          </ListItemContent>
          
        </ListItem>
      </List>
    </Box>
            
            {/* <YouTube videoId={props.link}/> */}
            {/* <a href={props.link}></a> */}
            {/* <video src={props.link}></video> 
            <iframe src={props.link} ></iframe>*/}
     </div>
    );
}
export default Trailer;