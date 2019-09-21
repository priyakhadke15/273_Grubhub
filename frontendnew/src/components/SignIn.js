import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSeller: false,
            restInfo: null
        }
    }
    handleOption = (changeEvent) => {
        this.setState({
            isSeller: changeEvent.target.value
        });
        if (this.state.isSeller) {
            this.setState({
                restInfo: (
                    <div>
                        <input type="text" placeholder="Restaurant Name" required autoFocus />
                        <input type="text" placeholder="Restaurant Zip Code" required />
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div className="contact-form" >
                <div className="row">
                    <div className='Login-form'>
                        <div className="col-md-5">
                            <input type="text" placeholder="Name" required autoFocus />
                            <input type="email" placeholder="Email" required /><br></br>
                            <input type="password" placeholder="Password (Min 8 char)" required />
                            <input type="submit" value="SignIn" /><br></br><Link to="/Login">Have account,login here</Link>
                        </div>
                        <div className="col-md-5">
                            <label><input type="radio" checked={this.state.isSeller === true} onChange={this.handleOption} />Restaurant Owner</label>
                            {this.state.restInfo}
                        </div>
                    </div>
                </div>
            </div>

        );
    }

} export default SignIn;