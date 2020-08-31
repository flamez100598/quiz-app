import React, {  Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const QuizInstructions = () => (
    <Fragment>
        <Helmet><title>Quiz Instructions - Quiz App</title></Helmet>
        <div className="instructions container">
            <h1>How to play the Game</h1>
            <p>Ensure you read this guide from start to finish.</p>
            <ul className="browser-default" id="main-list">
                <li>The game has a duration of 15 minutes and ends as soon</li>
                <li>
                    Every question contains 4 options.
                    </li>  
            </ul>
            <div>
                <span className="left"><Link to="/">Take me back</Link></span>
                <br />
                <span className="left"><Link to="/play/quiz">Play</Link></span>
            </div>
        </div>
    </Fragment>
);
export default QuizInstructions;