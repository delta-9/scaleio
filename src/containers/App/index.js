import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FaBeer from 'react-icons/lib/fa/beer';
import RaisedButton from 'material-ui/RaisedButton';
import request from '../../utils/request';
import { changeSettings } from './actions';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }
  componentWillMount() {
    /*request('model.json')
      .then((json) => { this.predictInit(json)});*/

  }
  handleSettingsChange(event) {
    event.preventDefault();
    this.props.dispatch(changeSettings({isometric: !this.props.isometric}));
  }
  render() {
    return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton onClick={this.handleSettingsChange} label="ISO" primary={false} />
            <RaisedButton label="Publish" primary />
          </ToolbarGroup>
        </Toolbar>
    );
  }
}

export default connect(({ map: { settings: { isometric }}}) => ({
  isometric
}))(App);
