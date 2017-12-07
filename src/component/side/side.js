import React from 'react'
import './side.css'
import { Link } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;

class Side extends React.Component {
    state = {
        collapsed: false,
        sideWid: {width: 256}
    }
    toggleCollapsed = () => {

        if(this.state.sideWid.width == "auto"){
            this.setState({
                collapsed: !this.state.collapsed,
                sideWid:{width: 256}
            });
        }else {
            this.setState({
                collapsed: !this.state.collapsed,
                sideWid:{width: "auto"}
            });
        }


    }
    render() {
        const baseUrl = this.props.props.match.url
        console.log(baseUrl)
        return (
            <div className="side-style" style={this.state.sideWid}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16,float: "left" }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>我的</span></span>}>
                        <Menu.Item key="1"><Link to={`${baseUrl}/write-report`}>写报告</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={`${baseUrl}/show-report`}>查看报告</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>同事</span></span>}>
                        <Menu.Item key="3"><Link to={`${baseUrl}/show-reporter`}>查看员工</Link></Menu.Item>
                        <Menu.Item key="4"><Link to={`${baseUrl}/other-report`}>查看报告</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5">
                        <Icon type="inbox" />
                        <span>权限分配</span>
                    </Menu.Item>

                </Menu>
            </div>
        );
    }
}

export default Side

