/*
* 查看工作报告
* */

import React from 'react'
import './show-report.css'
import DateRange from '../pubComponent/date-range'
import ShowTable from '../pubComponent/show-table'


class ShowReport extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="show-report">
                <h2 className="show-title">查看工作报告</h2>
                <DateRange />
                <ShowTable />
            </div>
        )
    }

}

export default ShowReport