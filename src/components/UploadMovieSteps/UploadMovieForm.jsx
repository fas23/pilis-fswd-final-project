import { useState } from 'react'
import { Alert, Box, Button, Snackbar, Typography } from '@mui/material'
import { ControlledInput } from '../ControlledInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ControlledSelect } from '../ControlledSelect'
import { options } from '../../utils/optionsToSelect'
import { uploadMovie } from '../../services/uploadMovie'

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
  const { imageId, handleNext } = props

  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(movieSchema),
    defaultValues: {
      title: '',
      director: '',
      trailerUrl: '',
      gender: '',
      description: ''
    },
    mode: 'onChange'
  })

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  const onSubmit = data => {
    setIsLoading(true)
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
        Carga de datos para nueva película
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
      <Button
        variant='contained'
        size='large'
        type='submit'
        disabled={isLoading}
        sx={{ textTransform: 'initial', width: '100%', mb: '1rem', fontSize: '1rem' }}
      >
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
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
