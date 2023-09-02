import { Box, Divider, Grid, Card, Button, CardContent, CardActions, Typography } from '@mui/material'
import { Stack } from '@mui/joy'
import { TicketIcon, BankNotesIcon, ClockIcon } from '../../components/Icons'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { useContext, useState, useEffect} from 'react'
import {ticket} from '../../services/ticket'

const Tickets = () => {
    /* const { cart, setCart} = useContext(CartContext) */
    const [tickets, setTickets]=useState([]); 
    console.log('tickets recibidos')
    useEffect(() => {
      ticket()
        .then((data) => {
          setTickets(data.response)
          console.log('tickets',data.response);
        })
        .catch((err) => console.log(err))
    }, [])

    /* useEffect(()=>{
      const [ticketCaptured]=JSON.parse(window.localStorage.getItem('addTicket')) 
      setTickets([...tickets,ticketCaptured])
      console.log('tickets recibidos', ticketCaptured)
      /* setTickets([...tickets,ticketCaptured]) 
      console.log('tickets agregados', tickets)
    },[]) */

    return (
      <>
      <Grid container sx={{width: '100%', objectPosition: 'center', margin:'20px'}}>
      {tickets.map((row)=>(
      <Grid key={row.id} item xs={8} lg={3} sx={{padding:'15px'}}>
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
              <Typography level='title-lg' sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
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
</Grid>
    </>
  )
}

export default Tickets