import React, { Component } from 'react';
import SiteHeader from './LandingPage/SiteHeader';
import SiteFooter from './LandingPage/SiteFooter';
import NavBar from './LandingPage/NavBar'
import Home from './LandingPage/Home';
import SignIn from './SignIn';
import Login from './Login';
import { Route } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div className="homepage">
                <SiteHeader />
                <div id="site-content">
                    <Route path="/" component={NavBar} />
                    <Route path="/SignIn" component={SignIn} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Login" component={Login} />
                </div>
                <SiteFooter />
                <script src="js/jquery-1.11.1.min.js"></script>
                <script src="js/plugins.js"></script>
                <script src="js/app.js"></script>
            </div>
        )
    }
}
export default Main;