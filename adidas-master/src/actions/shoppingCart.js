import api from "../service/api";
import {message} from "antd";

export const SHOPPINGCART_GET_ERROR = "SHOPPINGCART_GET_ERROR";
export const SHOPPINGCART_GET_START = "SHOPPINGCART_GET_START";
export const SHOPPINGCART_GET_SUCCESS = "SHOPPINGCART_GET_SUCCESS";

export const SHOPPINGCART_DEL_START = "SHOPPINGCART_DEL_START";
export const SHOPPINGCART_DEL_ERROR = "SHOPPINGCART_DEL_ERROR";
export const SHOPPINGCART_DEL_SUCCESS = "SHOPPINGCART_DEL_SUCCESS";

export const SHOPPINGCART_VAL = "SHOPPINGCART_VAL";

export const cartValid = (num)=>({
	type:SHOPPINGCART_VAL,
	payload:num
})
export const getCartStart = ()=>({
	type:SHOPPINGCART_GET_START
})
export const getCartError = ()=>({
	type:SHOPPINGCART_GET_ERROR
})
export const getCartSuccess = (docs)=>({
	type:SHOPPINGCART_GET_SUCCESS,
	payload:docs
})

export const getCart = ()=>{
	return (dispatch,getState)=>{
		dispatch(getCartStart());
		api.getCart().then((res)=>{
			if(res.OK){
				dispatch(getCartSuccess(res.docs))
			}else{
				message.error(res.message);
				dispatch(getCartError())
			}
		})
	}
}

export const delCartStart = ()=>({
	type:SHOPPINGCART_DEL_START
})

export const delCartError = () =>({
	type:SHOPPINGCART_DEL_ERROR
})

export const delCartSuccess = (id) =>({
	type:SHOPPINGCART_DEL_SUCCESS,
	payload:id
})


export const delCart = (id)=>{
	return (dispatch,getState)=>{
		dispatch(delCartStart());
		api.delCart(id).then((res)=>{
			if(res.OK){
				dispatch(delCartSuccess(id))
			}else{
				message.error(res.message);
				dispatch(delCartError())
			}
		})
	}
}