import React, {Component} from "react";
import { Link, Prompt } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../service/api"
import { Form, Icon, Input, Button } from 'antd';
import "../css/login.css";

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    error: PropTypes.bool,
    message: PropTypes.string,
  }
  state = {
    captcha: "",
    formHasChanged: false 
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.loginChunk(values);
      }
    });
  }
  getCaptcha() {
    api.captcha().then((data) => {
      console.log("cap", data);
      this.setState({
        captcha: data.captcha
      })
    })
  }
  componentDidMount() {
    this.getCaptcha();
  }
  render() {

    const {formHasChanged} = this.state;
    const { getFieldDecorator } = this.props.form;
    const capImg = (<img style={{height: 28}}
      onClick={() => this.getCaptcha()}
      src={"data: image/jpg; base64," + this.state.captcha} alt="验证码"/>)
    return (
    	<div className="login">
      <Prompt when={formHasChanged} message="Are you sure?"/>
      <Form onChange={() => this.setState({formHasChanged: true})} 
      onSubmit={this.handleSubmit} className="login-form">
      	<h1>欢迎登录
        <span>没有账号，<Link to="/signup">请注册 &nbsp;
          <Icon type="right-circle" />
        </Link></span>
      	</h1>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('captcha', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Input addonBefore={<label>验证码</label>} 
            addonAfter={capImg}
            placeholder="点击重新获取" />
          )}
        </FormItem>
          <Button type="primary" htmlType="submit" 
          loading={this.props.isFetching}
          className="login-form-button">
            登 录
          </Button>
          <Link className="login-form-forgot" to="/forgot-password">
            <Icon type="question-circle-o" /> &nbsp;
            忘记密码
          </Link>
      </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);


export default Login;