import React, {Component} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import Slider from 'react-slick';
import presentation from './presentation.jpg';
import joy from './joy.jpg';
import doubt from './doubt.jpg';
import relief from './relief.jpg';
import SliderCard from '../SliderCard/SliderCard';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

class Home extends Component {

    render() {
        return (
            <div>
                <h2>Tell me who has purchased him now!!!</h2>
                <Slider {...settings}>
                    <div>
                      <SliderCard title="Let's talk about this group of 3 MPG players watching a soccer game on TV." image={presentation}/>
                    </div>
                    <div>
                      <SliderCard title="Suddenly a goal for their favorite team. In a matter of a heartbeat they were happy..." image={joy}/>
                    </div>
                    <div>
                      <SliderCard title="But know they tried to remember who has purchased the scorer in each league they play." image={doubt}/>
                    </div>
                    <div>
                      <SliderCard title="And yeahhh, they find it instantly!!! the scorer didn't play against them." image={relief}/>
                    </div>
                </Slider>
            </div>
        );
    }
}

export default Home;
