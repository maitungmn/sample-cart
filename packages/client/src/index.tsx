import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import { Router, Switch, Route } from 'react-router-dom';
import history from "./history";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={App} />
          </Switch>
        </Router>
      </Suspense>
    </ThemeProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);
