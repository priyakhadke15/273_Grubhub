import React, { Component } from 'react';
class SiteDescription extends Component {
    render() {
        return (
            <div className="hero">
                <div className="container">
                    <img className="mainlogo" src="/cupcake.jpg" alt="" ></img>
                    <h1 className="site-title">GrubHub</h1>
                    <small className="site-description">How to order food ? with GrubHub its easy</small>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="feature color-purple">
                            <img className="feature-icon" src="/search.png"></img>
                            <h3 className="feature-title">Where</h3>
                            <p>Browse menus from local restaurants</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature color-green">
                            <img className="feature-icon" src="/hand.png"></img>
                            <h3 className="feature-title">What</h3>
                            <p>Select your favourite dish and complete the order</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature color-pink">
                            <img className="feature-icon" src="/food.png"></img>
                            <h3 className="feature-title">Delivery</h3>
                            <p>Thats it you are all set. The Food will be delivered to you</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SiteDescription;