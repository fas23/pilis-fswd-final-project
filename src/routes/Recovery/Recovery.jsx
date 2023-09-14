// import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ColorButton } from '../../components/ColorButton'
// import img from '../../assets/img/palomitas.png'
// import { lightBlue } from '@mui/material/colors'

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme()

export default function Recovery () {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
  }

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
          {/* <Avatar sx={{ m: 1, bgcolor: lightBlue[500] }} src={img} /> */}
          <Typography component='h1' variant='h5'>
            Recupera tu contraseña
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Correo Electrónico'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <ColorButton
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar correo de recuperación
            </ColorButton>
            <Grid container>
              <Grid item xs>
                <Link to='/login' variant='body2'>
                  Iniciar Sesion
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
