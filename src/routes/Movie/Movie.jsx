import { useContext, useState, useEffect, version } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MovieContext } from '../../context/MovieContext'
import { CartContext } from '../../context/CartContext'
import { useForm, Controller } from 'react-hook-form'
import Grid from '@mui/joy/Grid'
import Box from '@mui/joy/Box'
import Autocomplete from '@mui/joy/Autocomplete'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import Sheet from '@mui/joy/Sheet'
import { CardMedia, Typography } from '@mui/material'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import FormLabel from '@mui/joy/FormLabel'
import Radio, { radioClasses } from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

const Movie = () => {
  const { id } = useParams()
  const { listings } = useContext(MovieContext)
  const { cart, setCart } = useContext(CartContext)
  const [movies] = listings.filter((item) => item.id === Number(id))
  console.log('list:', movies)
  const navigate = useNavigate()
  
  // Lista de salas diponibles por pelicula   const uniqueRooms=['Estelar','Solaz']
  const [roomSelected, setRoomSelected] = useState('')

  // filtra las fechas
  const [fechas, setFechas] = useState([])
  const uniqueFechas = [...new Set(fechas)]
  const handleSelected = (event, newValue) => {
    setRoomSelected(newValue)
    setFechas(movies.cinemaShows.filter((item) => item.room.name === newValue).map((item) => item.date))
  }
  // filtra las horas
  const [horas, setHoras] = useState([])
  const [fechaSelected, setFechasSelected] = useState('a')
  console.log('campturadoFecha', fechaSelected)

  const handleChangeFecha = (event) => {
    setFechasSelected(event.target.value)
    setHoras(movies.cinemaShows.filter((item) => item.date == event.target.value && item.room.name === roomSelected).map((item) => item.hour))
  }

  const [horaSelected, setHoraSelected] = useState('a')
  console.log('campturadoHora', horaSelected)

  const handleChangeHora = (event) => {
    setHoraSelected(event.target.value)
  }

  /* const[available, setAvailable]=useState(' ') */
  const [available] = movies.cinemaShows.filter((item) => item.hour === horaSelected).map((item) => item.capacityAvailable)
  console.log('cantidadDisponible', available)
  // precio por rooms
  const [priceOn] = movies.cinemaShows.filter((item) => item.room.name === roomSelected).map((item) => item.price)
  // cantidad de boletos
  const [quantity, setQuantity] = useState('')
  const quantityAsNumber = Number(quantity)
  // control de cantidad de boletos segun disponibilidad

  // precio total
  const totalPrice = quantityAsNumber == 0 ? priceOn : priceOn * quantityAsNumber
  //id de cinemaShow
  const [cinemaShowId]= movies.cinemaShows.filter((item) => item.date === fechaSelected && item.room.name==roomSelected).map((item) => item.id);
  console.log('id',cinemaShowId)

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data) => {
    console.log('datoStorage', data);
    
    const moviesCart = {
      id:crypto.randomUUID(),
      cinemaShowId:cinemaShowId,
      image:movies.image.url,
      room: roomSelected,
      name:movies.title,
      date: data.date,
      hour: data.hour,
      quantity: data.quantity,
      price:priceOn,
      total:totalPrice
    }
    window.localStorage.setItem('addCart', JSON.stringify([...cart, moviesCart]))
    setCart([...cart, moviesCart])
    
    navigate('/cart')
  }

  return (
    <>
      <Sheet variant='outlined' color='neutral' sx={{ p: 1, textAlign: 'center', backgroundColor: '#CCCCCC' }}>
        <h1>{movies.title}</h1>
      </Sheet>

      <Grid container spacing={2} sx={{ flexGrow: 1, padding: '4rem' }}>
        <Grid item='true' xs={6}>
          <CardMedia component='iframe' src={movies.trailerUrl.replace('.be', 'be.com/embed')} allow='autoPlay' sx={{ height: '100%' }} />
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid item='true' xs={6}>
              <Box
                component='img'
                src={movies.image.url}
                loading='lazy'
                sx={{
                  width: '200px',
                  height: '300px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  paddingTop: '20px'
                }}
              />
            </Grid>
            <Grid item='true' xs={6}>
              <Tabs aria-label='Basic tabs' defaultValue={0} sx={{ width: '20em', paddingTop: '20px' }}>
                <TabList>
                  <Tab>Sinopsis</Tab>
                  <Tab>Datos técnicos</Tab>
                </TabList>
                <TabPanel value={0}>
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
            <Button variant='contained' sx={{ width: '100%', borderRadius: 0 }}>
              Volver al inicio
            </Button>
          </Link>
        </Grid>
        <Grid item='true' xs={6}>
          {/* {console.log(movies.cinemaShows[0].room.name)} */}
          <form onSubmit={handleSubmit(onSubmit)}>

            <Autocomplete
              placeholder='Seleccione la animación'
              // value={value}
              options={uniqueRooms}
              onChange={handleSelected}
              style={{ width: 300 }}
              /* {...register('animation', { required: 'Debe seleccionar una animación' }
              )} */
            />
            <br />
            <RadioGroup
              aria-label='platform1'
              overlay
              name='platform1'
              sx={{
                flexDirection: 'row',
                gap: 2,
                [`& .${radioClasses.checked}`]: {
                  [`& .${radioClasses.action}`]: {
                    inset: -1,
                    border: '3px solid',
                    borderColor: 'primary.500'
                  }
                },
                [`& .${radioClasses.radio}`]: {
                  display: 'contents',
                  '& > svg': {
                    zIndex: 2,
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    bgcolor: 'background.surface',
                    borderRadius: '50%'
                  }
                }
              }}
              {...register('date', { required: 'Debe seleccionar una fecha' }
              )}
            >

              {uniqueFechas.map((value) => (
                <Sheet
                  key={value}
                  variant='outlined'
                  sx={{
                    borderRadius: 'md',
                    boxShadow: 'sm',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 2,
                    minWidth: 120
                  }}
                >
                  <Radio id={value} value={value} onChange={handleChangeFecha} checkedIcon={<CheckCircleRoundedIcon />} />

                  <FormLabel htmlFor={value}>{value}</FormLabel>
                </Sheet>
              ))}
            </RadioGroup>
            <br />

            <RadioGroup
              aria-label='platform2'
              overlay
              name='platform2'
              sx={{
                flexDirection: 'row',
                gap: 2,
                [`& .${radioClasses.checked}`]: {
                  [`& .${radioClasses.action}`]: {
                    inset: -1,
                    border: '3px solid',
                    borderColor: 'primary.500'
                  }
                },
                [`& .${radioClasses.radio}`]: {
                  display: 'contents',
                  '& > svg': {
                    zIndex: 2,
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    bgcolor: 'background.surface',
                    borderRadius: '50%'
                  }
                }
              }}
              {...register('hour', { required: 'Debe seleccionar una hora' }
              )}
            >
              {horas.map((value) => (
                <Sheet
                  key={value}
                  variant='outlined'
                  sx={{
                    borderRadius: 'md',
                    boxShadow: 'sm',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 2,
                    minWidth: 120
                  }}
                >
                  <Radio id={value.toString()} value={value} onChange={handleChangeHora} checkedIcon={<CheckCircleRoundedIcon />} />

                  <FormLabel htmlFor={value}>{value} Hrs</FormLabel>
                </Sheet>
              ))}
            </RadioGroup>

            <br />

            <Input
              type='number'
              placeholder='Ingrese la cantidad de boletos'
            /* value={price}  */
              max={available}
              onInput={e => { setQuantity(e.target.value); console.log('cantidad', quantity) }}
              sx={{ width: 300 }}
              {...register('quantity', { required: 'Debe ingresar una cantidad' }
              )
          }
            />
            <br />
            <Typography level='body-xs'><b>Subtotal: $</b> {totalPrice}</Typography>
            <br />
            {/* <Link className='btn-see-more' to={`/cart/${id}`}> */}

            <Button
              type='submit' size='md' variant='soft' color='neutral' aria-label='Explore Bahamas Islands'
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            >
              {/* <img src={filter} alt="" style={{width:'30px'}}/> */}
              Añadir al carrito
            </Button>
            {/* </Link> */}

          </form>
        </Grid>

      </Grid>

    </>
  )
}

export default Movie

const uniqueRooms = [
  'Estelar',
  'Solaz'
]
console.log('rooms', uniqueRooms)
const animation = [
  { label: '3D' },
  { label: '2D' }

]
