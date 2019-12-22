import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import './style.scss';
import { withRouter } from 'react-router-dom';
import DeleteTestComponent from '../deleteTestComponent/deleteTestContainer';
import testCardImg from '../../images/standart-test-card.png';
class testCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testToPass: {}
    }
    this.goPassTheTest = this.goPassTheTest.bind(this)
  }

  goPassTheTest() {
    setTimeout(() => { this.props.history.push('/tests/passingTest/' + this.props.currentTest.id) }, 0)

  }
  goEditTheTest() {
    this.props.setEditTest(this.props.currentTest)
    setTimeout(() => { this.props.history.push('/tests/editTest') }, 0)
  }
  render() {
    const { test_name, test_author, test_img, setEditTest, userTeacherStatus, test_owner, userId, userEmail } = this.props;

    return (
      <Card className="test-card">
        <div className="test-card__button-container">
          {test_owner === userId || userEmail === 'stricozetc@mail.ru' ? <div><div className="test-card__opacity-div"></div>
            <div className="test-card__btn-div">
              <button className="test-card__button" onClick={() => { this.goEditTheTest() }}>изменить</button>

              <DeleteTestComponent testId={this.props.currentTest.id}></DeleteTestComponent>
            </div>
          </div>
          : null}
          <Image id="cardImage"
            src={test_img !== 'null' ?
              test_img
              : testCardImg}>

          </Image>

        </div>
        <Card.Content className="test-card__content">
          <Card.Header>{test_name}</Card.Header>
          <Card.Meta>{test_author}</Card.Meta>
        </Card.Content>
        <button className="test-card__card-button" onClick={() => { this.goPassTheTest() }} >Пройти тест</button>
        <div></div>
      </Card>
    )
  }
}

export default withRouter(testCard)
