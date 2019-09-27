import React, { Component } from 'react';

class PastOrderPage extends Component {
    async componentDidMount() {
        console.log('within pastorder did mount');
        try {
            const response = await fetch('/api/v1/order?status=delivered', {
                method: 'get',
                mode: "cors",
                redirect: 'follow',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const body = await response.json();
            console.log(body);
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div className="fullwidth-block fruits-section category-block">
                <div className="container">
                    <div className="category-content">
                        <h1 className="category-title">Nam libero tempore</h1>
                        <p>Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum.</p>
                        <a href="#" className="button">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
} export default PastOrderPage;