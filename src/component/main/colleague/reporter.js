import React from 'react'
import './reporter.css'

class Reporter extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
       let parentData = this.props.parentData

        return (
            <div className="reporter">
                <div className="left">
                    <span className="reporter-name">
                        {parentData.name}
                    </span>
                    <div className="reporter-head">

                    </div>
                </div>
                <div className="right">
                    <h5 className="section">{parentData.department}</h5>
                    <p className="discribe">{parentData.description}</p>
                    <button className="show-detail">查看详情</button>
                </div>
            </div>
        )
    }

}

export default Reporter