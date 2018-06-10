import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Typography } from '@material-ui/core';

const styles = {
  retryWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    margin: 'auto',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0'
  }
};

function TryAgain(props) {
  const { onRetryClick, classes } = props;

  return (
    <div className={classes.retryWrapper}>
      <Typography variant="headline" align="center" paragraph>
        Oops, something went wrong. Do you want to try again?
      </Typography>
      <Button variant="raised" onClick={onRetryClick}>
        Try Again
      </Button>
    </div>
  );
}

TryAgain.propTypes = {
  onRetryClick: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(TryAgain);
