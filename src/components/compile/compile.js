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
      language: 'python',
      timeoutMs: 2000,
      responceBack: '',
    }
  }

  compileSend = () => {
    axios.post('https://sandbox-skill4u.herokuapp.com', this.state)
      .then((responce) => {
        this.setState({
          responceBack: responce.data[0].stdout,
        });
        console.log(responce.data[0].stdout);
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

  render() {
    let options = {
      lineNumbers: true,
      mode: "python",
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
            content={'Запустить'}
            action={this.compileSend}
          />
          <ButtonAll
            content={'Отправить'}
            action={this.compileSend}
          />
        </div>
        <p className="compile-responce">{this.state.responceBack}</p>
      </div>
    );
  }
}
