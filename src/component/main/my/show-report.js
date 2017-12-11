/*
* 查看工作报告
* */

import React from 'react'
import {DatePicker, Button,message } from 'antd';
import './show-report.css'

function DateComponent(props) {

    console.log(props)

    return (
        <div className="choose-date">
            <span>从:</span>
            <DatePicker onChange={(dates, moment) => (props.setTime(dates, moment, 0))}/>
            <span>到:</span>
            <DatePicker onChange={(dates, moment) => (props.setTime(dates, moment, 1))}/>
            <Button type="primary" icon="search">查看</Button>
        </div>
    )
}


class ShowReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: '',
            endTime: '',
            showTime: '',

        }

        this.setTime = this.setTime.bind(this)
    }

    /**
     *
     * @param dates
     * @param moment
     * @param type == 0 开始时间  == 1 结束时间
     */
      setTime(dates, moment, type) {

        let startTime = this.state.startTime

        /*if (type === 0) {
             this.setState({
                startTime: moment
            })
        }


        if (type === 1 && startTime && moment > startTime) {
            this.setState({
                endTime: moment
            })
        }*/


        type === 0 ? this.setState({
                        startTime: moment
                    })
                    : (type === 1 && startTime && moment > startTime ?  this.setState({
                                                                        endTime: moment
                                                                    }) : message.error('结束时间必须大于开始时间') )

    }

    render() {
        return (
            <div className="show-report">
                <h2 className="show-title">查看工作报告</h2>
                <DateComponent setTime={this.setTime}/>
            </div>
        )
    }

}

export default ShowReport