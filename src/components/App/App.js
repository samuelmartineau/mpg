import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import logo from './soccer_ball.svg';
import './App.css';
import * as auth from '../../auth';

class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    loggedIn: auth.loggedIn()
  }

  constructor(props) {
    super(props);
    auth.setOnChangeCb(this.onLog);
  }

  onLogout = () => {
    auth.logout();
    this.setState({
      loggedIn: false
    });
    this.context.router.replace('/');
  }

  onLog = (logged) => {
    this.setState({
      loggedIn: logged
    });
  }

  render() {
    return (
      <div className="App">
        <Link to="/" className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to MPG finder</h2>
        </Link>
        <div>
          {this.state.loggedIn ? (
            <button onClick={this.onLogout}>Log out</button>
          ) : (
            <Link to="/login">Sign in</Link>
          )}
        </div>
        <div><Link className="App__searchLink" to="/searchPlayer">Search Player</Link></div>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    );
  }
}

export default App;
