import { useQuery } from '@apollo/client'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { GET_COUNT } from '../graphql/queries'

const styles = (theme) => ({
  root: {
    // width: 'auto',
    boxShadow: 'none',
    padding: '.5rem 1.5rem',
    top: 'auto',
    bottom: 0
    // marginLeft: '4.56rem',
    // [theme.breakpoints.only('xs')]: {
    //   marginLeft: 0
    // },
  }
})

function SimpleAppBar(props) {
  const { classes } = props
  const { data } = useQuery(GET_COUNT)

  return (
    <AppBar position="absolute" color="secondary" className={classes.root}>
      <Typography variant="body1" color="inherit" align="right">
        {data &&
          data.count &&
          data.count.map((count, ix) => (
            <span key={`${count}${ix}`}>
              {count.name}: {count.count} -{' '}
            </span>
          ))}{' '}
        &copy; Altcash {new Date().getFullYear()}
      </Typography>
    </AppBar>
  )
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SimpleAppBar)
