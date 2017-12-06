import React,{Component} from "react";
import {Radio,Button} from "antd";

const RadioButton = Radio.Button;

class ContactItem extends Component {

	render() {
		const { contact,phone, address, _id } = this.props.contact
		const { delContact,updateContact,setDefault } = this.props;
		return (
			<div className="conItem">
				<div className="radioDiv">
				<span className="radioDivSpan">√</span>
				<RadioButton value={_id} className="radio">
				{contact}
				</RadioButton>
				</div>
				<div className="conItemInfo">
					<span>{contact}</span>
					<span>{address}</span>
					<span>{phone}  </span>
					{this.props.contact.default ?
						<span className="default">默认地址</span>
						:null
					}
				</div>
				<div className="op">
				{ this.props.contact.default ? null
					:<span onClick={()=>setDefault(_id)}>设为默认</span>
				}
					<span onClick={() =>updateContact(this.props.contact)}>编辑</span> 
						
						<span onClick={()=>delContact(_id)}>删除</span>
				</div>
			</div>
		);
	}
}

export default ContactItem;