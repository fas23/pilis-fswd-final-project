import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
// import img from '../../assets/img/palomitas.png'
// import { lightBlue } from '@mui/material/colors'
import loginService from '../../services/login'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert } from '@mui/material'

const defaultTheme = createTheme()

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setEmail(data.email)
      setPassword(data.password)
      console.log(data)
      const user = await loginService.login({
        email,
        password
      })
      console.log(user)
      // const { email } = user
      window.localStorage.setItem('currentUser', JSON.stringify(user.user.email))
      navigate('/')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Usuario o Contraseña incorrectos')
      } else if (err.response?.status === 401) {
        setErrMsg('Sin Autorización')
      } else {
        setErrMsg('Login Failed')
      }
      console.log(err)
    }
  }

  // const onSubmit = (data) => console.log(data)
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Inicia Sesión
          </Typography>

          {errMsg && <Alert severity='error' onClose={() => {}}>{errMsg}</Alert>}
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              // error={!!emailError}
              fullWidth
              id='email'
              label='Correo Electrónico'
              name='email'
              autoComplete='email'
              autoFocus
              // helperText={emailError}
              {...register('email', {
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Por favor ingrese un correo válido'
                }
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <p role='alert' style={{ color: 'red' }}>{errors.email.message}</p>}
            <TextField
              margin='normal'
              // error={!!passwordError}
              fullWidth
              name='password'
              label='Contraseña'
              type='password'
              id='password'
              autoComplete='current-password'
              // helperText={passwordError}
              {...register('password', { required: 'La contraseña es requerida' })}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && <p role='alert' style={{ color: 'red' }}>{errors.password.message}</p>}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/recovery' variant='body2'>
                  Olvidé mi contraseña
                </Link>
              </Grid>
              <Grid item>
                <Link to='/register' variant='body2'>
                  No tienes cuenta? Registrate
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
