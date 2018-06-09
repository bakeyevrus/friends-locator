import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import WelcomeScreen from './containers/WelcomeScreen';

const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <WelcomeScreen />
    </MuiThemeProvider>
  );
}

export default App;
