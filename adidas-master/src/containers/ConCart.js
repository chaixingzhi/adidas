import ShoppingCart from "../pages/components/ShopCart.js";
import {getCart,delCart} from "../actions/shoppingCart";
import {bindActionCreators} from "redux";
import { connect } from "react-redux";


const mapStateToProps = (state)=>({
	isFetching:state.cart.isFetching,
	valid:state.cart.valid,
	cartList:state.cart.cartList,
	count:state.cart.count
});

const mapDispatchToProps = (dispatch)=>({
	getCart:bindActionCreators(getCart,dispatch),
	delCart:bindActionCreators(delCart,dispatch)
})


export default connect(
	mapStateToProps,mapDispatchToProps)(ShoppingCart)