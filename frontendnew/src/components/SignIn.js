import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class SignIn extends Component {
    render() {
        return (
            <div className="contact-form" >
                <div className="row">
                    <div className='Login-form'>
                        <div className="col-md-5">
                            <input type="text" placeholder="Name" required autoFocus />
                            <input type="text" placeholder="Email" required /><br></br>
                            <input type="password" placeholder="Password (Min 8 char)" required />
                            <input type="submit" value="SignIn" /><br></br><Link to="/Login">Have account,login here</Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

} export default SignIn;