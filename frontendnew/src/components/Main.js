import React, { Component } from 'react';
import SiteHeader from './SiteHeader'

class Main extends Component {
    render() {
        return (
            <body className="homepage">
                <div id="site-content">
                    <SiteHeader />
                </div>
            </body>
        )
    }
}
export default Main;