import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App/App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';
import SearchPlayer from './components/SearchPlayer/SearchPlayer';
import {loggedIn} from './auth';

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function onlyNotAuth(nextState, replace) {
  if (loggedIn()) {
    replace({
      pathname: '/',
      state: {}
    })
  }
}

const router = (
  <Router history={browserHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="login" component={Login} onEnter={onlyNotAuth}/>
          <Route path="searchPlayer" component={SearchPlayer} onEnter={requireAuth} />
          <Route path="*" component={NoMatch}/>
      </Route>
  </Router>
);

export default router;
