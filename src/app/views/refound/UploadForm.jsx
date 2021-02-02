import React, { useState, useEffect, useRef } from 'react';
import { Fab, Icon, Card, Grid, Divider, Button } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  gridtext: {
    wordWrap: "break-word"
  }
}));


const UploadForm  = ({setFinish, files, setFiles, isError, errorMessage}) => {
  const classes = useStyles();
  const [params, setParams] = useState(
      {
        dragClass: "",
        files: [],
        statusList: [],
        queProgress: 0
      }
  )
  
  const [open, setOpen] = useState({
    open: false,
    message: '',
  });

  const anchor = {
    vertical: 'bottom',
    horizontal: 'right',
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({open:false, message:""});
  }

  const handleFileSelect = event => {
    let filesList = event.target.files;
    let list = [];
    let sizes = 0;
    setFinish(true);

    if (files.length !== 0) {for (const iterator of files) {
      sizes = sizes + iterator.file.size;
    }}

    for (const iterator of filesList) {
      if(iterator.type == "application/pdf" || iterator.type == "image/png" || 
      iterator.type == "image/jpeg" || iterator.type == "image/jpg"){
        if(iterator.name.includes('.jfif') || iterator.name.includes('.pjp') || iterator.name.includes('.pjpeg')) {
          setOpen({open:true, message:`¡Uno o mas archivos no tienen el tipo correcto!`});
        } else {
          let item = files.find(x=> x.file.name == iterator.name);
          if(item == null || item == undefined){
            if (iterator.size/1024/1024 > 1) {
              setOpen({open:true, message: `¡Uno o mas archivos tienen un peso mayor de 1 MB!`});
            }else{
              list.push({
                file: iterator,
              });
            }
          }else{
            setOpen({open:true, message: `¡Ya existe un archivo con este nombre!`});
          }
          sizes = sizes + iterator.size;
        }
      }else{
        setOpen({open:true, message:`¡Uno o mas archivos no tienen el tipo correcto!`});
      }
    }
    //console.log("size", sizes)
    if (sizes > 1048576) {
      setOpen({open:true, message:`*Los archivos adjuntos superan el máximo permitido de 1MB.`});
      setFinish(false);
    }
    setFiles((item)=>[...item, ...list]);
  };

  const handleDragOver = event => {
    event.preventDefault();
    setParams({ ...params, dragClass: "drag-shadow" });
  };

  const handleDrop = event => {
    event.preventDefault();
    event.persist();
   
    let filesList = event.dataTransfer.files;
    let list = [];  
    let sizes = 0;
    setFinish(true);

    if (files.length !== 0) {for (const iterator of files) {
      sizes = sizes + iterator.file.size;
    }}

    for (const iterator of filesList) {
      if(iterator.type == "application/pdf" || iterator.type == "image/png" || 
      iterator.type == "image/jpeg" || iterator.type == "image/jpg"){
        if(iterator.name.includes('.jfif') || iterator.name.includes('.pjp') || iterator.name.includes('.pjpeg')) {
          setOpen({open:true, message:`¡Uno o mas archivos no tienen el tipo correcto!`});
        } else {
          let item = files.find(x=> x.file.name == iterator.name);
          if(item == null || item == undefined){
            if (iterator.size/1024/1024 > 1) {
              setOpen({open:true, message: `¡Uno o mas archivos tienen un peso mayor de 1 MB!`});
            }else{
              list.push({
                file: iterator,
              });
            }
          }else{
            setOpen({open:true, message: `¡Ya existe un archivo con este nombre!`});
          }
          sizes = sizes + iterator.size;
        }
      }else{
        setOpen({open:true, message:`¡Uno o mas archivos no tienen el tipo correcto!`});
      }
    }
    //console.log("size", sizes)
    if (sizes > 1048576) {
      setOpen({open:true, message:`*Los archivos adjuntos superan el máximo permitido de 1MB.`});
      setFinish(false);
    }
    setParams({ ...params, dragClass: "" });
    setFiles((item)=>[...item, ...list]);
    return false;
  };

  const handleDragStart = event => {
    setParams({ ...params, dragClass: "drag-shadow" });
  };

  const handleSingleRemove = index => {
    let sizes = 0;
    let filesList = [...files];
    filesList.splice(index, 1);
    setFiles([...filesList]);
    if(filesList.length === 0) {
      setFinish(false);
    } else {
      for (const iterator of filesList) {
        sizes = sizes + iterator.file.size;
      }
      if (sizes > 1048576) {
        setOpen({open:true, message:`*Los archivos adjuntos superan el máximo permitido de 1MB.`});
        setFinish(false);
      } else {
        setOpen({open:false, message:""});
        setFinish(true);
      }
    }

  };

  const handleAllRemove = () => {
    setFiles([]);
    setFinish(false);
  };

    let isEmpty = files.length === 0;
    return (
      <div className="upload-form m-sm-30">
          <div className="title mb-24">
            <label>Archivos Comprobante de pago/notas (Formatos permitidos: .png, .jpeg, .jpg, .pdf)*</label>
          </div>
          <div className="flex flex-wrap mb-24">
            <div className="px-16"></div>
            <label htmlFor="upload-multiple-file">
              <Fab
                className="capitalize"
                color="primary"
                component="span"
                variant="extended"
              >
                <div className="flex flex-middle">
                  <Icon className="pr-8">cloud_upload</Icon>
                  <span>Seleccionar Archivos</span>
                </div>
              </Fab>
            </label>
            <input
              className="display-none"
              onChange={handleFileSelect}
              id="upload-multiple-file"
              type="file"
              multiple
              accept="application/pdf, image/png, image/jpeg, image/jpg"
              onClick={(event)=> { 
               event.target.value = null
              }}
            />
          </div>

          <div
            className={`${params.dragClass} upload-drop-box mb-24 flex flex-center flex-middle`}
            onDragEnter={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {isEmpty ? (
              <span>¡Arrastre sus archivos aqui!</span>
            ) : (
              <h5 className="m-0">
                {files.length} Archivo{files.length > 1 ? "s" : ""} seleccionado{files.length > 1 ? "s" : ""}...
              </h5>
            )}
          </div>

          <Card className="mb-24" elevation={2}>
            <div className="p-16">
              <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                direction="row"
              >
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  Nombre
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  Tamaño
                </Grid>
             
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  Acciones
                </Grid>
              </Grid>
            </div>
            <Divider></Divider>

            {isEmpty && <p className="px-16">No hay ningun archivo</p>}

            {files.map((item, index) => {
              let { file, uploading, error, progress } = item;
              return (
                <div className="px-16 py-16" key={file.name}>
                  <Grid
                    container
                    spacing={2}
                    justify="center"
                    alignItems="center"
                    direction="row"
                  >
                    <Grid className={classes.gridtext} item lg={4} md={4} sm={4} xs={4}>
                      {file.name}
                    </Grid>
                    <Grid className={classes.gridtext} item lg={4} md={4} sm={4} xs={4}>
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </Grid>
                
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <div className="flex">
                       
                        <Button
                          variant="contained"
                          className="bg-error"
                          onClick={() => handleSingleRemove(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </Card>

          <div>
            <div className="flex"> 
              {!isEmpty && (
                <Button
                  variant="contained"
                  className="bg-error"
                  onClick={handleAllRemove}
                >
                  Remover todos
                </Button>
              )}
            </div>

            <div className="Message">
                <p>Favor seleccionar todos los archivos a la vez y dar click en Open. El peso máximo permitido para archivos adjuntos es 1MB.</p>
            </div>

            {/* <div>
                {isError ? 
                  <div className="Message">
                     <Alert severity="warning">{errorMessage}</Alert>
                  </div>
                :""}
            </div> */}

            <div className={classes.root}>
              <Snackbar open={open.open} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={anchor}
              >
                
              <Alert onClose={handleClose} severity="warning">
                  {open.message}
              </Alert>
            </Snackbar>
            </div>

          </div>
      </div>
    );
  }

export default UploadForm;