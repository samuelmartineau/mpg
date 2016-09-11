import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import './League.css';

const League = ({league}) => {

  return (
      <Link to={"/league/" + league.id}>
        {league.name}
      </Link>
  );
}

League.propTypes = {
  league: PropTypes.object.isRequired
}

export default League;
