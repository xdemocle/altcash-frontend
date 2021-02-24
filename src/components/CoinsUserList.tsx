import { useQuery } from '@apollo/client'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import useGlobal from '../common/globalStateHook'
import { GET_COINS } from '../graphql/queries'
import CoinItem, { Coin } from './CoinItem'

type CoinsUserListParams = {
  predefined?: string[]
}

const CoinsUserList: React.FC<Props> = ({
  predefined
}: CoinsUserListParams) => {
  const classes = useStyles()
  const [globalState] = useGlobal()
  const { data, networkStatus } = useQuery(GET_COINS, {
    variables: {
      symbols: predefined
        ? predefined.join('|')
        : globalState.userCoinFavourites.join('|')
    }
  })

  return (
    <div className={classes.root}>
      {data && data.coins && !data.coins.length && networkStatus === 7 && (
        <Typography variant="subtitle1">
          No starred coins. Add some first.
        </Typography>
      )}
      {data && data.coins && (
        <List>
          {data.coins.map((coin: Coin, ix: number) => (
            <CoinItem key={`${coin.name}${ix}`} coin={coin} />
          ))}
        </List>
      )}
    </div>
  )
}

export default CoinsUserList

const useStyles = makeStyles(({ typography, spacing }: Theme) => ({
  root: {
    // padding: typography.pxToRem(spacing(1))
    // [breakpoints.only('xs')]: {
    //   padding: theme.typography.pxToRem(theme.spacing(1.5))
    // }
  }
}))
