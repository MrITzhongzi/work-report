import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'

import registerServiceWorker from './registerServiceWorker';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import App from './App';
import Login from './component/login/login'

ReactDOM.render(
    <Router
        basename="/">
        <Switch>

            <Route exact path="/" render={() => (<Redirect to="/main"/>)}/>
            <Route path="/login" component={Login}/>
            <Route path="/main" component={App}/>

        </Switch>
    </Router>, document.getElementById('root'));
registerServiceWorker();
