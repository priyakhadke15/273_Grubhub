import React, { Component } from 'react';

class SiteHeader extends Component {
    render() {
        return (
            <header className="site-header">
                <div className="container">
                    <a href="index.html" id="branding" className="pull-left">
                        <i className="icon-cupcake logo"></i>
                        <h1 className="site-title">Name Surname</h1>
                    </a>

                    <div className="main-navigation pull-right">
                        <button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
                        <ul className="menu">
                            <li className="menu-item"><a href="about.html">About me</a></li>
                            <li className="menu-item"><a href="offer.html">My offer</a></li>
                            <li className="menu-item"><a href="recipe.html">Recipes</a></li>
                            <li className="menu-item"><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>

                    <div className="mobile-navigation"></div>
                </div>
            </header>
        )
    }
}
export default SiteHeader;