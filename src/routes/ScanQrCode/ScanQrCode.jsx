/* eslint-disable react/jsx-closing-tag-location */
import { Alert, Box, Button, Snackbar, Typography } from '@mui/material'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { useEffect, useState } from 'react'
import { validateTicket } from '../../services/validateTicket'

export const ScanQrCode = () => {
  const [scanResult, setScanResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const [reset, setReset] = useState(false)

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250
      },
      fps: 10
    })

    scanner.render(succes, error)

    function succes (result) {
      scanner.clear()
      setScanResult(result)
    }

    function error (error) {
      console.log({ error })
    }
  }, [reset])

  const handleSubmitDecodedQrCode = () => {
    setIsLoading(true)
    validateTicket({ code: scanResult })
      .then(data => {
        const { response } = data
        console.log({ response })
        setAlert({
          open: true,
          type: 'success',
          message: 'Ticket marcado como usuado'
        })
      })
      .catch(err => {
        console.log({ err })
        setAlert({
          open: true,
          type: 'error',
          message: 'Ticket no válido. Ya fue utilizado'
        })
      })
      .finally(() => {
        setIsLoading(false)
        setScanResult(null)
        setReset(!reset)
      })
  }

  return (
    <Box sx={{
      mx: 'auto',
      width: '80%'
    }}
    >
      <Typography
        variant='h1'
        sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', mb: '1rem' }}
      >
        {scanResult ? 'CÓDIGO QR' : 'ESCANEA EL CÓDIGO QR'}</Typography>
      {
      scanResult
        ? <Button
            onClick={handleSubmitDecodedQrCode}
            variant='contained'
            sx={{ textAlign: 'center', mt: '1rem', mb: '1rem', width: '100%', textTransform: 'initial' }}
            disabled={isLoading}
          >Enviar código QR
        </Button>
        : <Box component='div' id='reader' />
      }
      <Snackbar open={alert?.open}>
        <Alert
          onClose={handleCloseAlert}
          severity={alert?.type}
          sx={{ width: '100%' }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
