import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userConstants } from "../js/constants/action-types";

class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);

        //login state
        this.state = {
            username: "",
            password: "",
            authFlag: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }
    handleLogin(event) {
        event.preventDefault();
        const { username, password } = this.state;
        console.log("within handlelogin");
        //  this.props.login(username, password);
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        const { username, password } = this.state;
        return (
            <form onSubmit={this.handleLogin}>
                <div className="container">
                    <div className="contact-form">
                        <div className="col-md-5" >
                            <input type="email" className='form-control' name="username" value={username} onChange={this.usernameChangeHandler} placeholder="Email" required autoFocus />
                            <input type="password" className='form-control' name="password" value={password} onChange={this.passwordChangeHandler} placeholder="Password" required />
                            <input type="submit" value="Login" />
                            <Link to="/SignIn">Dont have an account,create here</Link>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

function mapState(state) {
    const { auth } = state.authenticate;
    return { auth };
}
//const LoginForm = connect(mapState, userConstants.LOGIN_REQUEST)(Login);
export default Login;



