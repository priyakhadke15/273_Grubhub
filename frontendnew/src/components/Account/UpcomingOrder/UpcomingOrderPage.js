import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpcomingOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            orders: [],
            persons: []
        }
        this.statusRef = React.createRef();
    }
    async componentDidMount() {
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        try {
            this.props.toggleSpinner('Loading...');

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
            this.props.toggleSpinner();
            if (response.status === 200) {
                if (res.orders.length > 0) {
                    this.setState({
                        msg: '',
                        orders: res.orders,
                        persons: res.persons,
                        id: ''
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
            this.props.toggleSpinner();
            this.setState({ msg: e.message || e });
        }
    }

    statusUpdate = orderID => async e => {
        e.preventDefault();
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        const statusUpdate = this.statusRef.current.value;
        this.props.toggleSpinner('Updating Order...');
        fetch(`/api/v1/order`, {
            method: 'put',
            mode: "cors",
            redirect: 'follow',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ orderID: orderID, status: statusUpdate })
        }).then(async (response) => {
            const body = await response.json();
            await sleep(2000);
            this.props.toggleSpinner();
            if (response.status === 200) {
                await sleep(500);
                this.setState({ msg: body.message })
            } else {
                this.setState({ msg: body.message });
            }
        }).catch(async err => {
            await sleep(2000);
            this.props.toggleSpinner();
            this.setState({ msg: err.message || err })
        });
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
                                    {this.state.persons.length > 0 && <h2 className="recipe-title">
                                        Customer<Link to={`/order/details/${order.orderID}`}> {this.state.persons[0].firstName} {this.state.persons[0].lastName}</Link></h2>
                                    }
                                    {this.state.orders.length > 0 && <h2 className="recipe-title"><Link to={`/order/details/${order.orderID}`}>{order.name} </Link></h2>}
                                    <h4>{order.itemName}</h4>
                                    <span><img src="/images/icon-map-marker-alt.png" />{order.deliveryAdd}</span>
                                    <div className="recipe-meta">
                                        <span className="time"><img src="/images/icon-time.png" />{new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString()}</span>
                                        <span className="time"><img src="/images/dollar.png" />{order.price}</span>
                                        <span className="time"><img src="/images/icon-pie-chart.png" />{order.status}</span>
                                    </div>
                                    {this.state.persons.length > 0 && <div className="contact-form" style={{ color: "#898670", fontSize: "14px", width: "80%", margin: "0 auto" }}>
                                        <form onSubmit={this.statusUpdate(order.orderID).bind(this)}>
                                            <select ref={this.statusRef} style={{ width: "20%", marginRight: "20px" }}>
                                                <option value="new">New</option>
                                                <option value="preparing">Preparing</option>
                                                <option value="ready">Ready</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancel">Cancel</option>
                                            </select>
                                            <input type="submit" value="Update Status" style={{ marginTop: "5px" }} />
                                        </form>
                                    </div>}

                                </div>

                            </article>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
} export default UpcomingOrderPage;