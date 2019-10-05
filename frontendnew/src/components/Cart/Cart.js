import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCart } from '../../actions';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.deliveryAddRef = React.createRef();
        // this.itemQuantityRef = React.createRef();
    }

    sleep = msec => new Promise(r => setTimeout(r, msec));

    async componentDidMount() {
        this.props.toggleSpinner("Fetching...");
        await this.sleep(1000);
        this.props.toggleSpinner();
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

    async removeItem(itemId) {
        const items = [...this.props.cartdata.items];
        const index = items.findIndex(e => e.itemID === itemId);
        if (index > -1) {
            items.splice(index, 1);
            this.props.toggleSpinner("Removing...");
            await this.sleep(1000);
            if (items.length === 0) {
                this.props.setCart({});
            } else {
                this.props.setCart({
                    restaurantId: this.props.cartdata.restaurantId,
                    userId: this.props.cartdata.userId,
                    items
                });
            }
            this.props.toggleSpinner();
        }
    }

    render() {
        const { items } = this.props.cartdata;
        return (
            <div>
                <div className="container">
                    <div className="recipes-list">
                        {Array.isArray(items) && items.map(item => (
                            <article className="recipe" key={item.itemID}>
                                <figure className="recipe-image"><img src={item.iImage && item.iImage !== "undefined" ? item.iImage : "/generic-item.png"} alt={item.iImage} /></figure>
                                <div className="recipe-detail">
                                    <h2 className="recipe-title">{item.itemName}</h2>
                                    <h4>{item.iDesc}</h4>
                                    <div className="recipe-meta" >
                                        <span className="time"><img src="/images/dollar.png" />{item.price}</span>
                                        <span className="time" style={{ color: "#898670", fontSize: "14px", margin: "0 auto", marginRight: "400px" }}>
                                            <img src="/images/icon-pie-chart.png" />
                                            <input style={{ width: "100px" }} type="number" min="1" placeholder="1" />
                                        </span>
                                        <span className="contact-form" >
                                            <input type="button" onClick={() => this.removeItem(item.itemID)} value="Remove Item" style={{ marginTop: "5px" }} />
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
}

const mapStateToProps = state => ({
    isLoggedIn: state.userdata.isLoggedIn,
    cartdata: state.cartdata,
    // isSeller: state.userdata.isSeller,
    // userId: state.userdata.id,
    // signupEmail: state.userdata.signupEmail,
    // email: state.userdata.email
});

const mapDispatchToProps = dispatch => ({
    // login: () => dispatch(login()),
    // logout: () => dispatch(logout()),
    // getCart: () => dispatch(getCart()),
    setCart: cart => dispatch(setCart(cart))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);