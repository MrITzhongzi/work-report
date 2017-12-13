/*
* 查看员工
* */

import React from 'react'
import './show-reporter.css'
import Reporter from './reporter'
import {reportersData} from './data'


class ShowReporter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // reporterDate: []
        }
    }


    render() {
        return (
            <div className="show-reporter">
                <h4 className="reporter-title">查看同事</h4>
                <div className="reporter-list">
                    {reportersData.map(
                        (data, index) => <Reporter key={index} parentData={data}></Reporter>
                    )
                    }
                </div>
            </div>
        )
    }

}

export default ShowReporter