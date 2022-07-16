import { useQuery } from '@apollo/client';
import {
  Star,
  List as ListIcon,
  NewReleases as NewReleasesIcon
} from '@mui/icons-material';
import { Paper, Tab, Tabs, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apolloClient } from '../../common/apollo/apollo-client';
import {
  BUY_TAB_ALL,
  BUY_TAB_FAVOURITE,
  BUY_TAB_FEATURED,
  SYMBOLS_FEATURED
} from '../../common/constants';
// import HeaderFabButtons from '../../components/header-fab-buttons';
import TopBarSearch from '../../components/top-bar-search';
import CoinsList from '../../containers/coins-list';
import CoinsUserList from '../../containers/coins-user-list';
import { GET_MARKETS, GET_META_COIN_LOGO } from '../../graphql/queries';
import { Market } from '../../graphql/types';
import useGlobal from '../../hooks/use-global';
import useStyles from '../../styles/buy-use-styles';

interface BuyTabPageProps {
  markets: Market[];
}

const BuyTabPage: NextPage<BuyTabPageProps> = ({ markets }) => {
  const router = useRouter();
  const classes = useStyles();
  const { tab: tabNumber, setTab } = useGlobal();
  const tab = router.query.tab;
  const symbolsFeatured = SYMBOLS_FEATURED.sort();

  useQuery(GET_META_COIN_LOGO, {
    fetchPolicy: 'cache-first'
  });

  const handleChange = (tabNumber: number) => {
    setTab(tabNumber);
    let slug = 'featured';

    if (tabNumber === BUY_TAB_FEATURED) {
      slug = 'featured';
    } else if (tabNumber === BUY_TAB_ALL) {
      slug = 'all';
    } else if (tabNumber === BUY_TAB_FAVOURITE) {
      slug = 'favourite';
    }

    router.push(`/buy/${slug}`, undefined, { shallow: true });
  };

  // This affect only the selected UI tab
  useEffect(() => {
    let slug = 0;

    if (tab === 'featured') {
      slug = BUY_TAB_FEATURED;
    } else if (tab === 'all') {
      slug = BUY_TAB_ALL;
    } else if (tab === 'favourite') {
      slug = BUY_TAB_FAVOURITE;
    }

    setTab(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTab]);

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

      {/* <HeaderFabButtons /> */}
      <TopBarSearch />

      <Paper className={classes.paper}>
        <Tabs
          value={tabNumber}
          onChange={(_evt, tabNumber) => handleChange(tabNumber)}
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

      {tab === 'featured' && (
        <CoinsUserList markets={markets} predefined={symbolsFeatured} />
      )}
      {tab === 'all' && <CoinsList markets={markets} />}
      {tab === 'favourite' && <CoinsUserList markets={markets} />}
    </div>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { tab: 'featured' } },
//       { params: { tab: 'all' } },
//       { params: { tab: 'favourite' } }
//     ],
//     fallback: true
//   };
// }

// export async function getStaticProps() {
//   const { data } = await apolloClient.query({
//     query: GET_MARKETS
//   });

//   return {
//     props: {
//       markets: data.markets
//     }
//   };
// }

export default BuyTabPage;
