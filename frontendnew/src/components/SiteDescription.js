import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../actions';

class SiteDescription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            // item: {
            //     address: "N Street,San Jose",
            //     cuisine: "bakery",
            //     iDesc: "Rice Bowl with veggies",
            //     iImage: "undefined",
            //     image: "",
            //     itemID: "6a54fdcc-2b15-4649-a20d-c47450ae7fa8",
            //     itemName: "Rice Bowl",
            //     name: "CafeCool",
            //     ownerId: "80a38bca-e310-4f3d-a48b-48a55688108c",
            //     price: 7.65,
            //     restaurantId: "cdf5b752-4b43-4457-adf6-81d83835bf65",
            //     secName: "dinner",
            //     zipcode: 95113
            // }
            items: []
        };
        this.searchRef = React.createRef();
        this.cuisineRef = React.createRef();
    }

    async search(e) {
        e.preventDefault();
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        try {
            this.props.toggleSpinner('Searching...');
            const response = await fetch(`/api/v1/item?itemName=${this.searchRef.current.value}`);
            const res = await response.json();
            await sleep(1000);
            this.props.toggleSpinner();
            if (response.status === 200) {
                const cuisine = this.cuisineRef.current.value;
                this.setState({
                    msg: '',
                    items: !!cuisine ? res.filter(i => cuisine === i.cuisine) : res
                });
            } else if (response.status === 401) {
                this.setState({ msg: 'please login to continue...' });
            }
        } catch (e) {
            await sleep(1000);
            this.props.toggleSpinner();
            this.setState({ msg: e.message || e });
        }
    }

    render() {
        return (
            <div>
                {this.props.isLoggedIn && (
                    <div>
                        <div className="hero container" style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.5)", backgroundBlendMode: "overlay", backgroundImage: 'url("/food1.jpg")', backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                            <div className="contact-form" style={{ width: "80%", "margin": "0 auto" }}>
                                <form onSubmit={this.search.bind(this)}>
                                    <select ref={this.cuisineRef} style={{ width: "20%", marginRight: "20px" }}>
                                        <option value="" hidden>Cuisine</option>
                                        <option value="">Any</option>
                                        <option value="American">American</option>
                                        <option value="Asian">Asian</option>
                                        <option value="Bakery">Bakery</option>
                                        <option value="Desert">Desert</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Italian">Italian</option>
                                        <option value="Mediterranean">Mediterranean</option>
                                    </select>
                                    <input type="text" ref={this.searchRef} placeholder="Thai food" required autoFocus style={{ width: "50%" }} />
                                    <input type="submit" value="Search" style={{ marginTop: "5px" }} />
                                </form>
                                <pre style={{ color: "blue" }}>{this.state.msg}</pre>
                            </div>
                        </div>
                        {this.state.items.length > 0 && (<div className="container">
                            <div className="recipes-list">
                                {this.state.items.map(item => (
                                    <article className="recipe" key={item.itemID}>
                                        <figure className="recipe-image"><img src={item.iImage && item.iImage !== "undefined" ? item.iImage : "/generic-item.png"} alt={item.itemName} /></figure>
                                        <div className="recipe-detail">
                                            <h2 className="recipe-title"><a href="#">{item.name}</a></h2>
                                            <pre>{item.cuisine}</pre>
                                            <h4>{item.itemName}</h4>
                                            <p>{item.iDesc}</p>
                                            <div className="recipe-meta">
                                                <span className="time"><img src="images/icon-time.png" />40 min</span>
                                                <span className="time"><img src="images/dollar.png" />{item.price}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>)}
                    </div>
                )}
                {!this.props.isLoggedIn && (
                    <div className="hero" style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.5)", backgroundBlendMode: "overlay", backgroundImage: 'url("/food1.jpg")', backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                        <div className="container">
                            <h1 className="site-title">GrubHub</h1>
                            <small className="site-description">How to order food ? with GrubHub its easy</small>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="feature color-purple">
                                    <img style={{ paddingTop: "0px", padding: "40px" }} className="feature-icon" src="/search.png"></img>
                                    <h3 className="feature-title">Where</h3>
                                    <p>Browse menus from local restaurants</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="feature color-green">
                                    <img style={{ paddingTop: "0px", padding: "40px" }} className="feature-icon" src="/hand.png"></img>
                                    <h3 className="feature-title">What</h3>
                                    <p>Select your favourite dish and complete the order</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="feature color-pink">
                                    <img style={{ paddingTop: "0px", padding: "40px" }} className="feature-icon" src="/food.png"></img>
                                    <h3 className="feature-title">Delivery</h3>
                                    <p>Thats it you are all set. The Food will be delivered to you</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.userdata.isLoggedIn,
    signupEmail: state.userdata.signupEmail
    // isSeller: state.userdata.isSeller,
    // userId: state.userdata.id,
    // email: state.userdata.email
});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteDescription);