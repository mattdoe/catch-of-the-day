import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends Component {

    static propTypes = {
        addFish: PropTypes.func.isRequired,
        deleteFish: PropTypes.func.isRequired,
        fishes: PropTypes.object.isRequired,
        loadSampleFishes: PropTypes.func.isRequired,
        updateFish: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className='inventory'>
                <h2>Inventory!!</h2>
                {Object.keys(this.props.fishes).map((key) =>
                    <EditFishForm
                        key={key}
                        index={key}
                        deleteFish={this.props.deleteFish}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                    />
                )}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;