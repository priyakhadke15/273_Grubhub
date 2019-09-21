import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            isLoggedIn: "false",
        }
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }

    render() {

        //Cookie check to render Nav Bar
        let navBar = null;
        if (cookie.load('cookie')) {

            navBar = (
                <ul className="menu">
                    <li className="menu-item"><Link to="/Home">Home</Link></li>
                    <li className="menu-item"><Link to="/SearchPage">Catering</Link></li>
                    <li className="menu-item"><Link to="/Account">Account</Link></li>
                    <li className="menu-item"><Link to="/" onClick={this.handleLogout}>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");

            navBar = (
                <ul className="menu">
                    <li className="menu-item"><Link to="/Home">Home</Link></li>
                    <li className="menu-item"><Link to="/Login">Login</Link></li>
                </ul>
            );
        }
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/home" />
        }
        return (

            <div className="site-header">
                <div className="container">
                    <div className="main-navigation pull-right">
                        {navBar}
                    </div >
                </div>
            </div>

        );
    }
} export default NavBar;