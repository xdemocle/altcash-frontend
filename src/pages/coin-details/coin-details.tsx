/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery } from '@apollo/client';
import { ArrowBack } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography
} from '@mui/material';
import { Fragment } from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { btcToRandPrice } from '../../common/currency';
import CoinBuy from '../../components/coin-buy';
import CoinSVG from '../../components/coin-svg';
import LinkExtBlank from '../../components/link-ext-blank';
import { GET_PAGE_DATA, GET_META_COIN, GET_PAIR } from '../../graphql/queries';
import useStyles from './use-styles';

const CoinPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { coinId } = useParams();
  const { data, loading } = useQuery(GET_PAGE_DATA, {
    // We refresh data list at least at reload
    fetchPolicy: 'cache-and-network',
    variables: {
      id: coinId?.toUpperCase()
    }
  });

  const { data: metadata } = useQuery(GET_META_COIN, {
    // We refresh data list at least at reload
    fetchPolicy: 'cache-first',
    variables: {
      id: coinId?.toUpperCase()
    }
  });

  const { data: dataPair } = useQuery(GET_PAIR, {
    fetchPolicy: 'cache-first',
    variables: {
      pair: 'XBTZAR'
    }
  });

  const dataCoin = data ? data.coin : {};
  const dataSummary = data ? data.summary : { quoteVolume: 0, volume: 0 };
  const dataTicker = data ? data.ticker : {};
  const metaCoin = metadata ? metadata.metaCoin : {};
  const bitcoinRandPrice = dataPair ? dataPair.pair.last_trade : undefined;

  const handleBackButton = () => {
    navigate('/buy');
    // TODO refactor
    // if (history.action === 'PUSH') {
    //   history.goBack();
    // } else {
    //   navigate('/buy');
    // }
  };

  return (
    <div className={classes.root}>
      <Tooltip title="Go back to coin list">
        <Button
          color="primary"
          size="large"
          aria-label="Find a coin"
          onClick={handleBackButton}
          startIcon={<ArrowBack />}
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
          {!loading && !metaCoin.description && (
            <CoinSVG coinSymbol={coinId || ''} />
          )}
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
              // @ts-ignore
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
  );
};

export default CoinPage;
