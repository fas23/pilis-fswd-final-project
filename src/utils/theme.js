// export const COLORS = {
//   primary: '#F9B208',
//   secondary: '#F98404',
//   text: '#263238',
//   inactive: '#A0A0A0',
//   grey: '#f6f6f6',
//   'light-gray': '#86858c',
//   'grashy-grey': '#E8E2E2',
//   black: '#030303',
//   white: '#fff'
// }

import {
  createTheme
} from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    ochre: {
      main: '#F9B208'
    },
    '&:hover': {
      backgroundColor: '#E9DB5D'
    }
  }
})
