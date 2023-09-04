import MUITable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Alert, IconButton, Snackbar } from '@mui/material'
import { PencilIcon, TrashIcon } from './Icons'
import { formatTime } from '../utils/formatTime'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { useState } from 'react'
import { deleteCinemaShow } from '../services/deleteCinemaShow'

export function Table (props) {
  const { rows, movie, isLoading, setIsLoading } = props

  const navigate = useNavigate()

  const [cinemaShows, setCinemaShows] = useState(rows)
  const [alert, setAlert] = useState(null)

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  const handleEdit = (id) => {
    const foundCinemaShow = rows.find(row => row.id === id)
    navigate('/upload-cinemashow', { state: { cinemaShow: foundCinemaShow, movie } })
  }

  const handleDelete = (id) => {
    const foundCinemaShow = rows.find(row => row.id === id)

    deleteCinemaShow(foundCinemaShow.id)
      .then(() => {
        const newCinemaShows = cinemaShows.filter(cinemaShow => cinemaShow.id !== foundCinemaShow.id)
        setCinemaShows(newCinemaShows)
        setAlert({
          open: true,
          type: 'success',
          message: 'Funcion eliminada correctamente'
        })
      })
      .catch(() => {
        setAlert({
          open: true,
          type: 'error',
          message: 'La funcion no pudo ser eliminada. Ya contiene tickets vendidos'
        })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <TableContainer component={Paper}>
      <MUITable aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Salas</TableCell>
            <TableCell align='right'>Fecha</TableCell>
            <TableCell align='right'>Horario</TableCell>
            <TableCell align='right'>Precio</TableCell>
            <TableCell align='right'>Capacidad disponible</TableCell>
            <TableCell align='right'>Editar</TableCell>
            <TableCell align='right'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cinemaShows.map((cinemaShow) => (
            <TableRow
              key={cinemaShow.id}
            >
              <TableCell component='th' scope='row'>
                {cinemaShow.room.name}
              </TableCell>
              <TableCell align='right'>{dayjs(cinemaShow.date).format('DD/MM/YYYY')}</TableCell>
              <TableCell align='right'>{formatTime(cinemaShow.hour, cinemaShow.minutes)}</TableCell>
              <TableCell align='right'>$ {cinemaShow.price}</TableCell>
              <TableCell align='right'>{cinemaShow.capacityAvailable}</TableCell>
              <TableCell align='right'>
                <IconButton
                  aria-label='editar'
                  disabled={isLoading}
                  onClick={() => handleEdit(cinemaShow.id)}
                >
                  <PencilIcon />
                </IconButton>
              </TableCell>
              <TableCell align='right'>
                <IconButton
                  aria-label='editar'
                  disabled={isLoading}
                  onClick={() => handleDelete(cinemaShow.id)}
                >
                  <TrashIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
      <Snackbar open={alert?.open}>
        <Alert
          onClose={handleCloseAlert}
          severity={alert?.type}
          sx={{ width: '100%' }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </TableContainer>
  )
}
