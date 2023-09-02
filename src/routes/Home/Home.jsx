// import Carrusel from '../../components/Carousel/Carousel2'
import { Box, Grid } from '@mui/material'
import Trailers from '../../components/Trailers/Trailers'
import Listings from '../../components/Listings/Listings'
import Filter from '../../components/Filter/Filter'
import { Carousel } from '../../components/Carousel'
import Sheet from '@mui/joy/Sheet'
/* import { useLocation } from 'react-router-dom' */

const Home = () => {
  /* const location = useLocation() */
  /* const { message } = location.state */
  /*  console.log({ message }) */
  return (

    <Box
      component='div'
      sx={{
        width: '95%',
        mx: 'auto'
      }}
    >

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={8}>
          <Carousel />
        </Grid>
        <Grid item xs={4}>
          <Trailers />
        </Grid>
      </Grid>
      {/* </div> */}

      {/* <div className='next'>
            <h2>Próximos estrenos</h2>
            <Trailers />
          </div>
        </div> */}
      <Sheet color='neutral' sx={{ p: 1, textAlign: 'center' }}>
        <h2>En cartelera</h2>
      </Sheet>
      <div className='filter'>
        <Filter />
      </div>

      <Listings />
    </Box>

  )
}

export default Home
