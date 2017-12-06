import React,{Component} from "react";
import { Form, Input, Select, Button,message,Transfer} from 'antd';
import api from "../service/api";



const Option = Select.Option;
const FormItem = Form.Item;

class Category extends Component {
	state = {
		level:"2",
	}
	filterOption = (inputValue, option) => {
	    return option.description.indexOf(inputValue) > -1;
	  }
	handleChange = (targetKeys) => {
	    this.setState({ targetKeys });
	}
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        api.addCap(values).then((res)=>{
	        	if(res.OK){
	        		message.success("上传成功！",2);
	        	}else{
	        		message.error("上传失败...",2);
	        	}
	        })
	      }
	    });
	 }
	getData(){
		api.getCaps(2).then((resJson)=>{
			console.log("resJson: ",resJson.docs);
			this.setState({
				mockData:resJson.docs.map((Cat)=>({key:Cat.name,name:Cat.name}))
			})

		})
	}
	componentDidMount() {
  		this.getData();
  	}
	render(){
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
			<div>
			  <Form onSubmit={this.handleSubmit}>
			    <FormItem
		          {...formItemLayout}
		          label={(
		            <span>
		              菜单名称
		            </span>
		          )}
		          hasFeedback
		        >
		          {getFieldDecorator('name', {
		            rules: [{ required: true, message: '用户名不能为空', whitespace: false }],
		          })(
		            <Input />
		          )}
		        </FormItem>
		         <FormItem
		          {...formItemLayout}
		          label={(
		            <span>
		              菜单等级
		            </span>
		          )}
		          hasFeedback
		        >
		          {getFieldDecorator('level',{
		            rules: [{ required: true,message: '',whitespace: true }],
		            initialValue: "2"
		          })(
		            <Select onChange={(value) => this.setState({level: value})}>
				        <Option value="1">一级菜单</Option>
				        <Option value="2">二级菜单</Option>
				    </Select>
		          )}
		        </FormItem>
		        {
		        this.state.level === "2" ? 
		        null :
		         <FormItem
		          {...formItemLayout}
		          label={(
		            <span>
		              穿梭框
		            </span>
		          )}
		          hasFeedback
		        >
		          {getFieldDecorator('children', {
		            rules: [{type:'array', required: true, message: '',whitespace: true }],
		          })(
		            <Transfer
				        dataSource={this.state.mockData}
				        showSearch
				        filterOption={this.filterOption}
				        targetKeys={this.state.targetKeys}
				        onChange={this.handleChange}
				        render={item => item.name}
				    />
		          )}
		        </FormItem>
		        }
		        <Button htmlType="submit" type="primary" size="large" style={{marginLeft:300}}>提交</Button>
			  </Form>
		  </div>
		);
	}
}


export default Form.create()(Category);