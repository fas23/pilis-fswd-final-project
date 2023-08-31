import React from 'react';
import {Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useContext, useState} from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Padding } from '@mui/icons-material';

const Cart= ()=>{
    const { cart} = useContext(CartContext);
    console.log("en pagina de carrito",cart);

    const totalPrices= cart.reduce((acc, item)=>acc+  item.total ,0); 

    return(
        <>
        <Sheet variant='outlined' color='neutral' sx={{ p: 1, textAlign: 'center', backgroundColor: '#CCCCCC' }}>
        <h1>Carrito de compra</h1>
      </Sheet>
        <Box sx={{ width: '100%', padding:'2rem'}}>
            <Typography level="body-sm" textAlign="center" sx={{ pb: 2 }}>
            <Link className='btn-see-more' to={`/`} >
                <Button
                type='submit' size='md' variant='soft' color='neutral' aria-label='Explore Bahamas Islands'
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >Seguir comprando  </Button>
                 </Link>
            </Typography>
            <Sheet
                variant="outlined"
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
                marginRight:'2rem',
                marginLeft:'2rem',
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
                backgroundColor: 'background.surface',
                }}
            >
                <Table
                borderAxis="bothBetween"
                stripe="odd"
                hoverRow
                sx={{
                    
                    '& tr > *:first-child': {
                    position: 'sticky',
                    left: 0,
                    boxShadow: '1px 0 var(--TableCell-borderColor)',
                    bgcolor: 'background.surface',
                    },
                    '& tr > *:last-child': {
                    position: 'sticky',
                    right: 0,
                    bgcolor: 'var(--TableCell-headBackground)',
                    },
                }}
                >
                <thead>
                    <tr>
                    <th style={{ width: 200 }}></th>
                    <th style={{ width: 200 }}>Película</th>
                    <th style={{ width: 200 }}>Precio</th>
                    <th style={{ width: 100 }}>Cantidad</th>
                    <th style={{ width: 200 }}>Total</th>
                    <th
                        aria-label="last"
                        style={{ width: 'var(--Table-lastColumnWidth)' }}
                    />
                    </tr>
                </thead>
                <tbody>
                    {cart.map((row) => ( 
                    <tr key={cart}>
                        <td>
                        <Box
                            component='img'
                            src={row.image}
                            loading='lazy'
                            sx={{
                            width: '200px',
                            height: '300px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            paddingTop:'20px'
                            }}
                            /> 
                        </td>
                        <td>{row.name}</td> 
                        <td>$ {row.price}</td>
                        <td>{row.quantity}</td>
                        <td>$ {row.total}</td>
                        <td>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button size="sm" variant="soft" color="danger">
                            Delete
                            </Button>
                        </Box>
                        </td>
                    </tr>
                     ))} 
                </tbody>
                </Table>
            </Sheet>
            <Sheet sx={{textAlign:'right', paddingRight:'2rem'}}>
            <Typography level='h2' sx={{color:'black', paddingRight:'2rem',paddingTop:'2rem'}}>Total: $ {totalPrices}</Typography>
            <br />
            <Button
                type='submit' size='md' variant='soft' color='neutral' aria-label='Explore Bahamas Islands'
                sx={{ ml: 'auto', width:'200px', alignSelf: 'center', fontWeight: 600 }}
                    >Pagar  </Button>

            </Sheet>
        </Box>
        </>
    );

};
export default Cart;