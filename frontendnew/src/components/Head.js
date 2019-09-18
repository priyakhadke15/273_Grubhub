import React, { Component } from 'react';

class Head extends Component {
    render() {
        return (
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1"></meta>
                <title>Grubhub</title>

                <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|" rel="stylesheet" type="text/css" />
                <link href="fonts/font-awesome.min.css" rel="stylesheet" type="text/css" />
                <link href="fonts/iconmoon.css" rel="stylesheet" type="text/css"></link>
                <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />

                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Web site created using create-react-app" />
                <link rel="apple-touch-icon" href="logo192.png" />
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                <link rel="stylesheet" href="style.css"></link>

            </head>
        )
    }
}
export default Head;