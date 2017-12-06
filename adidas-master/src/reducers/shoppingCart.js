import {SHOPPINGCART_GET_START,SHOPPINGCART_GET_SUCCESS,SHOPPINGCART_GET_ERROR,SHOPPINGCART_DEL_START,SHOPPINGCART_DEL_SUCCESS,SHOPPINGCART_DEL_ERROR,SHOPPINGCART_VAL} from "../actions/shoppingCart.js";

const defaultState = {
	isFetching: false,
	valid: true,
	count: parseInt(localStorage.getItem("CART_COUNT") || 0, 10),
	cartList: [],
}

const shoppingCart = (state = defaultState, action) => {
	switch(action.type) {
		case SHOPPINGCART_GET_START: 
			return {...state, isFetching: true}
		case SHOPPINGCART_GET_SUCCESS:
			localStorage.setItem("CART_COUNT", action.payload.length);
			return {...state, isFetching: false,
				count: action.payload.length,
				cartList:action.payload,
				valid: false
			}
		case SHOPPINGCART_GET_ERROR:
			localStorage.removeItem("CART_COUNT");
			return {...state, isFetching: false}
		case SHOPPINGCART_DEL_START:
			return {...state, isFetching: true}
		case SHOPPINGCART_DEL_SUCCESS:
			const newCartList = state.cartList.filter((cart)=> cart._id !== action.payload);	
			return {...state, isFetching: false,
				cartList: newCartList, count: newCartList.length}
		case SHOPPINGCART_DEL_ERROR:
			return {...state, isFetching: false}

		case SHOPPINGCART_VAL:
			return {...state, valid: true, count: action.payload}
		default:
			return state
	}
}

export default shoppingCart;