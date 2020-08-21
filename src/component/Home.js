import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
class Home extends Component {
    render() {
        return (
            <Fragment>
                <Helmet><title>Quiz App - Home</title></Helmet>
                <div id="home">
                    <section>
                        <div>
                            <span className="mdi mdi-cube-outline cube mdi-48px"></span>
                        </div>
                        <h1 className="title">Quiz App</h1>
                        <div className="play-button-container">
                            <ul>
                                <li ><Link to="/play/instruction" className="btn-play">Play</Link></li>
                            </ul>
                        </div>
                        <div className="auth-container">
                            <Link to="/login" className="btn-login" id="login-button">Login</Link>
                            <Link to="/register" className="btn-register" id="signIn-button">Register</Link>
                        </div>
                    </section>
                </div>
            </Fragment>

        );
    }
}

export default Home;
