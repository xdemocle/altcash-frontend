import { useQuery } from '@apollo/client';
import {
  Star,
  List as ListIcon,
  NewReleases as NewReleasesIcon
} from '@mui/icons-material';
import { Paper, Tab, Tabs, Typography } from '@mui/material';
import HeaderFabButtons from '../../components/header-fab-buttons';
import { SYMBOLS_FEATURED } from '../../constants';
import CoinsList from '../../containers/coins-list';
import CoinsUserList from '../../containers/coins-user-list';
import { useGlobal } from '../../context/global';
import { GET_META_COIN_LOGO } from '../../graphql/queries';
import useStyles from './use-styles';

const BuyTabPage = () => {
  const classes = useStyles();
  const { tab, setTab } = useGlobal();
  const symbolsFeatured = SYMBOLS_FEATURED.sort();

  useQuery(GET_META_COIN_LOGO, {
    fetchPolicy: 'cache-first'
  });

  const handleChange = (tab: number) => {
    setTab(tab);
  };

  return (
    <div className={classes.root}>
      <Typography
        color="primary"
        variant="h4"
        gutterBottom
        className={classes.title}
      >
        Altcoins
      </Typography>

      <Paper className={classes.paper}>
        <Tabs
          value={tab}
          onChange={(evt, tab) => handleChange(tab)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="Featured"
            icon={<NewReleasesIcon />}
            classes={{ root: classes.tabRoot }}
          />
          <Tab
            label="All Coins"
            icon={<ListIcon />}
            classes={{ root: classes.tabRoot }}
          />
          <Tab
            label="Favourite"
            icon={<Star />}
            classes={{ root: classes.tabRoot }}
          />
        </Tabs>
      </Paper>

      <HeaderFabButtons />

      {tab === 0 && <CoinsUserList predefined={symbolsFeatured} />}
      {tab === 1 && <CoinsList />}
      {tab === 2 && <CoinsUserList />}
    </div>
  );
};

export default BuyTabPage;
