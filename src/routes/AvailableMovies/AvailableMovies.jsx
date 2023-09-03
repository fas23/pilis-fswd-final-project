import { Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { moviesWithoutCinemaShows } from '../../services/moviesWithoutCinemaShows'
import { ArrowsRightLeftIcon, PencilIcon, SearchIcon, TrashIcon } from '../../components/Icons'

export const AvailableMovies = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState('')

  useEffect(() => {
    moviesWithoutCinemaShows()
      .then(({ data }) => {
        const { response } = data
        setMovies(response)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const filteredMovies = movies.filter(movie => {
    return movie.title.toLowerCase().includes(value.toLowerCase())
  })

  const handleReset = () => {
    setValue('')
  }

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
      <Stack spacing={2} direction='row' sx={{ mb: '2rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <TextField
          id='search-movie'
          label='Película a buscar'
          variant='outlined'
          value={value}
          onChange={(e) => handleInputChange(e)}
          InputProps={{
            endAdornment: (
              <SearchIcon />
            )
          }}
        />

        <Button
          variant='outlined'
          startIcon={<ArrowsRightLeftIcon />}
          sx={{ textTransform: 'initial', fontSize: '1rem' }}
          // onClick={handleSelectItem}
        >
          Cambiar a películas con funciones
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {!isLoading && filteredMovies.length === 0 &&
          <Box sx={{ mx: 'auto', display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant='h3' component='h1' sx={{
                textAlign: 'center',
                marginY: '2rem',
                fontWeight: 'bold',
                fontSize: '2.5rem',
                mx: 'auto'
              }}
            >
              No se encontraron películas disponibles a la búsqueda
            </Typography>
            <Button
              onClick={handleReset}
              variant='contained' size='large'
              sx={{
                textTransform: 'initial',
                fontWeight: '700',
                fontSize: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block'
              }}
            >
              Obtener todas las películas
            </Button>
          </Box>}

        {!isLoading && filteredMovies.map(movie => (
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
