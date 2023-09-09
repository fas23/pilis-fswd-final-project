import { useContext, useEffect } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Button
} from '@mui/material'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/palomitas.png'
import { BarsIcon, CartIcon } from '../../components/Icons'
import { UserContext } from '../../context/UserContext'
import Profile from '../../components/Profile'
import { AdminProfile } from '../../components/AdminProfile'

export const Navigation = () => {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(UserContext)
  useEffect(() => {
    const userStored = window.localStorage.getItem('currentUser')
    console.log({ userStored })
    if (userStored) {
      setCurrentUser(JSON.parse(userStored))
    }
  }, [])

  const handleSignOut = () => {
    setCurrentUser(null)
    navigate('/')
    window.localStorage.clear()
  }

  return (
    <>
      <Box
        component='header'
        sx={{
          paddingY: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #ccc'
        }}
      >
        <Box sx={{
          width: '95%',
          mx: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        >
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Box
              component='img'
              loading='lazy'
              src={logo}
              sx={{ width: '30px', height: '30px', display: { xs: 'none', sm: 'initial' } }}
            />
            <Typography
              variant='h6'
              noWrap
              component={Link}
              to='/'
              // href='/'
              sx={{
                mr: 2,
                display: { md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              FlicksSpot
            </Typography>
          </Box>
          <Box sx={{
            display: { xs: 'block', md: 'flex' },
            alignItems: 'center',
            gap: { xs: '0', md: '1rem' },
            position: { xs: 'relative', md: 'initial' }
          }}
          >
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              gap: { xs: '0', md: '1rem' },
              position: { xs: 'absolute', md: 'initial' },
              top: { xs: '5rem', md: 'initial' },
              // left: { xs: '0', md: 'initial' },
              right: { xs: '100%', md: 'initial' },
              padding: { xs: '1rem', md: '1rem' },
              width: { xs: '200px', md: 'auto' },
              mx: { xs: 'auto', md: 'initial' }
              // transform: { xs: 'translateX(-100%)', md: 'initial' },
            }}
            >
              {!currentUser &&
                <>
                  <Button
                    variant='text' size='large' type='button'
                    sx={{ textDecoration: 'underline', textTransform: 'initial', fontSize: '1rem' }}
                    component={Link}
                    to='/login'
                  >
                    Iniciar sesión
                  </Button>

                  <Button
                    variant='contained'
                    size='small'
                    type='submit'
                    sx={{ textTransform: 'initial', fontSize: '1rem' }}
                    component={Link}
                    to='/register'
                  >
                    Regístrate
                  </Button>
                </>}
            </Box>

            <IconButton
              aria-label='cart'
              component={Link}
              to='/cart'
            >
              <CartIcon />
            </IconButton>
            {
              currentUser && currentUser !== 'admin@gmail.com' && <Profile user={currentUser} out={handleSignOut} />
            }

            {
              currentUser && currentUser === 'admin@gmail.com' && <AdminProfile user={currentUser} out={handleSignOut} />
            }

            <IconButton
              aria-label='bars'
              sx={{ display: { md: 'none' } }}
            >
              <BarsIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Outlet />
    </>
  )
}
