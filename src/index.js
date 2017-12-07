import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'

import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route,
    Switch} from 'react-router-dom'
import App from './App';
import Login from './component/login/login'

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/"  component={App}/>
        </Switch>
    </Router>, document.getElementById('root'));
registerServiceWorker();
