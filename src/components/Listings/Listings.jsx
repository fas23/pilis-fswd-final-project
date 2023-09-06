import React, { useEffect, useState, useContext } from 'react'

import { Grid } from '@mui/material'
import Listing from './Listing'
import { movie } from '../../services/movie'
import { MovieContext } from '../../context/MovieContext'
import SkeletonListing from '../Skeleton/SkeletonListing'

const Listings = () => {
  const { listings, setListings } = useContext(MovieContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      movie()
        .then((data) => {
          setListings(data.response)
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(true))
    }, 5000)
  }, [])

  return (
    <Grid container spacing={4}>
      {
        isLoading
          ? listings.map((listing) => {
            return (<Listing key={listing.id} id={listing.id} name={listing.title} image={listing.image.url} hour='02:30' price={900} />)
          })
          : <SkeletonListing />
      }

      {/* {

        listings.map((listing) => {
          return (<Listing key={listing.id} id={listing.id} name={listing.title} image={listing.image.url} hour='02:30' price={900} />)
        })

      } */}

    </Grid>
  )
}

export default Listings
