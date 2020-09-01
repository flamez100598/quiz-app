import React from 'react';
import './App.css';
import './styles/styles.scss';
import axios from './ultils/containsURL';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './component/Home';
import QuizInstructions from './component/quiz/QuizInstructions';
import Play from './component/quiz/Play';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play/instruction" component={QuizInstructions} />
      <Route path="/play/quiz" component={Play} />
    </Router>
  );
}

export default App;
