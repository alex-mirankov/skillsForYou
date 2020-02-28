import React from 'react';
import '../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/pascal/pascal';
import './style.scss';
import { connect } from 'react-redux';
import { openWindow } from '../../redux/actions/index';

import axios from 'axios';

import { ButtonAll, MyModal } from '../index';
import CodeMirror from 'react-codemirror';

export class CompileComponent extends React.Component {
  state = {
    code: `Program Hello;
    begin
      writeln('Привет, мир!');
    End.`,
    language: 'pascal',
    isLoaded: false,
    checkerText: '',
  }

  compileSendToCheck = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    let compileConfig = {
      code: this.state.code,
      language: this.state.language,
      serial_number: this.props.serial_number,
      olympiad_id: this.props.olympiad_id,
    };
    axios.post(`${this.props.path}`, compileConfig, params)
      .then((responce) => {
        console.log(responce);
        if (responce.data.error === null) {
          this.setState({
            isLoaded: true,
            checkerText: 'Ошибок нет!',
          });
        } else {
          this.setState({
            isLoaded: true,
            checkerText: responce.data.error,
          });
        }
        this.props.closeWindowComp();
      })
      .catch((error) => {
        console.log(error);
      })
    setTimeout(() => {
      this.isLoaded();
    }, 4000);
  }

  compileSendToFinale = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    let compileConfig = {
      code: this.state.code,
      language: this.state.language,
      serial_number: this.props.serial_number,
      olympiad_id: this.props.olympiad_id,
    };
    axios.post(`http://165.22.92.120:81/olympiad/checker`, compileConfig, params)
      .then((responce) => {
        this.setState({
          isLoaded: true,
        });
        sessionStorage.setItem(`task${compileConfig.task_id}`, responce.data.score)
      })
      .catch((error) => {
        console.log(error);
      })
    setTimeout(() => {
      this.isLoaded();
    }, 4000);
  }

  isLoaded = () => {
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
          <ButtonAll content={'Отправить на проверку'}
            action={this.compileSendToCheck}
          />
          <ButtonAll content={'Отправить финальный результат'}
            action={this.compileSendToFinale}
          />
          {
            this.state.isLoaded
              ? <p class="compile__text">Задача отправлена!</p>
              : null
          }
        </div>
        <MyModal descriptionText={this.state.checkerText}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeWindowComp: () => {
    dispatch(openWindow());
  }
});

export const Compile = connect(null, mapDispatchToProps)(CompileComponent);
