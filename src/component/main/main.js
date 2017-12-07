import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import './main.css'
import WriteReport from './my/write-report'
import showReport from './my/show-report'
import ShowReporter from './colleague/show-reporter'
import OtherReport from './colleague/other-report'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            matchUrl: this.props.props.match.url
        }
    }

    render() {
        const baseUrl = this.state.matchUrl
        return (
            <div className="main-con">
                <Switch>

                    <Route path={`${baseUrl}/write-report`} component={WriteReport}/>
                    <Route path={`${baseUrl}/show-report`} component={showReport}/>
                    <Route path={`${baseUrl}/show-reporter`} component={ShowReporter}/>
                    <Route path={`${baseUrl}/other-report`} component={OtherReport}/>
                </Switch>
            </div>
        )
    }
}

export default Main