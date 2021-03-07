import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Router, Switch, Route } from 'react-router-dom';
import theme from './theme';

import './index.scss';

import App from './components/App';
import history from './history';
import { StoreProvider } from './contexts/store';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={App} />
              </Switch>
            </Router>
          </Suspense>
        </div>
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
