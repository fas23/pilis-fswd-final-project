import { Box, Container, Stack, Typography } from '@mui/material'
import WanderingMind from './../../assets/img/wandering-mind.png'
import { useNavigate } from 'react-router-dom'
import { ColorButton } from '../ColorButton'

export const FinalChoice = (props) => {
  const { handleReset } = props

  const navigate = useNavigate()

  const handleGoToAvailableMovies = () => {
    navigate('/available-movies')
  }

  return (
    <Container sx={{ mb: '3rem' }}>
      <Typography
        variant='h4'
        textAlign='center'
        component='h1'
        mt='4.5rem'
        fontWeight='bold'
      >
        Elige tu siguiente acción
      </Typography>

      <Box
        component='img'
        src={WanderingMind}
        sx={{ width: '50%', height: 'auto', mx: 'auto', display: 'block' }}
      />
      <Stack direction='row' spacing={2} sx={{ width: '50%', mx: 'auto', mt: '2rem' }}>
        <ColorButton
          variant='contained'
          size='large'
          type='submit'
          sx={{ textTransform: 'initial', width: '100%', mb: '1rem', fontSize: '1rem' }}
          onClick={handleReset}
        >
          Cargar otra película
        </ColorButton>
        <ColorButton
          variant='contained'
          size='large'
          type='submit'
          sx={{ textTransform: 'initial', width: '100%', mb: '1rem', fontSize: '1rem' }}
          onClick={handleGoToAvailableMovies}
        >
          Ver películas cargadas
        </ColorButton>
      </Stack>

    </Container>
  )
}
