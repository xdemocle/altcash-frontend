import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Star, List as ListIcon } from '@material-ui/icons'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import React from 'react'
import useGlobal from '../common/globalStateHook'
import CoinsList from '../components/CoinsList'
import CoinsUserList from '../components/CoinsUserList'
import HeaderFabButtons from '../components/HeaderFabButtons'
import { SYMBOLS_FEATURED } from '../constants'

const BuyTabPage = () => {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  const symbolsFeatured = SYMBOLS_FEATURED.sort()

  const handleChange = (tab: number) => {
    globalActions.setTab(tab)
  }

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
          value={globalState.tab}
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

      {globalState.tab === 0 && <CoinsUserList predefined={symbolsFeatured} />}
      {globalState.tab === 1 && <CoinsList />}
      {globalState.tab === 2 && <CoinsUserList />}
    </div>
  )
}

export default BuyTabPage

const useStyles = makeStyles(({ breakpoints, typography, spacing }: Theme) => ({
  root: {
    position: 'relative',
    paddingTop: typography.pxToRem(spacing(2)),
    marginLeft: typography.pxToRem(spacing(5)),
    paddingBottom: typography.pxToRem(spacing(5)),
    marginRight: typography.pxToRem(spacing(5)),
    [breakpoints.only('xs')]: {
      paddingTop: typography.pxToRem(spacing(2)),
      marginLeft: typography.pxToRem(spacing(2)),
      paddingBottom: typography.pxToRem(spacing(2)),
      marginRight: typography.pxToRem(spacing(2))
    }
  },
  title: {
    lineHeight: '3rem'
  },
  buttonLoadMore: {
    margin: '0 auto'
  },
  rightIcon: {
    marginLeft: spacing(1)
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  bottomListWrapper: {
    position: 'relative',
    textAlign: 'center',
    margin: spacing(1)
  },
  paper: {
    margin: '1rem 0'
  },
  tabRoot: {
    maxWidth: 'none',
    minWidth: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  }
}))
