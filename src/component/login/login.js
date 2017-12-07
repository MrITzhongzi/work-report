import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.css'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            serveName: "lhw",
            servePwd: "123",
            inputName: '',
            inputPwd: '',
            remember: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const account = this.getAccountInfo()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(values.remember){
                    this.rememberPwd(values)
                }
                if(this.judgeAccount(account,values)){
                    this.props.history.push('/')
                }else{
                    alert('failure ')
                }
            }
        });
    }

    /**
     * 从服务器获取账号密码
     * @returns {{userName: string, password: number}}
     */
    getAccountInfo(){
        return {
            userName: 'lhw',
            password: 123
        }
    }

    /**
     * 判断输入的账号密码是否正确
     * @param accountObj
     * @param inputObj
     * @returns {boolean}
     */
    judgeAccount (accountObj,inputObj){
        if(accountObj.userName == inputObj.userName && accountObj.password == inputObj.password){
            return true
        }
        return false
    }

    rememberPwd(values){
        localStorage.setItem('work-re-name',values.userName)
        localStorage.setItem('work-re-pwd',values.password)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username"
                                />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password"
                               />
                    )}
                </FormItem>
                <FormItem className="login-button">
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button" ref="buttomref">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm