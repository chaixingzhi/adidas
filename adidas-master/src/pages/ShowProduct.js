import React, {Component} from "react";
import {Carousel,Button,message} from "antd";
import "../css/showproduct.css";
import api from "../service/api";
// import Proptypes from "prop-types";


class ShowProduct extends Component {
	state = { 
		previewVisible:false,
		inputVal:1,
		product:{},
		images:[],
	}
	getShop(){
		const id = this.props.match.params.id;
		api.getProduct(id).then((resJson)=>{
				console.log("resJson: ",resJson);
				this.setState({
					product:resJson.doc,
					images:resJson.doc.images,
				})
		})
	}
	handleCancel = () => this.setState({ previewVisible: false })
	handleClick=(imgs)=>this.setState({ previewVisible:true})
	handleAddClick=()=>{
		const value = parseInt(this.state.inputVal,10)+1;
		console.log("value: ",value)
		this.setState({inputVal:value})
	}
	handleChange(e) {
		const inputVal = parseInt(e.target.value, 10);	
		this.setState({
			inputVal:inputVal
		});
	}
	handleMinClick=()=>{
		const value = parseInt(this.state.inputVal,10)-1;
		console.log("value: ",value)
		if(value >=1){
			this.setState({inputVal:value})
		}else{
			this.setState({inputVal:1})
		}
		
	}
	handleShopCartClick = ()=>{
		const postData = [{
			pid:this.state.product._id,
			num:this.state.inputVal,
		}]
		api.addCart(postData).then((res)=>{
			if(res.OK){
				this.props.addCart(res.count);
				message.success("添加购物车成功！",2);
			}
		})
	}
  	componentDidMount(){
  		this.getShop();
  		console.log("!!!!");
  	}
	render(){
		console.log("product: ",this.state.product);
		const images = this.state.images;
		console.log("images: ",images);
		return(
			<div className="div1">
				 <Carousel effect="fade" autoplay>
				 	{
				    	images.map((imgs,i)=>(
				    	<div className="product" key={i}>
				    			<img src={imgs} alt="hello" className="productImg"/>
        				</div>
        				
			    		))
				 	}
				  </Carousel>
				  <Button type="primary" onClick={this.handleShopCartClick}>加入购物车</Button>
				  <Button type="primary" className="btn2">去结算</Button>
				  <div className="div2">
				  	<span className="span1" onClick={this.handleAddClick}>+</span>
				  	<input className="inp1" type="number" value = {this.state.inputVal} 
				  			onChange={this.handleChange.bind(this)}
				  	/>
				  	<span className="span1" onClick={this.handleMinClick}>-</span>
				  </div>
			</div>
		);
	}
	
}

export default ShowProduct;