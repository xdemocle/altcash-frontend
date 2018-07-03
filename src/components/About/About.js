import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  }
});

class About extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1 className="display-3">About Me</h1>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
        <p>kblhb bhk bhk bhbh  bhb l bk kb </p>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(About);
