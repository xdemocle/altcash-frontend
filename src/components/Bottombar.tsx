import { useQuery } from '@apollo/client'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { GET_COUNT } from '../graphql/queries'

function SimpleAppBar() {
  const classes = useStyles()
  const { data } = useQuery(GET_COUNT)

  return (
    <AppBar position="absolute" color="secondary" className={classes.root}>
      <Typography variant="body1" color="inherit" align="right">
        {data &&
          data.count &&
          data.count.map(
            (count: { name: string; count: number }, ix: number) => (
              <span key={`${count}${ix}`}>
                {count.name}: {count.count} -{' '}
              </span>
            )
          )}{' '}
        &copy; Altcash {new Date().getFullYear()}
      </Typography>
    </AppBar>
  )
}

export default SimpleAppBar

const useStyles = makeStyles(({ breakpoints, typography, spacing }: Theme) => ({
  root: {
    boxShadow: 'none',
    padding: '.5rem 1.5rem',
    top: 'auto',
    bottom: 0
  }
}))
