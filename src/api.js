import 'whatwg-fetch';
import Q from 'q';
import constants from './constants';
import {getToken} from './auth';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        return response.json().then((result) => {
            error.response = result
            throw error
        })
    }
}

function parseJSON(response) {
    return response.json()
}

export function login(email, password) {
    return window.fetch(constants.baseApi + constants.routes.login, {
        method: 'POST',
        body: JSON.stringify({email: email, language: 'fr-FR', password: password})
    }).then(checkStatus).then(parseJSON);
}

export function getDashboard() {
    return window.fetch(constants.baseApi + constants.routes.dashboard, {
        headers: {
            authorization: getToken()
        }
    }).then(checkStatus).then(parseJSON).then(response => response.data);
}

export function getLeaguePlayers(leagueId) {
    return window.fetch(constants.baseApi + constants.routes.teams.replace(':leagueId', leagueId), {
        headers: {
            authorization: getToken()
        }
    }).then(checkStatus).then(parseJSON);
}

export function getPlayers() {
    let leaguesDetail;
    return getDashboard().then(response => {
        leaguesDetail = response.leagues.filter(league => league.leagueStatus === 4);
        const promises = leaguesDetail.map(league => {
            return getLeaguePlayers(league.id);
        });
        return Q.all(promises).then(results => {
            return results.reduce((acc, leagueTeams, index) => {
                Object.keys(leagueTeams.teams).forEach(key => {
                    const team = leagueTeams.teams[key];
                    team.players.forEach(player => {
                        player.teamName = team.name;
                        player.leagueName = leaguesDetail[index].name;
                    });
                    acc = acc.concat(team.players);
                });
                return acc;
            }, []);
        });

    });

}
