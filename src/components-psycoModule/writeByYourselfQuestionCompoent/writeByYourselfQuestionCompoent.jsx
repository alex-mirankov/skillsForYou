import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Button, Image, Modal } from 'semantic-ui-react'
// import validate from '../../validate';
import axios from 'axios';
import { Container } from 'semantic-ui-react';

class writeByYourselfQuest extends Component {
  state = {
    modalOpen: false,
    actualImg: null,
    actualImgVariant: null,
    variantImg: [],
    currentIndexVariantImg: null,
    editState: false,
    imgArr: [],
    checkArr: [],
    everyWordPriceState: false || this.props.editQuest ? this.props.editQuest.every_word_price_state : false
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  FileSelectedHendler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })

    let files = event.target.files[0];
    let formData = new FormData();

    formData.append("img_field", files);

    axios.post('https://psychotestmodule.herokuapp.com/api/img/', formData)
      .then((response) => {
        this.setState({ actualImg: response.data.img_field })
      }).catch(e => {
        console.log(e)
      })
  }

  firstTypeHandler(object, variantImg) {

    var formData = new FormData(document.forms.writeByYourselfForm);

    formData.forEach(function (value, key) {

      if (key === "answersArr") {
        let answersString = value.toUpperCase();
        object['answers_arr'] = answersString;
      }
      if (key === "answers_count") {
        object['answers_count'] = Number(value);
      }
    }
    );
    return object;
  }

  createQuestion(questions, setQuests, actualImg, variantImg, testType, editIndex, editVariants) {

    let questionsArray;
    if (questions !== undefined) {
      questionsArray = questions;
    }
    else questionsArray = [];

    var object = {};
    var formData = new FormData(document.forms.writeByYourselfForm);
    if (typeof editIndex === "number") {
      object["question_ID"] = editIndex + 1;
    }
    else {
      object["question_ID"] = questionsArray.length;
    }
    object["price_question"] = 1;
    object["type_question"] = "write_by_yourself_answer";
    object["every_word_price_state"] = this.state.everyWordPriceState
    formData.forEach(function (value, key) {

      if (key === 'questImg') {
        object[key] = actualImg;
      }
      if (key === 'question') {
        object[key] = value;
      }
      if (key === 'priceQuestion') {
        object["price_question"] = Number(value);
      }
      if (key === 'wordPrice') {
        object['word_price'] = Number(value);
      }
      if (key === 'groupName') {
        object["group"] = value;
      }
      if (key === 'timerQuestion') {
        if (value !== "0:0") {
          let timerArr = value.split(":");
          if (timerArr[1] > 60) {
            timerArr[0] = Math.floor(timerArr[1] / 60);
            timerArr[1] = timerArr[1] % 60;
          }
          let stringTimer = timerArr.join(":");
          object["timer_question"] = stringTimer;
        }
      }


    });

    if (testType === 'first') {
      object = this.firstTypeHandler(object, variantImg)
    }

    object["number_answers"] = 1;
    if (typeof editIndex === "number") {
      questionsArray[editIndex] = object;
    }
    else {
      questionsArray.push(object);
    }

    setQuests(questionsArray);
    console.log(object)
  }
  setCurrentQuestionImg() {
    this.setState({ actualImg: this.props.editQuest && this.props.editQuest.questImg ? this.props.editQuest.questImg : "" })
  }

  render() {
    const { handleSubmit,
      questions,
      setQuests,
      reset,
      testType,
      editVariants,
      editIndex,
      groupsObject,
      groupsState,
      groupsTimerState,
      editQuest,
      title } = this.props;

    return (
      <div className="quest-block">
        <Container className="quest-block__container">
          <Modal trigger={<Button onClick={() => {
            this.setState({ checkArr: [] });
            this.handleOpen();
            this.setCurrentQuestionImg()
          }}
            className={title === "Редактировать" ? 'quest-block__trigger quest-block__trigger_edit' : 'quest-block__trigger'}>{title}</Button>}
            open={this.state.modalOpen}
            centered={false}>

            <Modal.Header>{"Одновариантный вопрос"}</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='small' src={this.state.actualImg ? this.state.actualImg : 'https://react.semantic-ui.com/images/avatar/large/rachel.png'} />
              <Modal.Description>

                <form className="quest-block__form" onSubmit={handleSubmit} name='writeByYourselfForm'>

                  <div className="quest-block__div">
                    <label className="quest-block__label">Введите вопрос</label>
                    <textarea
                      className="quest-block__quest-text"
                      name="question"
                      placeholder="Текст результата"
                      defaultValue={editQuest ? editQuest.question : ""}
                    >
                    </textarea>
                  </div>
                  {
                    this.state.everyWordPriceState ?
                      <div className="quest-block__div">
                        <label className="quest-block__label">Количество баллов за каждое слово</label>
                        <input
                          className="quest-block__input"
                          disabled={!this.state.everyWordPriceState}
                          name="wordPrice"
                          defaultValue={editQuest && editQuest.price_question ? editQuest.price_question : 1}></input>
                      </div>
                      : <div className="quest-block__div">
                        <label className="quest-block__label">Количество баллов за ответ</label>
                        <input
                          className="quest-block__input"
                          name="priceQuestion"
                          defaultValue={editQuest && editQuest.price_question ? editQuest.price_question : 1}></input>
                      </div>
                  }

                  <div className="quest-block__div">
                    <label className="quest-block__label">Изображение</label>
                    <input
                      className="quest-block__img-inpt"
                      name="questImg"
                      type="file"
                      id="file"
                      onChange={this.FileSelectedHendler}
                    />
                    <label className="quest-block__file-label" for="file">Выберите файл</label>
                  </div>

                  {groupsState ? <div className="quest-block__div">
                    <label className="quest-block__label">Номер/название группы</label>
                    <input
                      className="quest-block__input"
                      name="groupName"
                      type="string"
                      defaultValue={editQuest && editQuest.group ? editQuest.group : 0}
                      onLoad={(event) => { this.props.handleGroups(event.target.value, groupsObject, groupsTimerState) }}
                      onChange={(event) => { this.props.handleGroups(event.target.value, groupsObject, groupsTimerState) }}></input>
                  </div>
                    : ""}
                  {groupsTimerState ? <div className="quest-block__div">
                    <label className="quest-block__label">Таймер группы</label>
                    <input
                      className="quest-block__input"
                      name="groupTimer"
                      id="groupTimer"
                      type="string"
                      placeholder="10:22 = 10 минут 22 секунды"
                      defaultValue={editQuest && editQuest.group ? this.props.groupsObject[editQuest.group] : "0:0"}></input>
                  </div> : ""}

                  <div className="quest-block__div">
                    <label className="quest-block__label">Таймер для вопроса</label>
                    <input
                      className="quest-block__input"
                      name="timerQuestion"
                      type="string"
                      placeholder="10:22 = 10 минут 22 секунды"
                      defaultValue={editQuest && editQuest.timer_question ? editQuest.timer_question : "0:0"}></input>
                  </div>
                  <div className="quest-block__div">
                    <input
                      id="nf-answer"
                      className="quest-block__check"
                      type="checkbox"
                      onClick={() => { this.setState({ everyWordPriceState: !this.state.everyWordPriceState }) }}
                      defaultChecked={this.state.everyWordPriceState}></input>
                    <label for="nf-answer" className="quest-block__label">Баллы за каждое правильное слово</label>

                  </div>

                  {
                    !this.state.everyWordPriceState ?
                      <div className="quest-block__div">
                        <label className="quest-block__label">Количество ответов для ввода:</label>
                        <input
                          className="quest-block__input"
                          type="number"
                          name="answers_count"
                          defaultValue={editQuest && editQuest.answers_count ? editQuest.answers_count : ""}></input>
                      </div>
                      : ""
                  }

                  <div className="quest-block__div">
                    <textarea
                      className="quest-block__quest-text quest-block__quest-text_width"
                      name="answersArr"
                      placeholder="Возможные ответы через запятую, регистр значения не имеет"
                      defaultValue={editQuest && editQuest.answers_arr ? editQuest.answers_arr : ""}>
                    </textarea>
                  </div>


                </form>

              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => { this.handleClose(); reset(); this.setState({ actualImg: null }) }} color="primary">
                Отмена
            </Button>

              <Button type="sumbit" onClick={() => {
                this.createQuestion(questions, setQuests, this.state.actualImg, this.state.variantImg, testType, editIndex, editVariants);
                this.props.setGroups(new FormData(document.forms.writeByYourselfForm), this.props.groupsObject, this.props.setGroupObject);
                this.handleClose(); reset(); this.props.updateList();
                this.setState({ actualImg: null })
              }}
                color="primary"
                autoFocus>
                Готово
            </Button>


            </Modal.Actions>
          </Modal>
        </Container>
      </div>
    )
  }
}
export default reduxForm({
  form: 'writeByYourselfForm'

})(writeByYourselfQuest)
