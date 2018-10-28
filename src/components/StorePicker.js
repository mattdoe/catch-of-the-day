import React, { Component } from 'react';
import { getFunName } from "../helpers";
import PropTypes from "prop-types";

class StorePicker extends Component {

    static propTypes = {
        history: PropTypes.array.isRequired
    };

    myInput = React.createRef();

    goToStore = (event) => {
        event.preventDefault();
        this.props.history.push(`/store/${this.myInput.value.value}`);
    };

    render() {
        return (
            <form className='store-selector' onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input type='text' ref={this.myInput} required placeholder='Store Name' defaultValue={getFunName()} />
                <button type='submit'>Visit Store →</button>
            </form>
        );
    };
}

export default StorePicker;