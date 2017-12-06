import React,{Component} from "react";
import ContactModal from "./components/ContactModal";
import {message,Radio} from "antd";
import "../css/address.css";
import api from "../service/api";
import ContactItem from "./components/ContactItem";


const RadioGroup = Radio.Group;
class Contact extends Component{
	state = {
		moreBtn:false,
		defaultValues:{},
		showModal:false,
		action:"new",
		allContacts:[],
		// visible:false,
	}
	cancelModal=()=>this.setState({showModal:false}); 
	addContact(form) {
		this.setState({showModal:false});
		api.addContact(form).then((res)=>{
			if(res.OK) {
				message.success("新增收货人地址 成功");
				this.setState({
					allContacts:res.docs,
				})
			}else{
				message.error("新增收货人地址 失败"+res.message);
			}
		})
	}
	getContact() {
		api.getContact().then((res)=>{
			this.setState({allContacts:res.docs});
		})
	}
	updateContact(form){
		this.setState({showModal:false});
		api.updateContact(form).then((res)=>{
			if(res.OK) {
				message.success("修改收货人地址 成功");
				this.setState({allContacts:res.docs})
			}else{
				message.error("修改收货人地址 失败"+res.message)
			}
		})
	}
	delContact(id){
		api.delContact(id).then((res)=>{
			if(res.OK){
				message.success("删除成功....");
			}else{
				message.error("删除失败...");
			}
		})
	}
	defaultContact(id) {
		api.defaultContact(id).then((res)=>{
			if(res.OK){
				message.success("设为默认收货人成功");
				this.setState({
					allContacts:res.docs,
				})
			}else{
				message.error("设为默认收货人 失败"+res.message);
			}
		})
	}
	updateModal(contact) {
		this.setState({
			showModal:true,
			action:"update",
			defaultValues:contact
		})
	}	
	cancelModal() {
		this.setState({showModal:false});
	}
	changeContact(e) {
		const value=e.target.value
	}
	componentWillMount() {
		this.getContact();
	}

	render(){
		const {visible,action,showModal,allContacts,moreBtn,defaultValues} = this.state;
		let okModal;let title;
		if(action==="new"){
			title = "新增收货人地址"
			okModal = this.addContact.bind(this)
		}else{
			title = "修改收货人地址"
			okModal = this.updateContact.bind(this)
		}
		return(
			<div className="contact">
				<div className="coninfo">
				<h3>收货人信息</h3>
				<span onClick={()=>this.setState({showModal:true})} className="span1">新增收货人地址</span>
				</div>
				{ allContacts.length === 0 ?
					<h4>没有收货人信息，请新增</h4>
					:<RadioGroup onChange={this.changeContact.bind(this)} defaultValue={allContacts[0]._id} className={moreBtn ? "more" : ""}>
					{
						allContacts.map((contact,i)=>(
							<ContactItem
							key={i}
							contact={contact}
							delContact={this.delContact.bind(this)}
							setDefault={this.defaultContact.bind(this)}
							updateContact={this.updateModal.bind(this)}
							/>
						))
					}
					</RadioGroup>
				}

				<ContactModal
				defaultValues={defaultValues}
				title={title}
				visible={showModal}
				handleOk={okModal}
				handleCancel={this.cancelModal}
				/>
				
			</div>
		);
	}
}

export default Contact;