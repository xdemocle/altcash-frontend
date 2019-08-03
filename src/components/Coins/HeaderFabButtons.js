import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress, Fab, Tooltip } from '@material-ui/core'
import { Refresh, Close, Search } from '@material-ui/icons'
import CoinSearchModal from './CoinSearchModal'

const styles = theme => ({
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
    top: -6,
    right: -6,
    zIndex: 1
  },
  hide: {
    display: 'none'
  }
})

class HeaderfabButtons extends Component {
  state = {
    modalOpen: false
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    const { classes, loading, updateNeedle } = this.props
    const { coinPageNeedle } = this.props.app
    const { modalOpen } = this.state

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Tooltip title="Reset search results">
            <div className={classes.fabButtons}>
              <Fab
                color="primary"
                size="small"
                aria-label="Reset search results"
                disabled={loading}
                onClick={() => updateNeedle('')}
                className={classNames(!coinPageNeedle && classes.hide)}
              >
                <Close />
              </Fab>
            </div>
          </Tooltip>

          <Tooltip title="Find coins">
            <div className={classes.fabButtons}>
              <Fab
                color="primary"
                size="small"
                aria-label="Find coins"
                onClick={this.handleModalOpen}
              >
                <Search />
              </Fab>
            </div>
          </Tooltip>

          <Tooltip title="Retrieve an updated list">
            <div className={classes.fabButtons}>
              <Fab
                color="primary"
                size="small"
                aria-label="Retrieve an updated list"
                disabled={loading}
                onClick={() => updateNeedle('')}
              >
                <Refresh />
              </Fab>
              {loading && (
                <CircularProgress size={52} className={classes.fabProgress} />
              )}
            </div>
          </Tooltip>
        </div>
        <CoinSearchModal
          open={modalOpen}
          handleClose={this.handleModalClose}
          updateNeedle={updateNeedle}
        />
      </React.Fragment>
    )
  }
}

HeaderfabButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  app: PropTypes.object.isRequired,
  updateNeedle: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(HeaderfabButtons)
