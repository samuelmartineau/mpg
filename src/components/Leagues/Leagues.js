import React, {Component} from 'react';
import './Leagues.css';
import {getDashboard} from '../../api';
import League from '../League/League';

class Leagues extends Component {

    state = {
      leagues: []
    }

    componentDidMount() {
        this.serverRequest = getDashboard().then(response => {
          this.setState({leagues: response.leagues});
        });
    }

    render() {
        return (
            <div>
                <h1>Leagues:</h1>
                {this.state.leagues.map((league, index) => <League league={league} key={index}/>)}
            </div>
        );
    }
}

export default Leagues;
