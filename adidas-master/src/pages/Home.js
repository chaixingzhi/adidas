import React, {Component} from "react";
import {Card,Row,Col} from "antd";
import "../css/home.css";
import api from "../service/api";

import {Link} from "react-router-dom";
import ConCart from "../containers/ConCart.js"


class Home extends Component {
	state = {
		docs:[],
		shopId:"",
	}
	getData(){
		console.log("api");
		api.getProduct().then((resJson)=>{
			console.log("resJson: ",resJson);
			if(resJson.OK){
				this.setState({
					docs:resJson.docs,
				})
			}
		})
	}
	componentDidMount() {
  		this.getData();
  	}
	render() {
    console.log("docs_home ", this.state.docs);
		return (
			<div className="home">
				<Row>
					<ConCart />
				</Row>
				<div className="showshop">
					<Row gutter={10}>
				
					{
						this.state.docs.map((shop,inx)=>{
							return (
								<Col className="gutter-row" span={6} key={inx}>
								<Link to={"/product/"+shop._id} key={inx}>
									<Card style={{width:"100%",height:415,marginBottom:10,overflow:"hidden"}}  bodyStyle={{ padding: 0 }} key={shop._id} >
									    <div className="custom-image">
									      <img alt="example" width="100%" src={shop.images[0]}/>
									    </div>
									    <div className="custom-card">
									      <h3>{shop.info}</h3>
									      <p>{shop.description}</p>
									      <span>{shop.price}</span>
									    </div>
									</Card>
								</Link>
								</Col>
							);
						})
					}
					</Row>
				</div>
				
			</div>
		);	
	}
}

export default Home;