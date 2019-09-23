import React, { Component } from 'react';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            msg: ''
        };
    }

    async componentDidMount() {
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        try {
            this.props.toggleSpinner('Loading...');
            const response = await fetch('/api/v1/users/profile');
            const {email, firstName: firstname, lastName: lastname} = await response.json();
            await sleep(1000);
            this.props.toggleSpinner();
            if(response.status === 200) {
                this.setState({email, firstname, lastname});
            } else if(response.status === 401) {
                this.setState({msg: 'please login to continue...'});
            }
        } catch(e) {
            await sleep(1000);
            this.props.toggleSpinner();
            this.setState({msg: e.message || e});
        }
    }

    async submitForm(e) {
        e.preventDefault();
        // TODO: update api call here
    }

    render() {
        return (
            <form action="#" onSubmit={this.submitForm.bind(this)}>
                <div className="fullwidth-block fruits-section category-block">
                    <div className="contact-form" style={{width:"80%",margin:"0 auto"}}>
                        <div className="namediv">
                            <input value={this.state.firstname} onChange={e => this.setState({firstname: e.target.value})} name="firstname" className="inputfirstname" type="text" placeholder="First Name" />
                            <input value={this.state.lastname} onChange={e => this.setState({lastname: e.target.value})} className="inputlastname" type="text" placeholder="Last Name" />
                        </div>
                        <input value={this.state.email} onChange={e => this.setState({email: e.target.value})} type="email" placeholder="Email" />
                        <input type="password" placeholder="--unchanged--" />
                        <input type="submit" value="Update" />
                        <pre>{this.state.msg}</pre>
                    </div>
                </div>
            </form>
        )
    }
} export default Profile;