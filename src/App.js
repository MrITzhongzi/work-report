import React, { Component } from 'react';
import Side from './component/side/side'
import Main from './component/main/main'
import './App.css';


class App extends Component {
    constructor(props){
        super(props)

    }
  render() {
    return (
      <div className="App">
          <Side props={this.props} />
          <Main props={this.props} />
      </div>
    );
  }
}

export default App;
