import { Container, Typography } from '@mui/material'
import { Table } from '../../components/Table'
import { useLocation } from 'react-router-dom'

export const CinemaShows = () => {
  const location = useLocation()
  const { movie } = location.state

  return (
    <Container>
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
      <Table rows={movie.cinemaShows} movie={movie} />
    </Container>
  )
}
