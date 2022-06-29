import { useQuery } from '@apollo/client';
import {
  Star,
  List as ListIcon,
  NewReleases as NewReleasesIcon
} from '@mui/icons-material';
import { Paper, Tab, Tabs, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  BUY_TAB_ALL,
  BUY_TAB_FAVOURITE,
  BUY_TAB_FEATURED,
  SYMBOLS_FEATURED
} from '../../common/constants';
import HeaderFabButtons from '../../components/header-fab-buttons';
import CoinsList from '../../containers/coins-list';
import CoinsUserList from '../../containers/coins-user-list';
import { GET_META_COIN_LOGO } from '../../graphql/queries';
import useGlobal from '../../hooks/use-global';
import useStyles from './use-styles';

const BuyTabPage: NextPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const { tab, setTab } = useGlobal();
  const symbolsFeatured = SYMBOLS_FEATURED.sort();

  useQuery(GET_META_COIN_LOGO, {
    fetchPolicy: 'cache-first'
  });

  const handleChange = (tab: number) => {
    setTab(tab);

    let slug = 'featured';

    if (tab === BUY_TAB_FEATURED) {
      slug = 'featured';
    } else if (tab === BUY_TAB_ALL) {
      slug = 'all';
    } else if (tab === BUY_TAB_FAVOURITE) {
      slug = 'favourite';
    }

    router.push(`/buy/${slug}`, undefined, { shallow: true });
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

      <HeaderFabButtons />

      <Paper className={classes.paper}>
        <Tabs
          value={tab}
          onChange={(_evt, tab) => handleChange(tab)}
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

      {tab === 0 && <CoinsUserList predefined={symbolsFeatured} />}
      {tab === 1 && <CoinsList />}
      {tab === 2 && <CoinsUserList />}
    </div>
  );
};

export default BuyTabPage;
