import React, { useEffect, useState, useContext } from 'react'

import { Grid } from '@mui/material'
import Listing from './Listing'
import { movie } from '../../services/movie'
import { MovieContext } from '../../context/MovieContext'

const Listings = () => {
  /* const [listings, setListings] = useState([])  */

  const { listings, setListings } = useContext(MovieContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    movie()
      .then((data) => {
        setListings(data.response)
        /* console.log(data.response); */
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <Grid container spacing={4}>
      {/* {isLoading && <h1 className='loading-text'>Loading...</h1>} */}
      {
        listings.map((listing) => {
          /* console.log("idLis:",listing.id); */
          return (<Listing key={listing.id} id={listing.id} name={listing.title} image={listing.image.url} hour='02:30' price={900} />)
        })

      }

    </Grid>
  )
}

export default Listings
