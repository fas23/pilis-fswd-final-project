import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { MovieContext } from '../../context/MovieContext';
import Carousel from 'react-material-ui-carousel'
import Sheet from '@mui/joy/Sheet';
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Paper, Button } from '@mui/material'

const CarouselHora=()=>{
    const { id } = useParams();
  const { listings} = useContext(MovieContext);
  const [movies] = listings.filter( (item) => item.id === Number(id));
  //filtra las horas
  const [horas, setHoras]=useState([])
  useEffect(() => {
    setHoras(...horas, movies.cinemaShows.map((item)=>item.hour));    
  }, []);

    return (
        <Carousel>
            {
                horas.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}
export default CarouselHora

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item}</h2>
            <RadioGroup
            aria-label="platform"
            defaultValue="Website"
            overlay
            name="platform"
            sx={{
              flexDirection: 'row',
              gap: 2,
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  inset: -1,
                  border: '3px solid',
                  borderColor: 'primary.500',
                },
              },
              [`& .${radioClasses.radio}`]: {
                display: 'contents',
                '& > svg': {
                  zIndex: 2,
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  bgcolor: 'background.surface',
                  borderRadius: '50%',
                },
              },
            }}
            /* {...register('hour', {
              required : 'Debe seleccionar una hora'}
          )} */
          >
            {[props].map((value) => (
              <Sheet
                key={value}
                variant="outlined"
                sx={{
                  borderRadius: 'md',
                  boxShadow: 'sm',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 2,
                  minWidth: 120,
                }}
                >
                <Radio id={value} value={value} checkedIcon={<CheckCircleRoundedIcon />} />
                
                <FormLabel htmlFor={value}>{value} Hrs</FormLabel>
              </Sheet>
            ))}
          </RadioGroup>
        </Paper>
    )
}