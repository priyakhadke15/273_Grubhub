import React, { Component } from 'react';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.deliveryAddRef = React.createRef();
        // this.itemQuantityRef = React.createRef();
    }

    async componentDidMount() {
        let cart = '', userId = '', restaurantId = '', items = '';
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        try {
            cart = { userId, restaurantId, items } = JSON.parse(localStorage.getItem('cart'));

            this.setState({
                items: items
            });
        }
        catch (e) {
            await sleep(1000);
            // this.props.toggleSpinner();
            this.setState({ msg: e.message || e });
        }
    }
    async placeOrder(e) {
        e.preventDefault();
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        let cart = '', userId = '', restaurantId = '', items = '';
        cart = { userId, restaurantId, items } = JSON.parse(localStorage.getItem('cart'));
        fetch(`/api/v1/order`, {
            method: 'post',
            mode: "cors",
            redirect: 'follow',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ items, restaurantId, deliveryAdd: this.deliveryAddRef.current.value })
        }).then(async (response) => {
            const body = await response.json();
            await sleep(1000);
            this.props.toggleSpinner();
            if (response.status === 200) {
                await sleep(500);
                this.setState({ msg: "Order Placed" })
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
                        {this.state.items.map(item => (
                            <article className="recipe" key={item.itemID}>
                                <figure className="recipe-image"><img src={item.iImage && item.iImage !== "undefined" ? item.iImage : "/generic-item.png"} alt={item.iImage} /></figure>
                                <div className="recipe-detail">
                                    <h2 className="recipe-title">{item.itemName}</h2>
                                    <h4>{item.iDesc}</h4>
                                    <div className="recipe-meta" >
                                        <span className="time"><img src="/images/dollar.png" />{item.price}</span>
                                        {<span className="time" style={{ color: "#898670", fontSize: "14px", margin: "0 auto" }}>
                                            <img src="/images/icon-pie-chart.png" />
                                            <input ref={this.itemQuantityRef} style={{ width: "fit-content" }} type="number" min="1" placeholder="1" required autoFocus />
                                        </span>}

                                        {/* {(this.itemQuantityRef.current || {}).value && (item.quantity = this.itemQuantityRef.current.value)} */}
                                        <span className="contact-form" >
                                            <form ><input type="submit" value="Remove Item" style={{ marginTop: "5px" }} /></form>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                        <div className="contact-form" >
                            <form onSubmit={this.placeOrder.bind(this)}>
                                <input type="text" ref={this.deliveryAddRef} placeholder="Delivery Address" required autoFocus style={{ width: "50%" }} />
                                <input type="submit" value="Place Order" style={{ marginTop: "5px" }} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} export default Cart;
