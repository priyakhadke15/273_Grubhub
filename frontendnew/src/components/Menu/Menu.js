import React, { Component } from 'react';
import './Menu.css';
import { connect } from 'react-redux';
import { login, logout } from '../../actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.signupEmail || "",
            password: "",
            msg: '',
            items: []
        }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch('/api/v1/restaurant/item')
            const body = await response.json();
            console.log(body);
            this.setState({ items: body })
        } catch (e) {
            alert(e)
        }
    }

    submitLogin = (e) => {
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        e.preventDefault();
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
                {this.state.items.length > 0 && (<div className="container">
                    <div className="recipes-list">
                        {this.state.items.map(item => (
                            <article className="recipe" key={item.itemID}>
                                <figure className="recipe-image" style={{ width: "10vw", height: "10vw" }}><img style={{ width: "10vw", height: "10vw" }} src={item.iImage && item.iImage !== "undefined" ? item.iImage : "/generic-item.png"} alt={item.itemName} /></figure>
                                <div className="recipe-detail">
                                    <h2 className="recipe-title"><a href="#">{item.itemName}</a></h2>
                                    <p>{item.iDesc}</p>
                                    <p>{item.secName}</p>
                                    <div className="recipe-meta">
                                        <span className="time"><img src="images/dollar.png" />{item.price}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    <hr />
                </div>)}
                < div className="contact-form"  >
                    <form onSubmit={this.submitLogin} style={{ display: "flex" }}>
                        <div style={{ width: "25vw", marginRight: "20px" }}>
                            <input type="text" placeholder="Item Name" required />
                            <input type="number" placeholder="Price" required />
                            <input type="text" placeholder="Section" required />
                        </div>
                        <div style={{ flexGrow: "1" }}>
                            <textarea placeholder="Item Description" required />
                            <input type="submit" value="Add New Item" />
                        </div>
                    </form>
                </div >
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.userdata.isLoggedIn,
    isSeller: state.userdata.isSeller,
    signupEmail: state.userdata.signupEmail,
    // userId: state.userdata.id,
    // email: state.userdata.email
});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);