import { useState } from 'react'
import { Alert, Box, Snackbar, Typography } from '@mui/material'
import { ControlledInput } from '../ControlledInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ControlledSelect } from '../ControlledSelect'
import { options } from '../../utils/optionsToSelect'
import { uploadMovie } from '../../services/uploadMovie'
import { updateMovie } from '../../services/updateMovie'
import { ColorButton } from '../ColorButton'

const movieSchema = yup.object({
  title: yup.string()
    .min(3, 'El título no debe tener menos de 3 caracteres')
    .max(50, 'El título no debe tener más de 50 caracteres')
    .required('El título es obligatorio'),
  director: yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'El nombre del director no debe contener numeros')
    .min(3, 'El director no debe tener menos de 3 caracteres')
    .max(50, 'El director no debe tener más de 50 caracteres')
    .required('El director es obligatorio'),
  trailerUrl: yup.string()
    .url('La url del trailer no es válida')
    .required('La url del trailer es obligatoria'),
  gender: yup.string().required('El género es obligatorio'),
  description: yup.string()
    .required('La descripción es obligatoria')
    .min(10, 'La descripción no debe tener menos de 10 caracteres')
    .max(255, 'La descripción no debe tener más de 255 caracteres')
}).required()

export const UploadMovieForm = (props) => {
  const { imageId, handleNext, movie } = props

  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(movieSchema),
    defaultValues: {
      title: movie !== undefined ? movie.title : '',
      director: movie !== undefined ? movie.director : '',
      trailerUrl: movie !== undefined ? movie.trailerUrl : '',
      gender: movie !== undefined ? movie.gender : '',
      description: movie !== undefined ? movie.description : ''
    },
    mode: 'onChange'
  })

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  const onSubmit = data => {
    setIsLoading(true)
    if (movie !== undefined) {
      updateMovie(movie.id, { ...data, imageId })
        .then(() => {
          setAlert({
            open: true,
            type: 'success',
            message: 'Película editada correctamente.'
          })
          handleNext()
        })
        .catch(error => { console.log({ error }) })
        .finally(() => setIsLoading(false))
    } else {
      uploadMovie({ ...data, imageId })
        .then(() => {
          setAlert({
            open: true,
            type: 'success',
            message: 'Película cargada correctamente.'
          })
          handleNext()
        })
        .catch(error => { console.log({ error }) })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: { xs: '90%', sm: '50%', lg: '40%' },
        mx: 'auto',
        mt: '4rem'
      }}
    >
      <Typography
        component='h1'
        variant='h1'
        sx={{
          fontWeight: 'bold',
          mb: '2rem',
          textAlign: 'center',
          fontSize: '2rem'
        }}
      >
        {movie !== undefined ? 'Editar película' : 'Cargar película'}
      </Typography>
      <ControlledInput
        control={control}
        label='Nombre'
        name='title'
        autoFocus
        sx={{ mb: '1rem' }}
      />
      <ControlledInput
        control={control}
        label='Director'
        name='director'
        autoFocus
        sx={{ mb: '1rem' }}
      />
      <ControlledInput
        control={control}
        label='Trailer url'
        name='trailerUrl'
        autoFocus
        sx={{ mb: '1rem' }}
      />
      <ControlledSelect
        control={control}
        label='Género'
        name='gender'
        autoFocus
        sx={{ mb: '1rem' }}
        options={options}
      />
      <ControlledInput
        control={control}
        label='Descripción'
        name='description'
        multiline
        rows={4}
        sx={{ mb: '1rem' }}
      />
      <ColorButton
        variant='contained'
        size='large'
        type='submit'
        disabled={isLoading}
        sx={{ textTransform: 'initial', width: '100%', mb: '1rem', fontSize: '1rem' }}
      >
        {isLoading ? 'Guardando...' : 'Guardar'}
      </ColorButton>
      <Snackbar open={alert?.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity={alert?.type}
          sx={{ width: '100%' }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </Box>

  )
}
