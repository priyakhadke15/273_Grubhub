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
        // TODO: update api call here
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