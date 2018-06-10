import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const styles = {
  progress: {
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

const Loader = (props) => {
  const { label, value, classes } = props;

  return (
    <div className={classes.progress}>
      <Typography noWrap gutterBottom align="center" variant="body1">
        {label}
      </Typography>
      <CircularProgress size={100} value={value} variant={value > 0 ? 'static' : 'indeterminate'} />
    </div>
  );
};

Loader.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  value: PropTypes.number
};

Loader.defaultProps = {
  value: 0
};

export default withStyles(styles)(Loader);
