/*
* 写工作报告
* */
import React from 'react'
import {Icon} from 'antd';
import './write-report.css'

function InputContent(props) {

    return (
        <div className="input-card" style={{width: "30%", minWidth: 125}}>
            <input type="text" onChange={(e) => props.changeEvent(1, e, props)} className="project-name"
                   placeholder="项目名称"/>
            <textarea onChange={(e) => props.changeEvent(2, e, props)} placeholder="请输入工作内容"></textarea>
        </div>

    )
}

function AddBtn(props) {
    const styles = {
        width: 100,
        height: 100,
        border: "1px dashed #ccc",
        float: 'left',
        color: '#ccc',
        marginTop: 10
    }

    return (
        <div className="icon-box" onClick={props.addReport} style={styles}>
            <Icon type="plus" className="add-report" style={{fontSize: 93}}/>
        </div>
    )

}

function Summary({index, classNameArr, ...props}) {

    let className = classNameArr[index];

    let title = (function () {
        if (index == 0)
            return "不足及反思"
        if (index == 1)
            return "本周工作总结"
        if (index == 2)
            return "下周工作计划"
    }())

    return (
        <div className={className}>
            <h2 style={{margin: "0 auto 20px auto"}}>{title}</h2>
            <textarea onChange={(e) => (props.changeEvent(e, index))}>

            </textarea>
        </div>)


}

class WriteReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workConArr: [{}],  //今天工作内容
            workComponent: [InputContent],     // 存储 今天工作内容的组件
            tomorrow: [{}],   //明天工作计划
            tomorrowCompomemt: [InputContent],  //记录明天计划内容组件
            introspection: "", //今日反思
            summary: "",         //本周工作总结
            nextSummart: "",    //下周工作总结
            createDate: new Date().getDay() === 5,  //判断是否是周五
            bottomComponent: [Summary, Summary, Summary],
            componentClassName: ['introspection', 'weekend', 'next-week']

        }

        this.addBtnEv = this.addBtnEv.bind(this)
        this.writeContent = this.writeContent.bind(this)
        this.writeSummary = this.writeSummary.bind(this)

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    /**
     * props控制 今日工作  还是 明日工作
     * 1：今日工作报告的内容
     * 2： 明天报告工作内容
     * @param props
     */
    addBtnEv(props, e) {
        let tmpArr = [];
        const MAXHEIGHT = 400;
        let contentArr = []
        let flag = props == 1
        let boxDOm = flag ? e.target.parentNode.parentNode.querySelector('.report-content')
            : e.target.parentNode.parentNode.querySelector('.tomorrow-content')

        tmpArr = flag ? this.state.workComponent
            : this.state.tomorrowCompomemt
        tmpArr.push(InputContent)

        contentArr = flag ? this.state.workConArr
            : this.state.tomorrow

        contentArr.push({})

        //控制组件的数据
        flag ? this.setState({workConArr: contentArr})
            : this.setState({tomorrow: contentArr})

        //控制组件的数量
        flag ? this.setState({workComponent: tmpArr})
            : this.setState({tomorrowCompomemt: tmpArr})


        setTimeout(() => {
            let scrollH = boxDOm.scrollHeight
            if (scrollH >= MAXHEIGHT) {
                boxDOm.scrollTop = scrollH - boxDOm.clientHeight
            }
        }, 100)

    }

    /**
     *
     * @param props 等于 1 标题改变   等于2 内容个改变
     * @param e  react组件对象  e.target会获取到相应的dom
     * @param receiveProps  从父组件接收到的属性
     */
    writeContent(props, e, receiveProps) {

        let index = receiveProps.index
        let dom = e.target
        let tmpArr = []
        let isToday = receiveProps.isToday      //判断 是 今天给工作  还是 明天计划

        tmpArr = isToday ? this.state.workConArr
            : this.state.tomorrow

        //报告标题 逻辑处理
        if (props == 1) {

            tmpArr[index].title = dom.value
        }

        // 报告内容 逻辑处理
        if (props == 2) {

            tmpArr[index].content = dom.value
        }

        isToday ? this.setState({
                workConArr: tmpArr
            })
            : this.setState({
                tomorrow: tmpArr
            })

    }

    writeSummary(e, props) {

        let index = props.index
        let dom = e.target
        if (index == 0) {
            this.setState({introspection: dom.value})
        }

        if (index == 1) {
            this.setState({summary: dom.value})
        }

        if (index == 2) {
            this.setState({nextSummart: dom.value})
        }


    }

    render() {
        return (
            <div className="writeReport">
                <div className="work-content">
                    <h2 style={{margin: "0 auto 20px auto"}}>今日工作内容</h2>
                    <div ref="reportContent" className="report-content">
                        {this.state.workComponent.map((Component, index) => {
                            return <Component key={index} index={index} isToday={true} changeEvent={this.writeContent}/>
                        })}
                    </div>
                    <AddBtn addReport={(e) => (this.addBtnEv(1, e))}/>
                </div>

                <div className="tomorrow-list">
                    <h2 style={{margin: "0 auto 20px auto"}}>明天计划</h2>
                    <div className="tomorrow-content ">
                        {this.state.tomorrowCompomemt.map((Component, index) => {
                            return <Component key={index} index={index} isToday={false}
                                              changeEvent={this.writeContent}/>
                        })}
                    </div>
                    <AddBtn addReport={(e) => (this.addBtnEv(2, e))}/>
                </div>

                {this.state.bottomComponent.map((Component, index) => {
                    if (!this.state.createDate) {
                        if (index !== 0) {
                            return
                        }
                    }
                    return <Component key={index} index={index} isFriday={this.state.createDate}
                                      classNameArr={this.state.componentClassName} changeEvent={this.writeSummary}/>
                })}

            </div>
        )
    }
}

export default WriteReport