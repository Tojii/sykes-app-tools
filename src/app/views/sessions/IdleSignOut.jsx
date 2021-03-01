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
    openDialog: false
  };

  constructor(props) {
    super(props);

    this.idleTimer = null;
    this.handleOnIdle = this.handleOnIdle.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  handleOnIdle () {
    if (this.props.login.success){
      this.setState({openDialog: true})
    }
  }

  handleClose () {
    this.setState({openDialog: false}, this.props.logoutUser);
  };

  handleKeepBrowsing () {
    this.setState({openDialog: false});
  }

  render() {
    let { classes } = this.props;
    return !this.props.login.success ? 
    null :
     (
        <>
         <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          timeout={1000 * 60  * parseInt(process.env.REACT_APP_IDLE_TIME_MIN)}
          onIdle={this.handleOnIdle}
          debounce={250}
        />
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
                        onComplete={this.handleClose}
                      >
                        {({ remainingTime }) => remainingTime}
                      </CountdownCircleTimer>
                    <p>Si desea continuar haga clic en el siguiente botón</p>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cerrar sesión
              </Button>
              <Button onClick={this.handleKeepBrowsing} color="primary" autoFocus>
                Continuar Navegando
              </Button>
            </DialogActions>
          </Dialog> 
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