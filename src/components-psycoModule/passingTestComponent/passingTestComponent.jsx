import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import "./style.css";
import PassingQuestion from '../passingQuestionComponent/passingQuestionContainer';
import { Prompt } from 'react-router'
class passForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: ``,
      shouldShowElem: false,
      selectedFile: null,
      isOpen: false,
      questionID: 0,
      actualImg: null,
      resultIndex: 0,
      resultArr: [],
      superObj: {},
      questionTimer: [],
      timerInterval: null,
      groupTimerInterval: null,
      currentGroup: "",
      previuoseGroups: {},
      activeInputsArr: [],
      prevQuestIndex: null,
      testComplete: true,
      groupTimersStates: {},
      groupResultIndexes: [],
      chaptersResultState: false,
      chapterBtnState: true
    };
  }

  onUnload(event) {
    event.returnValue = "Информация будет стерта, уверены?"
  }

  componentDidUpdate() {
    if (this.props.testContent) {
      this.initializeQuestion(this.props.testContent)
    }
  }
  componentDidMount() {
    if (this.props.testContent) {
      this.initializeQuestion(this.props.testContent);
    }
    window.addEventListener("beforeunload", this.onUnload)
  }
  componentWillMount() {
    console.log("сработало")
    //поправил баг, тестируется
    if (!this.props.questIndex) {
      this.props.setIndexOfQuestion(0);
    }
    let url = 'https://psychotestmodule.herokuapp.com/tests/' + this.props.match.params.testId + '/';
    axios.get(url).then(response => {
      let test = response.data;
      let content = eval(test.test_content);
      eval(content).forEach(elem => {
        if (elem.type_question !== "write_by_yourself_answer") {
          elem.variants.forEach(variant => {
            variant.answer_state = 0;
          })
        }
        else {
          elem.answers_arr = "";
        }
      });
      if (test.test_group_results_state) {
        content.sort(function (a, b) {
          return a.group - b.group;
        })
      }
      console.log(content)
      test.test_content = content;
      this.props.setPassingTest(test)
    })

  }
  componentWillUnmount() {
    clearInterval(this.state.timerInterval);
    clearInterval(this.state.groupTimerInterval);
    this.props.setGroupTimer([0, 0]);
    this.props.setQuestionTimer([0, 0]);
    this.props.clearPassingTest();
    this.props.setIndexOfQuestion(0);
    this.setState({ superObj: {} });
    window.removeEventListener("beforeunload", this.onUnload)

  }
  createChaptersResult() {
    console.log("ЗАПУСТИЛОСЬ")
    let item = null;
    let items = [];
    console.log(this.state.groupResultIndexes)
    for (let i = 0; i < this.state.groupResultIndexes.length; i++) {
      item = <div className="result-div-item" key={i}> <img src={this.props.passingTestResults[this.state.groupResultIndexes[i]].result_img} alt='' />
        <p>
          {this.props.passingTestResults[this.state.groupResultIndexes[i]].result}
        </p></div>
      console.log(this.props.passingTestResults[this.state.groupResultIndexes[i]].result)

      items.push(item);
    }
    return items;
  }
  resultAxios(testContent) {
    if (this.props.passingTest.test_group_results_state) {
      this.setState({ chaptersResultState: true })
      document.getElementById("passBlock").remove();
      document.getElementById("questionMapContainer").remove();
      document.getElementById("resultBlock").style.display = "block";
      document.getElementById("chapterResult").remove();
    }
    else {
      this.props.passingTest.test_content = JSON.stringify(testContent);
      console.log(JSON.stringify(testContent))
      console.log(this.props.passingTest.test_check_sum)
      let url = null;
      console.log(this.props.passingTest)
      if (this.props.passingTest.test_type === "first") {
        url = 'https://psychotestmodule.herokuapp.com/oneway/';
      }
      else {
        url = 'https://psychotestmodule.herokuapp.com/exam/class/';
      }
      axios.post(url, this.props.passingTest)
        .then((response) => {
          console.log(response)
          this.setState({ testComplete: true })
          document.getElementById("passBlock").remove();
          document.getElementById("questionMapContainer").remove();
          document.getElementById("resultBlock").style.display = "block";
          if (this.props.passingTest.test_type === "first") {
            this.setState({ resultIndex: response.data })
          }
          else {
            let result = eval(response.data).indexOf(Math.max.apply(null, eval(response.data)))
            this.setState({ resultIndex: result })
          }
        }).catch(e => {
          console.log(e)
        })
    }

  }
  resultChapterAxios(testContent) {

    clearInterval(this.state.timerInterval);
    clearInterval(this.state.groupTimerInterval);
    this.props.setGroupTimer([0, 0]);
    this.props.setQuestionTimer([0, 0]);

    if (this.props.questIndex === testContent.length - 1) {
      this.setState({ chapterBtnState: false })
    }
    let url = 'https://psychotestmodule.herokuapp.com/exam/group/';
    this.props.passingTest.test_content = JSON.stringify(testContent);
    let passTest = this.props.passingTest;
    passTest.current_group = this.state.currentGroup.toString();
    console.log(passTest)
    axios.post(url, passTest)
      .then((response) => {
        console.log(response)
        let indexes = this.state.groupResultIndexes;
        indexes.push(Number(response.data))
        this.setState({ groupResultIndexes: indexes })
        this.setState({ resultIndex: Number(response.data) })

        document.getElementById("passBlock").style.display = "none";
        document.getElementById("questionMapContainer").style.display = "none";
        document.getElementById("chapterResult").style.display = "block";
      }).catch(e => {
        console.log(e)
      })
  }

  changeChapter() {
    this.setState({ currentGroup: this.props.testContent[this.props.questIndex + 1].group })
    console.log(this.state.currentGroup)
    document.getElementById("passBlock").style.display = "block";
    document.getElementById("questionMapContainer").style.display = "inline-block";
    document.getElementById("chapterResult").style.display = "none";
  }

  changeSuperObj() {
    let currentSuperObj = this.state.superObj;
    currentSuperObj[this.props.questIndex] = 1;
    this.setState({ superObj: currentSuperObj })
  }
  checkAnswerState(question) {

    if (typeof question.answers_arr !== 'string') {
      for (let i = 0; i < question.variants.length; i++) {
        if ((question.variants[i].answer_state && question.variants[i].answer_state !== 0)) {
          document.getElementById(this.props.questIndex).classList.add("passing-block__question-map-item_answered");
          break;
        }
      }
    }
    else {
      if (question.answers_arr !== 0) {
        document.getElementById(this.props.questIndex).classList.add("passing-block__question-map-item_answered");
      }
    }
  }
  changeCurrentQuestion(nextQuest) {
    let index = 0;

    if (this.props.testContent[this.props.questIndex].timer_question) {
      this.props.testContent[this.props.questIndex].timerState = false;
    }

    this.checkAnswerState(this.props.testContent[this.props.questIndex]);
    clearInterval(this.state.timerInterval);
    this.props.setQuestionTimer([0, 0]);
    this.changeSuperObj(this.props.questIndex)
    this.props.setIndexOfQuestion(nextQuest);

    setTimeout(() => document.querySelectorAll(".passing-block__variant-item").forEach(elem => {
      if (this.props.testContent[this.props.questIndex].type_question === "write_by_yourself_answer") {
        elem.value = this.props.testContent[nextQuest].answers_arr;
      }
      else {
        elem.checked = this.props.testContent[nextQuest].variants[index].answer_state;
        elem.value = this.props.testContent[nextQuest].variants[index].answer_state;
      }
      index++;
    }), 0);


  }

  startQuestionTimer() {
    let questionTimerArr = this.props.testContent[this.props.questIndex].timer_question.split(":");
    this.props.setQuestionTimer([Number(questionTimerArr[0]), Number(questionTimerArr[1])]);

    this.tickQuestionTimer();
  }
  startGroupTimer(group) {
    let groupTimerArr = this.props.groups_object[group].split(":");
    this.props.setGroupTimer([Number(groupTimerArr[0]), Number(groupTimerArr[1])]);
    this.tickGroupTimer()
  }
  tickQuestionTimer() {
    let questionTimer = null;
    setTimeout(() => {
      questionTimer = [Number(this.props.questionMinutes), Number(this.props.questionSeconds)];

      this.setState({
        timerInterval: setInterval(() => {

          this.props.setQuestionTimer(questionTimer);
          if (questionTimer[1] === 0) {
            if (questionTimer[0] === 0) {
              clearInterval(this.state.timerInterval);
              if (this.props.questIndex < this.props.testContent.length - 1) {
                this.props.testContent[this.props.questIndex].timerState = false;
                if (this.props.testContent[this.props.questIndex].group === this.props.testContent[this.props.questIndex + 1].group) {
                  this.changeCurrentQuestion(this.props.questIndex + 1);
                }

              }
              else {
                if (this.props.passingTest.test_group_results_state) {
                  this.resultChapterAxios(this.props.testContent); this.changeSuperObj(this.props.questIndex);
                }
                else {
                  this.resultAxios(this.props.testContent); this.changeSuperObj(this.props.questIndex);
                }

              }
            }
            else {
              questionTimer[0]--;
              questionTimer[1] = 60;
            }
          }
          questionTimer[1]--;

        }, 1000)
      })
    }, 0)
  }
  tickGroupTimer() {

    let groupTimer = null;
    setTimeout(() => {
      groupTimer = [Number(this.props.questionGroupMinutes), Number(this.props.questionGroupSeconds)];
      this.setState({
        groupTimerInterval: setInterval(() => {

          this.props.setGroupTimer(groupTimer);
          if (groupTimer[1] === 0) {
            if (groupTimer[0] === 0) {
              clearInterval(this.state.groupTimerInterval);
              for (let i = this.props.questIndex; i < this.props.testContent.length; i++) {
                this.changeSuperObj(i);
                if (i === this.props.testContent.length - 1) {
                  if (this.props.passingTest.test_group_results_state) {
                    this.resultChapterAxios(this.props.testContent); this.changeSuperObj(this.props.questIndex);
                  }
                  else {
                    this.resultAxios(this.props.testContent); this.changeSuperObj(this.props.questIndex);
                  }
                  break;
                }
                if (this.props.testContent[i].group !== this.state.currentGroup && this.props.testContent[i].timerState !== false) {
                  if (this.props.passingTest.test_group_results_state) {
                    this.changeCurrentQuestion(i - 1);
                    this.resultChapterAxios(this.props.testContent); this.changeSuperObj(this.props.questIndex);
                  }
                  else {
                    this.changeCurrentQuestion(i);
                  }
                  break;
                }
              }
            }
            else {
              groupTimer[0]--;
              groupTimer[1] = 60;
            }
          }
          groupTimer[1]--;
        }, 1000)
      })
    }, 0)
  }

  initializeQuestion(testContent, index) {


    document.querySelectorAll(".passing-block__question-map-item").forEach(elem => {
      elem.classList.remove("passing-block__question-map-item_active");
    })

    if (document.getElementById(this.props.questIndex)) {
      document.getElementById(this.props.questIndex).classList.add("passing-block__question-map-item_active")
    }

    if (testContent) {

      // console.log(testContent[this.props.questIndex].group)
      // console.log(testContent[this.props.questIndex+1].group)
      // console.log(testContent[this.props.questIndex].group===testContent[this.props.questIndex+1].group)
      let inputsArr = document.querySelectorAll(".passing-block__container input");
      inputsArr.forEach(element => {
        if (testContent[this.props.questIndex].timerState === false) {
          element.disabled = true;
        }
        else {
          element.disabled = false;
        }

      });

      if (!this.state.superObj.hasOwnProperty(this.props.questIndex)) {

        this.changeSuperObj(this.props.questIndex);

        if (testContent) {

          if (testContent[this.props.questIndex].timer_question) {
            this.startQuestionTimer()
          }

          if (this.props.groups_object && this.props.passingTest.test_group_timers_state) {

            if (testContent[this.props.questIndex].group !== this.state.currentGroup
              && !this.state.groupTimersStates.hasOwnProperty(testContent[this.props.questIndex].group)) {
              testContent.forEach(elem => {
                if (elem.group === this.state.currentGroup) {
                  elem.timerState = false;
                }
              })
              // if (!this.state.groupTimersStates.hasOwnProperty(testContent[this.props.questIndex].group)) {
              // раньше тут был блок снизу
              // }
              if (this.state.currentGroup) {
                let timersStates = this.state.groupTimersStates;
                timersStates[this.state.currentGroup] = "deactivated";
                this.setState({ groupTimersStates: timersStates })
              }
              this.setState({ currentGroup: testContent[this.props.questIndex].group });
              let timersStates = this.state.groupTimersStates;
              timersStates[testContent[this.props.questIndex].group] = "activated";
              this.setState({ groupTimersStates: timersStates })
              //asdasdasd
              console.log(this.state.groupTimersStates)
              clearInterval(this.state.groupTimerInterval);
              if (this.props.groups_object[testContent[this.props.questIndex].group]
              ) {
                console.log("Запуск таймера")
                this.startGroupTimer(testContent[this.props.questIndex].group);
              }

            }
          }
        }
      }
    }

  }
  createQuestionMap(testContent) {
    let items = [];
 
    if (testContent && testContent[this.props.questIndex].group && !this.state.currentGroup) {
      this.setState({ currentGroup: testContent[this.props.questIndex].group })
    }
    testContent.forEach((elem, elemIndex) => {

      let item = <li
        key={elemIndex}
        className="passing-block__question-map-item"
        id={elemIndex}
        onClick={() => { this.changeCurrentQuestion(elemIndex); }}
      >{elemIndex + 1}</li>;

      if (testContent && this.props.passingTest.test_group_results_state) {
        item = <li
          key={elemIndex}
          className={elem.group === this.state.currentGroup
            ? "passing-block__question-map-item"
            : "passing-block__question-map-item_disabled"}
          id={elemIndex}
          onClick={() => { this.changeCurrentQuestion(elemIndex); }}
        >{elemIndex + 1}</li>
      }

      items.push(item);
    })
    return items;
  }

  activateGroupTimer() {
    if (this.props.groups_object[this.props.testContent[this.props.questIndex].group]
    ) {
      console.log("Запуск таймера")
      this.startGroupTimer(this.props.testContent[this.props.questIndex].group);
    }

  }
  render() {

    const { setIndexOfQuestion,
      passingTestResults,
      testContent,
      passingTest
    } = this.props;

    return (
      !testContent ? <div className="lds-facebook"><div></div><div></div><div></div></div> :
        <Container className="passing-block">

          <Prompt
            when={document.getElementById("passBlock")}
            message='Если вы уйдете со страницы теста, то весь прогресс будет утерян'
          />
          <div className="passing-block__question-map-container" id="questionMapContainer">
            <ul className="passing-block__question-map" id="questionMap">
              {this.createQuestionMap(testContent)}
            </ul>
          </div>
          <div className="passing-block__container" id="passBlock">

            <PassingQuestion></PassingQuestion>

            <div className="passing-block__btn-div">
              {this.props.questIndex === 0 ?
                ""
                : <button className="passing-block__button passing-block__button_first" onClick={() => {
                  this.changeCurrentQuestion(this.props.questIndex - 1)
                }}>Предыдущий</button>
              }
              {
                passingTest.test_group_results_state &&
                  this.state.chapterBtnState &&
                  (this.props.questIndex === testContent.length - 1
                    || testContent[this.props.questIndex + 1].group !== testContent[this.props.questIndex].group) ?
                  <button className="passing-block__button passing-block__button_large"
                    onClick={() => { this.resultChapterAxios(testContent); this.changeSuperObj(this.props.questIndex); }}>Завершить текущую часть теста</button>

                  : this.props.questIndex < testContent.length - 1 ?
                    <button className="passing-block__button" onClick={() => {
                      this.changeCurrentQuestion(this.props.questIndex + 1)
                    }}>Следующий</button>
                    : ""}
              {this.props.questIndex === testContent.length - 1 && !passingTest.test_group_results_state ?
                <button className="passing-block__button"
                  onClick={() => { this.resultAxios(testContent); this.changeSuperObj(this.props.questIndex); }}>Готово</button>
                : ""}


              <img className="passing-block__decorate" src={require('../../img/questions.png')} alt="asdsadasdsad" />
            </div>
          </div>

          <div className="passing-block__results" id="resultBlock">
            {!this.state.chaptersResultState ?
              <div> <img src={passingTestResults[this.state.resultIndex].result_img} alt='' />
                <p>
                  {this.props.passingTest.test_type === "first" ?
                    passingTestResults[this.state.resultIndex].result :
                    passingTestResults[this.state.resultIndex].description
                  }
                </p>
              </div>
              : this.createChaptersResult()}
            <Link to="/" onClick={() => { this.setState({ superObj: {} }); setIndexOfQuestion(0); }}>Завершить</Link>
          </div>

          <div className="passing-block__results" id="chapterResult">
            <img src={passingTestResults[this.state.resultIndex].result_img} alt='' />
            <p>
              {passingTestResults[this.state.resultIndex].result}
            </p>
            {this.props.questIndex !== testContent.length - 1 ? <button
              className="passing-block__button"
              onClick={() => {
                this.changeChapter();
                this.changeCurrentQuestion(this.props.questIndex + 1);
                this.activateGroupTimer();
              }}>Перейти к следующей части</button>
              : <button className="passing-block__button"
                onClick={() => { this.resultAxios(testContent); this.changeSuperObj(this.props.questIndex); }}>Готово</button>}
          </div>
        </Container >

    )
  }
}

export default reduxForm({
  form: 'PassingForm'
})(passForm)
