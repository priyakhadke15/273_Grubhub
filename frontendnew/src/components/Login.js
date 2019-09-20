import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            msg: ''
        }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        console.log("within submit login");
        fetch('/login', {
            method: 'post',
            mode: "cors",
            redirect: 'follow',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(async function (response) {
            const body = await response.json();
            return { status: response.status, body };
        }).then(function (response) {
            if (response.status === 200) {
                this.setState({
                    authFlag: true,
                    msg: response.body.message
                })
            }
            else {
                this.setState({
                    authFlag: false,
                    msg: response.body.message
                })
            }
        }.bind(this))
            .catch(function (err) {
                console.log(err)
            });
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        // let msgBar = null;

        if (this.state.authFlag) {
            redirectVar = <Redirect to="/Home" />
        }
        // else
        //     msgBar = "Invalid Credentials";

        return (
            <div>
                {redirectVar}
                < div className="contact-form" >
                    <div className="row">
                        <div className='Login-form'>
                            <div className="col-md-5">
                                <form onSubmit={this.submitLogin}>
                                    <input type="email" placeholder="Email" onChange={this.usernameChangeHandler} name="username" required autoFocus />
                                    <input type="password" placeholder="Password" onChange={this.passwordChangeHandler} name="password" required />
                                    <input type="submit" value="Login" />
                                    <Link to="/SignIn">No account, create here</Link>
                                </form>
                                {this.state.msg}
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
} export default Login;