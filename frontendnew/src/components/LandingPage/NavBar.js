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
        this.props.logout();
        cookie.remove('authCookie', { path: '/' })
    }

    render() {
        return (
            <div className="site-header">
                <div className="container">
                    <div className="main-navigation pull-right">
                        <div>
                            <ul className="menu">
                                <li className="menu-item"><Link to="/Home">Home</Link></li>
                                {this.props.isLoggedIn && <li className="menu-item"><Link to="/searchpage">Catering</Link></li>}
                                {this.props.isLoggedIn && <li className="menu-item"><Link to="/account/myaccount">Account</Link></li>}
                                {this.props.isLoggedIn && <li className="menu-item"><Link to="/login" onClick={this.handleLogout}>Logout</Link></li>}
                                {/* {this.props.isLoggedIn && <li className="menu-item"><a href="#" onClick={this.handleLogout}>Logout </a></li>} */}
                                {!this.props.isLoggedIn && <li className="menu-item"><Link to="/login">Login</Link></li>}
                            </ul>
                        </div>
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