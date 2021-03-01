import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { refreshtoken } from "../redux/actions/LoginActions";
import history from "history.js";

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
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  refreshtoken: PropTypes.func.isRequired,
  user: state.user
});

export default connect(
  mapStateToProps,
  { refreshtoken }
)(Auth);
