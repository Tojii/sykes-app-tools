import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import history from "history.js";
import ErrorIcon from '@material-ui/icons/Error';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {
  //const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleModal = () => {
    props.setOpen(false);
    history.push({
        pathname: props.path
    });
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={props.open}
        //onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move', alignSelf: 'center' }} id="draggable-dialog-title">
          {props.state}
        </DialogTitle>
        <DialogContent style={{ cursor: 'move', alignSelf: 'center' }}>
          <DialogContentText>
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ cursor: 'move', alignSelf: 'center' }}>
          <Button onClick={handleModal} color="primary">
            {props.idioma == "Español" ? "Aceptar" : "Accept"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}