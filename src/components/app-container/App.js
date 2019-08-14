import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import './App.css';

import { connect } from "react-redux";
import { getUserToken } from '../../redux/actions/user.action';

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
  OlympiadTeam,
  NotFoundPage,
  MyselfCabinet,
  TeacherCabinet,
  OlympiadSingle,
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
        <Header
          className="app-header"
          controlPanel={this.props.isDisplayControlPanel}
          regLogPanel={this.props.isDisplayRegAndLoginPanel} />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/olympic-enter" component={OlympiadEnterContainer} />
            <Route exact path="/olympic-team" component={OlympiadTeam} />
            <Route exact path="/olympic-single" component={OlympiadSingle} />
            <Route exact path="/olympic-registration" component={OlympiadRegistration} />
            <Route exact path="/olympic-registartion-team" component={OlympiadRegistrationTeam} />
            <Route exact path="/olympiads" component={OLympiadListContainer} />

            <Route exact path="/myself-cabinet" component={MyselfCabinet} />
            <Route exact path="/teacher-cabinet" component={TeacherCabinet} />

            <Route exact path="/registration" component={Registration} />
            <Route exact path="/teacher-registration" component={TeacherRegistration} />
            <Route path="/work/:id" component={Work} />
            <Route path="/*" component={NotFoundPage} />
          </Switch>
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

