import React from "react";
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import './Trailer.css';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';
import play from '../../assets/icons/play.svg'

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

const Trailer=(props)=>{
    return(
      <div className="trailer">
         <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" />}
        spacing={2}
        justifyContent="center"
      >
        <Item>
        <img src={props.img} srcSet={props.img} loading="lazy" alt="" style={{width:'100px', height:'150px', borderRadius:'5px'}}/>
        </Item>
        <Item>
          <h5>{props.name}</h5>
          {props.description}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <IconButton variant="plain">
            <Link href={props.link} ><img src={play} alt="" style={{width:'30px'}}/></Link>
            </IconButton>
         </Box>
        </Item>
      </Stack>
    </Box>
     </div>
    );
}
export default Trailer;