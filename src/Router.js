import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App/App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Leagues from './components/Leagues/Leagues';
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

const router = (
  <Router history={browserHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="login" component={Login}/>
          <Route path="leagues" component={Leagues} onEnter={requireAuth} />
          <Route path="searchPlayer" component={SearchPlayer} onEnter={requireAuth} />
          <Route path="*" component={NoMatch}/>
      </Route>
  </Router>
);

export default router;
