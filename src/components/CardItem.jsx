import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Link, Stack, Typography } from '@mui/material'
import { ArrowsRightLeftIcon, ClockIcon, TicketIcon, QresIcon } from './Icons'
import { useState } from 'react'
import { formatLongDate, formatTime } from '../utils'
import Modal from '@mui/material/Modal';

export const CardItem = (props) => {
  const { item } = props
  const [selectedItem, setSelectedItem] = useState(item.details[0])

  const handleSelectItem = () => {
    setSelectedItem(prevState => {
      const indexFound = item.details.indexOf(prevState)

      if (item.details[indexFound + 1] === undefined) return item.details[0]

      return item.details[indexFound + 1]
    })
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid key={item.movieId} item xs={12} sm={4} lg={3} sx={{ padding: '15px' }}>
      <Card variant='outlined'>
        <Box
          component='img'
          src={item.imageUrl}
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
              {item.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <ClockIcon />
              <Typography level='body-lg'>{formatLongDate(selectedItem.cinemaShow.date)} a las {formatTime(selectedItem.cinemaShow.hour, selectedItem.cinemaShow.minutes)}</Typography>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <TicketIcon />
              <Typography level='body-lg'>{selectedItem.quantity}</Typography>
              <Divider orientation='vertical' />
              <Typography level='body-lg'>{selectedItem.cinemaShow.room.name}</Typography>
            </Box>

          </Stack>
        </CardContent>
        {item.details.length > 1 &&
          <Button
            variant='outlined'
            startIcon={<ArrowsRightLeftIcon />}
            onClick={handleSelectItem}
          >
            Cambiar función
          </Button>}
        <CardActions sx={{ padding: 0 }}>
            <Button variant='contained' sx={{ width: '100%', borderRadius: 0 }} startIcon={< QresIcon />} onClick={handleOpen}> 
              MOSTRAR CÓDIGO QR
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4}}>
                <Typography id="modal-modal-title" variant="h6" component="h2" 
                sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign:'center' }} >
                  BOLETO
                </Typography>
                  <Box
                    component='img'
                    src={selectedItem.qrCode}
                    loading='lazy'
                    sx={{
                      width: '100%',
                      height: '320px',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  <Box textAlign='center'>

                    <Button size='md' variant='soft' color='neutral' aria-label='Explore Bahamas Islands' 
                    sx={{ width: '200px', alignSelf: 'center', fontWeight: 400, backgroundColor:'#CCCCCCC', borderRadius:'10px' }} 
                    onClick={handleClose} >Cerrar</Button>
                  </Box>
              </Box>
            </Modal>
        </CardActions>
      </Card>
    </Grid>
  )
}
