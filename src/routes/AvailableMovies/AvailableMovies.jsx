/* eslint-disable react/jsx-closing-tag-location */
import { Alert, Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { moviesWithoutCinemaShows } from '../../services/moviesWithoutCinemaShows'
import { ArrowsRightLeftIcon, PencilIcon, PlusIcon, SearchIcon, TrashIcon, TvIcon } from '../../components/Icons'
import { movie } from '../../services/movie'
import { deleteMovie } from '../../services/deleteMovie.'
import { ColorButton } from '../../components/ColorButton'

export const AvailableMovies = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState('')
  const [toggle, setToggle] = useState(false)
  const [alert, setAlert] = useState(null)

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  const navigate = useNavigate()

  useEffect(() => {
    moviesWithoutCinemaShows()
      .then(({ data }) => {
        const { response } = data
        setMovies(response)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [alert])

  const handleChangeMovies = () => {
    setIsLoading(true)
    if (!toggle) {
      movie()
        .then(data => {
          const { response } = data
          setMovies(response)
          setToggle(true)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    } else {
      moviesWithoutCinemaShows()
        .then(({ data }) => {
          const { response } = data
          setMovies(response)
          setToggle(false)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const filteredMovies = movies.filter(movie => {
    return movie.title.toLowerCase().includes(value.toLowerCase())
  })

  const handleReset = () => {
    setValue('')
  }

  const handleAddNewCinemaShow = (movie) => {
    const { id, title, image: { url } } = movie

    navigate('/upload-cinemashow', {
      state: {
        movie: {
          movieId: id,
          imageUrl: url,
          title
        }
      }
    })
  }

  const handleShowCinemaShows = (movie) => {
    const { id, title, cinemaShows, image: { url } } = movie

    navigate('/cinemashows', {
      state: {
        movie: {
          movieId: id,
          imageUrl: url,
          title,
          cinemaShows
        }
      }
    })
  }

  const handleEditMovie = (movie) => {
    navigate('/upload-movie', { state: { movie } })
  }

  const handleDeleteMovie = (movie) => {
    deleteMovie(movie.id)
      .then(() => {
        setAlert({
          open: true,
          type: 'success',
          message: 'Película eliminada correctamente.'
        })
      })
      .catch(() => {
        setAlert({
          open: true,
          type: 'error',
          message: 'La película no pudo ser eliminada. Contiene funciones activas'
        })
      })
      .finally(() => {})
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
        {
        toggle
          ? (
            <Button
              variant='outlined'
              startIcon={<ArrowsRightLeftIcon />}
              sx={{ textTransform: 'initial', fontSize: '1rem' }}
              onClick={handleChangeMovies}
            >
              Cambiar a películas sin funciones
            </Button>
            )
          : (
            <Button
              variant='outlined'
              startIcon={<ArrowsRightLeftIcon />}
              sx={{ textTransform: 'initial', fontSize: '1rem' }}
              onClick={handleChangeMovies}
            >
              Cambiar a películas con funciones
            </Button>
            )
        }
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
            <ColorButton
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
            </ColorButton>
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
                <Typography variant='h5' component='h5' sx={{ height: '50px' }}>
                  {movie.title}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
                {movie.cinemaShows.length > 0
                  ? (
                    <Button
                      variant='text' startIcon={<TvIcon />}
                      sx={{ textTransform: 'initial', fontSize: '1rem', width: '100%', color: '#F9B208' }}
                      onClick={() => handleShowCinemaShows(movie)}
                    >
                      Ver funciones
                    </Button>
                    )
                  : (
                    <Button
                      variant='text' startIcon={<PlusIcon />}
                      sx={{ textTransform: 'initial', fontSize: '1rem', width: '100%', color: '#F9B208' }}
                      onClick={() => handleAddNewCinemaShow(movie)}
                    >
                      Agregar función
                    </Button>
                    )}
                <Button
                  variant='text' startIcon={<PencilIcon />}
                  sx={{ textTransform: 'initial', fontSize: '1rem', width: '100%', color: '#F9B208' }}
                  onClick={() => handleEditMovie(movie)}
                >
                  Editar
                </Button>
                <Button
                  variant='text' startIcon={<TrashIcon />}
                  sx={{ textTransform: 'initial', fontSize: '1rem', width: '100%', color: 'red' }}
                  onClick={() => handleDeleteMovie(movie)}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={alert?.open}>
        <Alert
          onClose={handleCloseAlert}
          severity={alert?.type}
          sx={{ width: '100%' }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}
