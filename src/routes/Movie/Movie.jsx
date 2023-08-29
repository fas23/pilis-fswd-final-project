import { useContext, useState, useEffect, version } from 'react';
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
import Carousel from 'react-material-ui-carousel'
import CarouselHora from '../../components/CarouselMovie/CarouselHora'
import { array } from 'yup';
const Movie = () => {
  const { id } = useParams();
  const { listings} = useContext(MovieContext);
  const [movies] = listings.filter( (item) => item.id === Number(id));
  console.log("list:",movies);

  const { register, handleSubmit, formState: { errors } } = useForm();

  //Lista de salas diponibles por pelicula   const uniqueRooms=['Estelar','Solaz']
  

  const [value, setValue] = useState('');
  console.log("campturado",value);

  //filtra las fechas
  const [fechas, setFechas]=useState([]);
  const [horas, setHoras]=useState([]);
  console.log("Fechas",fechas)
  let uniqueFechas = [...new Set(fechas)]; 
  console.log("uniqueFechas",uniqueFechas)
  
  const [inputValue, setInputValue] = useState('');
  
  
  const handleSelected=(event, newValue) => {
    console.log("value", newValue)
    /* const valorSet = event.target.newValue; */
    setValue(newValue);
    setFechas(movies.cinemaShows.filter((item)=>item.room.name===newValue.label).map((item)=>item.date))
  }
  //filtra las horas
  
  const [selectedValue, setSelectedValue] = useState('a');
  console.log("campturadoFecha",selectedValue);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setHoras(movies.cinemaShows.filter((item)=>item.date==event.target.value && item.room.name===value.label).map((item)=>item.hour));
  };
  
  console.log("horas",horas)

  const totalPrice= movies.cinemaShows.reduce((acc, item)=>acc+item.price,0);
  
  const[cart, setCart]=useState([])
  const onSubmit = (data) => {
    localStorage.setItem('addCart', JSON.stringify(data))
    setCart(data)
  }

  return (
    <>
    <Sheet variant="outlined" color="neutral" sx={{ p: 1, textAlign:'center', backgroundColor:'#CCCCCC'}}>
      <h1>{movies.title}</h1>
      </Sheet>
      
    <Grid container spacing={2} sx={{ flexGrow: 1 , padding:'4rem'}}>
      <Grid item="true" xs={6}>
        <CardMedia component="iframe" src={movies.trailerUrl.replace('.be','be.com/embed')} allow="autoPlay" sx={{ height:'100%'}}/>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item="true" xs={6}>
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
          <Grid item="true" xs={6}>
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
      <Grid item="true" xs={6}>
        {/* {console.log(movies.cinemaShows[0].room.name)} */}
        <form onSubmit={handleSubmit(onSubmit)}>
         
          <Autocomplete
          placeholder="Seleccione la animación"
          /* value={value} */
          options={uniqueRooms}
          onChange={handleSelected}
          /* inputValue={inputValue} 
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}*/
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='disableClearable' variant='standard' />}
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
            
            {uniqueFechas.map((value) => (
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
                <Radio id={value} value={value} onChange={handleChange} checkedIcon={<CheckCircleRoundedIcon />} />
                
                <FormLabel htmlFor={value}>{value}</FormLabel>
              </Sheet>
            ))}
          </RadioGroup>
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
            {horas.map((value) => (
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
          <Typography level='body-xs'><b>Subtotal:</b> {totalPrice}</Typography>
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

const uniqueRooms = [
  { label: 'Estelar' },
  { label: 'Solaz' }
  
]; 
console.log("rooms",uniqueRooms); 
const animation = [
    { label: '3D' },
    { label: '2D' }
    
  ];