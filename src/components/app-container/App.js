import React, { Component } from "react";
import { MainPage } from "../../containers/main-page-container";
import { Login } from "../../containers/login-container";
import { OlympiadSingle, OlympiadTeam } from "../../containers/olympiad-passing-containers";
import { Registration } from "../../containers/registration-container";
import { TeacherRegistration } from "../../containers/teacher-registration-container";

import { withRouter, Route, Switch } from "react-router-dom";
import { Header } from "../../components/header-component";
import { Footer } from "../../components/footer-component";
import { Work } from "../../containers/work-page-container";
import OlympicEnter from '../../containers/olympiad-enter-container/olympiadEnterContainer';
import OlympiadRegistration from '../../containers/olympiad-registartion/olympiadRegistration';
import OlympiadRegistrationTeam from '../../containers/olympiad-registration-team/olympiadRegistrationTeam';
import { NotFoundPage } from '../../containers/not-found-page/notFoundPage';
import { connect } from "react-redux";
import { getUserToken } from '../../redux/actions/user.action';

import "./App.css";

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
      <div className="App">
        <Header
          controlPanel={this.props.isDisplayControlPanel}
          regLogPanel={this.props.isDisplayRegAndLoginPanel} />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={Login} />
          <Route path="/olympic-enter" component={OlympicEnter} />
          <Route path="/olympic-single" component={OlympiadSingle} />
          <Route path="/olympic-team" component={OlympiadTeam} />
          <Route path="/olympic-registration" component={OlympiadRegistration} />
          <Route path="/olympic-registartion-team" component={OlympiadRegistrationTeam} />

          <Route path="/registration" component={Registration} />
          <Route
            exact
            path="/teacher-registration"
            component={TeacherRegistration}
          />
          <Route path="/work/:id" component={Work} />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
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

