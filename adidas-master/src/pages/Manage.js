import React,{Component} from "react";
import {Row,Col,Menu} from "antd";
import {Switch,Route,Link} from "react-router-dom";
import UploadImg from "./components/UploadImg";
import Product from "./Product";
import Category from "./Category";
const MenuItem = Menu.Item;
class Manage extends Component {
	render() {
		return(
			<div className="manage">
			  <Row >
			   <Col xs={24} sm={8} md={4}
			   style={{minHeight:400,borderRight:"1px solid #aaa"}}>
			    <h1>管理系统</h1>
			    <Menu>
			      <MenuItem key="/manage/category">
			      	<Link to="/manage/category">
			      	分类管理
			      	</Link>
			      </MenuItem>
			      <MenuItem key="/manage/product">
			      	<Link to="/manage/product">
				      商品管理
				    </Link>
			      </MenuItem>
			      <MenuItem key="/manage/uploadimg">
			      	<Link to="/manage/uploadimg">
			      	上传图片
			      	</Link>
			      </MenuItem>
			    </Menu>
			   </Col>
			   <Col xs={24} sm={16} md={20}>
			   	<Switch>
			   		<Route path="/manage/uploadimg" render={(props)=>(
			   				<UploadImg 
			   				max={3}
			   				getImgList={(list)=>console.log(list)}
			   				action="http://192.168.1.210:3000/upload" />
			   			)
				   	}/>
				   	<Route exact path="/manage/product" component={Product}/>
				   	<Route path="/manage/category" component={Category} />
			   	</Switch>
			   </Col>
			  </Row>
			</div>
		);
	}
}

export default Manage;