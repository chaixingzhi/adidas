import React,{Component} from "react";
import {Modal,Button,Form, Switch, Icon,Input} from "antd";
import PropTypes from "prop-types";
const FormItem = Form.Item;


class ContactModal extends Component{
	static defaultValues = {}
	static propTypes ={
		defaultValues:PropTypes.object.isRequired,
		visible:PropTypes.bool.isRequired,
		title:PropTypes.string.isRequired,
		handleOk:PropTypes.func.isRequired,
		handleCancel:PropTypes.func.isRequired,
	}
	onOk() {
		this.props.form.validateFields((err,values)=>{
			if(!err) {
				console.log("Received values of form: ",values);
				if(this.props.defaultValues._id) {
					values.id = this.props.defaultValues._id;
				}
				this.props.handleOk(values);
			}
		})
	}
	render(){
		const {visible,defaultValues,title,handleCancel,handleOk} = this.props;
		const { getFieldDecorator } = this.props.form;
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
		return(
			<Modal 
			title={title}
			visible={visible}
			onOk={() => this.onOk()}
			onCancel={handleCancel}
			>
			<Form>
			 <FormItem
	          {...formItemLayout}
	          label="联系人名称"
	          hasFeedback
	        >
	          {getFieldDecorator('contact', {
	          	initialValue:defaultValues.contact
	          })(
	            <Input />
	  
	          )}
	        </FormItem>
	        <FormItem
	          {...formItemLayout}
	          label="联系人电话"
	          hasFeedback
	        >
	          {getFieldDecorator('phone', {
	           initialValue:defaultValues.phone
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem
	          {...formItemLayout}
	          label="联系人地址"
	          hasFeedback
	        >
	          {getFieldDecorator('address', {
	            initialValue:defaultValues.address
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem
	          {...formItemLayout}
	          label="设置默认地址"
	        >
	          {getFieldDecorator('default', {
	          	initialValue:!!defaultValues.default
	          })(
	           <Switch
		        defaultChecked={!!defaultValues.default}
	            checkedChildren="是" 
	            unCheckedChildren="关" />
	          )}
	        </FormItem>
			</Form>
			</Modal>
		);
	}
}

export default Form.create()(ContactModal);