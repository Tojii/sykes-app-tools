import React, { useState, Component, useRef, useEffect } from "react";
import { Button, Card, FormControlLabel, Switch, FormHelperText } from "@material-ui/core";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import { GetCampaignsById, UpdateCampaign, AddCampaign, GetCampaigns } from "../../../redux/actions/CampaignActions";
import { useSelector, useDispatch } from 'react-redux';
import "date-fns";
import { useParams } from "react-router";
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import NotFound from "../../sessions/NotFound"
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
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
});

const FormAdminEdificios = () => {
    
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let { id } = useParams();
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    const [edificiosform, setEdificiosForm] = useState({
        name: "",
        id: ""
    });
    const classes = useStyles();
    const successCampaign = useSelector(state => state.campaign.success);
    const campaign = useSelector(state => state.campaign.campaign);
    const isLoading  = useSelector(state => state.campaign.loading);
    const [open, setOpen] = useState(false);
    const [errorActive, setErrorActive] = useState({error: false, errorMessage: ""});

    useEffect(() => {
        if (id) {
            dispatch(GetCampaignsById(id));
        }  
    }, []);

    useEffect(() => {
        if(id && campaign != [] && campaign[0] != [""] && campaign[0] != undefined) {setEdificiosForm({
            name: campaign[0].name,
            description: campaign[0].description,
            startDate: campaign[0].startDate,
            endDate: campaign[0].endDate,
            maxLimitPerPerson: campaign[0].maxLimitPerPerson != undefined ? campaign[0].maxLimitPerPerson.toString() : null,
            campaignItems: campaign[0].campaignItems,
        });}
    }, [campaign]);

    const handleFormSubmit = async () => {
        if (id) {
            await dispatch(UpdateCampaign(id,edificiosform));
            setOpen(true);
        } else {
            await dispatch(AddCampaign(edificiosform));
            setOpen(true);
        }
    };

    const handleBack = () => {
        history.push("/Ventas/Edificios");
    }
    
    const handleChange = (event) => {
        const name = event.target.name;    
        setEdificiosForm({
            ...edificiosform,
            [name]: event.target.value,
            });
    };

    return (
        <div className="p-24">
            {(isLoading) ? <Loading/> : <ValidationModal idioma={"Español"} path={"/Ventas/Edificios"} state={(successCampaign) ? "Success!" : "Error!"} save={() => {dispatch(GetCampaigns());}} message={(successCampaign) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoading && id) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{id ? "Editar Edificio" : "Agregar Edificio"}</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>                 
                    {(isLoading && id) ? <Loading/> :
                    <>
                        <TextValidator
                            className={classes.textvalidator}
                            label="Nombre Edificio*"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={edificiosform.name}
                            validators={["required","maxStringLength:30"]}
                            errorMessages={["Este campo es requerido", "Máximo 30 carácteres"]}
                        />
                        <div className={classes.sectionbutton}>
                        <Button style={{margin: "1%", width: "105.92px"}} variant="contained" color="primary" type="submit">
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

export default FormAdminEdificios