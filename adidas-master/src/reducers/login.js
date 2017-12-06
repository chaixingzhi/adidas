import { LOGIN_SUBMIT_START, LOGIN_SUBMIT_SUCCESS, LOGIN_SUBMIT_ERROR } from "../actions/login";

const defaultState = {
	isFetching: false,
	user: {},
};

const login = (state=defaultState, action) => {
	switch(action.type) {
		case LOGIN_SUBMIT_START:
			return {isFetching: true, user: {}}
		case LOGIN_SUBMIT_SUCCESS:
			return {isFetching: false, user: action.payload}
		case LOGIN_SUBMIT_ERROR:
			return {isFetching: false, user: {}, error: true, message: action.payload}
		default:
			return state;
	}
}

export default login