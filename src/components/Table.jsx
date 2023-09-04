import * as React from 'react'
import MUITable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { IconButton } from '@mui/material'
import { PencilIcon, TrashIcon } from './Icons'
import { formatTime } from '../utils/formatTime'

export function Table (props) {
  const { rows } = props

  const handleEdit = (id) => {
    const foundCinemaShow = rows.find(row => row.id === id)
    console.log({ foundCinemaShow })
  }

  const handleDelete = (id) => {
    const foundCinemaShow = rows.find(row => row.id === id)
    console.log({ foundCinemaShow })
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
          {rows.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell component='th' scope='row'>
                {row.room.name}
              </TableCell>
              <TableCell align='right'>{row.date}</TableCell>
              <TableCell align='right'>{formatTime(row.hour, row.minutes)}</TableCell>
              <TableCell align='right'>$ {row.price}</TableCell>
              <TableCell align='right'>{row.capacityAvailable}</TableCell>
              <TableCell align='right'>
                <IconButton
                  aria-label='editar'
                  onClick={() => handleEdit(row.id)}
                >
                  <PencilIcon />
                </IconButton>
              </TableCell>
              <TableCell align='right'>
                <IconButton
                  aria-label='editar'
                  onClick={() => handleDelete(row.id)}
                >
                  <TrashIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  )
}
