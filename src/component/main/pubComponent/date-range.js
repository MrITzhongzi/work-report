import React from 'react'
import {DatePicker,Button } from 'antd'

import './date-range.css'

class DateRange extends React.Component {

    state = {
        startTime: null,
        endTime: null,
        endOpen: false
    }

    disabledStartDate = (startTime) => {

        const endTime = this.state.endTime
        if (!startTime || !endTime) {
            return false
        }
        return startTime.valueOf() > endTime.valueOf()

    }

    disabledEndDate = (endTime) => {

        const startTime = this.state.startTime
        if (!endTime || !startTime) {
            return false
        }
        return endTime.valueOf() <= startTime.valueOf()

    }

    onChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    onStartChange = (value) => {
        console.log(value)
        this.onChange('startTime', value)
    }

    onEndChange = (value) => {
        this.onChange('endTime', value)
    }

    handleStartOpenChange = (open) => {
        const endTime = this.state.endTime
        if (!open && !endTime) {
            this.setState({
                endOpen: true
            })
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({
            endOpen: open
        })
    }

    render() {

        const {startTime, endTime, endOpen} = this.state

        return (
            <div className="date-range">
                <span>从:</span>
                <DatePicker
                    value={startTime}
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="start"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                />
                <span>到:</span>
                <DatePicker
                    value={endTime}
                    open={endOpen}
                    disabledDate={this.disabledEndDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="end"
                    onChange={this.onEndChange}
                    onOpenChange={this.handleEndOpenChange}
                />

                <Button type="primary" icon="search" className="search-btn">Search</Button>
            </div>
        )
    }
}

export default DateRange