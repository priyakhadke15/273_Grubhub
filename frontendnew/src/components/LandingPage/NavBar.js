import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { login, logout } from '../../actions';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        cookie.remove('authCookie', { path: '/' })
    }

    render() {
        //Cookie check to render Nav Bar
        let navBar = null;
        if (cookie.load('authCookie')) {
            navBar = (
                <div>
                    islogged: {this.props.isLoggedIn}
                    <ul className="menu">
                        <li className="menu-item"><Link to="/Home">Home</Link></li>
                        <li className="menu-item"><Link to="/SearchPage">Catering</Link></li>
                        <li className="menu-item"><Link to="/account/myaccount">Account</Link></li>
                        <li className="menu-item"><Link to="/login" onClick={this.handleLogout}>Logout</Link></li>
                    </ul>
                </div>
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
        if (cookie.load('authCookie')) {
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
}

const mapStateToProps = state => ({
    isLoggedIn: state.userdata.isLoggedIn,
    isSeller: state.userdata.isSeller
});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);