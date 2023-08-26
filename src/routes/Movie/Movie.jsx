import { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MovieContext } from '../../context/MovieContext';
import { useForm, Controller } from "react-hook-form";
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import {CardMedia, Typography } from '@mui/material';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const Movie = () => {
  const { id } = useParams();
  const { listings} = useContext(MovieContext);
  const [movies] = listings.filter( (item) => item.id === Number(id));
  console.log("list:",movies);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const[detail, setDetail]=useState([])
  const[cinema]=movies.filter((item)=>item.cinemaShows[i].room);
  
  const onSubmit = (data) => {
    localStorage.setItem('currentUser', JSON.stringify(data))
    setDetail(data)
  }

  return (
    <>
    <Sheet variant="outlined" color="neutral" sx={{ p: 1, textAlign:'center', backgroundColor:'#CCCCCC'}}>
      <h1>{movies.title}</h1>
      </Sheet>
      
    <Grid container spacing={2} sx={{ flexGrow: 1 , padding:'4rem'}}>
      
        {/* {movies.map((id, index) => {
          return (
            <>
              <div className='hex-code-d'>{color}</div>
            
            </>
          );
        })} */}
      <Grid xs={6}>
      <CardMedia component="iframe" src={movies.trailerUrl.replace('.be','be.com/embed')} allow="autoPlay" sx={{ height:'100%'}}/>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={6}>
            <Box
            component='img'
            src={movies.image.url}
            loading='lazy'
            sx={{
              width: '200px',
              height: '300px',
              objectFit: 'cover',
              objectPosition: 'center',
              paddingTop:'20px'
            }}
          />
          </Grid>
          <Grid item xs={6}>
            <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ width:'20em', paddingTop:'20px'}}>
              <TabList>
                <Tab>Sinopsis</Tab>
                <Tab>Datos técnicos</Tab>
              </TabList>
              <TabPanel value={0} >
                {movies.description}
              </TabPanel>
              <TabPanel value={1}>
                <b>Director:</b> {movies.director}
                <br />
                <b>Género:</b> {movies.gender}
              </TabPanel>
             </Tabs>
          </Grid>
        </Grid>
    <Link className='btn-back' to='/'>
      <Button variant='contained' /* startIcon={<TicketIcon />} */ sx={{ width: '100%', borderRadius: 0 }}>
        Volver al inicio
      </Button>
    </Link>
      </Grid>
      <Grid item xs={6}>
      {/* {console.log(movies.cinemaShows[0].room.name)} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          placeholder="Seleccione la animación"
          options={[movies.cinemaShows[0].room.name]}
          sx={{ width: 300}}
          {...register(
            'animation',
            {
              required : 'Debe seleccionar una opcion'
            }
          )
        }
        />
        <br />
          <Autocomplete
            placeholder="Seleccione una sala"
            options={top100Films}
            sx={{ width: 300 }}
            {...register(
              'room',
              {
                required : 'Debe seleccionar una opcion'
              }
            )
          }
          />
        <br />
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
        {...register('hour', {
          required : 'Debe seleccionar una hora'}
      )}
      >
        {[movies.cinemaShows[0].hour].map((value) => (
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
    <br />
        <Input         
          type="text"
          placeholder='Ingrese la cantidad de boletos'
          sx={{ width: 300 }}
          {...register('quantity', {
              required : 'Debe ingresar una cantidad'}
          )
        } />
        <br />
        <Typography level='body-xs'><b>Total:</b> {movies.cinemaShows[0].price }</Typography>
        <br />
        <Button type="submit" 
                  size="md"
                  variant="soft"
                  color="neutral"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}>
                    {/* <img src={filter} alt="" style={{width:'30px'}}/> */}
                      Añadir al carrito</Button>
      </form>
      </Grid>
  
    
    </Grid>

</>
  );
};

export default Movie;
const top100Films = [
  { label: 'Sala 1' },
  { label: 'Sala 2' }
  
];
const animation = [
    { label: '3D' },
    { label: '2D' }
    
  ];