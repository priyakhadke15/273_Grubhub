import React, { Component } from 'react';


class SiteHeader extends Component {
    render() {
        return (
            <div className="site-header">
                <div className="container">
                    <a href="index.html" id="branding" className="pull-left">
                        <h1 className="site-title">GrubHub</h1>
                    </a>
                    <div className="mobile-navigation"></div>
                </div>
            </div>
        )
    }
}
export default SiteHeader;