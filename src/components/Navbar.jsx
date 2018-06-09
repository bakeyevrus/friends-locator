import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Navbar() {
  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Typography variant="title" color="inherit">
          Friends Locator
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
