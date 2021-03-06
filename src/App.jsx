import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar';
import WelcomeScreen from './components/WelcomeScreen';
import LocateScreenContainer from './containers/LocateScreenContainer';

const theme = createMuiTheme();
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/home" component={WelcomeScreen} />
          <Route path="/locate" component={LocateScreenContainer} />
          <Redirect to="/home" />
        </Switch>
      </main>
    </MuiThemeProvider>
  );
}

export default App;
