import React, { Component } from 'react';
import SearchPage from './SearchPage';
import DetailsPage from './DetailsPage';
import PastOrderPage from './PastOrderPage';

class MainContent extends Component {
    render() {
        return (
            <main className="main-content">
                <SearchPage />
                <DetailsPage />
                <PastOrderPage />
            </main>
        )
    }
}
export default MainContent;