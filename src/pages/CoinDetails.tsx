import { useQuery } from '@apollo/client'
import { Button, Tooltip } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { btcToRandPrice } from '../common/currency'
import useGlobal from '../common/globalStateHook'
import CoinSVG from '../components/CoinSvg'
import { GET_PAGE_DATA, GET_META_COIN } from '../graphql/queries'

interface RouteParams {
  coinId: string
}

const CoinPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const { coinId } = useParams<RouteParams>()
  const [globalState] = useGlobal()
  const { data, loading } = useQuery(GET_PAGE_DATA, {
    // We refresh data list at least at reload
    fetchPolicy: 'cache-and-network',
    variables: {
      id: coinId.toUpperCase()
    }
  })

  const { data: metadata } = useQuery(GET_META_COIN, {
    // We refresh data list at least at reload
    fetchPolicy: 'cache-first',
    variables: {
      id: coinId.toUpperCase()
    }
  })

  const dataCoin = data ? data.coin : {}
  const dataSummary = data ? data.summary : { quoteVolume: 0, volume: 0 }
  const dataTicker = data ? data.ticker : {}
  const metaCoin = metadata ? metadata.metaCoin : {}

  // console.log('data', data)
  // console.log('dataTicker', dataTicker)
  // console.log('metadata', metadata)

  const handleBackButton = () => {
    if (history.action === 'PUSH') {
      history.goBack()
    } else {
      history.push('/buy')
    }
  }

  return (
    <div className={classes.root}>
      <Tooltip title="Go back to coin list">
        <Button
          color="primary"
          size="large"
          aria-label="Find a coin"
          onClick={handleBackButton}
          startIcon={<ArrowBackIcon />}
          className={classes.backButton}
        >
          Back
        </Button>
      </Tooltip>
      <Typography
        color="primary"
        variant="h4"
        gutterBottom
        className={classes.title}
      >
        {dataCoin.name}
        <div className={classes.pageAvatar}>
          {loading && (
            <CircularProgress className={classes.progress} size="4rem" />
          )}
          {!loading && !metaCoin.description && <CoinSVG coinSymbol={coinId} />}
          {!loading && metaCoin.logo && (
            <img
              src={metaCoin.logo}
              width="64"
              height="64"
              alt={metaCoin.logo}
              title={metaCoin.name}
            />
          )}
        </div>
      </Typography>
      <Typography variant="h5" gutterBottom className={classes.infoParagraph}>
        Buy now
      </Typography>
      <Typography variant="h5" gutterBottom className={classes.infoParagraph}>
        Market Details & Statistics
      </Typography>
      <List className={classes.dataParagraph} aria-label="Coin Data">
        <ListItem divider>
          <ListItemText
            primary={<strong>Current Buy Price</strong>}
            className={classes.column}
          />
          <ListItemText
            primary={`${btcToRandPrice(
              dataTicker.bidRate,
              globalState.bitcoinRandPrice
            )}`}
            secondary={`${dataTicker.bidRate} BTC`}
            className={classes.column}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Last Trade Price" className={classes.column} />
          <ListItemText
            primary={`${btcToRandPrice(
              dataTicker.lastTradeRate,
              globalState.bitcoinRandPrice
            )}`}
            secondary={`${dataTicker.lastTradeRate} BTC`}
            className={classes.column}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Price Change" className={classes.column} />
          <ListItemText
            primary={`${dataSummary.percentChange}%`}
            secondary={'Last 24hrs'}
            className={classes.column}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Price at Highest" className={classes.column} />
          <ListItemText
            primary={`${btcToRandPrice(
              dataSummary.high,
              globalState.bitcoinRandPrice
            )}`}
            secondary={`${dataSummary.high} BTC`}
            className={classes.column}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Price at Lowest" className={classes.column} />
          <ListItemText
            primary={`${btcToRandPrice(
              dataSummary.low,
              globalState.bitcoinRandPrice
            )}`}
            secondary={`${dataSummary.low} BTC`}
            className={classes.column}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Trading Volume" className={classes.column} />
          <ListItemText
            primary={`${dataSummary.volume.toFixed(2)} ${dataCoin.symbol}`}
            secondary={`of ${dataCoin.name}`}
            className={classes.column}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Quote Volume" className={classes.column} />
          <ListItemText
            primary={`${btcToRandPrice(
              dataSummary.quoteVolume,
              globalState.bitcoinRandPrice
            )}`}
            secondary={`${dataSummary.quoteVolume.toFixed(2)} BTC`}
            className={classes.column}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Last update" className={classes.column} />
          <ListItemText
            primary={<Moment>{dataSummary.updatedAt}</Moment>}
            secondary="Page data refresh automatically"
            className={classes.column}
          />
        </ListItem>
      </List>
      <Typography variant="body1" gutterBottom>
        <strong>Description</strong>
        <br />
        {metadata && metaCoin.description}
      </Typography>
    </div>
  )
}

export default CoinPage

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.typography.pxToRem(theme.spacing(6)),
    paddingTop: theme.typography.pxToRem(theme.spacing(1)),
    [theme.breakpoints.only('xs')]: {
      padding: theme.typography.pxToRem(theme.spacing(3))
    }
  },
  title: {
    lineHeight: '3rem'
  },
  pageAvatar: {
    float: 'right',
    display: 'inline',
    marginTop: '-0.2rem',
    marginRight: '0.5rem'
  },
  infoParagraph: {
    marginTop: '1rem'
  },
  dataParagraph: {
    marginBottom: '2.5rem',
    maxWidth: '64rem'
  },
  column: {
    flexBasis: 0
  },
  progress: {
    color: green[500]
  },
  backButton: {
    marginBottom: theme.typography.pxToRem(theme.spacing(1))
  }
}))
