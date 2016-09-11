import React, {Component} from 'react';
import './SearchPlayer.css';
import {getPlayers} from '../../api';
import players from '../../resource/players';
import AutoComplete from '../AutoComplete/AutoComplete';
import PlayerCard from '../PlayerCard/PlayerCard';
import Fuse from 'fuse.js';
const fuse = new Fuse(players, {
    keys: ["firstname", "lastname"]
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
        this.setState({players,
          playerSelected: playerSelected.id
        });
    }

    render() {
        return (
            <div>
                <h1>Search a player in yours mates teams</h1>
                <AutoComplete containerClassName="SearchPlayer__autocomplete" itemClassName="PlayerCard__item" menuClassName="PlayerCard__container" onClearSelection={this.onClearSelection} hintText="Type of the name of a player" displayContentItem={(item) => (
                    <PlayerCard player={item}/>
                )} filterFunc={(searchInput) => {
                    return fuse.search(searchInput);
                }} onItemClicked={this.onPlayerSelected}/> {
                  this.state.players.length > 0 && (
                    <div>
                      {
                        this.state.players.map((player, index) => (
                          <div key={index}>
                              <div>{player.teamName}</div>
                              <div>{player.leagueName}</div>
                          </div>
                        ))
                      }
                  </div>
                  )}
                  {this.state.playerSelected && this.state.players.length === 0 && (
                    <div>Not bought</div>
                  )}
            </div>
        );
    }
}

export default SearchPlayer;
