import React, { Component } from 'react';
import SiteHeader from './SiteHeader'
import SiteDescription from './SiteDescription'
class Main extends Component {
    render() {
        return (
            <body className="homepage">
                <div id="site-content">
                    <SiteHeader />
                    <SiteDescription />
                </div>
            </body>
        )
    }
}
export default Main;