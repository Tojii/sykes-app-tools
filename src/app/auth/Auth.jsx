import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { refreshtoken } from "../redux/actions/LoginActions";
import history from "history.js";
import IdleSignOut from '../views/sessions/IdleSignOut';

class Auth extends Component {
  state = {};
  
  constructor(props) {
    super(props);

    // Check current token is valid on page load/reload
    this.checkJwtAuth();

  }

  checkJwtAuth = () => {
    // Check if the Token Expired.
    if (!(Date.now() <= this.props.user.exp * 1000) || this.props.user)
      refreshtoken(this.props.user.refreshtoken);

    if (Object.keys(this.props.user).length <= 0) {
      history.push({
        pathname: "/session/signin",
        prev: history.location.pathname
      });
    }
  };

  render() {
    const { children } = this.props;
    return <Fragment>{ Object.keys(this.props.user).length > 0 && <IdleSignOut /> }{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  refreshtoken: PropTypes.func.isRequired,
  user: state.user,
  login: state.login
});

export default connect(
  mapStateToProps,
  { refreshtoken }
)(Auth);
