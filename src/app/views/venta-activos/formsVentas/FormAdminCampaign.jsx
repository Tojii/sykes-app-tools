import React, { useState, Component, useRef, useEffect } from "react";
import {
  Button,
  Card
} from "@material-ui/core";
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
        campaignItems: [],
    });
    const classes = useStyles();
    const addCampaign = useSelector(state => state.campaign.addCampaign);
    const successCampaign = useSelector(state => state.campaign.success);
    const campaign = useSelector(state => state.campaign.campaign);
    const isLoading  = useSelector(state => state.campaign.loading);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(GetCampaignsById(id));
        }  
    }, []);

    useEffect(() => {
        if(id && campaign != [] && campaign[0] != [""] && campaign[0] != undefined) {setCampaignForm({
            name: campaign[0].name,
            description: campaign[0].description,
            startDate: campaign[0].startDate,
            endDate: campaign[0].endDate,
            maxLimitPerPerson: campaign[0].maxLimitPerPerson != undefined ? campaign[0].maxLimitPerPerson.toString() : null,
            campaignItems: campaign[0].campaignItems,
        });}
    }, [campaign]);

    const handleFormSubmit = async () => {
        if (campaignform.startDate != null && campaignform.endDate != null) { 
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
        if (campaignform.startDate == null || campaignform.endDate == null) { 
            if (campaignform.startDate == null) {
                setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "*Se debe seleccionar la fecha de inicio" }));
            }
            if (campaignform.endDate == null) {
                setErrorMessage(errorMessage => ({ ...errorMessage, endDate: "*Se debe seleccionar la fecha de finalización" }));
            }
        }
    }
    
    const handleChange = (event) => {
        const name = event.target.name;
        setCampaignForm({
          ...campaignform,
          [name]: event.target.value,
        });
    };

    const handleDateChangeStartDate = date => {
        if (date != null) {
          setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "", endDate: "" }));
        }
        setCampaignForm({
          ...campaignform,
          startDate: date,
          endDate: null,
        });
    };

    const handleDateChangeEndDate = date => {
        if (date != null) {
          setErrorMessage(errorMessage => ({ ...errorMessage, endDate: "", endDate: "" }));
        }
        setCampaignForm({
          ...campaignform,
          endDate: date,
        });
      };

    return (
        <div className="p-24">
            <ValidationModal idioma={"Español"} path={"/Ventas/Campaign"} state={(successCampaign) ? "Success!" : "Error!"} save={() => {dispatch(GetCampaigns());}} message={(successCampaign) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />
            <Card className={classes.formcard} elevation={6}>
                {(isLoading && id) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{id ? "Editar Campaña" : "Agregar Campaña"}</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>                 
                    {(isLoading && id) ? <Loading/> :
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
                            label="Límite Máximo Campaña*"
                            onChange={handleChange}
                            type="text"
                            name="maxLimitPerPerson"
                            value={campaignform.maxLimitPerPerson}
                            validators={["required","isNumber","isPositive","maxStringLength:7"]}
                            errorMessages={["Este campo es requerido","Solo se permiten números", "No se aceptan negativos", "Máximo 7 carácteres"]}
                        />
                    
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