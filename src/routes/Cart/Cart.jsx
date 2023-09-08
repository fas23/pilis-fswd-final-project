import React, { useEffect, useContext, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Table from '@mui/joy/Table'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import { Padding } from '@mui/icons-material'
import { payment } from '../../services/payment'
import ConfirmationLogin from '../../components/modal/ConfirmationLogin'

const Cart = () => {
  const { cart, setCart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    const localCart = JSON.parse(window.localStorage.getItem('addCart'))
    console.log('en pagina de carrito', localCart)
    setCart(localCart !== null ? localCart : [])
  }, [])

  const totalPrices = cart ? cart.reduce((acc, item) => acc + item.total, 0) : undefined
  const handleDelete = (id) => {
    const cartFilter = cart.filter((item) => item.id !== id)
    window.localStorage.setItem('addCart', JSON.stringify(cartFilter))
    setCart(cartFilter)
  }
  const handlePayment = () => {
    const items = cart.map((item) => {
      return {
        cinemaShowId: item.cinemaShowId,
        title: item.name,
        unitPrice: item.price,
        quantity: item.quantity
      }
    })
    console.log('itemsCart', items)
    payment(items)
      .then(data => {
        console.log('payment', data)
        window.localStorage.setItem('addCart', JSON.stringify([]))
        window.localStorage.setItem('addTicket', JSON.stringify(cart))
        console.log('esto se va enviar', cart)
        /* setCart([]) */
        /* console.log('como quedó cart',cart) */
        navigate('/tickets')
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Sheet variant='outlined' color='neutral' sx={{ p: 1, textAlign: 'center', backgroundColor: '#CCCCCC' }}>
        <h1>Carrito de compra</h1>
      </Sheet>
      <Box sx={{ width: '100%', padding: '2rem' }}>
        <Typography level='body-sm' textAlign='center' sx={{ pb: 2 }}>
          <Link className='btn-see-more' to='/'>
            <Button
              type='submit' size='md' variant='soft' color='neutral' aria-label='Explore Bahamas Islands'
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            >Seguir comprando
            </Button>
          </Link>
        </Typography>
        <Sheet
          variant='outlined'
          sx={{
            '--TableCell-height': '40px',
            // El número es la cantidad de las filas de encabezado.
            '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
            '--Table-firstColumnWidth': '80px',
            '--Table-lastColumnWidth': '144px',
            // El fondo debe tener transparencia para mostrar las sombras de desplazamiento
            '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
            '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
            overflow: 'auto',
            marginRight: '2rem',
            marginLeft: '2rem',
            background: (theme) =>
                    `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
                    linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
                    radial-gradient(
                    farthest-side at 0 50%,
                    rgba(0, 0, 0, 0.12),
                    rgba(0, 0, 0, 0)
                    ),
                    radial-gradient(
                        farthest-side at 100% 50%,
                        rgba(0, 0, 0, 0.12),
                        rgba(0, 0, 0, 0)
                    )
                    0 100%`,
            backgroundSize:
                    '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'local, local, scroll, scroll',
            backgroundPosition:
                    'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
            backgroundColor: 'background.surface'
          }}
        >
          <Table
            borderAxis='bothBetween'
            stripe='odd'
            hoverRow
            sx={{

              '& tr > *:first-child': {
                position: 'sticky',
                left: 0,
                boxShadow: '1px 0 var(--TableCell-borderColor)',
                bgcolor: 'background.surface'
              },
              '& tr > *:last-child': {
                position: 'sticky',
                right: 0,
                bgcolor: 'var(--TableCell-headBackground)'
              }
            }}
          >
            <thead>
              <tr>
                <th style={{ width: 200 }} />
                <th style={{ width: 200 }}>Película</th>
                <th style={{ width: 100 }}>Sala</th>
                <th style={{ width: 100 }}>Fecha</th>
                <th style={{ width: 100 }}>Hora</th>
                <th style={{ width: 100 }}>Precio</th>
                <th style={{ width: 100 }}>Cantidad</th>
                <th style={{ width: 100 }}>Total</th>
                <th
                  aria-label='last'
                  style={{ width: 'var(--Table-lastColumnWidth)' }}
                />
              </tr>
            </thead>
            <tbody>
              {cart !== null && cart.map((row) => (
                <tr key={row.id}>
                  <td>
                    <Box
                      component='img'
                      src={row.image}
                      loading='lazy'
                      sx={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                  </td>
                  <td>{row.name}</td>
                  <td>{row.room}</td>
                  <td>{row.date}</td>
                  <td>{row.hour} Hrs</td>
                  <td>$ {row.price}</td>
                  <td>{row.quantity}</td>
                  <td>$ {row.total}</td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size='sm' variant='soft' color='danger' onClick={() => handleDelete(row.id)}>
                        Borrar
                      </Button>
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        <Sheet sx={{ textAlign: 'right', paddingRight: '2rem' }}>
          <Typography level='h2' sx={{ color: 'black', paddingRight: '2rem', paddingTop: '2rem' }}>Total: $ {totalPrices}</Typography>
          <br />
          {cart.length !== 0 &&
          (<Button
            type='submit' size='md' variant='soft' color='neutral' aria-label='Explore Bahamas Islands'
             sx={{ ml: 'auto', width: '200px', alignSelf: 'center', fontWeight: 600 }}
             onClick={handlePayment}
           >Pagar</Button>)

            //<ConfirmationLogin payment={handlePayment} />
            }

        </Sheet>
      </Box>
    </>
  )
}
export default Cart
