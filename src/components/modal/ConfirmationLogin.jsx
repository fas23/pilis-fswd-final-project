import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
// import { TicketIcon } from '../Icons'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import { ColorButton } from '../ColorButton'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4
}

export default function ConfirmationLogin ({ payment }) {
  // const navigate = useNavigate()
  const { currentUser } = useContext(UserContext)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  // {
  //   if (currentUser !== null) {
  //     // navigate(`listing/${id}`)
  //   } else {
  //     setOpen(true)
  //   }
  // }

  const handleClose = () => setOpen(false)

  return (
    <div>
      {
        currentUser
          ? <ColorButton type='submit' size='md' variant='neutral' aria-label='Explore Bahamas Islands' sx={{ ml: 'auto', width: '200px', alignSelf: 'center', fontWeight: 600 }} onClick={payment}> Pagar</ColorButton>
          : <ColorButton onClick={handleOpen} size='md' variant='neutral' aria-label='Explore Bahamas Islands' sx={{ ml: 'auto', width: '200px', alignSelf: 'center', fontWeight: 600, bgcolor: '#F9B208' }}>Pagar</ColorButton>
}

      {/* <Button
        variant='contained' startIcon={<TicketIcon />} sx={{ width: '100%', borderRadius: 0 }}
        onClick={handleOpen}
      >
        COMPRAR TICKETS
      </Button> */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' component='h2' align='center'>
              Debes Iniciar Sesión
            </Typography>
            <Typography id='transition-modal-description' sx={{ mt: 2 }} align='center'>
              Para disfrutar de mayor acceso!!!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button component={Link} to='/login' variant='contained'>
                Ir
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
