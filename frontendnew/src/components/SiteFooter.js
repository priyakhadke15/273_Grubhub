import React, { Component } from 'react';

class SiteFooter extends Component {

    render() {
        return (
            <footer className="site-footer" >
                <div className="container" >
                    <i className="icon-cupcake logo"></i>
                    <nav className="footer-navigation" >
                        <a href="about.html">About me</a>
                        <a href="offer.html">My offer</a>
                        <a href="recipe.html">Recipes</a>
                        <a href="contact.html">Contact</a>
                    </nav>
                    <div className="subscribe">
                        <form action="#">
                            <input type="text" placeholder="Enter your email to join newsletter..." />
                            <input type="submit" value="Subscribe" />
                        </form>
                    </div>
                    <div className="social-links">
                        <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
                        <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
                        <a href="#" className="google-plus"><i className="fa fa-google-plus"></i></a>
                        <a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a>
                    </div>
                    <div className="colophon">
                        <p>Copyright 2014 Company name. Designed by Themezy. All right reserved</p>
                    </div>
                </div>
            </footer>
        )
    }
}
export default SiteFooter;