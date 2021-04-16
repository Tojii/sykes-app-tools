import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button, FormControl, Input, FormHelperText, FormControlLabel, Switch, Tooltip } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, useTabState, Panel } from '@bumaga/tabs'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { GetBenefitsById, GetPageSettings, AddPageSettings, UpdatePageSettings } from "../../redux/actions/BenefitsActions";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import Places from '../../components/maps/Places';
import { isMdScreen } from "utils";
import { useParams } from "react-router";
import { Breadcrumb } from "matx";
import AdminBenefits from "./adminBenefitsTable"
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import AddIcon from "@material-ui/icons/Add";
import { Link } from 'react-router-dom';
import history from "history.js";
import ValidationModal from '../growth-opportunities/components/ValidationDialog';

const useStyles = makeStyles({
    textvalidator: {
        "@media (min-width: 0px)": {
             marginLeft: "7.5%",
             width: "85%",
             marginTop: "3%",
         },
         "@media (min-width: 1025px)": {
             marginLeft: "25%",
             width: "50%",
             marginTop: "3%",
         },
         "& .MuiInputBase-root.Mui-disabled": {
             color: "darkgray"
         },
         "& .MuiFormLabel-root.Mui-disabled": {
             color: "rgba(74, 70, 109, 0.43)" 
         },
     },
    cardContainer:{
        marginBottom:"2%" 
    },
    styleimage: {
        marginLeft: "auto",
        marginRight: "auto",
        "@media (min-width: 1025px)": {
            maxWidth: "300px"
        },
    },
    margindiv: {
        "@media (min-width: 0px)": {
            marginBottom: "30%",
        },
        "@media (min-width: 1024px)": {
            marginBottom: "5%",
        },
    },
    sectionbutton: {
        marginLeft: "25%",
        width: "50%",
        textAlign: "center",
        "@media (min-width: 0px)": {
            display: "inline-flex",
            marginBottom: "1%"
        },
        "@media (min-width: 1024px)": {
            display: "inline-block",
        }
    },  
    filelabel: {
        color: "rgba(74, 70, 109, 0.54)",
        padding: 0,
        fontSize: "14px",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: "0.00938em",
    },
})

const DetalleBenefits = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const pageSettings = useSelector(state => state.benefit.pageSettings);
    const isLoading  = useSelector(state => state.benefit.loadingSettings); 
    const successBenefit = useSelector(state => state.benefit.success);
    let { id } = useParams(); 
    // const user = useSelector(state => state.user);
    //const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    const [files, setFiles] = useState(null);
    const [filesFooter, setFilesFooter] = useState(null);
    const [filesBadge, setFilesBadge] = useState(null);
    const [logo, setLogo] = useState(null);
    const [errorFile, setErrorFile] = useState({error: false, errorMessage: ""});
    const [errorFileFooter, setErrorFileFooter] = useState({error: false, errorMessage: ""});
    const [errorFileBadge, setErrorFileBadge] = useState({error: false, errorMessage: ""});
    const [open, setOpen] = useState(false);

    const [settingsform, setSettingsForm] = useState({
        id: "",
        header: "",
        reminder: "",
        description: "",
        logo: null,
        footer: null,
        badge: null
    });

    useEffect(() => {
        dispatch(GetPageSettings());
    }, [])

    useEffect(() => {
        (pageSettings.length != 0 && pageSettings[0] != null && pageSettings[0] != undefined) && setSettingsForm({
            id: pageSettings[0].id,
            header: pageSettings[0].header,
            reminder: pageSettings[0].reminder,
            description: pageSettings[0].title,
            logo: pageSettings[0].logo,
            footer: pageSettings[0].footer,
            badge: pageSettings[0].badge
        });
        
    }, [pageSettings])

    const adminBenefitButton = () => {
        return (
            <React.Fragment>
              <Tooltip title={"Admin Beneficios"}>
                <Button
                  component={Link} to="/Benefits/AdminFormBenefits"
                  variant="contained"
                  color="primary"
                >
                  Admin Beneficios
                </Button>
              </Tooltip>
            </React.Fragment>
        );
    }

    const adminPromButton = () => {
        return (
            <React.Fragment>
              <Tooltip title={"Admin Promociones"}>
                <Button
                  component={Link} to="/Benefits/AdminFormBenefits"
                  variant="contained"
                  color="primary"
                >
                  Admin Promociones
                </Button>
              </Tooltip>
            </React.Fragment>
        );
    }

    const presave = () => {
        if (pageSettings.length == 0) {
            setErrorFile({error: true, errorMessage:`Debe adjuntar una imagen`});
        }
    }

    const handleBack = () => {
        history.push("/Benefits/Home");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        if (name == "active") {
            setSettingsForm({
                ...settingsform,
                [name]: event.target.checked,
            })
        } else {
            setSettingsForm({
                ...settingsform,
                [name]: event.target.value,
            })
        }
    };

    const handleFormSubmit = async () => {
        if (((pageSettings.length != 0 ))) {
            //console.log("update")
            await dispatch(UpdatePageSettings("1", settingsform, files, filesFooter, filesBadge));
            setOpen(true);
        } else if ((files != null && filesFooter != null && filesBadge != null)) {
            //console.log("add")
            await dispatch(AddPageSettings(settingsform, files, filesFooter, filesBadge));
            setOpen(true);
        }
    };

    const getBase64 = (file, name) => {
        let reader = new FileReader();
        let imageupload = ""
        reader.readAsDataURL(file);
        reader.onload = function () {
            imageupload = reader.result
            setLogo(imageupload)
            setSettingsForm({...settingsform, [name]: imageupload});
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const handleFileSelect = event => {
        let filesList = event.target.files[0] != undefined ? event.target.files[0] : null;
        //console.log("file", event.target.name)
        const name = event.target.name;
        if(filesList != null && (filesList.type == "image/png" || filesList.type == "image/jpeg" || filesList.type == "image/jpg")){
                if(filesList.name.includes('.jfif') || filesList.name.includes('.pjp') || filesList.name.includes('.pjpeg')) { 
                    //setErrorFile({error: true, errorMessage:`El formato del archivo no es válido`});
                    name == "logo" && setErrorFile({error: true, errorMessage:`El formato del archivo no es válido`});
                    name == "footer" && setErrorFileFooter({error: true, errorMessage:`El formato del archivo no es válido`});
                    name == "badge" && setErrorFileBadge({error: true, errorMessage:`El formato del archivo no es válido`});
                    name == "logo" && setFiles(null);
                    name == "footer" && setFilesFooter(null);
                    name == "badge" && setFilesBadge(null);
                    setSettingsForm({...settingsform, [name]: null});
                    setLogo(null);
                }
                else if (filesList.size/1024/1024 > 2) {
                    //setErrorFile({error: true, errorMessage:`El tamaño del archivo no debe ser mayor a 2 MB`});
                    name == "logo" && setErrorFile({error: true, errorMessage:`El tamaño del archivo no debe ser mayor a 2 MB`});
                    name == "footer" && setErrorFileFooter({error: true, errorMessage:`El tamaño del archivo no debe ser mayor a 2 MB`});
                    name == "badge" && setErrorFileBadge({error: true, errorMessage:`El tamaño del archivo no debe ser mayor a 2 MB`});
                    name == "logo" && setFiles(null);
                    name == "footer" && setFilesFooter(null);
                    name == "badge" && setFilesBadge(null);
                    setSettingsForm({...settingsform, [name]: null});
                    setLogo(null);
                } else {
                    name == "logo" && setErrorFile({error: false, errorMessage:``});
                    name == "footer" && setErrorFileFooter({error: false, errorMessage:``});
                    name == "badge" && setErrorFileBadge({error: false, errorMessage:``});
                    name == "logo" && setFiles(event.target.files[0]);
                    name == "footer" && setFilesFooter(event.target.files[0]);
                    name == "badge" && setFilesBadge(event.target.files[0]);
                    setSettingsForm({...settingsform, [name]: event.target.files[0]});
                    getBase64(event.target.files[0], name);
                }
        } else {
            //setErrorFile({error: true, errorMessage:`El formato del archivo no es válido`});
            name == "logo" && setErrorFile({error: true, errorMessage:`El formato del archivo no es válido`});
            name == "footer" && setErrorFileFooter({error: true, errorMessage:`El formato del archivo no es válido`});
            name == "badge" && setErrorFileBadge({error: true, errorMessage:`El formato del archivo no es válido`});
            name == "logo" && setFiles(null);
            name == "footer" && setFilesFooter(null);
            name == "badge" && setFilesBadge(null);
            setSettingsForm({...settingsform, [name]: null});
            setLogo(null);
        }
    };

    return (
        <>
            <div className="m-sm-30">
                { isLoading ? <Loading/> : <div className="mb-sm-30">
                    <Breadcrumb
                    routeSegments={[
                    { name: "Benefits Home", path: "/Benefits/Home" },
                    { name: "Configuraciones", path: `/Benefits/Configuration` },          
                    ]}
                />
                </div>}
                {/* {console.log("pageSettings", pageSettings)} */}
                {/* { isLoading ? <Loading/> : */}
                {(isLoading) ? <Loading/> : <ValidationModal idioma={"Español"} path={"/Benefits/Configuration"} state={(successBenefit) ? "Success!" : "Error!"} save={() => {dispatch(GetPageSettings());}} message={(successBenefit) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
                <Card className={classes.cardContainer} elevation={6}>
                    <div className={classes.margindiv}>
                        {(isLoading) ? <Loading/> : <h1 style={{ color: "#4cb050", marginLeft: "3%", marginTop: "2%", fontWeight: "bold"}} className="mb-20">Configuraciones Generales &nbsp; {<span style={{color:"gray", fontWeight: "normal"}}>|</span>} &nbsp; {adminBenefitButton()} &nbsp; {<span style={{color:"gray", fontWeight: "normal"}}>|</span>} &nbsp; {adminPromButton()}</h1>}
                        <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>  
                        {(isLoading) ? <Loading/> :
                        <>             
                            <TextValidator
                                className={classes.textvalidator}
                                label="Header*"
                                onChange={handleChange}
                                type="text"
                                name="header"
                                value={settingsform.header}
                                validators={["required","maxStringLength:200"]}
                                errorMessages={["Este campo es requerido", "Máximo 200 carácteres"]}
                            />
                            <TextValidator
                                className={classes.textvalidator}
                                label="Reminder*"
                                onChange={handleChange}
                                type="text"
                                name="reminder"
                                value={settingsform.reminder}
                                validators={["required","maxStringLength:250"]}
                                errorMessages={["Este campo es requerido","Máximo 250 carácteres"]}
                            />
                            <FormControl className={classes.textvalidator}>
                                <label className={classes.filelabel} id="logo">Logo (applicable formats: .png, .jpeg, .jpg) (Max 2MB)*</label>
                                <Input type="file" name="logo" error={errorFile.error} aria-describedby="my-helper-text" accept="image/png, image/jpeg, image/jpg" onChange={handleFileSelect} 
                                    />  
                                <FormHelperText error={errorFile.error} id="my-helper-text">{errorFile.errorMessage}</FormHelperText>                               
                            </FormControl>
                            <div className={classes.sectionbutton}>
                                {settingsform.logo ? 
                                    <img
                                    className={classes.styleimage}                                          
                                    alt="..."
                                    src={`${settingsform.logo}`}
                                    />
                                    : null
                                }
                            </div>
                            <FormControl className={classes.textvalidator}>
                                <label className={classes.filelabel} id="footer">Footer (applicable formats: .png, .jpeg, .jpg) (Max 2MB)*</label>
                                <Input type="file" name="footer" error={errorFileFooter.error} aria-describedby="my-helper-textFooter" accept="image/png, image/jpeg, image/jpg" onChange={handleFileSelect} 
                                    />  
                                <FormHelperText error={errorFileFooter.error} id="my-helper-textFooter">{errorFileFooter.errorMessage}</FormHelperText>                               
                            </FormControl>
                            <div className={classes.sectionbutton}>
                                {settingsform.footer ? 
                                    <img
                                    className={classes.styleimage}                                          
                                    alt="..."
                                    src={`${settingsform.footer}`}
                                    />
                                    : null
                                }
                            </div>
                            <FormControl className={classes.textvalidator}>
                                <label className={classes.filelabel} id="gafete">Gafete (applicable formats: .png, .jpeg, .jpg) (Max 2MB)*</label>
                                <Input type="file" name="badge" error={errorFileBadge.error} aria-describedby="my-helper-textBadge" accept="image/png, image/jpeg, image/jpg" onChange={handleFileSelect} 
                                    />  
                                <FormHelperText error={errorFileBadge.error} id="my-helper-textBadge">{errorFileBadge.errorMessage}</FormHelperText>                               
                            </FormControl>
                            <div className={classes.sectionbutton}>
                                {settingsform.badge ? 
                                    <img
                                    className={classes.styleimage}                                          
                                    alt="..."
                                    src={`${settingsform.badge}`}
                                    />
                                    : null
                                }
                            </div>
                            <div className={classes.sectionbutton}>
                                <Button style={{margin: "1%", width: "105.92px"}} onClick={presave} variant="contained" color="primary" type="submit">
                                    GUARDAR  
                                </Button>

                                <Button style={{margin: "1%"}} variant="contained" onClick={handleBack} color="default">
                                    VOLVER
                                </Button>
                            </div>
                        </>
                        }
                        </ValidatorForm>      
                    </div>
                </Card>
            </div>
        </>
    )
}

export default DetalleBenefits;
