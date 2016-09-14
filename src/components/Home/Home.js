import React, {Component} from 'react';
import './Home.css';
import Carousel from 'nuka-carousel';
import presentation from './presentation.jpg';
import joy from './joy.jpg';
import doubt from './doubt.jpg';
import relief from './relief.jpg';
import SliderCard from '../SliderCard/SliderCard';

class Home extends Component {

    render() {
        return (
            <div>
                <h2>Tell me who has purchased him now!!!</h2>
                <Carousel fixedHeight={false}>
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
                </Carousel>
            </div>
        );
    }
}

export default Home;
