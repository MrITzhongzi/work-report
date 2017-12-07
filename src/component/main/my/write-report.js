/*
* 写工作报告
* */
import React from 'react'

class WriteReport extends  React.Component {
    constructor(props){
        super(props)
        this.state = {
            workConArr: [],
            tomorrow: [],
            introspection: "", //今日反思
            summary:"",         //本周工作总结
            nextSummart: "",    //下周工作总结
        }
        console.log(this.props)
    }

    render(){
        return (
            <div>
                写工作报告页面
            </div>
        )
    }
}

export default WriteReport