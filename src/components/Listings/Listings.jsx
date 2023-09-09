import React, { useEffect, useState, useContext } from 'react'
import { Grid, Backdrop, CircularProgress } from '@mui/material'
import Listing from './Listing'
import { movie } from '../../services/movie'
import { MovieContext } from '../../context/MovieContext'

const Listings = () => {
  const { listings, setListings } = useContext(MovieContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    movie()
      .then((data) => {
        setListings(data.response)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Grid container spacing={4}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      {
        listings.map((listing) => {
          return (
            <Listing
              key={listing.id}
              id={listing.id}
              name={listing.title} image={listing.image.url} hour='02:30' price={900}
            />
          )
        })

      }

    </Grid>
  )
}

export default Listings
