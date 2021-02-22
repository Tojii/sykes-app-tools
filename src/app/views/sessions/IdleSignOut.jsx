import React, { Component } from "react";
import IdleTimer from 'react-idle-timer';
import { logoutUser } from "app/redux/actions/UserActions";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  withStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

class IdleSignOut extends Component {

  state = {
    isTimedOut: false,
    openDialog: false
  };

  constructor(props, context) {
    super(props);
    this.idleTimer = React.createRef();
  }

  shouldComponentUpdate() {
    return this.props.login.success;
  }

  _onAction = (e) => {
    this.setState({ 'isTimedOut': false })
  }

  _onIdle = (e) => {
    const { isTimedOut } = this.state;
    if (isTimedOut && this.props.login.success){
      this.setState({openDialog: true})
    }
    else {
      this.idleTimer.current.reset();
      this.setState({ isTimedOut: true })
    }
  }

  handleClose = () => {
    this.idleTimer.current.reset();
    this.setState({ openDialog: false, isTimedOut: false })
  }

  handleSignOut = () => {
    this.setState({openDialog: false}, this.props.logoutUser);
  };

  render() {
    let { classes } = this.props;
    return (
      <>
        <IdleTimer 
          key='idleTimer'
          startOnMount={ true }
          ref={ this.idleTimer }
          element={ document }
          onActive={ this.handleClose }
          onIdle={ this._onIdle }
          timeout={1000 * 60 * parseInt(process.env.REACT_APP_IDLE_TIME_MIN)}
        />
        {
          <Dialog
            open={this.state.openDialog}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Su sesión expirará en"}
            </DialogTitle>
            <DialogContent>
              <div className={classes.wrapper}>
                    <CountdownCircleTimer
                        isPlaying
                        duration={30}
                        size={80}
                        strokeWidth={7}
                        colors={[['#E51B23']]}
                        onComplete={this.handleSignOut}
                        // colors={[[{'#004777'}, 0.33], ['#F7B801', 0.33], ['#E51B23']]}
                      >
                        {({ remainingTime }) => remainingTime}
                      </CountdownCircleTimer>
                    <p>Si desea continuar haga clic en el siguiente botón</p>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSignOut} color="primary">
                Cerrar sesión
              </Button>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Continuar Navegando
              </Button>
            </DialogActions>
              </Dialog> 
        }
      </>
    );
  }
}

IdleSignOut.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  logoutUser: PropTypes.func.isRequired,
  user: state.user.user,
  login: state.login
});
export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      { logoutUser }
    )(IdleSignOut)
  )
);
