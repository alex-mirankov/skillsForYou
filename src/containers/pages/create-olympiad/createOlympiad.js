import React from 'react';
import './style.scss';

import {
  InputCabinet,
  TextareaCabinet,
  SelectCabinet,
} from '../index';
import { ButtonAll } from '../../../components';
import axios from 'axios';
import { connect } from 'react-redux';
import { history } from '../../../services/redux';

export const inputDataTypeOptions = [
  {
    value: 'with keyboard',
    text: 'с клавиатуры',
  },
];

export const outputDataTypeOptions = [
  {
    value: 'to screen',
    text: 'на экран',
  },
];

export class CreateOlympiadPageWithRedux extends React.Component {
  state = {
    tasks: [],
    name: '',
    input_data_type: '',
    output_data_type: '',
    memory_limit: 0,
    time_limit: 0,
    task: '',
    input_data: '',
    output_data: '',
    number_of_tests: 0,
    examples: [],
    files: [],
    input_data_value: '',
    output_data_value: '',
    olympiad_name: '',
    olympiad_duration: 0,
    olympiad_start: '',
    olympiad_end: '',
    olympiad_max_participations: '',
    olympiad: [],
    examples_images: [],

    isExampleAdded: false,
    isTaskAdded: false,
    isOlympiadCreated: false,
    olympiadId: 0,
    serialNumber: 0,
  }

  componentDidMount = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get('http://165.22.92.120:82/olympiad/', params)
      .then((data) => {
        this.setState({
          olympiadId: data.data[data.data.length - 1].id + 1,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  uploadFiles = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    let filesObject = {
      serial_number: this.state.serialNumber,
      olympiad_id: this.state.olympiadId,
      files: this.state.files,
    };
    axios.post('http://165.22.92.120:82/fileupload/', filesObject, params)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeName = (data) => {
    this.setState({
      name: data.target.value,
    });
  };

  handleChangeInputDataType = (data) => {
    this.setState({
      input_data_type: data,
    });
  };

  handleChangeOutputDataType = (data) => {
    this.setState({
      output_data_type: data,
    });
  };

  handleChangeMemory = (data) => {
    this.setState({
      memory_limit: data.target.value,
    });
  };

  handleChangeTime = (data) => {
    this.setState({
      time_limit: data.target.value,
    });
  };

  handleChangeTaskDescription = (data) => {
    this.setState({
      task: data.target.value,
    });
  };

  handleChangeInputData = (data) => {
    this.setState({
      input_data: data,
    });
  };

  handleChangeOutputData = (data) => {
    this.setState({
      output_data: data,
    });
  };

  handleChangeNumberOfTests = (data) => {
    this.setState({
      number_of_tests: data.target.value,
    });
  };

  handleChangeInputValue = (data) => {
    this.setState({
      input_data_value: data.target.value,
    });
  };

  handleChangeOutputValue = (data) => {
    this.setState({
      output_data_value: data.target.value,
    });
  };

  handleChangeOlympiadName = (data) => {
    this.setState({
      olympiad_name: data.target.value,
    });
  };

  handleChangeOlympiadDuration = (data) => {
    this.setState({
      olympiad_duration: data.target.value,
    });
  };

  handleChangeOlympiadStartDate = (data) => {
    this.setState({
      olympiad_start: data.target.value,
    });
  };

  handleChangeOlympiadEndDate = (data) => {
    this.setState({
      olympiad_end: data.target.value,
    });
  };

  handleChangeOlympiadMaxParticipations = (data) => {
    this.setState({
      olympiad_max_participations: data.target.value,
    });
  };

  addExample = () => {
    let examplesArray = this.state.examples;
    examplesArray.push({
      input_data: this.state.input_data_value,
      output_data: this.state.output_data_value,
    });

    this.setState({
      examples: examplesArray,
      isExampleAdded: true,
    });

    setTimeout(() => {
      this.setState({
        isExampleAdded: false,
      })
    }, 4000);
  }

  addTaskOlympiad = () => {
    let tasks = this.state.tasks;
    tasks.push({
      name: this.state.name,
      input_data_type: this.state.input_data_type,
      output_data_type: this.state.output_data_type,
      memory_limit: Number(this.state.memory_limit),
      time_limit: Number(this.state.time_limit),
      task: this.state.task,
      input_data: this.state.input_data_value,
      output_data: this.state.output_data_value,
      number_of_tests: Number(this.state.number_of_tests),
      examples: this.state.examples,
      files: this.state.files,
      examples_images: this.state.examples_images,
    });

    this.setState({
      tasks: tasks,
      isTaskAdded: true,
      serialNumber: this.state.serialNumber + 1,
    });

    setTimeout(() => {
      this.setState({
        isTaskAdded: false,
      })
    }, 4000);

    this.setState({
      examples: [],
      files: [],
    });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    let files = this.state.files;

    reader.onloadend = () => {
      files.push({
        file: file,
      })
      this.setState({
        files: files,
      });
    }

    reader.readAsDataURL(file);
  }

  createOlympiad = () => {
    try {
      let olympiad = this.state.olympiad;
      let params = {
        headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
      };

      olympiad.push({
        task: this.state.tasks,
        name: this.state.olympiad_name,
        duration: Number(this.state.olympiad_duration),
        start_olympiad: new Date(this.state.olympiad_start).toISOString(),
        end_olympiad: new Date(this.state.olympiad_end).toISOString(),
        max_participations: Number(this.state.olympiad_max_participations),
      });

      this.setState({
        olympiad: olympiad,
        isOlympiadCreated: true,
      });

      setTimeout(() => {
        this.setState({
          isOlympiadCreated: false,
          olympiad: [],
        })
      }, 4000);

      axios.post('http://165.22.92.120:82/olympiad/create/', this.state.olympiad, params)
        .then(data => {
        })
        .catch(e => {
          console.log(e);
        });
    } catch {
      history.push('/');
    }
  }

  renderComponent = () => (
    <div className="create-olympiad">
      <div className="create-olympiad__header">Создание олимпиады</div>

      <div className="create-olympiad-general">
        <div className="create-olympiad-general-info">
          <InputCabinet caption={'Название олимпиады'}
            handleChange={this.handleChangeOlympiadName} />
          <InputCabinet caption={'Продолжительность олимпиады'}
            handleChange={this.handleChangeOlympiadDuration} />
          <InputCabinet caption={'Дата старта'}
            handleChange={this.handleChangeOlympiadStartDate}
            placeholder={'mm/dd/yyyy'} 
            isMaskThere={true}/>
          <InputCabinet caption={'Дата окончания'}
            handleChange={this.handleChangeOlympiadEndDate}
            placeholder={'mm/dd/yyyy'} 
            isMaskThere={true}
            />
          <InputCabinet caption={'Максимальное количество участников'}
            handleChange={this.handleChangeOlympiadMaxParticipations} />
        </div>
        <div className="create-olympiad-general-task">
          <InputCabinet caption={'Название задачи'}
            handleChange={this.handleChangeName} />
          <SelectCabinet caption={'Тип входящих данных'}
            inputValues={inputDataTypeOptions}
            handleChange={this.handleChangeInputDataType}
            currentValue={this.state.input_data_type} />
          <SelectCabinet caption={'Тип выходящих данных'}
            inputValues={outputDataTypeOptions}
            handleChange={this.handleChangeOutputDataType}
            currentValue={this.state.output_data_type} />
          <InputCabinet caption={'Лимит на память'}
            handleChange={this.handleChangeMemory} />
          <InputCabinet caption={'Лимит на время'}
            handleChange={this.handleChangeTime} />
          <TextareaCabinet caption={'Описание задачи'}
            handleChange={this.handleChangeTaskDescription} />
          <TextareaCabinet caption={'Входные значения(описание)'}
            handleChange={this.handleChangeInputData} />
          <TextareaCabinet caption={'Выходящие значения(описание)'}
            handleChange={this.handleChangeOutputData} />
          <InputCabinet caption={'Количество тестов'}
            handleChange={this.handleChangeNumberOfTests} />
          <div className="create-olympiad-general-task__examples">
            <InputCabinet caption={'Входные значения'}
              handleChange={this.handleChangeInputValue} />
            <InputCabinet caption={'Выходящие значения'}
              handleChange={this.handleChangeOutputValue} />
            <div className="create-olympiad-general-task__examples-add-btn">
              <ButtonAll content={'Добавить пример'}
                action={this.addExample} />
              {this.state.isExampleAdded ? <div>Пример добавлен!</div> : null}
            </div>
          </div>
          <div className="create-olympiad-general-task-files">
            <div>In</div>
            <input type='file'
              onChange={(e) => this.handleImageChange(e)} />
            <div>Out</div>
            <input type='file'
              onChange={(e) => this.handleImageChange(e)} />
            <ButtonAll content={'Загрузить файлы'}
              action={this.uploadFiles} />
          </div>
          <div className="create-olympiad-general-task__create-btn">
            <ButtonAll content={'Добавить задачу'}
              action={this.addTaskOlympiad} />
            {this.state.isTaskAdded ? <div>Задача добавлена!</div> : null}
          </div>
        </div>
      </div>

      <div className="create-olympiad-general-task__submit-btn">
        <ButtonAll content={'Создать олимпиаду'}
          action={this.createOlympiad}
          styles={{ width: '50%' }} />
        {this.state.isOlympiadCreated ? <div>Олимпиада создана!</div> : null}
      </div>
    </div>
  );

  render() {
    return (
      <>
        {window.localStorage.getItem('token') ? <this.renderComponent /> : history.push('/')}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userToken,
});

export const CreateOlympiadPage = connect(mapStateToProps)(CreateOlympiadPageWithRedux);

