/* eslint-disable no-debugger */
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Close, Search } from '@material-ui/icons'
import React from 'react'

type Props = {
  handleClose: () => void
  updateNeedle: (needle: string) => void
  open: boolean
}

const CoinsSearchModal = (props: Props) => {
  const classes = useStyles()
  const { open, handleClose, updateNeedle } = props

  const textFieldHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!event.target.value.length) {
      return
    }
    updateNeedle(event.target.value)
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
          <Close />
        </Button>
        <div className={classes.input}>
          <TextField
            name="inputSearchCoins"
            placeholder="Type the coin name"
            fullWidth
            autoFocus
            onChange={textFieldHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CoinsSearchModal

const useStyles = makeStyles(({ shadows, spacing }: Theme) => ({
  root: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: '90%',
    maxWidth: spacing(50),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: shadows[5],
    padding: spacing(4),
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
  },
  input: {
    margin: '.5rem'
  }
}))
