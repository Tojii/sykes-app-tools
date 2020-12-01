import React, { useState, useEffect, useRef } from 'react';
import { Fab, Icon, Card, Grid, Divider, Button } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

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
}));


const UploadForm  = ({files, setFiles, isError, errorMessage}) => {
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

    for (const iterator of filesList) {  
      if (iterator.size/1024/1024 > 1) {
        setOpen({open: true, message: `¡El archivo ${iterator.name}  tiene un peso mayor de 1 MB!`});
      }else{
        list.push({
          file: iterator,
        });
      }
      
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

    for (const iterator of filesList) {
      if(iterator.type == "application/pdf" || iterator.type == "image/png" || 
      iterator.type == "image/jpeg" || iterator.type == "image/jpg"){
        if (iterator.size/1024/1024 > 1) {
          setOpen({open:true, message: `¡El archivo ${iterator.name}  tiene un peso mayor de 1 MB por lo que no se puede guardar!`});
        }else{
          list.push({
            file: iterator,
          });
        }
      }else{
        setOpen({open:true, message:`¡El archivo ${iterator.name} no tiene el formato correcto!`});
      }
    }

    setParams({ ...params, dragClass: "" });
    setFiles((item)=>[...item, ...list]);
    return false;
  };

  const handleDragStart = event => {
    setParams({ ...params, dragClass: "drag-shadow" });
  };

  const handleSingleRemove = index => {
    
    let filesList = [...files];
    filesList.splice(index, 1);
    setFiles([...filesList]);

  };

  const handleAllRemove = () => {
    setFiles([]);
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
                <Grid item lg={4} md={4}>
                  Nombre
                </Grid>
                <Grid item lg={1} md={1}>
                  Tamaño
                </Grid>
             
                <Grid item lg={4} md={4}>
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
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      {file.name}
                    </Grid>
                    <Grid item lg={1} md={1} sm={12} xs={12}>
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </Grid>
                
                    <Grid item lg={4} md={4} sm={12} xs={12}>
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

            <div>
                {isError ? 
                  <div className="Message">
                     <Alert severity="warning">{errorMessage}</Alert>
                  </div>
                :""}
            </div>

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