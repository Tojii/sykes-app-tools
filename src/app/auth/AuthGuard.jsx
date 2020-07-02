import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "app/appContext";
import IdleTimer from 'react-idle-timer';
import IdleTimeOutModal from '../views/sessions/IdleTimeOutModal';

class AuthGuard extends Component {
  constructor(props, context) {
    super(props);
    let { routes } = context;

    this.state = {
      isTimedOut: false,
      authenticated: false,
      routes,
    };

    this.idleTimer = React.createRef();
    // console.log("test");
    // this.handleClose = this.handleClose.bind(this)
    // this.handleLogout = this.handleLogout.bind(this)
  }

  _onAction = (e) => {
    this.setState({ 'isTimedOut': false })
  }
  _onIdle = (e) => {
    console.log(this.state);
    const { isTimedOut } = this.state;
    if (isTimedOut){
      // Logout user or show warning modal
      console.log("inativity")
    }
    else {
      this.idleTimer.current.reset();
      this.setState({ isTimedOut: true })
    }
  }

  // handleClose() {
  //   this.setState({showModal: false})
  // }

  // handleLogout() {
  //   this.setState({showModal: false})
  //   this.props.history.push('/')
  // }

  componentDidMount() {
    if (!this.state.authenticated) {
      this.redirectRoute(this.props);
    }
  }

  componentDidUpdate() {
    if (!this.state.authenticated) {
      this.redirectRoute(this.props);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate")
    return nextState.authenticated !== this.state.authenticated && nextState.isTimedOut !== this.state.isTimedOut;
  }

  static getDerivedStateFromProps(props, state) {    
    const { location, user } = props;
    const { pathname } = location;
    const matched = state.routes.find(r => r.path === pathname);
    
    const authenticated =
      matched && matched.auth && matched.auth.length
        ? matched.auth.includes(user.role)
        : true;

    return {
      authenticated
    };
  }

  redirectRoute(props) {
    const { location, history } = props;
    const { pathname } = location;

    history.push({
      pathname: "/session/signin",
      state: { redirectUrl: pathname }
    });
  }

  render() {
    let { children } = this.props;
    const { authenticated, isTimedOut } = this.state;

    console.log("Hellow");

    const idleAlert = this.state.isTimedOut ? 
                          <IdleTimeOutModal 
                          showModal={true} 
                          // handleClose={this.handleClose}
                          // handleLogout={this.handleLogout}
                        /> : null;


    return authenticated ? 
                        <Fragment>
                            <IdleTimer 
                              key='idleTimer'
                              startOnMount={ true }
                              ref={ this.idleTimer }
                              element={ document }
                              onActive={ this._onActive }
                              onIdle={ this._onIdle }
                              timeout={5000}
                            />
                          {idleAlert}
                          {children}

                        </Fragment> : null;
  }
}

AuthGuard.contextType = AppContext;

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
