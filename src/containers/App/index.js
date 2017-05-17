import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from '../../utils/request';
import createLayout from '../../predictUI/createLayout';
import FaBeer from 'react-icons/lib/fa/beer';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class App extends Component {

  componentWillMount() {
    /*request('model.json')
      .then((json) => { this.predictInit(json)});*/
    this.predictInit();
  }

  predictInit(model) {
    console.log(window);
    this.predict = createLayout('predict', model);
  }
  
  render() {
    return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton label="Publish" primary={true} />
          </ToolbarGroup>
        </Toolbar>
    );
  }
}

export default App;
