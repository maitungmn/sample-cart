import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './theme';

import './index.scss';

import App from './components/dashboard/App';
import { StoreProvider } from './contexts/store';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Switch>
              <StoreProvider>
                <Route exact path="/" component={App} />
              </StoreProvider>
            </Switch>
          </Router>
        </Suspense>
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
