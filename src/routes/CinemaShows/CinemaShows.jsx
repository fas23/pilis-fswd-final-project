import { Button, Container, Stack, Typography } from '@mui/material'
import { Table } from '../../components/Table'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlusIcon } from '../../components/Icons'
import { useState } from 'react'

export const CinemaShows = () => {
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { movie } = location.state

  const handleAddNewCinemaShow = () => {
    const { movieId, title, imageUrl } = movie

    navigate('/upload-cinemashow', {
      state: {
        movie: {
          movieId,
          imageUrl,
          title
        }
      }
    })
  }

  return (
    <Container>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ marginBottom: '2rem' }}
      >
        <Typography
          variant='h3' component='h1' sx={{
            textAlign: 'center',
            marginY: '2rem',
            fontWeight: 'bold',
            fontSize: '2.5rem'
          }}
        >
          Funciones disponibles para {movie.title}
        </Typography>
        <Button
          variant='contained' startIcon={<PlusIcon />}
          sx={{ textTransform: 'initial', fontSize: '1rem', width: 'fit-content' }}
          disabled={isLoading}
          onClick={handleAddNewCinemaShow}
        >
          Agregar función
        </Button>
      </Stack>
      <Table rows={movie.cinemaShows} movie={movie} isLoading={isLoading} setIsLoading={setIsLoading} />
    </Container>
  )
}
