import React, {Component} from 'react';
import './SearchPlayer.css';
import {getPlayers} from '../../api';
import {noTilde} from '../../utils';
import players from '../../resource/players';
import AutoComplete from '../AutoComplete/AutoComplete';
import PlayerCard from '../PlayerCard/PlayerCard';
import Fuse from 'fuse.js';

function formatPlayerName(playerName) {
    return noTilde(playerName.toLowerCase()).replace(/-/g, ' ').replace(/\s+/g, '');
}

const formatedPlayers = players.map(player => {
    return {
        ...player,
        name: formatPlayerName(player.firstname + player.lastname)
    }
})
const fuse = new Fuse(formatedPlayers, {
    keys: ['name']
});

class SearchPlayer extends Component {

    state = {
        players: []
    }

    componentDidMount() {
        this.serverRequest = getPlayers().then(players => {
            this.players = players;
        });
    }

    onClearSelection = () => {
        this.setState({players: [], playerSelected: null});
    }

    onPlayerSelected = (playerSelected) => {
        const players = this.players.filter(player => player.id === playerSelected.id);
        this.setState({players, playerSelected: playerSelected.id});
    }

    render() {
        return (
            <div>
                <h1>Search a player in yours mates teams</h1>
                <AutoComplete debounceTime={500} containerClassName="SearchPlayer__autocomplete" itemClassName="PlayerCard__item" menuClassName="PlayerCard__container" onClearSelection={this.onClearSelection} hintText="Type of the name of a player" displayContentItem={(item) => (<PlayerCard player={item}/>)} filterFunc={(searchInput) => {
                    return fuse.search(formatPlayerName(searchInput)).slice(0, 5);
                }} onItemClicked={this.onPlayerSelected}/> {this.state.players.length > 0 && (
                    <div className="SearchPlayer__result">
                        {this.state.players.map((player, index) => (
                            <div className="card SearchPlayer__resultCard" key={index}>
                                <div>{player.teamName}</div>
                                <div className="SearchPlayer__resultCardLeague">{player.leagueName}</div>
                            </div>
                        ))
}
                    </div>
                )}
                {this.state.playerSelected && this.state.players.length === 0 && (
                    <div>Not purchased</div>
                )}
            </div>
        );
    }
}

export default SearchPlayer;
