import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/client'
import { GET_COINS_LIST } from '../../graphql/queries'
import List from '@material-ui/core/List'
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

const CoinsUserFavourites = () => {
  const [globalState, globalActions] = useGlobal()
  const { loading, error, data, refetch, fetchMore, networkStatus } = useQuery(
    GET_COINS_LIST,
    {
      variables: {
        offset: 0,
        limit: 20,
        symbols: globalState.userCoinFavourites.join('|')
      }
    }
  )

  return (
    <div>
      <List>
        {data &&
          data.coins.map((coin, ix) => (
            <CoinItem key={`${coin.name}${ix}`} coin={coin} />
          ))}
      </List>
      {/* {globalState.userCoinFavourites.map((userCoinSymbol) => {
        return userCoinSymbol + ', '
      })} */}
    </div>
  )
}

CoinsUserFavourites.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CoinsUserFavourites)
