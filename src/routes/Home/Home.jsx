import { Box, Grid } from '@mui/material'
import Trailers from '../../components/Trailers/Trailers'
import Listings from '../../components/Listings/Listings'
import { Carousel } from '../../components/Carousel'
import Sheet from '@mui/joy/Sheet'

const Home = () => {
  return (

    <Box
      component='div'
      sx={{
        width: '95%',
        mx: 'auto'
      }}
    >

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sm={8}>
          <Carousel />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', md: 'initial' } }}>
          <Trailers />
        </Grid>
      </Grid>

      <Sheet variant='outlined' color='neutral' sx={{ p: 1, textAlign: 'center', backgroundColor: '#CCCCCC' }}>
        <h1>En cartelera</h1>
      </Sheet>

      <Listings />
    </Box>

  )
}

export default Home
