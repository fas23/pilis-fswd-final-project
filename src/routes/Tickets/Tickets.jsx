import { Box, Grid, Button, Backdrop, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ticket } from '../../services/ticket'
import { CardItem } from '../../components/CardItem'

const Tickets = () => {
  const navigate = useNavigate()

  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ticket()
      .then((data) => {
        setTickets(data.response)
        console.log('tickets', data.response)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  const handleClose = () => {
    navigate('/')
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Grid container sx={{ width: '100%', objectPosition: 'center' }}>
        {tickets.map((item) => (
          <CardItem item={item} key={item.movieId} />
        ))}
      </Grid>
      <Box textAlign='center'>
        <Button
          size='md' variant='soft' color='neutral' aria-label='Explore Bahamas Islands'
          sx={{ ml: 'auto', width: '200px', alignSelf: 'center', fontWeight: 600, backgroundColor: '#CCCCCC' }}
          onClick={handleClose}
        >Volver al inicio
        </Button>
      </Box>
    </>
  )
}

export default Tickets
