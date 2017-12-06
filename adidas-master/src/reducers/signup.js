import { SIGNUP_START, SIGNUP_ERROR} from "../actions/signup";

const defaultState = {
	isFetching: false,
};

const signup = (state= defaultState, action) => {
	switch(action.type) {
		case SIGNUP_START:
			return {isFetching: true}
		case SIGNUP_ERROR:
			return {isFetching: false, error: true}
		default: 
			return state;
	}
}

export default signup;