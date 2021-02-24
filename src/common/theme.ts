import blueGrey from '@material-ui/core/colors/blueGrey'
import green from '@material-ui/core/colors/green'
import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    // type: 'light',
    // type: 'dark',
    primary: {
      // main: '#28a745'
      main: green[600]
    },
    secondary: {
      // main: '#5A7684'
      main: blueGrey[500]
    }
  },
  // spacing: {
  //   unit: 8
  // },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 700
  }
  // overrides: {
  //   // Style sheet name ⚛️
  //   MuiTouchRipple: {
  //     // Name of the rule
  //     root: {
  //       // Some CSS
  //       backgroundColor: 'rgba(24, 161, 30, 0.1)'
  //     }
  //   }
  // }
})
