import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import { UserIcon } from './Icons/UserIcon'
import { useState } from 'react'
import { Logout } from '@mui/icons-material'

const Profile = ({ user, out }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Tooltip title='Perfil'>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          {/* <UserIcon /> */}
          <Avatar sx={{ width: 32, height: 32 }}><UserIcon /></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          Hola, {user}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          {/* <Avatar /> */}
          Mi Cuenta
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {/* <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon> */}
          Mis Boletos
        </MenuItem>
        <MenuItem onClick={out}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </>
  )
}

export default Profile
