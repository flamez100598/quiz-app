import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Play extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
            <Helmet><title>Quiz Instructions - Quiz App</title></Helmet>
            <div className="questions">
                <h5>Google was founded in what year?</h5>
                <div className="options-container">
                    <p className="option">1997</p>
                    <p className="option">1997</p>
                </div>
                <div className="options-container">
                    <p className="option">1999</p>
                    <p className="option">2000 </p>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default Play;
