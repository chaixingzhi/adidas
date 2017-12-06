import React,{Component} from "react";
import {Spin,Button,Icon,Badge} from "antd";
import CartItem from "./CartItem";
import PropTypes from "prop-types";
import {Link} from "react-router-dom"
import "../../css/shopCart.css";



class ShopCart extends Component {
	static propTypes = {
		isFetching:PropTypes.bool.isRequired,
		cartList:PropTypes.array.isRequired,
		count:PropTypes.number.isRequired,
		valid:PropTypes.bool.isRequired,
		getCart:PropTypes.func.isRequired,
		delCart:PropTypes.func.isRequired
	} 
	state = {
		isShowList:false,
	}
	handleMouseLeave=()=>this.setState({isShowList:false})
	handleMouseOver=()=>{this.setState({isShowList:true});
  		if(this.props.valid){
  			this.props.getCart();
  		}
	}
	componentDidMount(){
		console.log("这是shopcart: ",this.refs.defaultSpan)
		var oDiv = this.refs.defaultSpan;
		oDiv.onmousedown = function(ev){
				console.log("ooooo######1:　",oDiv);
				var oEvent = ev;
				console.log("event: ",oEvent);
				// alert('xx');
				var disX = oEvent.clientX - oDiv.offsetLeft;
				var disY = oEvent.clientY - oDiv.offsetTop;
				document.onmousemove = function(ev){
				console.log("ooooo######2:　",oDiv);

					var oEvent = ev;
					var iLeft = oEvent.clientX - disX;
					var iTop = oEvent.clientY - disY;

					document.title = iTop;

					if(iLeft < 0){
						iLeft = 0;
					}else if(iLeft > (window.innerWidth - oDiv.offsetWidth)){
						iLeft =window.innerWidth - oDiv.offsetWidth;
					}

					if(iTop <0){
						iTop = 0;
					}else if(iTop >(window.innerHeight - oDiv.offsetHeight)){
						iTop = window.innerHeight - oDiv.offsetHeight;
					}
					oDiv.style.left = iLeft + "px";
					oDiv.style.top = iTop + "px";

				}
				
				document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup = null;
				}
			}

	}
	render(){
		const {isShowList} = this.state;
		const {cartList,isFetching,delCart,count} = this.props;
		let sum = 0; let total = 0;
		return(
			<div className="boss"
				ref="defaultSpan"
				onMouseLeave={this.handleMouseLeave}
			>
				<div className="shopbtn"
				onMouseOver={this.handleMouseOver}
				>
					<Button type="default" style={{width:"100%"}} >
						<span>购物车</span>
						<Badge count={count} showZero>
						<Icon type="shopping-cart" />
						</Badge>
					</Button>
				</div>
				{
					isShowList ? 
					<div className="showList">
						<h3>最新加入的商品</h3>
						{
							isFetching ?
							<Spin className="spin"/>
							:
							<div className="cartList">
							{
								cartList.length > 0 ?
								cartList.map((list)=>{
									sum += list.num;
									total += list.num * list.product.price;
									return(
										<CartItem key={list._id}
											count={list.num}
											shopInfo={list.product}
											delCart={()=>delCart(list._id)}
										/>
									);
									
								})
								:<p>购物车空空如也</p>
							}
							</div>
						}
						<div className="footer">
							<span>共{sum}件商品，共计￥{total.toFixed(2)}</span>
							
							<Button type="primary">去结算</Button>
						</div>
					</div>
					:null
				}
			</div>
		);
	}
}

export default ShopCart;