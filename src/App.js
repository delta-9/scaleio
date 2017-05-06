import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import paperjs from 'paper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Paper> 
          <Layer>
            <Grid x={10} y={10} width={480} height={480} />
            <Rectangle x={10} y={10} width={200} height={200} />
          </Layer>
        </Paper>
      </div>
    );
  }
}
class Paper extends Component {
  getChildContext() {
    return { 
      paper: this.paper 
    };
  }
  componentDidMount() {
      const { canvas } = this.refs;
      this.paper = new paperjs.PaperScope();
      this.paper.setup(canvas);
      
      // Draw the view now:
      this.paper.view.play();
      this.forceUpdate();
  }
  render() {
    return (
      <canvas width="500" height="500" ref="canvas">
        {this.paper ? this.props.children : false}
      </canvas>
    );
  }
}
Paper.childContextTypes = {
  paper: PropTypes.object,
};


class Layer extends Component {
  getChildContext() {
    return {
      layer: this.layer
    };
  }
  componentDidMount() {
    if (!this.layer) {
      const { paper } = this.context;
      this.layer = new paper.Layer();
      this.forceUpdate();
    }
  }

  render() {
    return (
      this.layer ? this.props.children : false
    );
  }
}
Layer.contextTypes = {
  paper: PropTypes.object
};
Layer.childContextTypes = {
  layer: PropTypes.object,
};


class Grid extends Component {

  componentDidMount() {
    const { paper } = this.context;
    if (paper) {
      var rectangle = new paper.Path.Rectangle(this.props);
      rectangle.fillColor = 'white';
      rectangle.strokeColor = 'black';
      for (let i = 20; i<=this.props.height; i+=10) {
        // Create a Paper.js Path to draw a line into it:
        let path = new paper.Path();
        // Give the stroke a color
        path.strokeColor = '#cccccc';
        let start = new paper.Point(10, i);
        // Move to start and draw a line from there
        path.moveTo(start);
        // Note that the plus operator on Point objects does not work
        // in JavaScript. Instead, we need to call the add() function:
        path.lineTo(start.add([ this.props.width, 0 ]));
      }
      for (let i = 20; i<=this.props.width; i+=10) {
        // Create a Paper.js Path to draw a line into it:
        let path = new paper.Path();
        // Give the stroke a color
        path.strokeColor = '#cccccc';
        let start = new paper.Point(i, 10);
        // Move to start and draw a line from there
        path.moveTo(start);
        // Note that the plus operator on Point objects does not work
        // in JavaScript. Instead, we need to call the add() function:
        path.lineTo(start.add([ 0, this.props.height ]));
      }
    }
  }
  render() {
    return null;

  }
}
Grid.contextTypes = {
  paper: PropTypes.object,
};


class Rectangle extends Component {
  componentDidMount() {
    const { paper } = this.context;
    if (paper) {
      var rectangle = new paper.Path.Rectangle(this.props);
      rectangle.fillColor = 'white';
      rectangle.strokeColor = 'black';
    }
  }
  render() {
    return null;
  }
}
Rectangle.contextTypes = {
  paper: PropTypes.object,
};

class EmptyComponent extends Component {
  render() {
    return this.props.children;
  }
}
  

class Line extends Component {
  componentDidMount() {
    const { paper } = this.context;
    if (paper) {
      // Create a Paper.js Path to draw a line into it:
      var path = new paper.Path();
      // Give the stroke a color
      path.strokeColor = 'black';
      var start = new paper.Point(100, 100);
      // Move to start and draw a line from there
      path.moveTo(start);
      // Note that the plus operator on Point objects does not work
      // in JavaScript. Instead, we need to call the add() function:
		  path.lineTo(start.add([ 200, -50 ]));
    }
  }
  render() {
    return null;
  }
}
Line.contextTypes = {
  paper: PropTypes.object,
};


export default App;
