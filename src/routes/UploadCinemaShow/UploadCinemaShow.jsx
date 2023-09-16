import { Alert, Backdrop, Box, Button, Card, CardMedia, CircularProgress, Snackbar, Typography } from '@mui/material'
import { ControlledInput } from '../../components/ControlledInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { getHalls } from '../../services/halls'
import { ControlledSelect } from '../../components/ControlledSelect'
import { DateTimePickerValue } from '../../components/DateTimePickerValue'
import { useLocation, useNavigate } from 'react-router-dom'
import { uploadCinemaShow } from '../../services/uploadCinemaShow'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { updateCinemaShow } from '../../services/updateCinemaShow'

const cinemaShowSchema = yup.object({
  price: yup.string()
    .trim()
    .matches(/^\d+$/, 'Debe ser un número')
    .test('min', 'El valor mínimo permitido es 10', (value) => {
      const parsedValue = parseInt(value, 10)
      return !isNaN(parsedValue) && parsedValue >= 10
    })
    .test('max', 'El valor máximo permitido es 9999', (value) => {
      const parsedValue = parseInt(value, 10)
      return !isNaN(parsedValue) && parsedValue <= 9999
    })
    .required('Este campo es obligatorio'),
  dateTime: yup.string().required('Este campo es obligatorio'),
  hall: yup.string().required('La sala es obligatoria')

}).required()

export const UploadCinemaShow = () => {
  const [halls, setHalls] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showBackdrop, setShowBackdrop] = useState(false)
  const [alert, setAlert] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  const { movie } = location.state

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  useEffect(() => {
    setShowBackdrop(true)
    getHalls()
      .then(({ data }) => {
        const formattedHalls = data.response.map(({ name, id }) => {
          return { value: id, label: name }
        })
        setHalls(formattedHalls)
      })
      .catch(err => console.log(err))
      .finally(() => setShowBackdrop(false))
  }, [])

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(cinemaShowSchema),
    defaultValues: {
      price: location.state.cinemaShow !== undefined ? location.state.cinemaShow.price : 10,
      hall: location.state.cinemaShow !== undefined ? location.state.cinemaShow.room.id : '',
      dateTime: location.state.cinemaShow !== undefined ? dayjs(`${location.state.cinemaShow.date} ${location.state.cinemaShow.hour}:${location.state.cinemaShow.minutes}`).format('YYYY/MM/DD HH:mm') : ''
    },
    mode: 'onChange'
  })

  const onSubmit = data => {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const { price, hall, dateTime } = data

    const hour = dayjs(dateTime).tz('America/Argentina/Buenos_Aires').format('HH')
    const minutes = dayjs(dateTime).format('mm')
    const formattedDate = dayjs(dateTime).format('YYYY-MM-DD')

    const formattedData = {
      date: formattedDate,
      hour: Number(hour),
      minutes: Number(minutes),
      price: Number(price),
      roomId: Number(hall),
      movieId: movie.movieId
    }

    setIsLoading(true)

    if (location.state.cinemaShow !== undefined) {
      console.log({ formattedData })
      const id = location.state.cinemaShow.id

      updateCinemaShow(id, formattedData)
        .then((data) => {
          console.log({ data })
          navigate('/available-movies')
        })
        .catch(error => {
          const { response: { data } } = error

          if (data.message === '"hour" must be greater than or equal to 9') {
            setAlert({
              open: true,
              type: 'error',
              message: 'La hora debe ser mayor o igual a 9'
            })
          }

          if (data.message === '"hour" must be less than or equal to 22') {
            setAlert({
              open: true,
              type: 'error',
              message: 'La hora debe ser menor o igual a 22'
            })
          }

          if (data.message === 'Cinema show already exists') {
            setAlert({
              open: true,
              type: 'error',
              message: 'Ya existe una función con esa fecha y hora'
            })
          }

          if (data.message === 'The difference between functions must be at least 3 hours.') {
            setAlert({
              open: true,
              type: 'error',
              message: 'La diferencia entre las funciones debe ser mayor o igual a 3 horas'
            })
          }
        })
        .finally(() => setIsLoading(false))
    } else {
      uploadCinemaShow(formattedData)
        .then((data) => {
          console.log({ data })
          navigate('/available-movies')
        })
        .catch((error) => {
          const { response: { data } } = error

          if (data.message === '"hour" must be greater than or equal to 9') {
            setAlert({
              open: true,
              type: 'error',
              message: 'La hora debe ser mayor o igual a 9'
            })
          }

          if (data.message === '"hour" must be less than or equal to 22') {
            setAlert({
              open: true,
              type: 'error',
              message: 'La hora debe ser menor o igual a 22'
            })
          }

          if (data.message === 'Cinema show already exists') {
            setAlert({
              open: true,
              type: 'error',
              message: 'Ya existe una función con esa fecha y hora'
            })
          }

          if (data.message === 'The difference between functions must be at least 3 hours.') {
            setAlert({
              open: true,
              type: 'error',
              message: 'La diferencia entre las funciones debe ser mayor o igual a 3 horas'
            })
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Box>
        <Typography
          component='h1'
          variant='h1'
          sx={{
            fontWeight: 'bold',
            mb: '2rem',
            textAlign: 'center',
            fontSize: '2rem'
          }}
        >Carga datos de la función
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: { xs: '90%', sm: '50%', lg: '20%' },
              alignSelf: 'center'
            }}
          >

            <ControlledInput
              control={control}
              label='Precio'
              name='price'
              autoFocus
              type='number'
              sx={{ mb: '1rem' }}
            />
            <ControlledSelect
              control={control}
              label='Salas'
              name='hall'
              autoFocus
              sx={{ mb: '1rem' }}
              options={halls}
            />
            <DateTimePickerValue
              control={control}
              label='Fecha y hora'
              name='dateTime'
            />
            <Button
              variant='contained'
              size='large'
              type='submit'
              disabled={isLoading}
              sx={{ textTransform: 'initial', width: '100%', mb: '1rem', fontSize: '1rem', marginTop: '1rem' }}
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </Box>
          <Card>
            <CardMedia
              sx={{ height: 350, width: 200 }}
              image={movie.imageUrl}
              title={movie.title}
            />
          </Card>
        </Box>
      </Box>
      <Snackbar open={alert?.open}>
        <Alert
          onClose={handleCloseAlert}
          severity={alert?.type}
          sx={{ width: '100%' }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </>
  )
}
