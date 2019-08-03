/* eslint-disable no-debugger */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  root: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: '90%',
    maxWidth: theme.spacing(50),
    backgroundColor: `rgba(255, 255, 255, 0.8)`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    borderRadius: '1rem',
    outline: 'none'
  },
  fabButton: {
    width: '2rem',
    height: '2rem',
    minHeight: '2rem',
    position: 'absolute',
    top: 0,
    right: 0,
    boxShadow: 'none',
    borderRadius: '0 1rem 0'
  },
  iconSmall: {
    fontSize: '1rem'
  }
})

class CoinsSearchModal extends Component {
  _textFieldHandler(e) {
    if (!e.target.value.length) {
      return
    }
    this.props.updateNeedle(e.target.value)
  }

  render() {
    const { classes, open, handleClose } = this.props

    function debounceEventHandler(...args) {
      const debounced = debounce(...args)
      return function(e) {
        e.persist()
        return debounced(e)
      }
    }

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.root}>
          <Button
            color="primary"
            className={classes.fabButton}
            aria-label="Close search coins popup"
            onClick={handleClose}
            disableRipple
          >
            <Icon className={classes.iconSmall}>close</Icon>
          </Button>
          <div>
            <TextField
              className={classes.margin}
              name="inputSearchCoins"
              id="input-with-icon-textfield"
              placeholder="Type the coin name"
              fullWidth
              autoFocus
              onChange={debounceEventHandler(this._textFieldHandler.bind(this), 300)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
      </Modal>
    )
  }
}

CoinsSearchModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateNeedle: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(CoinsSearchModal)
