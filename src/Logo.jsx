import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from './logo.png';
import logo1 from './logo-1.png';

const styles = {
  logoContainer: {
    height: '250px',
    width: '250px',
    animationName: 'App-logo-container-spin',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'linear'
  },
  '@keyframes App-logo-container-spin': {
    from: {
      backgroundImage: `url(${logo})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      transform: 'rotateY(0deg)'
    },
    to: {
      backgroundImage: `url(${logo1})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      transform: 'rotateY(180deg)'
    }
  }
};

function Logo({ classes }) {
  return (
    <div className={classes.logoContainer} />
  );
}

Logo.propTypes = {
  classes: PropTypes.shape({
    logoContainer: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(Logo);
