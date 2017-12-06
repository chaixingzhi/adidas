import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";

class User extends Component {
	render() {
		return(
			<div className="user">
				<h1>这里是用户中心</h1>
				<Link to="/user/userinfo">用户信息</Link><br/>
				<Link to="/user/userarticle">用户日志</Link>
				<Switch>
					<Route path="/user/userinfo" render={() => {
						return (
							<div>
								查看用户信息
							</div>
						)
					}}/>
					<Route path="/user/userarticle" render={() => {
						return (
							<div>
								查看用户日志
							</div>
						)
					}}/>
				</Switch>
			</div>
		)
	}
}

export default User;