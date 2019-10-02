import React, { Component } from 'react';

class UpcomingOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            orders: [],
            persons: []
        }
    }
    async componentDidMount() {
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        try {
            const response = await fetch('/api/v1/order?status=new', {
                method: 'get',
                mode: "cors",
                redirect: 'follow',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const res = await response.json();
            console.log(res);
            await sleep(1000);
            if (response.status === 200) {
                if (res.orders.length > 0) {
                    this.setState({
                        msg: '',
                        orders: res.orders,
                        persons: res.persons
                    });
                }
                else {
                    this.setState({
                        msg: 'No Upcoming Orders for you'
                    });
                }
            } else if (response.status === 401) {
                this.setState({ msg: 'please login to continue...' });
            }
        }
        catch (e) {
            await sleep(1000);
            this.setState({ msg: e.message || e });
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="recipes-list">
                        <pre>{this.state.msg}</pre>
                        {this.state.orders.map(order => (
                            <article className="recipe" key={order.orderID}>
                                <figure className="recipe-image"><img src={order.image && order.image !== "undefined" ? order.image : "/generic-item.png"} alt={order.orderID} /></figure>
                                <div className="recipe-detail">
                                    {this.state.persons.length && <h2 className="recipe-title"><a href="#">{this.state.persons[0].firstName} {this.state.persons[0].lastName}</a></h2>}
                                    {this.state.orders.length && <h2 className="recipe-title"><a href="#">{order.name} </a></h2>}
                                    <h4>{order.itemName}</h4>
                                    <span><img src="/images/icon-map-marker-alt.png" />{order.deliveryAdd}</span>
                                    <div className="recipe-meta">
                                        <span className="time"><img src="/images/icon-time.png" />{new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString()}</span>
                                        <span className="time"><img src="/images/dollar.png" />{order.price}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
} export default UpcomingOrderPage;