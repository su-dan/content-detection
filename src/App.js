import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Button, Input } from 'antd';
const {TextArea} = Input;

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      resultContent: '',
      keyColor: 'red'
    }
    this.replaceContent = '';
  }
  contentAreaHandler(e) {
    this.setState({
      content: e.target.value,
      resultContent: e.target.value
    });
    this.replaceContent = e.target.value;
  }
  submitHandler() {
    
    axios.get(`/ce?content=${this.state.content}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.statusText === "OK") {
          
          res.data && res.data.forEach((item, index) => {
            this.replaceContent = this.replaceContent.replace(item, `<span style=color:${this.state.keyColor}>${item}</span>`)
            this.setState((prevState) => {
              return { 
                resultContent: this.replaceContent
              }
            });
          });
        }
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">网络广告中违法文本自动识别系统</h1>
        </header>
        <div className="content-wrapper">
          <p className="App-intro">
            请在下面文本框输入要检测的文本：
          </p>
          <TextArea 
            rows={10}
            onChange={this.contentAreaHandler.bind(this)} />
          <p className="submit-btn-wrapper">
            <Button 
              type="primary"
              onClick={this.submitHandler.bind(this)}>提交</Button>
          </p>
          <p>检测结果：</p>
          <p 
            style={{fontSize: "20px", textIndent: "2"}}
            dangerouslySetInnerHTML={{ __html: this.state.resultContent }} />
        </div>
      </div>
    );
  }
}

export default App;
