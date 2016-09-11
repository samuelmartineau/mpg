import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';
import './App.css';
import * as auth from '../../auth';

class App extends Component {
  state = {
    loggedIn: auth.loggedIn()
  }

  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    auth.logout();
    this.setState({
      loggedIn: false
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to MPG</h2>
        </div>
        <div>
          {this.state.loggedIn ? (
            <button onClick={this.onLogout}>Log out</button>
          ) : (
            <Link to="/login">Sign in</Link>
          )}
        </div>
        <div><Link to="/leagues">Leagues</Link></div>
        <div><Link to="/searchPlayer">Seach Player</Link></div>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    );
  }
}

export default App;
