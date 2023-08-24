// import Carrusel from '../../components/Carousel/Carousel2'
import { Box } from '@mui/material'
import Trailers from '../../components/Trailers/Trailers'
import Listings from '../../components/Listings/Listings'
import Filter from '../../components/Filter/Filter'
import { Carousel } from '../../components/Carousel'

const Home = () => {
  return (

    <Box
      component='div'
      sx={{
        width: '95%',
        mx: 'auto'
      }}
    >
      {/* <div className='containerp'> */}

      {/* <div className='carrusel'> */}
      <Carousel />
      {/* </div> */}

      {/* <div className='next'>
            <h2>Próximos estrenos</h2>
            <Trailers />
          </div>
        </div> */}
      <h2>En cartelera</h2>
      <div className='filter'>
        <Filter />
      </div>

      {/* <div className='list'>
      </div> */}
      <Listings />
    </Box>

  )
}

export default Home
