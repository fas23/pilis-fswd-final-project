import { Box, Divider, Grid, Card, Button, CardContent, CardActions, Typography } from '@mui/material'
import { Stack } from '@mui/joy'
import { TicketIcon, BankNotesIcon, ClockIcon } from '../../components/Icons'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { useContext, useState, useEffect } from 'react'
import { ticket } from '../../services/ticket'
import { CardItem } from '../../components/CardItem'

const Tickets = () => {
  /* const { cart, setCart} = useContext(CartContext) */
  const [tickets, setTickets] = useState([])
  console.log('tickets recibidos')
  useEffect(() => {
    ticket()
      .then((data) => {
        setTickets(data.response)
        console.log('tickets', data.response)
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
      <Grid container sx={{ width: '100%', objectPosition: 'center' }}>
        {tickets.map((item) => (
          <CardItem item={item} key={item.movieId} />
        ))}
      </Grid>
    </>
  )
}

export default Tickets
