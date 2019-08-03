/* eslint-disable no-debugger */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
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
              <Button
                mini
                variant="fab"
                color="primary"
                aria-label="Reset search results"
                disabled={loading}
                onClick={() => updateNeedle('')}
                className={classNames(!coinPageNeedle && classes.hide)}
              >
                <Icon>close</Icon>
              </Button>
            </div>
          </Tooltip>

          <Tooltip title="Find coins">
            <div className={classes.fabButtons}>
              <Button
                mini
                variant="fab"
                color="primary"
                aria-label="Find coins"
                onClick={this.handleModalOpen}
              >
                <Icon>search</Icon>
              </Button>
            </div>
          </Tooltip>

          {/* <Tooltip title="Your favourite coins">
            <div className={classes.fabButtons}>
              <Button
                mini
                variant="fab"
                color="primary"
                aria-label="Your favourite coins"
                className={classes.fabButtons}
              >
                <Icon>star</Icon>
              </Button>
            </div>
          </Tooltip> */}

          <Tooltip title="Retrieve an updated list">
            <div className={classes.fabButtons}>
              <Button
                mini
                variant="fab"
                color="primary"
                aria-label="Retrieve an updated list"
                disabled={loading}
                onClick={() => updateNeedle('')}
              >
                <Icon>refresh</Icon>
              </Button>
              {loading && <CircularProgress size={52} className={classes.fabProgress} />}
            </div>
          </Tooltip>
        </div>
        <CoinSearchModal open={modalOpen} handleClose={this.handleModalClose} updateNeedle={updateNeedle} />
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
