import React from 'react';
import './App.css';
import './styles/styles.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './component/Home';
function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
    </Router>
  );
}

export default App;
