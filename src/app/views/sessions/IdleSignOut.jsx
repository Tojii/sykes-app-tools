import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIdleTimer } from 'react-idle-timer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  makeStyles,
} from "@material-ui/core";
import { logoutUser } from "app/redux/actions/UserActions";

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default function (props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOnIdle = event => {
    setDialogOpen(true);
    setTimeout(() => handleClose(), 30000)
  }

  const handleOnActive = event => {
    setDialogOpen(false);
  }

  const handleClose = () => {
    if (dialogOpen) {
      setDialogOpen(false);
      dispatch(logoutUser());
    }
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * parseInt(process.env.REACT_APP_IDLE_TIME_MIN),
    onIdle: handleOnIdle,
    // onActive: handleOnActive,
    debounce: 500
  })

  return (
    <Dialog
      open={dialogOpen}
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
              onComplete={handleClose}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          <p>Si desea continuar haga clic en el siguiente botón</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar sesión
        </Button>
        <Button onClick={handleOnActive} color="primary" autoFocus>
          Continuar Navegando
        </Button>
      </DialogActions>
    </Dialog> 
  )
};