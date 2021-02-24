import { useQuery } from '@apollo/client'
import { Button, Grid, Paper, Tooltip } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { btcToRandPrice } from '../common/currency'
import useGlobal from '../common/globalStateHook'
import CoinBuy from '../components/CoinBuy'
import CoinSVG from '../components/CoinSvg'
import LinkExtBlank from '../components/LinkExtBlank'
import { GET_PAGE_DATA, GET_META_COIN } from '../graphql/queries'

interface RouteParams {
  coinId: string
}

const CoinPage: React.FC = () => {
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

      <div className={classes.inner}>
        <Typography
          color="primary"
          variant="h4"
          gutterBottom
          className={classes.title}
        >
          {dataCoin.name}
        </Typography>
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

        <Typography variant="h6" gutterBottom className={classes.infoParagraph}>
          Buy now
        </Typography>

        <div className={classes.boxBuy}>
          <CoinBuy coin={dataCoin} />
        </div>

        <Typography variant="h6" gutterBottom className={classes.infoParagraph}>
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
            <ListItemText
              primary="Last Trade Price"
              className={classes.column}
            />
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
            <ListItemText
              primary="Price at Highest"
              className={classes.column}
            />
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
            <ListItemText
              primary="Price at Lowest"
              className={classes.column}
            />
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

        {metadata && metaCoin.description && (
          <Fragment>
            <Typography
              variant="h6"
              gutterBottom
              className={classes.infoParagraph}
            >
              Description
            </Typography>
            <Paper className={classes.card}>
              <Typography variant="body1">{metaCoin.description}</Typography>
            </Paper>
          </Fragment>
        )}

        {metadata && metaCoin.urls && (
          <div className={classes.links}>
            <Typography
              variant="h6"
              gutterBottom
              className={classes.infoParagraph}
            >
              Links
            </Typography>
            <Grid container>
              {!!metaCoin.urls.website.length && (
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <strong>Website:</strong>
                    <br />
                    {metaCoin.urls.website.map((url: string) => (
                      <LinkExtBlank key={url} url={url} br />
                    ))}
                  </Paper>
                </Grid>
              )}

              {!!metaCoin.urls.twitter.length && (
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <strong>Social Media:</strong>
                    <br />
                    {metaCoin.urls.twitter.map((url: string) => (
                      <LinkExtBlank key={url} url={url} br />
                    ))}
                  </Paper>
                </Grid>
              )}

              {!!metaCoin.urls.chat.length && (
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <strong>Chat:</strong>
                    <br />
                    {metaCoin.urls.chat.map((url: string) => (
                      <LinkExtBlank key={url} url={url} br />
                    ))}
                  </Paper>
                </Grid>
              )}
            </Grid>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoinPage

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.typography.pxToRem(theme.spacing(6)),
    marginRight: theme.typography.pxToRem(theme.spacing(6)),
    paddingTop: theme.typography.pxToRem(theme.spacing(1)),
    paddingBottom: theme.typography.pxToRem(theme.spacing(6)),
    [theme.breakpoints.only('xs')]: {
      padding: theme.typography.pxToRem(theme.spacing(2)),
      marginLeft: theme.typography.pxToRem(theme.spacing(1)),
      marginRight: theme.typography.pxToRem(theme.spacing(1))
    }
  },
  inner: {
    position: 'relative',
    maxWidth: '64rem'
  },
  title: {
    lineHeight: '3rem'
  },
  pageAvatar: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  infoParagraph: {
    margin: '1rem 0',
    fontWeight: 500
  },
  dataParagraph: {
    marginBottom: '2.5rem'
  },
  column: {
    flexBasis: 0
  },
  progress: {
    color: green[500]
  },
  backButton: {
    marginBottom: theme.typography.pxToRem(theme.spacing(1))
  },
  boxBuy: {
    marginBottom: theme.typography.pxToRem(theme.spacing(5))
  },
  card: {
    padding: theme.typography.pxToRem(theme.spacing(2)),
    marginBottom: theme.typography.pxToRem(theme.spacing(3))
  },
  links: {
    marginBottom: theme.typography.pxToRem(theme.spacing(3))
  },
  paper: {
    padding: theme.typography.pxToRem(theme.spacing(2)),
    margin: theme.typography.pxToRem(theme.spacing(1)),
    marginBottom: theme.typography.pxToRem(theme.spacing(2)),
    lineHeight: theme.typography.pxToRem(theme.spacing(3)),
    color: theme.palette.text.secondary
  }
}))
