import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Parallax } from 'react-parallax';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import image1 from '../assets/hero.jpg';
import image2 from '../assets/section.jpg';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    backgroundColor: '#fff'
  },
  gridOverlayItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '1.5rem',
    color: '#232323'
  },
  parallaxContent: {
    padding: 20,
    position: 'absolute',
    top: '50%',
    left: '0',
    width: '100%',
    transform: 'translate(0,-50%)',
    color: theme.palette.primary.contrastText,
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  typographyMainTitle: {
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  typographyShadow: {
    textShadow: '1px 1px 1px rgba(0,0,0,0.35)'    
  },
  heroDivider: {
    background: '#fff',
    opacity: 0.5,
    height: '0.3rem',
    width: '65%'
  },
  ctoButton: {
    margin: theme.typography.pxToRem(theme.spacing.unit * 2),
    padding: '.9rem ' + theme.typography.pxToRem(theme.spacing.unit * 4),
    minHeight: 'auto',
    lineHeight: 'normal'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

function Landing(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Parallax bgImage={image1} strength={300} bgStyle={{top: '-5%'}}>
        <div style={{height: '65vh'}}>
          <div className={classes.parallaxContent}>
            <Typography variant="display3" gutterBottom color="inherit" className={classNames(classes.typographyShadow, classes.typographyMainTitle)}>
              Altcoins Sale
            </Typography>
            <Typography variant="display1" gutterBottom color="inherit" className={classes.typographyShadow}>
              Buy crypto coins fast and easy in South Africa!
            </Typography>
            <hr className={classes.heroDivider} />
            <Button variant="raised" color="primary" size="large" className={classes.ctoButton}>
              Buy Altcoins now
            </Button>
          </div>
        </div>
      </Parallax>

      <Grid className={classes.gridContainer} container alignContent="center" justify="center">
        <Grid item xs={12} sm={12} style={{padding: '5rem 1.5rem', textAlign: 'center'}}>
          <Typography variant="display1" gutterBottom color="primary" align="center">
            The best way to start investing in crypto currencies!
          </Typography>
          <Typography variant="subheading" gutterBottom color="secondary" align="center">
            A new service for South Africans to buy crypto coins with credit card and bank transfer.
          </Typography>
          <Typography variant="subheading" color="secondary" align="center">
            Fast, anonymous and easy instant buying.
          </Typography>
          <Button variant="raised" color="secondary" size="small" className={classes.ctoButton}>
            Buy Altcoins now
          </Button>
        </Grid>
        
        {/*<Grid item xs={12} sm={3} style={{padding: '1rem'}}>
          <Typography variant="title" gutterBottom color="inherit" align="center">
            Material Design
          </Typography>
          <Typography variant="body1" gutterBottom color="inherit" align="center">
            Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} style={{padding: '1rem'}}>
          <Typography variant="title" gutterBottom color="inherit" align="center">
            Fast development
          </Typography>
          <Typography variant="body1" gutterBottom color="inherit" align="center">
            Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} style={{padding: '1rem'}}>
          <Typography variant="title" gutterBottom color="inherit" align="center">
            Completely Open Sourced
          </Typography>
          <Typography variant="body1" gutterBottom color="inherit" align="center">
            Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
          </Typography>
        </Grid> */}
      </Grid>
      
      <Parallax bgImage={image2} strength={300} bgStyle={{top: '-20%'}}>
        <div style={{height: 450}}>
          <div className={classes.parallaxContent}>
            <Grid container alignContent="center" justify="center">
              <Grid item xs={10} sm={5} md={4} lg={3} className={classes.gridOverlayItem}>
                <Typography variant="title" gutterBottom color="primary" align="center">
                  Company info
                </Typography>
                <Typography variant="body1" color="inherit" align="left">
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                </Typography>
              </Grid>
              <Grid item xs={10} sm={5} md={4} lg={3} className={classes.gridOverlayItem}>
                <Typography variant="title" gutterBottom color="primary" align="center">
                  Contact Us
                </Typography>
                <Typography variant="body1" gutterBottom color="inherit" align="left">
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </Typography>
                <Typography variant="body1" color="inherit" align="left">
                  <Tooltip title="ONLY Whatsapp messages" placement="top">
                    <Button variant="flat" size="small" href="https://api.whatsapp.com/send?phone=34604367510&text=Hello%20Alts.sale%20Customer%20Care">
                      <Icon className={classes.leftIcon}>phone</Icon> +27 777 867 5309
                    </Button>
                  </Tooltip>
                  <Button variant="flat" size="small">
                    <Icon className={classes.leftIcon}>mail</Icon> Send a message
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
      </Parallax>
    </div>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Landing);