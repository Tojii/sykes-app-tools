import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
import firebaseAuthService from "../services/firebase/firebaseAuthService";
import history from "history.js";

class Auth extends Component {
  state = {};
  
  constructor(props) {
    super(props);
    
    // // Set user if exists in local storage
    // // This is only for demo purpose
    // // You should remove this
    // this.props.setUserData(localStorageService.getItem("auth_user"));
    
    // Check current token is valid on page load/reload
    //if (!localStorageService.getItem("auth_user"))
    // this.checkJwtAuth();

  }

  checkJwtAuth = () => {
    // You need to send token to your server to check token is valid
    // modify loginWithToken method in jwtService
    jwtAuthService.loginWithToken().then(user => {
      console.log("really")
      // Valid token
      // Set user
      // this.props.setUserData(user);
history.push({
        pathname: "/session/signin"
      });
      // You should redirect user to Dashboard here
      
    }).catch(err => {
      // Invalid token
      // Ridirect user to sign in page here
      console.log(err);
      history.push({
        pathname: "/session/signin"
      });
    });
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login
});

export default connect(
  mapStateToProps,
  { setUserData }
)(Auth);
