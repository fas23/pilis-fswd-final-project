import React, { useEffect, useState, useContext } from 'react'
import { Grid, Backdrop, CircularProgress } from '@mui/material'
import {FilterIcon} from '../Icons/FilterIcon'
import Listing from './Listing'
import { movie } from '../../services/movie'
import { MovieContext } from '../../context/MovieContext'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Listings = () => {
  const { listings, setListings } = useContext(MovieContext)
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch]=useState('')
  console.log('peliculas', listings)
  useEffect(() => {
    setIsLoading(true)
    movie()
      .then((data) => {
        setListings(data.response)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  const searcher =(e)=>{
    setSearch(e.target.value)
  }

  const results=!search? listings: listings.filter((dato)=> dato.title.toLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <>
      <Box component="form"
      sx={{ width: '100%', m: 2, display:'flex', justifyContent:'center'}}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" value={search} onChange={searcher} 
      label="Ingrese el nombre" variant="outlined"
      /* startIcon={< FilterIcon />} */
      sx={{ width: '50em', marginBottom:'2em'}}
      InputProps={{
        endAdornment: (
          <IconButton>
          < FilterIcon />
          </IconButton>
        ),
      }}
      />      
    </Box>
    <Grid container spacing={4}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      {
        results.length !==0? results.map((listing) => {
          return (
            <Listing
              key={listing.id}
              id={listing.id}
              name={listing.title} image={listing.image.url} 
              hour={listing.duration} 
              price={listing.cinemaShows[0].price}
            /> 
          )
        }): 
        
        <Card sx={{ minWidth: '100%', height:'300px' }}>
          <CardContent>
            <Typography sx={{ fontSize: 18, textAlign:'center' }} color="text.secondary" gutterBottom>
              No se hallaron resultados
            </Typography>
          </CardContent>
        </Card>
      }
    

    </Grid>
    </>
  )
}

export default Listings
