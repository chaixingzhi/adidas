import React,{Component} from "react";
import { Transfer,Form } from 'antd';
import PropTypes from "prop-types"

class NomalTransfer extends Component {
  static PropTypes = {
  	getTargetKeys:PropTypes.func,
  	mockData:PropTypes.array
  }
  state = {
    targetKeys: [],
  }
  componentDidMount() {
  	console.log("mockData: ",this.props.mockData)
  }
  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  }
  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
    this.props.getTargetKeys( targetKeys );
  }
  render() {
    return (
      <Transfer
        dataSource={this.props.mockData}
        showSearch
        filterOption={this.filterOption}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={item => item.name}
      />
    );
  }
}

export default Form.create()(NomalTransfer);