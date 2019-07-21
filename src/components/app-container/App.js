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
  OlympiadSingle,
  OlympiadTeam,
  NotFoundPage
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
        <div className="page">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/login" component={Login} />
            <Route path="/olympic-enter" component={OlympiadEnterContainer} />
            <Route path="/olympic-single" component={OlympiadSingle} />
            <Route path="/olympic-team" component={OlympiadTeam} />
            <Route path="/olympic-registration" component={OlympiadRegistration} />
            <Route path="/olympic-registartion-team" component={OlympiadRegistrationTeam} />
            <Route path="/olympiads" component={OLympiadListContainer} />

            <Route path="/registration" component={Registration} />
            <Route exact path="/teacher-registration" component={TeacherRegistration} />
            <Route path="/work/:id" component={Work} />
            <Route path="/*" component={NotFoundPage} />
          </Switch>
        </div>
        <Footer />
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

