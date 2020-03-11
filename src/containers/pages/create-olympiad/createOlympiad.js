import React from 'react';
import './style.scss';

import {
  InputCabinet,
  TextareaCabinet,
  SelectCabinet,
} from '../index';
import { ButtonAll, CircularIndeterminate } from '../../../components/share';
import { MyModal } from '../../../components/index';
import axios from 'axios';
import { connect } from 'react-redux';
import { history } from '../../../services/redux';
import { openWindow } from '../../../redux/actions/index';

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
    olympiad_start: new Date(),
    olympiad_end: new Date(),
    olympiad_max_participations: '',
    olympiad: {},
    examples_images: [],
    taskCount: [],

    isExampleAdded: false,
    isTaskAdded: false,
    isOlympiadCreated: false,
    isOlympiadCreatedError: false,
    isFilesAvailable: false,
    olympiadId: 0,
    serialNumber: 1,
    serialNumberTask: 1,
    createOlympiadText: '',
  }

  uploadFiles = (e) => {
    e.preventDefault();
    this.setState({
      isFilesLoaderShown: true,
    });
    const formData = new FormData(document.getElementById('uploadFiles'));
    const options = {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token'),
      },
      body: formData,
    };
    let responceFiles = {
      upload: async() => {
        await fetch('http://165.22.92.120:81/fileupload/tests/', options)
      }
    }
    responceFiles.upload()
      .then(data => {
        this.setState({
          isFilesLoaderShown: false,
        });
      })
      .catch(err => {
        this.setState({
          isFilesLoaderShown: false,
        });
      })
  }

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

  handleChangeControl = (data) => {
    this.setState({
      [data.target.name]: data.target.value,
    });
  };

  handleChangeTaskFiles = data => {
    this.setState({
      serialNumber: data,
    });
  }

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
    this.setState({
      serialNumberTask: this.state.serialNumberTask + 1,
    });
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
      serial_number: this.state.serialNumberTask,
    });

    this.setState({
      tasks: tasks,
      isTaskAdded: true,
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

  pushTaskCount = (count) => {
    let array = [];
    for(let i = 1; i <= count; i++) {
      array.push({
        value: i,
        text: i
      });
    }
    this.setState({
      taskCount: array,
    });
  }

  createOlympiad = () => {
      let olympiad = this.state.olympiad;
      let params = {
        headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
      };

      olympiad = {
        task: this.state.tasks,
        name: this.state.olympiad_name,
        duration: Number(this.state.olympiad_duration),
        start_olympiad: new Date(this.state.olympiad_start).toISOString(),
        end_olympiad: new Date(this.state.olympiad_end).toISOString(),
        max_participations: Number(this.state.olympiad_max_participations),
      };

      this.setState({
        olympiad: olympiad,
      });
      console.log(olympiad);

      axios.post('http://165.22.92.120:81/olympiad/create/', olympiad, params)
        .then(data => {
          this.pushTaskCount(data.data.task.length);
          if (data.status === 200 || data.status === 201) {
            this.setState({
              createOlympiadText: 'Олимпиада создана. Теперь можно загрузить файлы к задачам'
            });
          }
          this.setState({
            isOlympiadCreated: true,
            isFilesAvailable: true,
            olympiadId: data.data.id,
          });
          setTimeout(() => {
            this.setState({
              isOlympiadCreated: false,
              olympiad: {},
            })
          }, 4000);
          this.props.closeWindowComp();
        })
        .catch(e => {
          if (Object.values(e)[2].status === 400) {
            this.setState({
              createOlympiadText: 'Ошибка при создании олимпиады. Пожалуйста, проверьте введенные данные'
            });
          } else if (Object.values(e)[2].status === 500) {
            this.setState({
              createOlympiadText: 'Ошибка при создании олимпиады. Сервер недоступен, попробуйте позже'
            });
          }
          this.setState({
            isOlympiadCreatedError: true,
            olympiad: {},
            tasks: [],
            createOlympiadError: e.error
          })
          setTimeout(() => {
            this.setState({
              isOlympiadCreatedError: false,
            })
          }, 4000);
          this.props.closeWindowComp();
        });
  }

  renderComponent = () => (
    <div className="create-olympiad">
      <div className="create-olympiad__header">Создание олимпиады</div>

      <div className="create-olympiad-general">
        <div className="create-olympiad-general-info">
          <InputCabinet caption={'Название олимпиады'}
                        handleChange={this.handleChangeControl}
                        name={'olympiad_name'} />
          <InputCabinet caption={'Продолжительность олимпиады'}
                        handleChange={this.handleChangeControl}
                        name={'olympiad_duration'} />
          <InputCabinet caption={'Дата старта'}
                        handleChange={this.handleChangeControl}
                        placeholder={'mm/dd/yyyy'} 
                        isMaskThere={true}
                        name={'olympiad_start'} />
          <InputCabinet caption={'Дата окончания'}
                        handleChange={this.handleChangeControl}
                        placeholder={'mm/dd/yyyy'}
                        isMaskThere={true}
                        name={'olympiad_end'} />
          <InputCabinet caption={'Максимальное количество участников'}
                        handleChange={this.handleChangeControl}
                        name={'olympiad_max_participations'} />
        </div>
        <div className="create-olympiad-general-task">
          <InputCabinet caption={'Название задачи'}
                        handleChange={this.handleChangeControl}
                        name={'name'} />
          <SelectCabinet caption={'Тип входящих данных'}
                        inputValues={inputDataTypeOptions}
                        handleChange={this.handleChangeInputDataType}
                        currentValue={this.state.input_data_type} />
          <SelectCabinet caption={'Тип выходящих данных'}
                        inputValues={outputDataTypeOptions}
                        handleChange={this.handleChangeOutputDataType}
                        currentValue={this.state.output_data_type} />
          <InputCabinet caption={'Лимит на память'}
                        handleChange={this.handleChangeControl}
                        name={'memory_limit'} />
          <InputCabinet caption={'Лимит на время'}
                        handleChange={this.handleChangeControl}
                        name={'time_limit'} />
          <TextareaCabinet caption={'Описание задачи'}
                            handleChange={this.handleChangeControl}
                            name={'task'} />
          <TextareaCabinet caption={'Входные значения(описание)'}
                            handleChange={this.handleChangeControl}
                            name={'input_data'} />
          <TextareaCabinet caption={'Выходящие значения(описание)'}
                            handleChange={this.handleChangeControl}
                            name={'output_data'} />
          <InputCabinet caption={'Количество тестов'}
                        handleChange={this.handleChangeControl}
                        name={'number_of_tests'} />
          <div className="create-olympiad-general-task__examples">
            <InputCabinet caption={'Входные значения'}
                          handleChange={this.handleChangeControl}
                          name={'input_data_value'} />
            <InputCabinet caption={'Выходящие значения'}
                          handleChange={this.handleChangeControl}
                          name={'output_data_value'} />
            <div className="create-olympiad-general-task__examples-add-btn">
              <ButtonAll content={'Добавить пример'}
                          action={this.addExample} />
              {this.state.isExampleAdded ? <div>Пример добавлен!</div> : null}
            </div>
          </div>
          <form id="uploadFiles"
                className="create-olympiad-general-task-files"
                encType="multipart/form-data">
            {
              this.state.isFilesAvailable
              ? <SelectCabinet caption={'Задача'}
                                inputValues={this.state.taskCount}
                                handleChange={this.handleChangeTaskFiles}
                                currentValue={this.state.serialNumber} />
              : null
            }
            <div>In</div>
            <input value={this.state.olympiadId} name="olympiad_id" style={{display: 'none'}}/>
            <input value={this.state.serialNumber} name="serial_number" style={{display: 'none'}}/>
            <input type='file'
              name="files"
              onChange={(e) => this.handleImageChange(e)} />
            <div>Out</div>
            <input type='file'
              name="files"
              onChange={(e) => this.handleImageChange(e)} />
            {
              this.state.isFilesAvailable
              ? <button type="submit"
                        className="create-olympiad-general-task-files__btn"
                        onClick={(e) => {this.uploadFiles(e)}}>
                  Загрузить файлы
                </button>
              : null
            }
            {
              this.state.isFilesLoaderShown
              ? <CircularIndeterminate />
              : null
            }
          </form>
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
        {this.state.isOlympiadCreatedError ? <div>Ошибка при создании олимпиады!</div> : null}
      </div>
      <MyModal descriptionText={this.state.createOlympiadText}/>
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

const mapDispatchToProps = (dispatch) => ({
  closeWindowComp: () => {
    dispatch(openWindow());
  }
});

export const CreateOlympiadPage = connect(mapStateToProps, mapDispatchToProps)(CreateOlympiadPageWithRedux);

