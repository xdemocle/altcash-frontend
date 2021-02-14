import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/client'
import { GET_COIN } from '../../graphql/queries'
import CoinSVG from './CoinSvg'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.typography.pxToRem(theme.spacing(3)),
    [theme.breakpoints.only('xs')]: {
      padding: theme.typography.pxToRem(theme.spacing(1.5))
    }
  },
  title: {
    lineHeight: '3rem',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center'
    }
  },
  pageAvatar: {
    float: 'left',
    display: 'inline',
    marginTop: '-0.2rem',
    marginRight: '0.5rem'
  }
}))

const CoinPage = (props) => {
  const classes = useStyles()
  const { coinId } = props.match.params
  const { loading, error, data, networkStatus } = useQuery(GET_COIN, {
    // We refresh data list at least at reload
    fetchPolicy: 'cache-and-network',
    variables: {
      id: coinId.toUpperCase()
    }
  })

  // console.log('coinId', coinId)

  return (
    <div className={classes.root}>
      <Typography
        color="primary"
        variant="h4"
        gutterBottom
        className={classes.title}
      >
        <div className={classes.pageAvatar}>
          <CoinSVG coinSymbol={coinId} />
        </div>
        {data && data.coin.name}
      </Typography>
      {/* <span>{data && JSON.stringify(data.coin)}</span> */}
    </div>
  )
}

CoinPage.propTypes = {
  match: PropTypes.object.isRequired
}

export default CoinPage
