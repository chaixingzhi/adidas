import React,{Component} from "react";
import Proptypes from "prop-types";
import "../../css/shopCart.css";



class CartItm extends Component {
	static propTypes = {
		count:Proptypes.number.isRequired,
		shopInfo:Proptypes.object.isRequired,
		delCart:Proptypes.func.isRequired,
	}
	render() {
		const {count,shopInfo,delCart}=this.props;
		return(
			<div className="showShopList">
				<img src={shopInfo.images[0]} alt="shopInfo" className="showShopListImg"/>
				<div className="shopInfo">
				<div className="shopInfoDes">
				<h4>{shopInfo.name}</h4>
				<p>{shopInfo.description}</p>
				</div>
				<div className="shopInfoPri">
				<span>￥{shopInfo.price.toFixed(2)} * {count}</span>
				<span onClick={delCart}>删除</span>
				</div>
				</div>
			</div>
		);
	}
}

export default CartItm;
