import React, { useState, useEffect } from "react";
import { Grid, Fab, Icon, Card, Divider } from "@material-ui/core";
import { setApplyData } from "../../../redux/actions/ApplyActions";
import { connect } from "react-redux";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    },
    gridtext: {
      wordWrap: "break-word"
    }
}));

const ResumeStep = ({ apply, setApplyData, setDisableNext }) => {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const [file, setFile] = useState({});
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const anchor = {
        vertical: 'bottom',
        horizontal: 'center',
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if(apply.backResume && apply.resume != undefined) {
            if(!apply.fileMessage) {setDisableNext(false)};
            setFile(apply.resume)
            apply['backResume'] = false;
        }
    }, [])

    const handleFileSelect = (event) => {
        let files = event.target.files;
        for (const iterator of files) {
            console.log("tipo", iterator.type)
            console.log("tipo", iterator.size)

            if (iterator.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                iterator.type == "application/pdf" || iterator.name.includes('.docx')) {
                let invalid = iterator.size > 2000000 || iterator.size < 1
                if(invalid){ 
                    setErrorMessage(errorMessage => ({...errorMessage, type:"The file exceeds the allowed size"})) 
                    apply['fileMessage'] = true
                    apply['resume'] = {}
                    setOpen(true)
                    setFile({})
                } else {
                    apply['resume'] = iterator
                    apply['fileMessage'] = false
                    setErrorMessage([])
                    setOpen(false)
                    setFile(iterator)
                }
                setShowError(invalid);
                setDisableNext(invalid);
                setApplyData(apply);
            } 
            else{
                setFile({})
                setShowError(false);
                setDisableNext(true);
                setErrorMessage(errorMessage => ({...errorMessage, type:"Invalid format file"}))
                apply['resume'] = {}
                apply['fileMessage'] = true
                setOpen(true)
            }
        }
    };

    return (
        <>  
            <Grid item lg={12} className="px-sm-24 text-center">
                <h3>Adjuntar currículum</h3>
                <label htmlFor="upload-single-file">
                    <Fab
                        className="capitalize"
                        color="primary"
                        component="span"
                        variant="extended"
                    >
                        <div className="flex flex-middle">
                        <Icon className="pr-8">cloud_upload</Icon>
                        <span>Upload File</span>
                        </div>
                    </Fab>
                    <p>Applicable formats: .docx, .pdf. Max size: 2MB</p>
                </label>
                <input
                    className="display-none"
                    onChange={handleFileSelect}
                    id="upload-single-file"
                    type="file"
                    accept=".docx, .pdf"
                    //value={}
                />
            </Grid>
            <Card className="mb-24" elevation={2}>
            <div className="p-16">
              <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                direction="row"
              >
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  Nombre
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  Tamaño
                </Grid>
              </Grid>
            </div>
            <Divider></Divider>
                <div className="px-16 py-16" key={file.name}>
                    <Grid
                        container
                        spacing={2}
                        justify="center"
                        alignItems="center"
                        direction="row"
                    >
                        <Grid lg={6} md={6} sm={6} xs={6}>
                            {file.size ? (
                                <div className={classes.gridtext}>
                                    {file.name}
                                    </div>
                            ) : "No file attached" }
                        </Grid>
                        <Grid lg={6} md={6} sm={6} xs={6}>
                            {file.size ? (
                                <div className={classes.gridtext}>
                                    {(file.size / 1024 / 1024).toFixed(1)} MB
                                </div>
                            ) : "" }
                        </Grid>
                    </Grid>
                </div>
            {errorMessage.type ?
            <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={20000} onClose={handleClose}
                anchorOrigin={anchor}
                TransitionComponent={'Fade'}
            >
                
            <Alert onClose={handleClose} severity="warning">
                {errorMessage.type}
            </Alert>
            </Snackbar>
            </div>
            :
            <div></div>
            }  
                         
          </Card>
        </>
    );
}

const mapStateToProps = state => ({
    apply: state.apply.apply,
});

export default connect(mapStateToProps, {
    setApplyData,
})(ResumeStep);