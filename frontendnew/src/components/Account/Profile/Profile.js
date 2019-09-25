import React, { Component } from 'react';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            msg: ''
        };
    }

    async componentDidMount() {
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        try {
            this.props.toggleSpinner('Loading...');
            const response = await fetch('/api/v1/users/profile');
            const { email, firstName: firstname, lastName: lastname } = await response.json();
            await sleep(1000);
            this.props.toggleSpinner();
            if (response.status === 200) {
                this.setState({ email, firstname, lastname });
            } else if (response.status === 401) {
                this.setState({ msg: 'please login to continue...' });
            }
        } catch (e) {
            await sleep(1000);
            this.props.toggleSpinner();
            this.setState({ msg: e.message || e });
        }
    }

    async submitForm(e) {
        e.preventDefault();
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        const data = {
            email: this.state.email,
            password: this.state.password || undefined,
            firstName: this.state.firstname,
            lastName: this.state.lastname
        };
        this.props.toggleSpinner('Updating your info....');
        fetch('/api/v1/users/profile', {
            method: 'put',
            mode: "cors",
            redirect: 'follow',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            const body = await response.json();
            await sleep(2000);
            this.props.toggleSpinner();
            if (response.status === 200) {
                await sleep(500);
                this.setState({ msg: body.message })
            } else {
                this.setState({ msg: body.message });
            }
        }).catch(async err => {
            await sleep(2000);
            this.props.toggleSpinner();
            this.setState({ msg: err.message || err })
        });
    }

    render() {
        return (
            <form action="#" onSubmit={this.submitForm.bind(this)}>
                <div className="fullwidth-block fruits-section category-block">
                    <div className="contact-form" style={{ width: "80%", margin: "0 auto" }}>
                        <div className="namediv">
                            <input value={this.state.firstname} onChange={e => this.setState({ firstname: e.target.value })} name="firstname" className="inputfirstname" type="text" placeholder="First Name" required />
                            <input value={this.state.lastname} onChange={e => this.setState({ lastname: e.target.value })} className="inputlastname" type="text" placeholder="Last Name" required />
                        </div>
                        <input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} type="email" placeholder="Email" required />
                        <input type="password" onChange={e => this.setState({ password: e.target.value })} placeholder="-- password unchanged --" />
                        <input type="submit" value="Update" />
                        <pre>{this.state.msg}</pre>
                    </div>
                </div>
            </form>
        )
    }
} export default Profile;