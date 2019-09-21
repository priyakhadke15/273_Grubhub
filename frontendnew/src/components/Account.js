import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PastOrderPage from './PastOrderPage';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
            main: ''
        }
    }
    render() {
        return (
            <Router>
                <div style={{ display: "flex" }} />
                <div style={{ padding: "10px", width: "40%", background: "#f0f0f0" }} >
                    <ul className="menu" style={{ listStyleType: "none", padding: 0 }}>
                        <li className="menu-item"><Link to="/">Your Account</Link></li>
                        <li className="menu-item"><Link to="/Profile">Profile</Link></li>
                        <li className="menu-item"><Link to="/PastOrderPage">Past Orders</Link></li>
                        <li className="menu-item"><Link to="/UpcomingOrder">Upcoming Orders</Link></li>
                    </ul>
                </div>
                <Route path="/" exact='true' component={PastOrderPage} />
                <Route path="/Profile" component={PastOrderPage} />
                <Route path="/PastOrderPage" component={PastOrderPage} />
                <Route path="/UpcomingOrder" component={PastOrderPage} />
            </Router>

        )
    }


} export default Account;