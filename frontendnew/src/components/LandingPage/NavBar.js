import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <div className="site-header">
                <div className="container">
                    <div className="main-navigation pull-right">
                        <button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
                        <ul className="menu">
                            <li className="menu-item"><Link to="/Home">GrubHub</Link></li>
                            <li className="menu-item"><Link to="/SignIn">Sign in</Link></li>
                            <li className="menu-item"><a href="offer.html">My offer</a></li>
                            <li className="menu-item"><a href="contact.html">Contact</a></li>
                        </ul>
                    </div >
                </div>
            </div>

        );
    }
} export default NavBar;