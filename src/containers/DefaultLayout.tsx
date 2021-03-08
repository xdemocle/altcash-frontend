import { Hidden, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import BottomNav from '../components/BottomNav'
import Bottombar from '../components/Bottombar'
import Sidebar from '../components/Sidebar'

// eslint-disable-next-line react/prop-types
const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.appFrame}>
      <div className={classes.inner}>
        <Sidebar />
        <main className={classes.content}>{children}</main>
      </div>
      <Hidden smDown>
        <Bottombar />
      </Hidden>
      <Hidden mdUp>
        <BottomNav />
      </Hidden>
    </div>
  )
}

export default DefaultLayout

const useStyles = makeStyles(({ breakpoints, typography }: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#e3e4e9'
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    margin: '0 auto',
    [breakpoints.up('xl')]: {
      padding: '3rem 6rem 6rem 6rem',
      height: 'calc(100vh - 12rem)',
      maxWidth: '100rem'
    }
  },
  inner: {
    display: 'flex',
    [breakpoints.up('xl')]: {
      overflow: 'hidden',
      minHeight: 'calc(100vh - 9rem)',
      maxHeight: 'calc(100vh - 9rem)',
      borderRadius: '1.5rem',
      boxShadow: '0 0.25rem 1rem rgba(0,0,0,0.15)'
    }
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    overflow: 'hidden',
    minHeight: 'calc(100vh - 36px)',
    paddingBottom: typography.pxToRem(36),
    backgroundColor: '#f4f5f4',
    [breakpoints.only('xs')]: {
      minHeight: 'calc(100vh - 56px)',
      paddingBottom: typography.pxToRem(56)
    },
    [breakpoints.up('xl')]: {
      overflowY: 'auto',
      minHeight: 'auto'
    }
  }
}))
