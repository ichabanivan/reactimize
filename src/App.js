import React, { Component } from 'react';
// UI
import { Jumbotron } from 'reactstrap';
// Styles
import './styles/main.scss';

class App extends Component {
  render() {
    return (
      <Jumbotron>
        <h1 className="text-center">Reactimize</h1>
      </Jumbotron>
    );
  }
}

export default App;
