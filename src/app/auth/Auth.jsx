import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { refreshtoken } from "../redux/actions/LoginActions";
import history from "history.js";
import jwtDecode from 'jwt-decode';

class Auth extends Component {
  state = {};
  
  constructor(props) {
    super(props);

    // Check current token is valid on page load/reload
    if (!this.props.user || this.props.login.token)
      this.checkJwtAuth();

    if (!this.props.login.success)
      history.push({
        pathname: "/session/signin",
        prev: history.location.pathname
      });

  }

  checkJwtAuth = () => {
    // You need to send token to your server to check token is valid
    // modify loginWithToken method in jwtService
    // Check if the Token Expired.
    if (!(Date.now() <= this.props.user.user.exp * 1000))
    {
      console.log("Token Expired", this.props.login.refreshtoken);
      console.log("Token Expired", this.props.user.user.exp);
    //   this.refreshtoken(this.props.login.refreshtoken).then(token => {
    //     // Valid token
    //     // Set user
    //     // this.props.setUserData(user);
    //     history.push({
    //       pathname: "/session/signin",
    //       prev: history.location.pathname
    //     });
    //     // You should redirect user to Dashboard here
        
    //   }).catch(err => {
    //     // Invalid token
    //     // Ridirect user to sign in page here
    //     console.log(err);
    //     history.push({
    //       pathname: "/session/signin",
    //       prev: history.location.pathname
    //     });
    //   });
    // }
    // else {
    //   history.push({
    //     pathname: "/session/signin",
    //     prev: history.location.pathname
    //   });
    }
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  refreshtoken: PropTypes.func.isRequired,
  login: state.login,
  user: state.user
});

export default connect(
  mapStateToProps,
  { refreshtoken }
)(Auth);
