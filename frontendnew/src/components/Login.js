import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className="contact-form">
                <div className="row">
                    <div className="col-md-5">
                        <input type="email" placeholder="Email" required autoFocus />
                        <input type="password" placeholder="Password" required />
                        <input type="submit" value="Login" />
                        <Link to="/SignIn">Dont have an account, create here</Link>
                    </div>
                </div>
            </div>
        );
    }
} export default Login;