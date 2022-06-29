import { Button, Grid, Icon, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Parallax } from 'react-parallax';
import useStyles from './use-styles';

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Parallax
        bgImage={<Image src="/assets/hero.jpg" />}
        strength={300}
        bgStyle={{ top: '-5%' }}
      >
        <div
          style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}
        >
          <div className={classes.parallaxContent}>
            <Typography
              variant="h2"
              gutterBottom
              color="inherit"
              className={clsx(
                classes.typographyShadow,
                classes.typographyMainTitle
              )}
            >
              Altcash
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              color="inherit"
              className={classes.typographyShadow}
            >
              Buy crypto coins fast and easy in South Africa!
            </Typography>
            <hr className={classes.heroDivider} />
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.ctoButton}
              component={Link}
              href="/buy"
            >
              Buy Altcoins now
            </Button>
          </div>
        </div>
      </Parallax>

      <Grid
        className={classes.gridContainer}
        container
        alignContent="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom color="primary" align="center">
            The best way to start investing in crypto currencies!
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            color="secondary"
            align="center"
          >
            A new service for South Africans to buy crypto coins with credit
            card, bank transfer, Masterpass, and Snapscan.
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            color="secondary"
            align="center"
          >
            Fast, anonymous and easy instant buying.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.ctoButton}
            component={Link}
            href="/buy"
          >
            Buy Altcoins now
          </Button>
        </Grid>
      </Grid>

      <Parallax
        bgImage={<Image src="/assets/section.jpg" />}
        strength={300}
        bgStyle={{ top: '-20%' }}
      >
        <div style={{ minHeight: '45vh' }}>
          <div className={classes.parallaxContent}>
            <Grid container alignContent="center" justifyContent="center">
              <Grid
                item
                xs={12}
                sm={5}
                lg={4}
                className={classes.gridOverlayItem}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color="primary"
                  align="center"
                >
                  Company info
                </Typography>
                <Typography variant="body1" color="inherit" align="left">
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat
                  tincidunt ornare. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas. Nullam
                  in aliquet odio. Aliquam eu est vitae tellus bibendum
                  tincidunt. Suspendisse potenti.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
                lg={4}
                className={classes.gridOverlayItem}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color="primary"
                  align="center"
                >
                  Contact Us
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  color="inherit"
                  align="left"
                >
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat
                  tincidunt ornare.
                </Typography>
                <Typography variant="body1" color="inherit" align="left">
                  <Tooltip title="ONLY Whatsapp messages" placement="top">
                    <Button
                      variant="text"
                      size="small"
                      href="https://api.whatsapp.com/send?phone=34604367510&text=Hello%20Alts.sale%20Customer%20Care"
                    >
                      <Icon className={classes.leftIcon}>chat</Icon> Whatsapp:
                      +27 777 867 5309
                    </Button>
                  </Tooltip>
                  <Tooltip title="Send a message on Telegram" placement="top">
                    <Button variant="text" size="small" href="">
                      <Icon className={classes.leftIcon}>chat</Icon> Telegram:
                      Altcash
                    </Button>
                  </Tooltip>
                  <Button variant="text" size="small" href="">
                    <Icon className={classes.leftIcon}>mail</Icon> Send e-mail
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Landing;
