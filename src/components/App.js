import React, { Component } from 'react';
import Fish from './Fish';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';

class App extends Component {

    state = {
        fishes: {},
        order: {}
    };

    addFish = fish => {
        console.log('adding a fish', fish);
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes
        })
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    };

    render() {
        return (
            <div className='catch-of-the-day'>
                <div className='menu'>
                    <Header tagline='Fresh Seafood Market' />
                    <ul className='fishes'>
                        {
                            Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} />)
                        }
                    </ul>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        );
    };
}

export default App;