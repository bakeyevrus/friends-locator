import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import FeedbackFormContainer from './FeedbackFormContainer';

const styles = theme => ({
  root: {
    minHeight: '100vh'
  },
  welcomeSection: {
    height: '100vh',
    padding: theme.spacing.unit * 4,
    paddingTop: theme.mixins.toolbar.minHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5C6BC0'
  },
  text: {
    marginTop: theme.spacing.unit * 4,
    color: theme.palette.primary.contrastText,
    fontWeight: 300
  },
  welcomeButton: {
    backgroundColor: '#ed686e'
  },
  feedbackSection: {
    minHeight: '50vh',
    padding: theme.spacing.unit * 8
  }
});

function WelcomeScreen(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.welcomeSection}>
        <Logo />
        <Typography className={classes.text} align="center" paragraph variant="headline">
          Find out more about the favorite places of your friends or relatives
        </Typography>
        {/* <Button variant="raised" component={props => <Link to="/locate" {...props} />}> */}
        <Button variant="contained" color="secondary" className={classes.welcomeButton}>
          Get Started
        </Button>
      </div>
      <div className={classes.feedbackSection}>
        <FeedbackFormContainer />
      </div>
    </div>
  );
}

WelcomeScreen.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    welcomeSection: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles, { withTheme: true })(WelcomeScreen);
