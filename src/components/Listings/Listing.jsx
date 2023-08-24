import { Box, Divider, Grid, Card, Button, CardContent, CardActions, Typography } from '@mui/material'
import { Stack } from '@mui/joy'
import { TicketIcon, BankNotesIcon, ClockIcon } from '../Icons'

const Listing = (props) => {
  return (
    <Grid item xs={8} lg={3}>
      <Card variant='outlined'>
        <Box
          component='img'
          src={props.img}
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
              {props.name}
            </Typography>

            <Typography level='body-xs'>Duración:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <ClockIcon />
              <Typography level='body-lg'>{props.hour}hs</Typography>
            </Box>

            <Divider />

            <Typography level='body-xs'>Precio:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <BankNotesIcon />
              <Typography level='body-lg'>${props.price}</Typography>
            </Box>

          </Stack>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Button variant='contained' startIcon={<TicketIcon />} sx={{ width: '100%', borderRadius: 0 }}>
            COMPRAR TICKETS
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Listing
