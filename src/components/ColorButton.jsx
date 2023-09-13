import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const ochre = '#F9B208'

export const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(ochre),
  backgroundColor: ochre,
  '&:hover': {
    backgroundColor: '#E9DB5D'
  }
}))
