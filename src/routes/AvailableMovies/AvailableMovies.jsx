import { Backdrop, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { moviesWithoutCinemaShows } from '../../services/moviesWithoutCinemaShows'
import { PencilIcon, TrashIcon } from '../../components/Icons'

export const AvailableMovies = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    moviesWithoutCinemaShows()
      .then(({ data }) => {
        const { response } = data
        setMovies(response)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Typography
        variant='h3' component='h1' sx={{
          textAlign: 'center',
          marginY: '2rem',
          fontWeight: 'bold',
          fontSize: '2.5rem'
        }}
      >
        Películas disponibles
      </Typography>
      <Grid container spacing={2}>
        {!isLoading && movies.map(movie => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                sx={{ height: 350, width: '100%' }}
                image={movie.image.url}
                title={movie.title}
              />
              <CardContent>
                <Typography variant='h5' component='h5'>
                  {movie.title}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button
                  variant='text' startIcon={<PencilIcon />}
                  sx={{ textTransform: 'initial', fontSize: '1rem' }}
                >
                  Editar
                </Button>
                <Button
                  variant='text' startIcon={<TrashIcon />}
                  sx={{ textTransform: 'initial', fontSize: '1rem' }}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
