import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { history } from '../../services/redux';
import CreateTestMain from '../../components-psycoModule/createTestMainComponent/createTestMainContainer';
import { connect } from "react-redux";
import { getUserToken } from '../../redux/actions/user.action';
 import testsContainer from '../../components-psycoModule/containerComponent'
import {
  OLympiadListContainer,
  OlympiadEnterContainer,
  OlympiadRegistration,
  OlympiadRegistrationTeam,
  Registration,
  TeacherRegistration,
  Login,
  MainPage,
  Work,
  NotFoundPage,
  MyselfCabinet,
  TeacherCabinet,
  OlympiadSingle,
  OlympiadScorePage,
  CreateOlympiadPage,
} from '../../containers/index';

import {
  Header,
  Footer,
} from '../index';

class AppComponent extends Component {
  componentDidMount() {
    let token = localStorage.getItem('token');
    if (token) {
      this.props.GeuUserToken(token);
    }
    else {
      return;
    }
  }
  render() {
    return (
      <div className="app">
        <Header className="app-header"
          controlPanel={this.props.isDisplayControlPanel}
          regLogPanel={this.props.isDisplayRegAndLoginPanel} />
        <div className="app-main">
          <Switch>
            <Route exact path="/" component={OlympiadEnterContainer} />
            <Route exact path="/login" component={Login} />

            {/* <Route exact path="/olympic-enter" component={OlympiadEnterContainer} /> */}
            <Route exact path="/olympic-single/:id" component={OlympiadSingle} />
            <Route exact path="/olympic-registration" component={OlympiadRegistration} />
            {/* <Route exact path="/olympic-registartion-team" component={OlympiadRegistrationTeam} /> */}
            {/* <Route exact path="/olympiads" component={OLympiadListContainer} /> */}
            <Route exact path="/olympiad-score" component={OlympiadScorePage} />
            <Route exact path="/create-olympiad" component={CreateOlympiadPage} />

            <Route exact path="/myself-cabinet" component={MyselfCabinet} />
            <Route exact path="/teacher-cabinet" component={TeacherCabinet} />

            <Route exact path="/registration" component={Registration} />
            <Route exact path="/teacher-registration" component={TeacherRegistration} />

            <Route exact path="/tests/:Npage" component={testsContainer} />
            <Route exact path='/tests/createTest/:testType' component={testsContainer} />
            <Route exact path='/tests/passingTest/:testId' component={testsContainer} />


            {/* <Route path="/work/:id" component={Work} /> */}
            <Route path="/*" component={NotFoundPage} />
          </Switch>
        </div>
        <div className="app-footer">
          <Footer />
        </div>
      </div >
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  GeuUserToken: (token) => {
    dispatch(getUserToken(token));
  }
});

const mapStateToProps = state => ({
  isDisplayControlPanel: state.user.isDisplayControlPanel,
  isDisplayRegAndLoginPanel: state.user.isDisplayRegAndLoginPanel,
});

export const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));

