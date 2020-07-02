import React from "react";
import Button from "@material-ui/core/Button";


const IdleTimeOutModal = (props) => (
      <Dialog
        open={props.showModal}
        // disableBackdropClick={true}
        // disableEscapeKeyDown={true}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Su sessión expirará en"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CircularProgressWithLabel />
            <p>Si desea continuar haga click en el siguiente botón</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleSignOut} color="primary">
            Cerrar sesión
          </Button>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Continuar Navegando
          </Button>
        </DialogActions>
      </Dialog>
  );

export default IdleTimeOutModal;