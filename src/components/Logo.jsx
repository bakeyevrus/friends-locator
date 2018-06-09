import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logoEarth from './logo-earth.png';
import logoPeople from './logo-people.png';

const styles = theme => ({
  logoContainer: {
    height: '150px',
    width: '150px',
    // Adding some responsiveness
    [theme.breakpoints.up('sm')]: {
      height: '200px',
      width: '200px'
    },
    [theme.breakpoints.only('lg')]: {
      height: '250px',
      width: '250px'
    },
    [theme.breakpoints.only('xl')]: {
      height: '300px',
      width: '300px'
    },
    position: 'relative'
  },
  logo: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    animationDuration: '2.5s',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'linear'
  },
  logoEarth: {
    // Make earth logo white
    filter: 'brightness(0) invert(0.9)',
    animationName: 'logo-earth-spin'
  },
  logoPeople: {
    animationName: 'logo-people-spin'
  },
  '@keyframes logo-earth-spin': {
    from: {
      backgroundImage: `url(${logoEarth})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      transform: 'rotateY(0deg)'
    },
    to: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      transform: 'rotateY(180deg)'
    }
  },
  '@keyframes logo-people-spin': {
    from: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      transform: 'rotateY(180deg)'
    },
    to: {
      backgroundImage: `url(${logoPeople})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      transform: 'rotateY(360deg)'
    }
  }
});

function Logo({ classes }) {
  return (
    <div className={classes.logoContainer}>
      <div className={[classes.logo, classes.logoEarth].join(' ')} />
      <div className={[classes.logo, classes.logoPeople].join(' ')} />
    </div>
  );
}

Logo.propTypes = {
  classes: PropTypes.shape({
    logoContainer: PropTypes.string,
    logo: PropTypes.string,
    logogEarth: PropTypes.string,
    logogPeople: PropTypes.string
  }).isRequired
};

export default withStyles(styles, { withTheme: true })(Logo);
