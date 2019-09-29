import React, { Component } from 'react';

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            cuisine: '',
            zipcode: ''
        };
    }
    async submitForm(e) {
        e.preventDefault();
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        const data = {
            name: this.state.name,
            address: this.state.address,
            cuisine: this.state.cuisine,
            zipcode: this.state.zipcode
        };
        this.props.toggleSpinner('Updating your info....');
        fetch('/api/v1/restaurant', {
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
    async componentDidMount() {
        const sleep = msec => new Promise(r => setTimeout(r, msec));
        try {
            this.props.toggleSpinner('Loading...');
            const response = await fetch('/api/v1/users/profile');
            const { name, address, cuisine, zipcode } = await response.json();
            await sleep(1000);
            this.props.toggleSpinner();
            if (response.status === 200) {
                this.setState({ name, address, cuisine, zipcode });
            } else if (response.status === 401) {
                this.setState({ msg: 'please login to continue...' });
            }
        } catch (e) {
            await sleep(1000);
            this.props.toggleSpinner();
            this.setState({ msg: e.message || e });
        }
    }
    render() {
        return (
            <form action="#" onSubmit={this.submitForm.bind(this)}>
                <div className="fullwidth-block fruits-section category-block">
                    <div className="contact-form" style={{ width: "80%", margin: "0 auto" }}>
                        <div className="namediv">
                            <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} className="inputfirstname" type="text" placeholder=" Restaurant Name" />
                            <input value={this.state.address} onChange={e => this.setState({ address: e.target.value })} className="inputlastname" type="text" placeholder="address" />
                        </div>
                        <input value={this.state.cuisine} onChange={e => this.setState({ cuisine: e.target.value })} type="text" placeholder="cuisine" />
                        <input value={this.state.zipcode} onChange={e => this.setState({ zipcode: e.target.value })} type="text" placeholder="zipcode" />
                        <input type="submit" value="Update" />
                        <pre>{this.state.msg}</pre>
                    </div>
                </div>
            </form>
        )
    }
} export default Restaurant;