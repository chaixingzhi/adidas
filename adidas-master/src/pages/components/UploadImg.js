import React,{Component} from "react";
import Proptypes from "prop-types";
import { Upload, Icon, Modal } from 'antd';

class UploadImg extends Component {
  static propTypes = {
    getImgList:Proptypes.func.isRequired,
    max:Proptypes.number.isRequired,
    action:Proptypes.string.isRequired,
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = (event)=>{
    this.setState({
      fileList:event.fileList
    })
    console.log("event: ",event);
    const imgList = event.fileList.map((file)=>(file.response));
    console.log("imgList: ",imgList);
    this.props.getImgList(imgList);
  }

  render() {
    const {max,action} = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action= {
          }
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview.bind(this)}
          onChange={this.handleChange.bind(this)}
        >
          {fileList.length >= {max} ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadImg;