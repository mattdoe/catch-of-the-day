import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from "../base";

class Inventory extends Component {

    static propTypes = {
        addFish: PropTypes.func.isRequired,
        deleteFish: PropTypes.func.isRequired,
        fishes: PropTypes.object.isRequired,
        loadSampleFishes: PropTypes.func.isRequired,
        storeId: PropTypes.string.isRequired,
        updateFish: PropTypes.func.isRequired
    };

    state = {
        owner: null,
        userId: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({user});
            }
        });
    }

    authHandler = async (authData) => {
        const store = await base.fetch(this.props.storeId, {context: this});
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        this.setState({
            owner: store.owner || authData.user.uid,
            userId: authData.user.uid
        });
    };

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({
            userId: null
        })
    };

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;

        if (!this.state.userId) {
            return <Login authenticate={this.authenticate} />;
        } else if (this.state.userId !== this.state.owner) {
            return <div>
                <p>Sorry, you are not the owner!</p>
                {logout}
            </div>
        }

        return (
            <div className='inventory'>
                <h2>Inventory!!</h2>
                {logout}
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