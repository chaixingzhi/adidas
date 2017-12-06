import React,{Component} from "react";
import {Form,Button,Input,message,Transfer} from "antd";
import UploadImg from "./components/UploadImg";
import api from "../service/api";


const FormItem = Form.Item;
class NormalProduct extends Component {
	state = {
		imgList:[],
		targetKeys:[],
		mockData:[],
	}
	getImgList(imgList){
		this.setState({
			imgList:imgList
		})
	}
	filterOption = (inputValue, option) => {
	    return option.description.indexOf(inputValue) > -1;
	}
	handleChange = (targetKeys) => {
	    this.setState({ targetKeys });
	}
	handleSubmit(e){
		e.preventDefault(e);
		this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        values.images = this.state.imgList;
	        api.addProduct(values).then((res)=>{
	        	if(res.OK){
	        		message.success("上传商品成功！");
	        	}else{
	        		message.error("上传商品失败...");
	        	}
	        })
	      }
	    });
	}
	getData(){
		api.getCaps(1).then((resJson)=>{
			this.setState({
				mockData:resJson.docs.map((Cat)=>({key:Cat.name,name:Cat.name}))
			})

		})
	}
	componentDidMount() {
  		this.getData();
  	}
	render(){

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
		const { getFieldDecorator } = this.props.form;
		return(
			<div className="product">
				<h1>
					新增商品
				</h1>
				<Form onSubmit={this.handleSubmit.bind(this)}>
					<FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              商品名称
			            </span>
			          )}
			          hasFeedback
			        >
			          {getFieldDecorator('name', {
			            rules: [{ required: true, message: '商品名称不能为空', whitespace: true },
			            ],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              商品描述
			            </span>
			          )}
			          hasFeedback
			        >
			          {getFieldDecorator('description', {
			            rules: [{ required: true, message: '输入商品描述', whitespace: true }
			            ],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              商品价格
			            </span>
			          )}
			          hasFeedback
			        >
			          {getFieldDecorator('price', {
			            rules: [{required: true, message: '输入商品价格', whitespace: true }

			            ],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              商品库存
			            </span>
			          )}
			          hasFeedback
			        >
			          {getFieldDecorator('storage', {
			            rules: [{ required: true, message: '输入商品库存', whitespace: true }
			            ],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              商品分类
			            </span>
			          )}
			          hasFeedback
			        >
			          {getFieldDecorator('category', {
			            rules: [{required: true, message: '输入商品级别', whitespace: true }
			            ],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              商品单位
			            </span>
			          )}
			          hasFeedback
			        >
			          {getFieldDecorator('unit', {
			            rules: [{ required: true, message: '输入商品单位', whitespace: true }
			            ],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              商品信息
			            </span>
			          )}
			          hasFeedback
			        >
			          {getFieldDecorator('info', {
			            rules: [{ required: true, message: '输入商品信息', whitespace: true }
			            ],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              商品状态
			            </span>
			          )}
			          hasFeedback
			        >
			          {getFieldDecorator('status', {
			            rules: [{ required: true, message: '输入商品状态', whitespace: true }
			            ],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              商品标签
			            </span>
			          )}
			          hasFeedback
			        >
			          {getFieldDecorator('tag', {
			            rules: [{type:'array',required: true, message: '输入商品标签', whitespace: true }
			            ],
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
			        <FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              图片列表
			            </span>
			          )}

			        >
			          <UploadImg max={8}
			          	action="http://192.168.1.210:3000/upload"
			          	getImgList={this.getImgList.bind(this)} 
			          />
			        </FormItem>
			        <Button htmlType="submit" type="primary" size="large" style={{marginLeft:"20%",width:"20%"}}>提交</Button>
				</Form>
			</div>

		)
	}
}

export default Form.create()(NormalProduct);

