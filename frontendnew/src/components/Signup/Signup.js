import React, { Component } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSeller: false
        }
        this.firstnameRef = React.createRef();
        this.lastnameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.retypepasswordRef = React.createRef();
        this.restaurantnameRef = React.createRef();
        this.restaurantzipcodeRef = React.createRef();
    }

    toggleIsSeller = () => this.setState({isSeller: !this.state.isSeller});

    onSubmit = e => {
        e.preventDefault();
        const person = {
            firstname: this.firstnameRef.current.value,
            lastname: this.lastnameRef.current.value,
            email: this.emailRef.current.value,
            password: this.passwordRef.current.value,
            isSeller: this.state.isSeller,
            restaurantname: this.restaurantnameRef.current.value,
            restaurantzipcode: this.restaurantzipcodeRef.current.value
        };
        console.log(person)
    };

    render() {
        return (
            <form action="#" onSubmit={this.onSubmit.bind(this)}>
                <div className="contact-form" style={{width:"80%"}} >
                    <div style={{display:"flex"}}>
                        <div className="left">
                            <div className="namediv">
                                <input ref={this.firstnameRef} name="firstname" className="inputfirstname" type="text" placeholder="First Name" autoFocus required/>
                                <input ref={this.lastnameRef} className="inputlastname" type="text" placeholder="Last Name" required/>
                            </div>
                            <input ref={this.emailRef} type="email" placeholder="Email" required />
                            <input ref={this.passwordRef} type="password" placeholder="Password (Min 8 char)" required/>
                            <input ref={this.retypepasswordRef} type="password" placeholder="Confirm password" required/>
                        </div>
                        <div className="right">
                            <div className="ui toggle checkbox" >
                                <input onClick={this.toggleIsSeller.bind(this)} readOnly={true} checked={this.state.isSeller} type="checkbox" />
                                <label>Business owner?</label>
                            </div>
                            <div style={{display:this.state.isSeller ? "block" : "none"}}>
                                <input ref={this.restaurantnameRef} required={this.state.isSeller} type="text" placeholder="Restaurant Name" />
                                <input ref={this.restaurantzipcodeRef} required={this.state.isSeller} type="text" placeholder="Restaurant Zip Code" />
                            </div>
                        </div>
                    </div>
                    <div className="bottondiv" style={{width:"50%",margin:"0 auto"}}>
                        <Link to="/login">Have account,login here</Link>
                        <input type="submit" value="Create Account" />
                    </div>
                </div>
            </form>
        );
    }

}

export default Signup;