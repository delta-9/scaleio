import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FaBeer from 'react-icons/lib/fa/beer';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import request from '../../utils/request';
import { addElement, addConnection, setElementProperties, changeSettings } from './actions';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


const test = [
  {
    label: 'Add a vpc',
    action: addElement('vpc', 'vpc_0', {tileX: 20, tileY:20, depth:0}),
  },
  {
    label: 'Add an autoscaling group',
    action: addElement('autoscaling_group', 'autoscaling_group_0', {tileX: 20, tileY:20, depth:11}),
  },
  {
    label: 'Set autoscaling group properties',
    action: setElementProperties('autoscaling_group_0', {
      instances: 2,
      instance_type: 't2_small',
    }),
  },
  {
    label: 'Add a load balancer',
    action: addElement('lb', 'lb_0', {tileX: 20, tileY:20, depth:31}),
  },
  {
    label: 'Set the load balancer properties',
    action: setElementProperties('lb', {}),
  },
  {
    label: 'Connect load balancer to autoscaling group',
    action: addConnection('load_balancer', ['vpc', 'autoscaling_group_0']),
  },
]

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
    
    this.state = {
      action: 0,
    }
  }
  componentWillMount() {
    /*request('model.json')
      .then((json) => { this.predictInit(json)});*/

  }

  handleSettingsChange(event) {
    event.preventDefault();
    this.props.dispatch(changeSettings({isometric: !this.props.scene.settings.isometric}));
  }

  handleActionClick() {
    const action = this.state.action;
    this.setState({
      action: action + 1,
    });
    this.props.dispatch(test[action].action);
  }

  render() {
    const action = this.state.action;
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton onClick={this.handleSettingsChange} label="ISO" primary={false} />
            <RaisedButton label="Publish" primary />
          </ToolbarGroup>
        </Toolbar>
        <Drawer open>
            {test[action] ? <RaisedButton onClick={this.handleActionClick} label={test[action].label} primary={false} /> : null}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ scene }) => ({
  scene
});

export default connect(mapStateToProps)(App);
