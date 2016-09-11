import React, {Component, PropTypes} from 'react';
import './Login.css';
import {login} from '../../auth';

class Login extends Component {
    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    state = {
      error: false
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const email = this.refs.email.value;
        const pass = this.refs.pass.value;

        login(email, pass)
          .then(() => {
            const {location} = this.props;

            if (location.state && location.state.nextPathname) {
                this.context.router.replace(location.state.nextPathname);
            } else {
                this.context.router.replace('/');
            }
          })
          .catch(() => {
            this.setState({error: true});
          });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label><input ref="email" placeholder="email"/></label>
                <label><input ref="pass" placeholder="password"/></label>
                <button type="submit">login</button>
                {this.state.error && (
                    <p>Bad login information</p>
                )}
            </form>
        );
    }
}

export default Login;
