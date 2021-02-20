import { Button, Tooltip } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Close, Search } from '@material-ui/icons'
import React, { useState } from 'react'
import CoinSearchModal from './CoinSearchModal'

type Props = {
  loading: boolean
  coinPageNeedle?: string
  updateNeedle: (needle: string) => void
}

const HeaderfabButtons = (props: Props) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const { loading, updateNeedle, coinPageNeedle } = props

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        {coinPageNeedle && (
          <Tooltip title="Reset search results">
            <div className={classes.fabButtons}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                aria-label="Reset search results"
                disabled={loading}
                onClick={() => updateNeedle('')}
                // className={classNames(!coinPageNeedle && classes.hide)}
                startIcon={<Close />}
              >
                Close Search
              </Button>
            </div>
          </Tooltip>
        )}

        <Tooltip title="Find coins">
          <div className={classes.fabButtons}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              aria-label="Find coins"
              onClick={handleModalOpen}
              startIcon={<Search />}
            >
              Search
            </Button>
          </div>
        </Tooltip>

        {/* <Tooltip title="Retrieve an updated list">
            <div className={classes.fabButtons}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                aria-label="Retrieve an updated list"
                disabled={loading}
                onClick={() => updateNeedle('')}
                startIcon={<Refresh />}
              >
                Refresh
              </Button>
              {loading && (
                <CircularProgress size={24} className={classes.fabProgress} />
              )}
            </div>
          </Tooltip> */}
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
    right: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      position: 'relative',
      top: 'auto',
      right: 'auto',
      margin: '0.5rem 0',
      textAlign: 'center'
    }
  },
  fabButtons: {
    display: 'inline-block',
    position: 'relative',
    marginLeft: theme.spacing(1)
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
