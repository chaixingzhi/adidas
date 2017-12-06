import { cartValid } from "./shoppingCart.js";

export const addCart = (num)=> {
	return (dispatch, getState) => {
		dispatch(cartValid(num))
	}
}