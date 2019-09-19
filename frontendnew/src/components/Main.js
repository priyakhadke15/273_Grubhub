import React, { Component } from 'react';
import SiteHeader from './SiteHeader';
import SiteDescription from './SiteDescription';
import MainContent from './MainContent';
import SiteFooter from './SiteFooter';

class Main extends Component {
    render() {
        return (
            <body className="homepage">
                <div id="site-content">
                    <SiteHeader />
                    <SiteDescription />
                    <MainContent />
                    <SiteFooter />
                </div>
                <script src="js/jquery-1.11.1.min.js"></script>
                <script src="js/plugins.js"></script>
                <script src="js/app.js"></script>
            </body>
        )
    }
}
export default Main;