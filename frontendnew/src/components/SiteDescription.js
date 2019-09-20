import React, { Component } from 'react';
class SiteDescription extends Component {
    render() {
        return (
            <div className="hero">
                <div className="container">
                    <img className="mainlogo" src="/cupcake.jpg" alt="" ></img>
                    <h1 className="site-title">GrubHub</h1>
                    <small className="site-description">Want to order food ?</small>
                </div>
            </div>
        )
    }
}
export default SiteDescription;