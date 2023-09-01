import { Box, Divider, Grid, Card, CardContent, CardActions, Typography } from '@mui/material'
import { Stack } from '@mui/joy'
import { BankNotesIcon, ClockIcon } from '../Icons'
// import { Link } from 'react-router-dom'
import ConfirmationLogin from '../modal/ConfirmationLogin'

const Listing = ({ id, name, image, hour, price }) => {
  return (
    <Grid item xs={8} lg={3}>
      <Card variant='outlined'>
        <Box
          component='img'
          src={image}
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
              {name}
            </Typography>

            <Typography level='body-xs'>Duración:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <ClockIcon />
              <Typography level='body-lg'>{hour}hs</Typography>
            </Box>

            <Divider />

            <Typography level='body-xs'>Precio:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <BankNotesIcon />
              <Typography level='body-lg'>${price}</Typography>
            </Box>

          </Stack>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          {/* <Link className='btn-see-more' to={`/listing/${id}`}> */}
          <ConfirmationLogin id={id} />
          {/* <Button
            variant='contained' startIcon={<TicketIcon />} sx={{ width: '100%', borderRadius: 0 }}
            // onClick={handleUser}
            onClick={handleOpen}
          >
            COMPRAR TICKETS
          </Button> */}

          {/* </Link> */}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Listing
