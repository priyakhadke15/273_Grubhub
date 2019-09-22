import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
// import cookie from 'react-cookies';

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
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        e.preventDefault();
        const data = {
            email: this.state.username,
            password: this.state.password
        }
        this.props.toggleSpinner("Logging you in....");
        fetch('/api/v1/users/login', {
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
        }).then(async response => {
            await sleep(2000);
            this.props.toggleSpinner();
            this.setState({
                authFlag: response.status === 200,
                msg: response.body.message
            });
        }).catch(async err => {
            await sleep(2000);
            this.props.toggleSpinner();
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
        return (
            <div>
                {this.state.authFlag ? <Redirect to="/Home" /> : null}
                < div className="contact-form"  >
                    <form onSubmit={this.submitLogin}>
                        <input type="email" placeholder="Email" onChange={this.usernameChangeHandler} name="username" required autoFocus />
                        <input type="password" placeholder="Password" onChange={this.passwordChangeHandler} name="password" required />
                        <input type="submit" value="Login" />
                        <Link to="/signup">Create Account</Link>
                    </form>
                    <pre>{this.state.msg}</pre>
                </div >
            </div>
        );
    }
}

export default Login;