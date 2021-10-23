import { Button, Card, Grid, TextField } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core/styles'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import clsx from 'clsx'
import React from 'react'
import { useForm } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import { Coin } from './CoinItem'

interface Inputs {
  localCurrency: string
  cryptoCurrency: string
}

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

const CoinBuy: React.FC<Props> = ({ coin }: Props) => {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm<Inputs>({
    // mode: 'onSubmit',
    // reValidateMode: 'onChange',
    // defaultValues: {},
    // resolver: undefined,
    // context: undefined,
    criteriaMode: 'all',
    shouldFocusError: true
  })

  const onSubmitHandler = (data: unknown) => {
    // e.preventDefault()
    // console.log(data)
  }

  return (
    <Card className={classes.root}>
      <form
        noValidate
        autoComplete="off"
        method="POST"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Grid container>
          <Grid item xs={12} md={4} className={classes.grid}>
            <InputLabel htmlFor="gridLeftInput" className={classes.gridTitle}>
              You pay in <strong>Rands (ZAR)</strong>
            </InputLabel>
            <TextField
              id="gridLeftInput"
              name="localCurrency"
              fullWidth
              helperText={errors.localCurrency && errors.localCurrency.message}
              variant="outlined"
              inputRef={register({ required: true, maxLength: 25 })}
              inputProps={{
                maxLength: '25'
              }}
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: NumberFormatCustom as any,
                startAdornment: (
                  <InputAdornment position="start">R</InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} md={1} className={classes.grid}>
            <div className={classes.flex}>
              <Hidden smDown>
                <SwapHorizIcon color="primary" className={classes.arrow} />
              </Hidden>
              <Hidden mdUp>
                <SwapVertIcon
                  color="primary"
                  className={clsx(classes.arrow, classes.arrowMobile)}
                />
              </Hidden>
            </div>
          </Grid>

          <Grid item xs={12} md={4} className={classes.grid}>
            <InputLabel htmlFor="gridRightInput" className={classes.gridTitle}>
              You get <strong className={classes.symbol}>{coin.name}</strong>
            </InputLabel>
            <TextField
              id="gridRightInput"
              name="cryptoCurrency"
              fullWidth
              helperText={
                errors.cryptoCurrency && errors.cryptoCurrency.message
              }
              variant="outlined"
              inputRef={register({ required: true, maxLength: 25 })}
              inputProps={{
                maxLength: '25'
              }}
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: NumberFormatCustom as any,
                endAdornment: (
                  <InputAdornment position="start">
                    {coin.symbol || ''}
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <div className={classes.buyButtonInner}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.buyButton}
              >
                Buy Now
              </Button>
            </div>
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
  grid: {
    paddingRight: typography.pxToRem(spacing(2)),
    [breakpoints.down('sm')]: {
      paddingRight: 0,
      marginBottom: typography.pxToRem(spacing(3))
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
  },
  buyButton: {
    marginTop: '1.4rem',
    minHeight: '3.35rem',
    width: '100%'
  },
  buyButtonInner: {
    marginLeft: 0,
    [breakpoints.up('md')]: {
      marginLeft: typography.pxToRem(spacing(2))
    }
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    [breakpoints.up('md')]: {
      paddingTop: '1rem'
    }
  },
  arrow: {
    width: '2.5rem',
    height: '2.5rem'
  },
  arrowMobile: {
    width: '4.5rem',
    height: '4.5rem'
  }
}))
