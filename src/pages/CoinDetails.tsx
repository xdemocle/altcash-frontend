import { useQuery } from '@apollo/client'
import { Button, Grid, Paper, Tooltip } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { green } from '@material-ui/core/colors'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { btcToRandPrice } from '../common/currency'
import CoinBuy from '../components/CoinBuy'
import CoinSVG from '../components/CoinSvg'
import LinkExtBlank from '../components/LinkExtBlank'
import { GET_PAGE_DATA, GET_META_COIN, GET_PAIR } from '../graphql/queries'

interface RouteParams {
  coinId: string
}

const CoinPage: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { coinId } = useParams<RouteParams>()
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

  const { data: dataPair } = useQuery(GET_PAIR, {
    fetchPolicy: 'cache-first',
    variables: {
      pair: 'XBTZAR'
    }
  })

  const dataCoin = data ? data.coin : {}
  const dataSummary = data ? data.summary : { quoteVolume: 0, volume: 0 }
  const dataTicker = data ? data.ticker : {}
  const metaCoin = metadata ? metadata.metaCoin : {}
  const bitcoinRandPrice = dataPair ? dataPair.pair.last_trade : undefined

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
                bitcoinRandPrice
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
                bitcoinRandPrice
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
              primary={`${btcToRandPrice(dataSummary.high, bitcoinRandPrice)}`}
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
              primary={`${btcToRandPrice(dataSummary.low, bitcoinRandPrice)}`}
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
                bitcoinRandPrice
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

const useStyles = makeStyles(
  ({ breakpoints, palette, spacing, typography }: Theme) => ({
    root: {
      paddingTop: typography.pxToRem(spacing(2)),
      marginLeft: typography.pxToRem(spacing(2)),
      paddingBottom: typography.pxToRem(spacing(2)),
      marginRight: typography.pxToRem(spacing(2)),
      [breakpoints.up('sm')]: {
        paddingTop: typography.pxToRem(spacing(2)),
        marginLeft: typography.pxToRem(spacing(5)),
        paddingBottom: typography.pxToRem(spacing(5)),
        marginRight: typography.pxToRem(spacing(5))
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
      marginBottom: typography.pxToRem(spacing(1))
    },
    boxBuy: {
      marginBottom: typography.pxToRem(spacing(5))
    },
    card: {
      padding: typography.pxToRem(spacing(2)),
      marginBottom: typography.pxToRem(spacing(3))
    },
    links: {
      marginBottom: typography.pxToRem(spacing(3))
    },
    paper: {
      padding: typography.pxToRem(spacing(2)),
      margin: typography.pxToRem(spacing(1)),
      marginBottom: typography.pxToRem(spacing(2)),
      lineHeight: typography.pxToRem(spacing(3)),
      color: palette.text.secondary
    }
  })
)
