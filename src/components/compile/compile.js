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
      writeln('Привет, мир!');
    End.`,
    language: 'pascal',
    responceBack: '',
    isLoaded: false,
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
    axios.post(`${this.props.path}`, compileConfig, params)
      .then((responce) => {
        this.setState({
          responceBack: responce.data.score,
          isLoaded: true,
        });
        sessionStorage.setItem(`task${compileConfig.task_id}`, responce.data.score)
      })
      .catch((error) => {
        console.log(error);
      })
    setTimeout(() => {
      this.isLoadedisLoaded();
    }, 4000);
  }

  isLoadedisLoaded = () => {
    this.setState({
      isLoaded: false,
    });
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
          {
            this.state.isLoaded
            ? <p class="compile__text">Задача отправлена!</p>
            : null
          }
        </div>
      </div>
    );
  }
}
