import React from 'react';
import '../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/pascal/pascal';
import './style.scss';

import axios from 'axios';

import { ButtonAll } from '../index';
import CodeMirror from 'react-codemirror';


export class Compile extends React.Component {
  state = {
    code: `Program Hello;
    begin
      writeln('Привіт, світ!');
    End.`,
    language: 'pascal',
    responceBack: '',
    loading: false,
  }

  compileSend = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    let compileConfig = {
      code: this.state.code,
      language: this.state.language,
      olympiad_id: this.props.olympiad_id,
      task_id: this.props.task_id,
    };
    console.log(compileConfig);
    axios.post(`${this.props.path}`, compileConfig, params)
      .then((responce) => {
        this.setState({
          responceBack: responce.data.score
        });
        sessionStorage.setItem(`task${compileConfig.task_id}`, responce.data.score)
        console.log(responce.data.score);
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
      mode: "pascal",
    };

    return (
      <div className="compile">
        <CodeMirror options={options}
          value={this.state.code}
          onChange={this.compileChange}
        />
        <div className="compile-buttons">
          <ButtonAll content={'Отправить'}
            action={this.compileSend}
          />
        </div>
        {/* <p className="compile-responce">{this.state.responceBack}</p> */}
      </div>
    );
  }
}
