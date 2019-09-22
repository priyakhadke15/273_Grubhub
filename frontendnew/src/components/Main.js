import React, { Component } from 'react';
import SiteHeader from './LandingPage/SiteHeader';
import SiteFooter from './LandingPage/SiteFooter';
import NavBar from './LandingPage/NavBar'
import Home from './LandingPage/Home';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Account from './Account';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div className="homepage">
                <div id="site-content">
                    <Route path="/" component={NavBar} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/Home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/SearchPage" component={SearchPage} />
                    <Route path="/Account" component={Account} />
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