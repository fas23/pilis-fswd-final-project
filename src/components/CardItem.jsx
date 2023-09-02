import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Link, Stack, Typography } from '@mui/material'
import { ArrowsRightLeftIcon, ClockIcon, TicketIcon } from './Icons'
import { useState } from 'react'
import { formatLongDate, formatTime } from '../utils'

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

  return (
    <Grid key={item.movieId} item xs={8} lg={3} sx={{ padding: '15px' }}>
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
          <Link className='btn-see-more' to='/'>

            <Button variant='contained' sx={{ width: '100%', borderRadius: 0 }}>
              MOSTRAR CÓDIGO QR
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}
