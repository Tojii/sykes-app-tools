import React, { useState, Component, useRef } from "react";
import {
  Button,
  Card
} from "@material-ui/core";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import {addRaft} from "../../../redux/actions/RaftActions";
import { useSelector, useDispatch } from 'react-redux';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import es from "date-fns/locale/es";
import {
    MuiPickersUtilsProvider,
    DatePicker 
  } from "@material-ui/pickers";
import { useParams } from "react-router";

const useStyles = makeStyles({
    textvalidator: {
      marginLeft: "25%",
      width: "50%",
      marginTop: "3%",
    },
    formcard: {
      marginLeft: "25%",
      width: "50%",
    },
    sectionbutton: {
        marginLeft: "25%",
        width: "50%",
        marginTop: "3%",
        marginBottom: "2%",
        textAlign: "center"
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
    
    const [campaignform, setCampaignForm] = useState({
        badge: "",
        fullName: "",
        campaign: "",
        personalPhone: "",
        identificationNumber: "",
        firstName: "",
        secondName: "",
        lastName: "",
        secondLastName: "",
        phone: "",
        candidateEmail: "",
        englishLevel: "English",
        locationPreference: "",
        othersDetails: "",
        candidateProfile: "Profile",
        academicGrade: "Grade",
        isResumeActive: true,
        isResumeRequired: true,
        isExternalreference: true,
        paymentMethod: "Money",
        workType: "",
        resumeUrl: "",
        startDate: null,
        endDate: null,
    });
    const classes = useStyles();

    const handleFormSubmit = async () => {
        // await dispatch(addRaft(raftform));
        if (campaignform.startDate != null || campaignform.endDate != null) { 
          alert("Success!")
        }
    };

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
            {console.log(campaignform)}
            <Card className={classes.formcard} elevation={6}>
                <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{id ? "Editar" : "Agregar"}</h2>
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>                 
                    <TextValidator
                        className={classes.textvalidator}
                        label="Nombre Campaña*"
                        onChange={handleChange}
                        type="text"
                        name="campaign"
                        value={campaignform.campaign}
                        validators={["required","maxStringLength:5"]}
                        errorMessages={["Este campo es requerido", "Máximo 5 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="Descripción Campaña"
                        onChange={handleChange}
                        type="text"
                        name="fullName"
                        value={campaignform.fullName}
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
                            name="endDate"
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
                        type="number"
                        name="personalPhone"
                        value={campaignform.personalPhone}
                        validators={["required","isNumber","maxStringLength:8"]}
                        errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 8 carácteres"]}
                    />
                   
                    <div className={classes.sectionbutton}>
                        <Button variant="contained" onClick={presave} color="primary" type="submit">
                            ENVIAR
                        </Button>
                    </div>
                </ValidatorForm>
            </Card>
        </div>
    );
}

export default FormAdminCampaign