import React, {Component} from "react";
import { Form, Input, Select, Button} from 'antd';
import PropTypes from "prop-types";
import api from "../service/api";
import "../css/signup.css";

const FormItem = Form.Item;
const Option = Select.Option;


class NormalSignupForm extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.bool,
  }
  state = {
    confirmDirty : false,
    captcha: ""
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.signup(values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    // 两次 输入完毕，并且输入的值补位空，将 confirmDirty 设为true
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    // 第二个password 输入框发起校验
    const form = this.props.form;
    // 比对第二个框的value  跟第一个输入框的value 是否相等
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不相同');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    // 第一个password 输入框发起校验
    const form = this.props.form;
    // 第一个输入框的值不为空， 并且第二个框的值不为空
    if (value && this.state.confirmDirty) {
      // 调用 第二个输入框的校验函数
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
   const capImg = (<img style={{height: 28}}
    onClick={() => this.getCaptcha()}
    src={"data: image/jpg; base64," + this.state.captcha} alt="验证码"/>)
    return (

    	<div className="signup">
        <Form onSubmit={this.handleSubmit} className="signup-form">
        <h1> 欢迎注册 </h1>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              用户名
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '用户名不能为空', whitespace: true },
            {pattern: /[a-zA-Z][0-9a-zA-Z-_]{3,19}/, message: "用户名必须是字母开头，包含字母、数字的4~20的字符串"}
            ],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电子邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
            validateTrigger: "onBlur"
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="输入密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, 
            {
              pattern: /((?=.*[\d])(?=.*[^\d])).{8,}|((?=.*[^A-Za-z])(?=.*[a-zA-Z])).{8,}/,
              message: "密码必须符合复杂性要求"
            },
            {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, 
            {
              pattern: /((?=.*[\d])(?=.*[^\d])).{8,}|((?=.*[^A-Za-z])(?=.*[a-zA-Z])).{8,}/,
              message: "密码必须符合复杂性要求"
            },
            {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号码"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="验证码"
        >
          {getFieldDecorator('captcha', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Input 
            addonAfter={capImg}
            placeholder="点击重新获取" />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button className="submit" type="primary" htmlType="submit"
            loading={this.props.isFetching}
          >注 册</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const Signup = Form.create()(NormalSignupForm);


export default Signup;