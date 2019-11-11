import React, { Component } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button, Image, Modal } from 'semantic-ui-react'
// import validate from '../validate';
import axios from 'axios';
import { Container } from 'semantic-ui-react';

class sequenceQuestion extends Component {
  state = {
    notFullPriceState: false || (this.props.editQuest && this.props.editQuest.not_full_price_question ? this.props.editQuest.not_full_price_question : false),
    modalOpen: false,
    actualImg: null,
    variantImg: [],
    currentIndexVariantImg: null,
    editState: false,
    editStateArray: [],
    currentVarIndex: null,
    notFullPriceArr: [],
    checkArr: [],

  }
  handleEdit = () => {
    this.setState({ editState: true });
  }
  handleEditClose = () => {
    this.setState({ editState: false });
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  setIndex = (index) => { this.setState({ currentIndexVariantImg: index }) }

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

  FileSelectedHendlerVariants = ee => {

    let imgVarArr = this.state.variantImg;
    let files = ee;
    let formData = new FormData();
    formData.append("img_field", files);

    axios.post('https://psychotestmodule.herokuapp.com/api/img/', formData)
      .then((response) => {
        imgVarArr[this.state.currentIndexVariantImg] = response.data.img_field;
        this.setState({ variantImg: imgVarArr })
      }).catch(e => {
        console.log(e)
      })
  }

  FileVariantsRemove = index => {
    let imgVarArr = this.state.variantImg;
    imgVarArr.splice(index, 1);
    this.setState({ variantImg: imgVarArr });
  }
  firstTypeHandler(object, variantImg) {
    var object1 = {};
    var allVariants = [];
    var roll = 0;
    var index = 0;
    var formData = new FormData(document.forms.SequenceVariantForm);
    var variantIndex = 0;

    formData.forEach(function (value, key) {

      if (key === "variant_img" + index) {

        object1["variant_Id"] = variantIndex;
        variantIndex++;
        object1["variant_img"] = variantImg[index];
      }
      if (key === "variants[" + index + "]priceVar") {
        object1["price_var"] = Number(value);
      }
      if (key === "variants[" + index + "]variant") {
        object1["variant"] = value;
      }

      if (key === "variants[" + index + "]answerState") {
        object1["answer_state"] = Number(value);
        allVariants[roll] = object1;
        index++;
        object1 = {};
        roll++;
      }

    }

    );
    object["variants"] = allVariants;

    return object;
  }

  createQuestion(questions, setQuests, actualImg, variantImg, testType, editIndex, variantsCount) {

    let questionsArray;
    if (questions !== undefined) {
      questionsArray = questions;
    }
    else questionsArray = [];
    var object = {};
    var formData = new FormData(document.forms.SequenceVariantForm);
    var variantIndex = 0;
    object["question_ID"] = questionsArray.length;
    object["type_question"] = "sequence_answer";
    object["price_question"] = 1;
    formData.forEach(function (value, key) {

      if (variantIndex === variantsCount) {
        variantIndex = 0;
      }
      if (key === 'questImg') {
        object[key] = actualImg;
      }
      if (key === 'question') {
        object[key] = value;
      }

      if (key === 'priceQuestion') {
        object["price_question"] = Number(value);
      }
      if (key === 'notFullPriceQuestion') {
        object["not_full_price_question"] = true;
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
      if (key === 'groupName') {
        object["group"] = value;
      }
    });
    if (!object.hasOwnProperty("not_full_price_question")) {
      object["not_full_price_question"] = false;
    }
    if (testType === 'first') {
      object = this.firstTypeHandler(object, variantImg);
    }

    object["number_answers"] = variantsCount;

    if (typeof editIndex === "number") {
      questionsArray[editIndex] = object;
    }
    else {
      questionsArray.push(object);
    }

    setQuests(questionsArray);
    variantsCount = 0;
    console.log(JSON.stringify(object))
  }
  insertCurrentData(editVariants) {
    if (typeof editVariants !== "undefined") {
      setTimeout(() => {
        document.getElementById("insertDataSequenceVariant").click();
      }, 0);
      document.querySelectorAll("input").forEach(elem => {
        elem.focus()
      })
    }
  }

  deleteFromEditArr(index) {
    if (index < this.props.editCount) {
      this.handleEditClose();
    }
  }

  changeArr(index, value) {
    let editIndexArr = this.state.editStateArray;
    editIndexArr[index] = value;
    this.setState({ editStateArray: editIndexArr })
    return value;
  }
  saveData(index, value) {
    let arr = this.state.checkArr;
    this.state.checkArr[index] = value;
    // arr[index] = value;
    // this.setState({ checkArr: arr })
  }

  addToArr(value) {
    let arr = this.state.checkArr;
    this.state.checkArr.push(value);
    // arr.push(value);
    // this.setState({ checkArr: arr })
  }

  delFromArr(index) {
    let arr = this.state.checkArr;
    this.state.checkArr.splice(index, 1)
    // arr.splice(index, 1);
    // this.setState({ checkArr: arr })
  }

  saveDataPriceArr(index, value) {
    let arr = this.state.notFullPriceArr;
    this.state.notFullPriceArr[index] = value;
    // arr[index] = value;
    // this.setState({ notFullPriceArr: arr })
  }

  addToArrPriceArr(value) {
    let arr = this.state.notFullPriceArr;
    this.state.notFullPriceArr.push(value);
    // arr.push(value);
    // this.setState({ notFullPriceArr: arr })
  }

  delFromArrPriceArr(index) {
    let arr = this.state.notFullPriceArr;
    this.state.notFullPriceArr.splice(index, 1);
    // arr.splice(index, 1);
    // this.setState({ notFullPriceArr: arr })
  }

  render() {

    const { handleSubmit,
      questions,
      setQuests,
      reset,
      testType,
      variantsCount,
      setVariantsCount,
      editIndex,
      groupsObject,
      groupsState,
      groupsTimerState,
      editQuest,
      title } = this.props
    console.log(this.state.notFullPriceState)
    const renderField = ({ input, label, type, answer, index, meta: { touched, error } }) => (
      <div className="variants-block__variant-info">
        {console.log(this.state.notFullPriceArr)}
        <label>{label}</label>

        <input
          className="variants-block__price-var"
          type="number"
          name={answer + "priceVar"}
          onChange={(e) => this.saveDataPriceArr(index, e.target.value)}
          disabled={!this.state.notFullPriceState}
          defaultValue={this.state.notFullPriceArr[index] || this.state.notFullPriceArr[index] === 0 ? this.state.notFullPriceArr[index] : 0}>
        </input>
        <textarea
          className="variants-block__text"
          {...input}
          type={type}
          placeholder={label} />
        {touched && error && <span>{error}</span>}

      </div>
    )

    const renderFieldInput = ({ input, label, type, editCount, editVariants, index, meta: { touched, error } }) => (
      <div className="variants-block__variant-info">
        {
          editCount > index ?
            delete input.value
            && <input
              className="variants-block__seq-input"
              {...input}
              type={type}
              placeholder={label}
              defaultValue={this.state.checkArr[index] ? this.state.checkArr[index] : 0} />
            : <input
              className="variants-block__seq-input"
              {...input}
              type={type}
              placeholder={label} />
        }
        {touched && error && <span>{error}</span>}
        <label className="variants-block__label-info variants-block__label-info_seq">Присвойте нужный номер
        варианту ответа </label>
      </div>
    )

    const renderAnswers = ({ fields, editIndex, editVariants, editCount, variantsImgArray }) => (
      <div>
        {typeof editVariants !== "undefined" ?
          <button type="button" id="insertDataSequenceVariant" onClick={() => {
            setVariantsCount(editVariants.length);
            this.setState({ actualImg: editQuest.questImg })
            if (fields.length <= editVariants.length) {
              editVariants.forEach((elem, index) => {

                this.setState({ currentVarIndex: index })
                if (elem.price_var || elem.price_var === 0) {
                  this.addToArrPriceArr(elem.price_var)
                }
                this.addToArr(elem.answer_state);
                this.handleEdit();
                fields.push(elem);
                let imgVarArr = this.state.variantImg;
                if (fields.length > 0) {
                  imgVarArr[fields.length + index + 1] = editVariants[elem.variant_Id].variant_img;
                }
                else {
                  if (index === 0) {
                    imgVarArr[fields.length] = editVariants[elem.variant_Id].variant_img;
                  }
                  else {
                    imgVarArr[fields.length + index] = editVariants[elem.variant_Id].variant_img;
                  }

                }
                this.setState({ variantImg: imgVarArr })
              });

            };

          }}> Загрузить свои ответы </button> :
          ""
        }

        <div className="variants-block__main-info">
          <label className="variants-block__label variants-block__label_margin">Варианты ответа: {variantsCount}</label>
          <button
            className="quest-block__btn quest-block__btn_add"
            type="button"
            onClick={() => {
              fields.push({});
              setVariantsCount(variantsCount + 1);
              this.addToArr(false);
              this.addToArrPriceArr(0);
            }}>Добавить вариант ответа</button>
        </div>
        <ul className="variants-block__ul">

          {fields.map((answer, index, item) =>
            <li className="variants-block__item" key={index}>
              <h4 className="variants-block__title">Вариант {index + 1}</h4>
              <img src={variantsImgArray[index] ? variantsImgArray[index] : ""} alt='' />
              <button
                className="variants-block__delete-btn"
                type="button"
                title="Удалить вариант"

                onClick={() => {
                  fields.remove(index);
                  setVariantsCount(variantsCount - 1);
                  this.FileVariantsRemove(index);
                  this.deleteFromEditArr(index);
                  this.delFromArrPriceArr(index)
                  this.delFromArr(index);
                }}>Удалить</button>

              <input
                className="quest-block__img-inpt"
                type="file"
                id={index}
                name={"variant_img" + index}
                onChange={(e) => { this.setIndex(index); this.FileSelectedHendlerVariants(e.target.files[0]); }} />

              <label className="quest-block__file-label" for={index}>Выберите файл</label>

              <div className='variants-block__answer-field'>

                <Field
                  className="answerVar"
                  name={answer + "variant"}
                  editCount={editQuest ? editQuest.number_answers : ""}
                  index={index}
                  answer={answer}
                  component={renderField}
                  editVariants={editVariants}
                />
                <Field
                  className="answerVar"
                  type="number"
                  name={answer + "answerState"}
                  editCount={editQuest ? editQuest.number_answers : ""}
                  index={index}
                  component={renderFieldInput}
                  editVariants={editVariants}
                />

              </div>

            </li>
          )}
        </ul>
      </div>
    )

    return (
      <div className="quest-block">
        <Container className="quest-block__container">

          <Modal trigger={<Button onClick={() => {
            this.handleOpen();
            this.insertCurrentData(editQuest && editQuest.variants ? editQuest.variants : undefined);

          }}
            className={title === "Редактировать" ? 'quest-block__trigger quest-block__trigger_edit' : 'quest-block__trigger'}>{title}</Button>}
            open={this.state.modalOpen}
            centered={false}>
            <Modal.Header>{"Последовательность"}</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='small' src={this.state.actualImg ? this.state.actualImg : 'https://react.semantic-ui.com/images/avatar/large/rachel.png'} />
              <Modal.Description>

                <form className="quest-block__form" onSubmit={handleSubmit} name='SequenceVariantForm'>

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
                  <div className="quest-block__div">
                    <label className="quest-block__label">Количество баллов за ответ</label>
                    <input
                      className="quest-block__input"
                      name="priceQuestion"
                      defaultValue={editQuest && editQuest.price_question ? editQuest.price_question : 1} disabled={this.state.notFullPriceState}></input>
                  </div>
                  <div className="quest-block__div">

                    <input
                      id="nf-answer"
                      className="quest-block__check"
                      name="notFullPriceQuestion"
                      defaultChecked={this.state.notFullPriceState}
                      type="checkBox"
                      onClick={() => { this.setState({ notFullPriceState: !this.state.notFullPriceState }) }}></input>
                    <label className="quest-block__label" for="nf-answer">Неполный ответ</label>
                  </div>
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


                  <div className="variants-block">
                    <div className='variants-block__container'>
                      <FieldArray name="variants"
                        component={renderAnswers}
                        editIndex={editIndex}
                        editVariants={editQuest && editQuest.variants ? editQuest.variants : ""}
                        editCount={editQuest ? editQuest.number_answers : ""}
                        variantsImgArray={this.state.variantImg} />

                    </div>
                  </div>
                </form>

              </Modal.Description>

            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => {
                this.handleClose();
                reset();
                this.setState({ notFullPriceArr: [] });
                this.setState({ actualImg: null })
                setVariantsCount(0);
              }} color="primary">
                Отмена
            </Button>
              {variantsCount > 1 ? <Button type="sumbit" onClick={() => {
                this.createQuestion(questions, setQuests, this.state.actualImg, this.state.variantImg, testType, editIndex, variantsCount);
                this.props.setGroups(new FormData(document.forms.SequenceVariantForm), this.props.groupsObject, this.props.setGroupObject);
                this.handleClose();
                reset();
                this.props.updateList();
                this.setState({ notFullPriceArr: [] });
                this.setState({ actualImg: null })
              }}
                color="primary"
                autoFocus>
                Готово
            </Button>
                : ""}

            </Modal.Actions>
          </Modal>
        </Container>
      </div>
    )
  }
}

export default reduxForm({
  form: 'SequenceVariantForm'

})(sequenceQuestion)