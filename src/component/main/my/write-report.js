/*
* 写工作报告
* */
import React from 'react'
import {Icon} from 'antd';
import './write-report.css'

function InputContent(props) {


    return (
        <div className="input-card" style={{width: "30%",minWidth: 125 }}>
            <input type="text" onChange={(e)=>props.changeEvent(1,e)} className="project-name" placeholder="项目名称"/>
            <textarea onChange={(e)=>props.changeEvent(2,e)} placeholder="请输入工作内容"></textarea>
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

class WriteReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workConArr: [],  //今天工作内容
            workComponent: [InputContent],     // 存储 今天工作内容的组件
            tomorrow: [],   //明天工作计划
            tomorrowCompomemt: [InputContent],  //记录明天计划内容组件
            introspection: "", //今日反思
            summary: "",         //本周工作总结
            nextSummart: "",    //下周工作总结
            refresh: true,      // 控制页面刷新

        }

        this.addBtnEv = this.addBtnEv.bind(this)
        this.writeContent = this.writeContent.bind(this)
        this.writeTomorrow = this.writeTomorrow.bind(this)

        console.log(this.props)
    }

    componentDidMount(){

    }
    componentWillUnmount(){

    }


    /**
     * props控制 今日工作  还是 明日工作
     * 1：今日工作报告的内容
     * 2： 明天报告工作内容
     * @param props
     */
      addBtnEv(props,e) {
        let tmpArr = [];
        const MAXHEIGHT = 400;
        let flag = props == 1
        let boxDOm = flag ? e.target.parentNode.parentNode.querySelector('.report-content')
                            :e.target.parentNode.parentNode.querySelector('.tomorrow-content')

        tmpArr = flag ? this.state.workComponent
                        :this.state.tomorrowCompomemt
        tmpArr.push(InputContent)

        flag ? this.setState({workComponent:tmpArr})
            : this.setState({tomorrowCompomemt: tmpArr})

        setTimeout(()=>{
            let scrollH = boxDOm.scrollHeight
            if(scrollH >= MAXHEIGHT) {
                boxDOm.scrollTop = scrollH - boxDOm.clientHeight
            }
        },100)

    }

    /**
     * 填写报告内容的逻辑处理  （处理  workConArr  与 workComponent）
     * @param props
     * @param e
     */
    writeContent(props,e){

        let reportNum = this.state.workComponent.length  //有几个组件
        let reportObj = {}
        let tmpArr = []
        tmpArr = this.state.workConArr

        //报告标题 逻辑处理
       if(props == 1){
           reportObj.title = e.target.value
           if(!this.state.workConArr[reportNum - 1]){
               tmpArr.push(reportObj)
           }else {
               tmpArr[reportNum - 1].title = reportObj.title
           }
       }

       // 报告内容 逻辑处理
       if(props == 2){

           reportObj.content = e.target.value
           if(!this.state.workConArr[reportNum - 1]){
               tmpArr.push(reportObj)
           }else {
               tmpArr[reportNum - 1].content = reportObj.content
           }
       }

        this.setState({
            workConArr: tmpArr
        })
    }

    writeTomorrow(props,e){
        let reportNum = this.state.tomorrowCompomemt.length  //明日计划组价那内容
        let reportObj = {}
        let tmpArr = []
        tmpArr = this.state.tomorrow

        //报告标题 逻辑处理
        if(props == 1){
            reportObj.title = e.target.value
            if(!this.state.tomorrow[reportNum - 1]){
                tmpArr.push(reportObj)
            }else {
                tmpArr[reportNum - 1].title = reportObj.title
            }
        }

        // 报告内容 逻辑处理
        if(props == 2){
            reportObj.content = e.target.value

            if(!this.state.tomorrow[reportNum - 1]){
                tmpArr.push(reportObj)
            }else {
                tmpArr[reportNum - 1].content = reportObj.content
            }
        }

        this.setState({
            tomorrow: tmpArr
        })

        console.log(this.state.tomorrow)
    }

    render() {
        return (
            <div className="writeReport">
                <div className="work-content">
                    <h2 style={{margin: "0 auto 20px auto"}}>今日工作内容</h2>
                    <div ref="reportContent" className="report-content">
                        {this.state.workComponent.map((Component,index)=>{
                            return <Component key={index} changeEvent={this.writeContent}/>
                        })}
                    </div>
                    <AddBtn addReport={(e)=>(this.addBtnEv(1,e))} />
                </div>

                <div className="tomorrow-list">
                    <h2 style={{margin: "0 auto 20px auto"}}>明天计划</h2>
                    <div className="tomorrow-content ">
                        {this.state.tomorrowCompomemt.map((Component,index)=>{
                            return <Component key={index} changeEvent={this.writeTomorrow}/>
                        })}
                    </div>
                    <AddBtn addReport={(e)=>(this.addBtnEv(2,e))} />
                </div>

            </div>
        )
    }
}

export default WriteReport