import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/client'
import { GET_COINS_LIST } from '../../graphql/queries'
import CoinItem from './CoinItem'
import useGlobal from '../../common/globalStateHook'

const styles = (theme) => ({
  root: {
    padding: theme.typography.pxToRem(theme.spacing(3)),
    [theme.breakpoints.only('xs')]: {
      padding: theme.typography.pxToRem(theme.spacing(1.5))
    }
  },
  title: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center'
    }
  },
  buttonLoadMore: {
    margin: '0 auto'
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
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
})

const CoinsUserFavourites = (props) => {
  const [globalState] = useGlobal()
  const { data, networkStatus } = useQuery(GET_COINS_LIST, {
    variables: {
      offset: 0,
      limit: 20,
      needle: globalState.coinPageNeedle,
      symbols: props.predefined
        ? props.predefined.join('|')
        : globalState.userCoinFavourites.join('|')
    }
  })

  return (
    <Fragment>
      {data && data.coins && !data.coins.length && networkStatus === 7 && (
        <Typography variant="subtitle1">
          No starred coins. Add some first.
        </Typography>
      )}
      {data && data.coins && (
        <List>
          {data.coins.map((coin, ix) => (
            <CoinItem key={`${coin.name}${ix}`} coin={coin} />
          ))}
        </List>
      )}
    </Fragment>
  )
}

CoinsUserFavourites.propTypes = {
  classes: PropTypes.object.isRequired,
  predefined: PropTypes.array
}

export default withStyles(styles, { withTheme: true })(CoinsUserFavourites)
