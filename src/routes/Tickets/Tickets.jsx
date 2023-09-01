import { Box, Divider, Grid, Card, Button, CardContent, CardActions, Typography } from '@mui/material'
import { Stack } from '@mui/joy'
import { TicketIcon, BankNotesIcon, ClockIcon } from '../../components/Icons'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { useContext, useState, useEffect} from 'react'

const Tickets = () => {
    const { cart, setCart} = useContext(CartContext)
    /* const [tickets, setTickets]=useState([]); */

    useEffect(()=>{
      const [ticketCaptured]=JSON.parse(window.localStorage.getItem('addTicket')) 
      setCart([...cart,ticketCaptured])
      console.log('tickets recibidos', ticketCaptured)
      /* setTickets([...tickets,ticketCaptured]) */
      console.log('tickets agregados', cart)
    },[])

    return (
      <>
    {cart.map((row)=>(
    <Grid key={row.id} item xs={8} lg={3}>
      <Card variant='outlined'>
        <Box
          component='img'
          src={row.image}
          loading='lazy'
          sx={{
            width: '100%',
            height: '320px',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        <CardContent orientation='horizontal' sx={{ padding: '1rem' }}>
          <Stack spacing={1} sx={{ width: '100%' }}>
            <Typography level='title-lg' sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {row.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <ClockIcon />
              <Typography level='body-lg'>{row.date} a las {row.hour}</Typography>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <TicketIcon />
              <Typography level='body-lg'>{row.quantity}</Typography>
              <Divider orientation="vertical" />
              <Typography level='body-lg'>{row.room}</Typography>
            </Box>

          </Stack>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
        <Link className='btn-see-more' to={`/`} >
          
          <Button variant='contained'/*  startIcon={}  */sx={{ width: '100%', borderRadius: 0 }}>
            MOSTRAR CÓDIGO QR
          </Button>
        </Link>
        </CardActions>
      </Card>
    </Grid>
))}
    </>
  )
}

export default Tickets