import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SignIn extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            isSeller: false
        }
    }
    render() {
        return (
            <div className="container">
                <div className="contact-form">
                    <div className="col-md-5" >
                        <input type="text" placeholder="Name" required autoFocus />
                        <input type="text" placeholder="Email" required /><br></br>
                        <input type="password" placeholder="Password (Min 8 char)" required />
                        <input type="submit" value="Sign In" />
                        <Link to="/Login">Already a member, login here</Link>
                    </div>
                </div>
            </div>
        );
    }

} export default SignIn;