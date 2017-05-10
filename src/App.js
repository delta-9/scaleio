import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from './utils/request';
import './App.css';
import createLayout from './predictUI/createLayout';

const predictSettings = {
  grid: true,
  width: 500,
  height: 500,
};

class App extends Component {
  componentWillMount() {
    request('/model.json')
      .then((json) => { this.predictInit(json.data)});
  }
  predictInit(model) {
    this.predict = createLayout(document.getElementById('predict'), model);
  }
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
