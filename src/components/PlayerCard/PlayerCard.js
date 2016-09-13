import React, {PropTypes} from 'react';
import './PlayerCard.css';

const PlayerCard = ({player}) => {
    return (
        <div className="card PlayerCard">
            <div className="PlayerCard__name">{player.firstname} {player.lastname}</div>
            <div className="PlayerCard__club">{player.club}</div>
        </div>
    );
}
PlayerCard.propTypes = {
    player: PropTypes.object.isRequired
}

export default PlayerCard;
