import React, { useState, Component, useRef, useEffect } from "react";
import { Button, Card, FormControlLabel, Switch, FormHelperText } from "@material-ui/core";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import {addRaft} from "../../../redux/actions/RaftActions";
import { GetCampaignsById, UpdateCampaign, AddCampaign, GetCampaigns } from "../../../redux/actions/CampaignActions";
import { useSelector, useDispatch } from 'react-redux';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import es from "date-fns/locale/es";
import {
    MuiPickersUtilsProvider,
    DatePicker 
  } from "@material-ui/pickers";
import { useParams } from "react-router";
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import NotFound from "../../sessions/NotFound"
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
import Campaigns from "app/views/dashboard/shared/Campaigns";
import history from "history.js";
import EdificiosTable from "../ventasTables/CampaignEdificiosTable"

const useStyles = makeStyles({
    textvalidator: {
        "@media (min-width: 0px)": {
             marginLeft: "7.5%",
             width: "85%",
             marginTop: "3%",
         },
         "@media (min-width: 1024px)": {
            marginLeft: "15%",
            width: "70%",
            marginTop: "3%",
        }, 
         "@media (min-width: 1281px)": {
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
    edificiostable: {
        "@media (min-width: 0px)": {
             marginLeft: "7.5%",
             width: "85%",
             marginTop: "3%",
         },
         "@media (min-width: 1025px)": {
             marginLeft: "15%",
             width: "75%",
             marginTop: "3%",
         }, 
         "& .MuiInputBase-root.Mui-disabled": {
            color: "darkgray"
         },
         "& .MuiFormLabel-root.Mui-disabled": {
            color: "rgba(74, 70, 109, 0.43)" 
         },
    },
    formcard: {
        "@media (min-width: 0px)": {
            marginLeft: "0%",
            width: "100%",
        },
        "@media (min-width: 1024px)": {
            marginLeft: "25%",
            width: "50%",
        }
    },
    sectionbutton: {
        marginLeft: "25%",
        width: "50%",
        marginTop: "3%",
        marginBottom: "2%",
        textAlign: "center",
        "@media (min-width: 0px)": {
            display: "inline-flex",
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
});

const FormAdminCampaign = () => {
    
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let { id } = useParams();
    const [errorMessage, setErrorMessage] = useState([]);
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    const [campaignform, setCampaignForm] = useState({
        name: "",
        description: "",
        startDate: null,
        endDate: null,
        maxLimitPerPerson: "",
        message: "",
        shippingMessage: "",
        campaignItems: [],
        activeEdificio: false,
        activeEnvioCasa: false,
        edificiosCampaign: []
    });
    const classes = useStyles();
    const addCampaign = useSelector(state => state.campaign.addCampaign);
    const successCampaign = useSelector(state => state.campaign.success);
    const campaign = useSelector(state => state.campaign.campaign);
    const isLoading  = useSelector(state => state.campaign.loading);
    const [open, setOpen] = useState(false);
    const [errorActive, setErrorActive] = useState({error: false, errorMessage: ""});
    const [errorEdificio, setErrorEdificio] = useState({error: false, errorMessage: ""});
    const [edificiosSave, setEdificiosSave] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(GetCampaignsById(id));
        }  
    }, []);

    useEffect(() => {
        if(id && campaign != [] && campaign[0] != [""] && campaign[0] != undefined) {setCampaignForm({
            name: campaign[0].name,
            description: campaign[0].description,
            startDate: new Date(campaign[0].startDate),
            endDate: new Date(campaign[0].endDate),
            maxLimitPerPerson: campaign[0].maxLimitPerPerson != undefined ? campaign[0].maxLimitPerPerson.toString() : null,
            campaignItems: campaign[0].campaignItems,
            activeEdificio: campaign[0].pickUpInBuilding,
            activeEnvioCasa: campaign[0].sentToHome,
            message: campaign[0].message,
            shippingMessage: campaign[0].shippingMessage,
            edificiosCampaign: campaign[0].buildings.map((item, index) => {
                return { 
                    "id": item.id,
                    "nameBuilding": item.building.name,
                    "active": item.active,
                    "activeBuilding": item.building.active,
                    "idBuilding": item.building.id,
                }
            }).sort(function(a, b) {
                var textA = a.idBuilding;
                var textB = b.idBuilding;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }),
        });}
    }, [campaign]);

    const handleFormSubmit = async () => {
        //console.log("save", edificiosSave)
       
        if (campaignform.startDate != null && campaignform.endDate != null && (campaignform.activeEdificio || campaignform.activeEnvioCasa) && (!campaignform.activeEdificio || campaignform.activeEdificio && edificiosSave) ) { 
            if (id) {
                await dispatch(UpdateCampaign(id,campaignform));
                setOpen(true);
            } else {
                
                await dispatch(AddCampaign(campaignform));
                setOpen(true);
            }
        }
    };

    const handleBack = () => {
        history.push("/Ventas/Campaign");
    }

    const presave = () => {
        setEdificiosSave(false);
        campaignform.activeEdificio && setErrorEdificio({error: true, errorMessage:`Se debe habilitar al menos un edificio`});
        if (campaignform.startDate == null || campaignform.endDate == null) { 
            if (campaignform.startDate == null) {
                setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "*Se debe seleccionar la fecha de inicio" }));
            }
            if (campaignform.endDate == null) {
                setErrorMessage(errorMessage => ({ ...errorMessage, endDate: "*Se debe seleccionar la fecha de finalización" }));
            }
        }
        if (!campaignform.activeEdificio && !campaignform.activeEnvioCasa) {
            setErrorActive({error: true, errorMessage:`Se debe activar al menos una de las opciones`});
        } else {
            setErrorActive({error: false, errorMessage:``});
        }
        for (var i = 0; i < campaignform.edificiosCampaign.length; i++) {
            if (campaignform.edificiosCampaign[i] && campaignform.edificiosCampaign[i].active) {
                setEdificiosSave(true);
                setErrorEdificio({error: false, errorMessage:``});
            }
        }      
    }

    const handleChangeEdificios = (edificios) => {
        setCampaignForm({
            ...campaignform,
            edificiosCampaign: edificios,
        });  
        for (var i = 0; i < edificios.length; i++) {
            if (edificios[i] && edificios[i].active) {
                setEdificiosSave(true);
                setErrorEdificio({error: false, errorMessage:``});
            }
        }  
    };
    
    const handleChange = (event) => {
        const name = event.target.name;
        if (name == "activeEdificio" || name == "activeEnvioCasa") {
            if (name == "activeEdificio" && !event.target.checked) {
                setCampaignForm({
                    ...campaignform,
                    [name]: event.target.checked,
                    edificiosCampaign: campaignform.edificiosCampaign.map((item, index) => {
                        return { 
                          "id": item.id,
                          "nameBuilding": item.nameBuilding,
                          "active": false,
                          "activeBuilding": item.activeBuilding,
                          "idBuilding": item.idBuilding,
                        }
                      }),
                })
            } else {
                setCampaignForm({
                    ...campaignform,
                    [name]: event.target.checked,
                    edificiosCampaign: []
                })
            }
            if ( event.target.checked) {
                setErrorActive({error: false, errorMessage:``});
            }
        } else {
            setCampaignForm({
                ...campaignform,
                [name]: event.target.value,
              });
        }
    };

    const handleDateChangeStartDate = date => {
        if (date != null) {
          setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "", endDate: "" }));
        }
        if (campaignform.endDate != null && date.getTime() > campaignform.endDate.getTime()) {
            //isErrorValidation = true;
            setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "*La fecha de inicio no puede ser mayor a la fecha de finaización" }));
          } 
        setCampaignForm({
          ...campaignform,
          startDate: date,
          //endDate: null,
        });
    };

    const handleDateChangeEndDate = date => {
        if (date != null) {
          setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "", endDate: "" }));
        }
        setCampaignForm({
          ...campaignform,
          endDate: date,
        });
      };

    return (
        <div className="p-24">
            {console.log("edificios", campaignform)}
            {(isLoading) ? <Loading/> : <ValidationModal idioma={"Español"} path={"/Ventas/Campaign"} state={(successCampaign) ? "Success!" : "Error!"} save={() => {dispatch(GetCampaigns());}} message={(successCampaign) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoading) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{id ? "Editar Campaña" : "Agregar Campaña"}</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>                 
                    {(isLoading) ? <Loading/> :
                    <>
                        <TextValidator
                            className={classes.textvalidator}
                            label="Nombre Campaña*"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={campaignform.name}
                            validators={["required","maxStringLength:30"]}
                            errorMessages={["Este campo es requerido", "Máximo 30 carácteres"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Descripción Campaña*"
                            onChange={handleChange}
                            type="text"
                            name="description"
                            value={campaignform.description}
                            validators={["required","maxStringLength:150"]}
                            errorMessages={["Este campo es requerido", "Máximo 150 carácteres"]}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                            <DatePicker
                                className={classes.textvalidator}
                                cancelLabel="CANCELAR"
                                error={!!errorMessage.startDate}
                                helperText={errorMessage.startDate}
                                format="dd/MM/yyyy"
                                label="Fecha de Inicio*"
                                value={campaignform.startDate}
                                name="startDate"
                                onChange={handleDateChangeStartDate}    
                            />
                        </MuiPickersUtilsProvider>
                        <br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                            <DatePicker
                                className={classes.textvalidator}
                                cancelLabel="CANCELAR"
                                error={!!errorMessage.endDate}
                                helperText={errorMessage.endDate}
                                format="dd/MM/yyyy"
                                label="Fecha de Finalización*"
                                value={campaignform.endDate}
                                name="endDate"
                                onChange={handleDateChangeEndDate}
                                minDate={campaignform.startDate != null ? new Date(campaignform.startDate).setTime(new Date(campaignform.startDate).getTime() + 1 * 86400000) : null}
                                disabled={!campaignform.startDate}
                            />
                        </MuiPickersUtilsProvider>
                        <TextValidator
                            className={classes.textvalidator}
                            label="Límite Máximo de Artículos por Usuario*"
                            onChange={handleChange}
                            type="text"
                            name="maxLimitPerPerson"
                            value={campaignform.maxLimitPerPerson}
                            validators={["required","isNumber","isPositive","maxStringLength:6"]}
                            errorMessages={["Este campo es requerido","Solo se permiten números", "No se aceptan negativos", "Máximo 6 carácteres"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Mensaje"
                            onChange={handleChange}
                            type="text"
                            name="message"
                            value={campaignform.message}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Mensaje de envío"
                            onChange={handleChange}
                            type="text"
                            name="shippingMessage"
                            value={campaignform.shippingMessage}
                        />
                         <FormControlLabel
                            className={classes.textvalidator}
                            label="Activar envío a la casa"
                            control={
                                <Switch
                                checked={campaignform.activeEnvioCasa}
                                name="activeEnvioCasa"
                                color="primary"
                                onChange={handleChange}
                                />
                            }
                        />
                         <FormControlLabel
                            className={classes.textvalidator}
                            label="Activar recoger en edificio"
                            control={
                                <Switch
                                checked={campaignform.activeEdificio}
                                name="activeEdificio"
                                color="primary"
                                onChange={handleChange}
                                />
                            }
                        />
                        <FormHelperText style={{display: errorActive.error ? null : "none", marginTop: "0%"}} className={classes.textvalidator} error={errorActive.error} id="my-helper-text">{errorActive.errorMessage}</FormHelperText>
                        <div className={classes.edificiostable}>
                            {campaignform.activeEdificio ? <EdificiosTable campaignform={campaignform} edificiosCampaign={campaignform.edificiosCampaign} setEdificiosCampaign={handleChangeEdificios} /> : null} 
                        </div>
                        <FormHelperText style={{display: errorEdificio.error ? null : "none", marginTop: "0%"}} style={{marginLeft: "19%"}} className={classes.textvalidator} error={errorEdificio.error} id="my-helper-text2">{errorEdificio.errorMessage}</FormHelperText>
                        <div className={classes.sectionbutton}>
                        <Button style={{margin: "1%", width: "105.92px"}} onClick={presave} variant="contained" color="primary" type="submit">
                                ENVIAR  
                            </Button>

                            <Button style={{margin: "1%"}} variant="contained" onClick={handleBack} color="default">
                                CANCELAR
                            </Button>
                        </div>
                    </>
                    }
                </ValidatorForm>
            </Card>
        </div>
    );
}

export default FormAdminCampaign