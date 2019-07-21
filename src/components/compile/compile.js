import React from 'react';
import '../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/pascal/pascal';
import './style.scss';

import axios from 'axios';

import { ButtonAll } from '../index';
import CodeMirror from 'react-codemirror';


export class Compile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: 'print (\"hello\")',
      language: 'pascal',
      timeoutMs: 2000,
      responceBack: '',
    }
  }

  compileSend = () => {
    axios.post('http://127.0.0.1:3000/', this.state)
      .then((responce) => {
        this.setState({
          responceBack: responce.data[0].combined,
        });
        console.log(responce.data[0].combined);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  compileChange = (newCode) => {
    this.setState({
      code: newCode,
    })

  }

  compileNull = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
    console.log(this.state.toggle);
  }

  render() {
    let options = {
      lineNumbers: true,
      mode: "pascal",
    };
    return (
      <div className="compile">
        <CodeMirror
          options={options}
          value={this.state.code}
          onChange={this.compileChange}
        />
        <div className="compile-buttons">
          <ButtonAll
            className="btn"
            content={'Сбросить'}
            action={this.compileNull}
          />
          <ButtonAll
            content={'Отправить'}
            action={this.compileSend}
          />
        </div>
        <p className="compile__responce">{this.state.responceBack}</p>
      </div>
    );
  }
}
