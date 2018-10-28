import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends Component {

    static propTypes = {
        fishes: PropTypes.object.isRequired,
        order: PropTypes.object.isRequired,
        removeFromOrder: PropTypes.func.isRequired
    };

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const transitionOptions = {
            classNames: 'order',
            key,
            timeout: {
                enter: 500,
                exit: 500

            }
        };

        if (fish) {
            const count = this.props.order[key];
            const isAvailable = fish.status === 'available';

            if (!isAvailable) {
                return (
                    <CSSTransition {...transitionOptions}>
                        <li key={key}>
                            Sorry, {fish ? fish.name : 'fish'} is no longer available.
                        </li>
                    </CSSTransition>
                )
            }

            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        <span>
                            <TransitionGroup component='span' className='count'>
                                <CSSTransition
                                    classNames='count' key={count}
                                    timeout={{enter: 500, exit: 500}}
                                >
                                    <span>{count}</span>
                                </CSSTransition>
                            </TransitionGroup>
                            lbs {fish.name}
                            {formatPrice(count * fish.price)}
                            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                        </span>
                    </li>
                </CSSTransition>
            );
        }

        return null;
    };

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((total, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return total + (count * fish.price);
            }

            return total;
        }, 0);

        return (
            <div className='order-wrap'>
                <h2>Order</h2>
                <div className='total'>
                    <TransitionGroup component='ul' className='order'>
                        {orderIds.map(this.renderOrder)}
                    </TransitionGroup>
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

export default Order;