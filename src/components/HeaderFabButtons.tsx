import { Button, IconButton, Tooltip } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Close, Search } from '@material-ui/icons'
import React, { useState } from 'react'
import useGlobal from '../common/globalStateHook'
import CoinSearchModal from './CoinSearchModal'

type Props = {
  loading?: boolean
}

const HeaderfabButtons = (props: Props) => {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  const [modalOpen, setModalOpen] = useState(false)
  const { loading } = props
  const coinPageNeedle = globalState.coinPageNeedle

  const updateNeedle = (needle: string) => {
    globalActions.updateCoinPageNeedle(needle)
  }

  const handleModalOpen = () => {
    globalActions.setTab(1)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Hidden xsDown>
          {coinPageNeedle && (
            <Tooltip title="Reset search results">
              <Button
                color="primary"
                size="small"
                aria-label="Reset search results"
                disabled={loading}
                onClick={() => updateNeedle('')}
                startIcon={<Close />}
                className={classes.fabButtons}
              >
                Close Search
              </Button>
            </Tooltip>
          )}

          <Tooltip title="Find a coin">
            <Button
              color="primary"
              size="small"
              aria-label="Find a coin"
              onClick={handleModalOpen}
              startIcon={<Search />}
              className={classes.fabButtons}
            >
              Search
            </Button>
          </Tooltip>

          {/* <Tooltip title="Retrieve an updated list">
            <Button
              variant="contained"
              color="primary"
              size="small"
              aria-label="Retrieve an updated list"
              disabled={loading}
              onClick={() => updateNeedle('')}
              startIcon={<Refresh />}
              className={classes.fabButtons}
            >
              Refresh
              {loading && (
                <CircularProgress size={24} className={classes.fabProgress} />
              )}
            </Button>
          </Tooltip> */}
        </Hidden>

        <Hidden smUp>
          {coinPageNeedle && (
            <IconButton
              color="primary"
              aria-label="Reset search results"
              disabled={loading}
              onClick={() => updateNeedle('')}
            >
              <Close />
            </IconButton>
          )}

          <IconButton
            color="primary"
            aria-label="Find a coin"
            onClick={handleModalOpen}
          >
            <Search />
          </IconButton>
        </Hidden>
      </div>
      <CoinSearchModal
        open={modalOpen}
        handleClose={handleModalClose}
        updateNeedle={updateNeedle}
      />
    </React.Fragment>
  )
}

export default HeaderfabButtons

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(3),
    right: '0',
    [theme.breakpoints.only('xs')]: {
      top: theme.spacing(2)
      // position: 'relative',
      // top: 'auto',
      // right: 'auto',
      // margin: '0.5rem 0',
      // textAlign: 'center'
    }
  },
  fabButtons: {
    // display: 'inline-block',
    position: 'relative',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      minWidth: 'auto',
      // paddingLeft: theme.spacing(1),
      // paddingRight: theme.spacing(1)
      padding: '.5rem .6rem'
    },
    [theme.breakpoints.only('xs')]: {
      '.MuiButton-startIcon.MuiButton-iconSizeSmall': {
        marginRight: '0'
      },
      '.MuiButton-iconSizeSmall .MuiSvgIcon-root': {
        fontSize: '1.3rem'
      }
    }
  },
  fabProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    // top: -6,
    // right: -6,
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    zIndex: 1
  },
  hide: {
    display: 'none'
  }
}))
