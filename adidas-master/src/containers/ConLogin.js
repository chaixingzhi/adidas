import Login from "../pages/Login";
import * as LoginActions from "../actions/login";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	isFetching: state.login.isFetching,
	user: state.login.user,
	message: state.login.message,
	error: state.login.error,
})

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(LoginActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)