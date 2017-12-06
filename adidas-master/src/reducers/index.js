import { combineReducers } from "redux";
import login from "./login";
import nav from "./nav";
import signup from "./signup";
import cart from "./shoppingCart"

const rootReducer = combineReducers({
	login: login,
	username: nav,
	signup: signup,
	cart:cart,
});

export default rootReducer;