import React,{Component} from "react";
import {Button,Form,Input} from "antd";
const { TextArea } = Input;


const FormItem = Form.Item;
class CKEditor extends Component {
	componentDidMount() {
    	CKEDITOR.replace("editor",{
			width:430,
			height:300,
			filebrowserImageUploadUrl:"manage/upload",
		});
  	}
	render(){
		return(
			<div id="comments">
				<script src="/ckeditor/ckeditor.js" type="text/javascript" charset="utf-8"></script>
				<script>
					{
						CKEDITOR.replace("editor",{
							width:430,
							height:300,
							filebrowserImageUploadUrl:"manage/upload",
						});
					}
				</script>
				<Form>
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
		            rules: [{ required: true, message: '用户名不能为空', whitespace: true },],
		          })(
		            <TextArea id="editor"/>
		          )}
		        </FormItem>
			    </Form>
			</div>
		)
	}
}

export default CKEditor;