import { Card, Grid, TextField } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import NumberFormat from 'react-number-format'
import { Coin } from './CoinItem'

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      thousandSeparator
      isNumericString
      // prefix="$"
    />
  )
}

interface Props {
  coin: Coin
}

const CoinBuy = ({ coin }: Props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <form noValidate autoComplete="off">
        <Grid container>
          <Grid item xs={12} md={6} className={classes.gridLeft}>
            <InputLabel htmlFor="gridLeftInput" className={classes.gridTitle}>
              You pay in Rands
            </InputLabel>
            <TextField
              id="gridLeftInput"
              fullWidth
              // helperText="ZAR"
              variant="outlined"
              InputProps={{
                inputComponent: NumberFormatCustom as any,
                startAdornment: (
                  <InputAdornment position="start">R</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.gridRight}>
            <InputLabel htmlFor="gridRightInput" className={classes.gridTitle}>
              You get <strong className={classes.symbol}>{coin.name}</strong>
            </InputLabel>
            <TextField
              id="gridRightInput"
              fullWidth
              // helperText={coin.symbol}
              variant="outlined"
              InputProps={{
                inputComponent: NumberFormatCustom as any,
                endAdornment: (
                  <InputAdornment position="start">
                    {coin.symbol}
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Card>
  )
}

export default CoinBuy

const useStyles = makeStyles(({ breakpoints, typography, spacing }) => ({
  root: {
    padding: typography.pxToRem(spacing(3))
    // [breakpoints.only('xs')]: {
    //   padding: typography.pxToRem(spacing(2))
    // }
  },
  gridLeft: {
    paddingRight: typography.pxToRem(spacing(1)),
    [breakpoints.down('sm')]: {
      paddingRight: 0,
      marginBottom: typography.pxToRem(spacing(3))
    }
  },
  gridRight: {
    paddingLeft: typography.pxToRem(spacing(1)),
    [breakpoints.down('sm')]: {
      paddingLeft: 0
    }
  },
  gridTitle: {
    display: 'block',
    color: grey[600],
    fontSize: '.9rem',
    marginBottom: typography.pxToRem(spacing(1))
  },
  symbol: {
    color: green[700]
  }
}))
