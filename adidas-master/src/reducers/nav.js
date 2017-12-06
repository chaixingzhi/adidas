import {NAV_USERNAME, NAV_LOGOUT} from "../actions/nav";
import { getUser, saveUser, removeUser } from "../service/getUser";

const nav=(state=getUser() || "", action) => {
	switch(action.type) {
		case NAV_USERNAME:
			saveUser(action.payload);
			return action.payload;
		case NAV_LOGOUT:
			removeUser()
			return ""
		default:
			return state;
	}
}

export default nav;