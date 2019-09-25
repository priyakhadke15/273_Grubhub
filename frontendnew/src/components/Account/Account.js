import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PastOrderPage from '../PastOrderPage';
import Profile from './Profile/Profile';
import Restaurant from './Restaurant';
import './Account.css';

class Account extends Component {
    render() {
        return (
            <Router>
                <div style={{ display: "flex" }}>
                    <div className="leftdiv" >
                        <ul className="menu" >
                            <li className="menu-item"><Link to="/account/myaccount">Your Account</Link></li>
                            <li className="menu-item"><Link to="/account/profile">Profile</Link></li>
                            <li className="menu-item"><Link to="/account/restaurant">Restaurant</Link></li>
                            <li className="menu-item"><Link to="/account/pastorders">Past Orders</Link></li>
                            <li className="menu-item"><Link to="/account/upcomingorders">Upcoming Orders</Link></li>
                        </ul>
                    </div>
                    <div className="rightdiv">
                        <Route path="/account/myaccount" component={PastOrderPage} />
                        <Route
                            path="/account/profile"
                            render={props => <Profile {...props} toggleSpinner={this.props.toggleSpinner.bind(this)} />}
                        />
                        <Route
                            path="/account/restaurant"
                            render={props => <Restaurant {...props} toggleSpinner={this.props.toggleSpinner.bind(this)} />}
                        />
                        <Route path="/account/pastorders" component={PastOrderPage} />
                        <Route path="/account/upcomingorders" component={PastOrderPage} />
                    </div>
                </div>
            </Router>

        )
    }


} export default Account;