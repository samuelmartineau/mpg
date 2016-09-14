import React, {PropTypes} from 'react';
import './SliderCard.css';

const SliderCard = ({title, image}) => {
    return (
        <div className="SliderCard">
          <img className="SliderCard__image" src={image} alt="logo" />
          <h3 className="SliderCard__title">{title}</h3>
        </div>
    );
}

SliderCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}

export default SliderCard;
