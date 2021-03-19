import React, { useState, Component, useRef, useEffect } from "react";
import {
  Button,
  Card,
  FormHelperText,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import InputAdornment from '@material-ui/core/InputAdornment';
import { GetCampaignItemsById, UpdateCampaignItems, AddCampaignItems, GetCampaigns, GetCampaignsActive, GetCampaignsItems } from "../../redux/actions/CampaignActions";
import { AddBenefitLocation, GetBenefitsLocations, GetBenefitsLocationsById} from "../../redux/actions/BenefitsActions";
import ValidationModal from '../growth-opportunities/components/ValidationDialog';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import MenuItem from '@material-ui/core/MenuItem';
import history from "history.js";
import LocationsTable from "./ubicacionesTable";
import { GetProvince, GetCantons, GetDistricts } from "../../redux/actions/LocationActions";

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
            marginLeft: "0%",
            width: "100%",
        }
    },
    sectionbutton: {
        marginLeft: "25%",
        width: "50%",
        marginTop: "3%",
        marginBottom: "5%",
        textAlign: "center",
        "@media (min-width: 0px)": {
            display: "table-cell",
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

const FormAdminBenefits = (props) => {
    
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    
    const location = useSelector(state => state.benefit.benefitlocation);
    const campaigns = useSelector(state => state.campaign.campaigns);
    const addCampaignItems = useSelector(state => state.campaign.addCampaignItems);
    const successCampaignItems = useSelector(state => state.benefit.success);
    const isLoading  = false;
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState(null);
    const [logo, setLogo] = useState(null);
    const [errorFile, setErrorFile] = useState({error: false, errorMessage: ""});
    const [disableCanton, setDisableCanton] = useState(true);
    const [disableDistrict, setDisableDistrict] = useState(true);
    const provinces = useSelector(state => state.locations.provinces);
    const cantons = useSelector(state => state.locations.cantons);
    const districts = useSelector(state => state.locations.districts);
    
    const [locationsform, setLocationsForm] = useState({
        idBenefit: props.idBenefit,
        address: "",
        province: "",
        provinceCode: "",
        cantonCode: "",
        canton: "",
        districtCode: "",
        district: "",
        phone: "",
        whatsapp: "",
        latitude: "5",
        longitude: "5",
        active: false
    });

    const handleFormSubmitLocation = async () => {
        if (props.id) {
            //await dispatch(UpdateCampaignItems(props.id, locationsform));
            setOpen(true);
        } else {
            await dispatch(AddBenefitLocation(locationsform));
            setOpen(true);
        }
    };

    const handleBack = () => {
        history.push("/Benefits/AdminFormBenefits");
    }

    useEffect(() => {
        //dispatch(GetCampaigns());
        dispatch(GetProvince());
        if (props.id) {
            dispatch(GetBenefitsLocationsById(props.id));
        } 
    }, []);

    useEffect(() => {
        if(props.id && location != [] && location[0] != [""] && location[0] != undefined) {setLocationsForm({
            idBenefit: location[0].idBenefits,
            province: location[0].provincia,
            canton: location[0].canton,
            district: location[0].distrito,
            address: location[0].address,
            latitude: location[0].latitude,
            longitude: location[0].longitude,
            phone: location[0].phone,
            whatsapp: location[0].whatsApp,
            active: location[0].active,
            });
            //dispatch(GetCantons(location[0].provinceCode));
            //dispatch(GetDistricts(location[0].provinceCode, location[0].cantonCode));
        }
    }, [location]);


    const handleChange = (event) => {
        const name = event.target.name;
        if (name == "active") {
            setLocationsForm({
                ...locationsform,
                [name]: event.target.checked,
            })
        } else {
            setLocationsForm({
            ...locationsform,
            [name]: event.target.value,
            })
        }
    };

    const handleChangeProvince = (event) => {
        let provinceName = "";
        setDisableCanton(false);
        setDisableDistrict(true);
        dispatch(GetCantons(event.target.value));
        provinces.map(province => (
           (province.code == event.target.value) ? provinceName = province.name : null
        ));
        const name = event.target.name;
        setLocationsForm({
          ...locationsform,
          [name]: event.target.value,
          province: provinceName,
          canton: "",
          district: "",
          cantonCode: "",
          districtCode: "",
        });
    };

    const handleChangeCanton = (event) => {
        let cantonName = "";
        setDisableDistrict(false);
        dispatch(GetDistricts(locationsform.provinceCode, event.target.value));
        cantons.map(canton => (
            (canton.code == event.target.value) ? cantonName = canton.name : null
         ));
        const name = event.target.name;
        setLocationsForm({
          ...locationsform,
          [name]: event.target.value,
          canton: cantonName,
          district: "",
          districtCode: "",
        });
    };

    const handleChangeDistrict = (event) => {
        let districtName = "";
        districts.map(district => (
            (district.code == event.target.value) ? districtName = district.name : null
         ));
        const name = event.target.name;
        setLocationsForm({
          ...locationsform,
          [name]: event.target.value,
          district: districtName
        });
    };

    return (
        <div className={"p-24"}>
            {console.log("Benefit", location)}
            {(isLoading) ? <Loading/> : <ValidationModal idioma={"Español"} path={history.location.pathname} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => {dispatch(GetBenefitsLocations());}} message={(successCampaignItems) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoading) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{props.id ? "Editar Localización" : "Agregar Localización"}</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmitLocation}>  
                    {(isLoading) ? <Loading/> :
                    <>               
                        <TextValidator
                            className={classes.textvalidator}
                            label="Address*"
                            onChange={handleChange}
                            type="text"
                            name="address"
                            value={locationsform.address}
                            validators={["required","maxStringLength:250"]}
                            errorMessages={["Este campo es requerido","Máximo 250 carácteres"]}
                        />
                        <SelectValidator 
                            label="Province*" 
                            name="provinceCode"
                            className={classes.textvalidator} 
                            value={locationsform.provinceCode} 
                            onChange={handleChangeProvince} 
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        >
                            {provinces.map(province => (
                                <MenuItem key={`province-${province.code}`} id={province.code} value={province.code ? province.code : ""}>
                                {province.name || " "}
                                </MenuItem>
                            ))}
                        </SelectValidator> 
                        <SelectValidator 
                            label="Canton*" 
                            name="cantonCode"
                            className={classes.textvalidator} 
                            value={locationsform.cantonCode} 
                            onChange={handleChangeCanton} 
                            disabled={disableCanton}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        >
                            {cantons.map(canton => (
                                <MenuItem key={`canton-${canton.code}`} value={canton.code ? canton.code : ""}>
                                {canton.name || " "}
                                </MenuItem>
                            ))}
                        </SelectValidator> 
                        <SelectValidator 
                            label="Distrito*" 
                            name="districtCode"
                            className={classes.textvalidator} 
                            value={locationsform.districtCode} 
                            onChange={handleChangeDistrict} 
                            disabled={disableDistrict}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        >
                            {districts.map(district => (
                                <MenuItem key={`district-${district.code}`} value={district.code ? district.code : ""}>
                                {district.name || " "}
                                </MenuItem>
                            ))}
                        </SelectValidator> 
                        <TextValidator
                            className={classes.textvalidator}
                            label="Phone*"
                            onChange={handleChange}
                            type="text"
                            name="phone"
                            value={locationsform.phone}
                            validators={["required","maxStringLength:15", "isNumber", "isPositive"]}
                            errorMessages={["Este campo es requerido","Máximo 15 carácteres", "Solo se permiten números", "Solo se permiten positivos"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Whatsapp*"
                            onChange={handleChange}
                            type="text"
                            name="whatsapp"
                            value={locationsform.whatsapp}
                            validators={["required","maxStringLength:15", "isNumber", "isPositive"]}
                            errorMessages={["Este campo es requerido","Máximo 15 carácteres", "Solo se permiten números", "Solo se permiten positivos"]}
                        />
                        <FormControlLabel
                            className={classes.textvalidator}
                            label="Active Location"
                            control={
                                <Switch
                                checked={locationsform.active}
                                name="active"
                                color="primary"
                                onChange={handleChange}
                                />
                            }
                        />
                    
                        <div className={classes.sectionbutton}>
                            <Button style={{margin: "1%", marginTop: "10%", marginBottom: "5%", width: "105.92px"}} onClick={handleFormSubmitLocation} variant="contained" color="primary">
                                ENVIAR  
                            </Button>

                            <Button style={{margin: "1%", marginTop: "10%", marginBottom: "5%"}} variant="contained" onClick={props.close} color="default">
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

export default FormAdminBenefits