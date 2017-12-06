import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Layout, Menu, Icon, Button, Dropdown } from "antd";
import { Link } from "react-router-dom";


const {Header} = Layout

const { Item, SubMenu, ItemGroup} = Menu;

const theme = "dark"
const headerStyle = {
  "dark": {background: "#101010", color: "#fff"},
  "light": {background: "#fff", color: "#212121" }
}

class NavHeader extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
  }
  state = {
    current: "home",
  }
  handleClick(e) {
    this.setState({
      current: e.key
    })
  }
  handleLogout() {
    console.log("Logout");
    this.props.actions.navLogout();
    window.location.href="/";
  }
  render() {
    const menu = (
    <Menu style={{textAlign: "center"}}>
      <Menu.Item key="user">
        <Link to="/user">
        用户中心
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="manage">
        <Link to="/manage">
        管理中心
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Button onClick={this.handleLogout.bind(this)}>退出登录</Button>
      </Menu.Item>
    </Menu>
    );
    return (
      <Layout>
        <Header className="header" style={headerStyle[theme]}>
          <div className="logo">
          鲤鱼IT
          </div>
          <Menu
            onClick={this.handleClick.bind(this)}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{ lineHeight: '62px', height: "62px", border: "none" }}
            theme={theme}
          >
            <Item key="home">
              <Link to="/">
                <Icon type="home" /> 首页
              </Link>
            </Item>
            <Item key="productions">
              <Icon type="appstore" />产品列表
            </Item>
            <SubMenu key={"sport"} title={<span>运动装<Icon type="down" /></span>}>
              <ItemGroup title="男士">
              <Item key="male:huodong">最新活动</Item>
              <Item key="male:xielei">鞋类</Item>
              <Item key="male:fushi">服饰类</Item>
              <Item key="male:fujian">附件类</Item>
              </ItemGroup>
              <ItemGroup title="女士">
              <Item key="female:huodong">最新活动</Item>
              <Item key="female:xielei">鞋类</Item>
              <Item key="female:fushi">服饰类</Item>
              <Item key="female:fujian">附件类</Item>
              </ItemGroup>
              <ItemGroup title="儿童">
              <Item key="little:huodong">最新活动</Item>
              <Item key="little:xielei">鞋类</Item>
              <Item key="little:fushi">服饰类</Item>
              <Item key="little:fujian">附件类</Item>
              </ItemGroup>
            </SubMenu> 
          </Menu>

          { this.props.username ? 

              <Dropdown overlay={menu}> 
                <Button icon="user" className="user-btn">
                <span> {this.props.username}</span>
                </Button>
              </Dropdown>
            :
            <div className="user">
            <Link to="/login">
            <Button className="login-btn">登录
            </Button></Link>
            <Link to="/signup">
            <Button ghost className="signup-btn" type="primary">注册
            </Button></Link>
          </div>
            }
            
      </Header>
      </Layout>
    );
  }
}

export default NavHeader;
