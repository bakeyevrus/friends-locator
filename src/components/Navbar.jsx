import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { HashLink as Link } from 'react-router-hash-link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const feedbackLink = props => (
  <Link to="/home#feedback" {...props}>
    Feedback
  </Link>
);

const styles = {
  menuItems: {
    justifyContent: 'space-between'
  }
};

function Navbar(props) {
  const { classes } = props;
  return (
    <AppBar elevation={0}>
      <Toolbar className={classes.menuItems}>
        <Typography variant="title" color="inherit">
          Friends Locator
        </Typography>
        <Button color="inherit" component={feedbackLink}>
          Feedback
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.shape({
    menuItems: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Navbar);
