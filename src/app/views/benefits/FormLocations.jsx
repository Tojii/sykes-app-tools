import React, { useState, useRef, useEffect } from "react";
import { Button, Card, FormControlLabel, Switch } from "@material-ui/core";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AddBenefitLocation, GetBenefitsLocationsById, UpdateBenefitLocation, GetBenefitsById, GetBenefitsLocations} from "../../redux/actions/BenefitsActions";
import ValidationModal from '../growth-opportunities/components/ValidationDialog';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import MenuItem from '@material-ui/core/MenuItem';
import history from "history.js";
import { GetProvince, GetCantons, GetDistricts } from "../../redux/actions/LocationActions";
import Places from '../../components/maps/SetPlace';

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
    const benefitslocations = useSelector(state => state.benefit.benefit);
    const successCampaignItems = useSelector(state => state.benefit.success);
    const isLoadingLocation  = useSelector(state => state.benefit.loadingLocation);
    const isLoadingProvince  = useSelector(state => state.locations.loading); 
    const isLoading  = useSelector(state => state.benefit.loading);
    const [open, setOpen] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [files, setFiles] = useState(null);
    const [logo, setLogo] = useState(null);
    const [errorFile, setErrorFile] = useState({error: false, errorMessage: ""});
    const [disableCanton, setDisableCanton] = useState(true);
    const [disableDistrict, setDisableDistrict] = useState(true);
    const provinces = useSelector(state => state.locations.provinces);
    const cantons = useSelector(state => state.locations.cantons);
    const districts = useSelector(state => state.locations.districts);
    const [locationsMapform, setLocationsMapForm] = useState({ latitude: "", longitude: "",})
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
        latitude: "",
        longitude: "",
        active: false,
        mainLocation: false,
    });
    const locationMap = {
        address: 'San José, Costa Rica',
        lat: 9.903329970416294, lng: -84.08271419551181
      } // our location object from earlier

    const handleFormSubmitLocation = async () => {
        if (locationsform.mainLocation) {
            var mainlocation = benefitslocations[0].locations.filter(function(item) {
                if (item.idLocation != props.id && !item.active) {
                  return false; // skip
                }
                return true;
            }).map((item, index) => {
                return (
                    item
                )
            })
            //console.log("main", mainlocation)
            mainlocation.length != 0 && await dispatch(UpdateBenefitLocation(mainlocation[0].idLocation, {...mainlocation[0], provinceCode: mainlocation[0].codProvincia, whatsapp: mainlocation[0].whatsApp,
            cantonCode: 7, districtCode: mainlocation[0].codDistrito, district: mainlocation[0].distrito, province: mainlocation[0].provincia,
            idBenefit: mainlocation[0].benefit.idBenefit, active: false}, {latitude: mainlocation[0].latitude, longitude: mainlocation[0].longitude }));
        }
        if (props.id) {
            await dispatch(UpdateBenefitLocation(props.id, locationsform, locationsMapform));
            setOpen(true);
        } else {
            await dispatch(AddBenefitLocation(locationsform, locationsMapform));
            setOpen(true);
        }
    };

    useEffect(() => {
        //dispatch(GetCampaigns());
        GetBenefitsById(props.idBenefit)
        dispatch(GetProvince());
        if (props.id) {
            dispatch(GetBenefitsLocationsById(props.id));
        } 
    }, []);

    useEffect(() => {
        if(props.id && location != [] && location[0] != [""] && location[0] != undefined) {setLocationsForm({
            idBenefit: location[0].benefit.idBenefit,
            province: location[0].provincia,
            canton: location[0].canton,
            district: location[0].distrito,
            provinceCode: location[0].codProvincia,
            cantonCode: location[0].codCanton,
            districtCode: location[0].codDistrito,
            address: location[0].address,
            latitude: location[0].latitude,
            longitude: location[0].longitude,
            phone: location[0].phone,
            whatsapp: location[0].whatsApp,
            active: location[0].active,
            mainLocation: false
            });
            setLocationsMapForm({
                latitude: location[0].latitude,
                longitude: location[0].longitude,
            })
            dispatch(GetCantons(location[0].codProvincia));
            dispatch(GetDistricts(location[0].codProvincia, location[0].codCanton));
            setDisableCanton(false);
            setDisableDistrict(false);
        }
    }, [location]);


    const handleChange = (event) => {
        const name = event.target.name;
        if (name == "active" || name == "mainLocation") {
            if (name == "mainLocation") {
                event.target.checked && setOpenMessage(true)
            }
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

    const onChangeLocation = (lat, lng) => {
        console.log("lat", lat, lng);
        setLocationsMapForm({
            latitude: lat,
            longitude: lng,
        })
    }

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
            {/* {console.log("Benefit", benefitslocations)} */}
            {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> : <ValidationModal idioma={"Español"} path={history.location.pathname} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => {dispatch(GetBenefitsById(props.idBenefit))}} message={(successCampaignItems) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> : <ValidationModal idioma={"Español"} path={""} state={"Recordatorio"} save={() => {}} message={"Se va a establecer esta localización como la principal del beneficio"} setOpen={setOpenMessage} open={openMessage} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{props.id ? "Editar Localización" : "Agregar Localización"}</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmitLocation}>  
                    {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> :
                    <>               
                        <TextValidator
                            className={classes.textvalidator}
                            label="Dirección*"
                            onChange={handleChange}
                            type="text"
                            name="address"
                            value={locationsform.address}
                            validators={["required","maxStringLength:250"]}
                            errorMessages={["Este campo es requerido","Máximo 250 carácteres"]}
                        />
                        <SelectValidator 
                            label="Provincia*" 
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
                            label="Cantón*" 
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
                            label="Teléfono*"
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
                            label="Activar Localización"
                            control={
                                <Switch
                                checked={locationsform.active}
                                name="active"
                                color="primary"
                                onChange={handleChange}
                                />
                            }
                        />
                        <FormControlLabel
                            className={classes.textvalidator}
                            label="Localización Principal"
                            control={
                                <Switch
                                checked={locationsform.mainLocation}
                                name="mainLocation"
                                color="primary"
                                onChange={handleChange}
                                />
                            }
                        />
                        <div style={{ height: "350px", marginLeft: "25%", marginBottom: "5%", width: "50%" }}>
                        <Places location={ [{id: 1, lat: props.id && locationsform.latitude ? parseFloat(locationsform.latitude.replace(",", ".")) : locationMap.lat, lng: props.id && locationsform.longitude ? parseFloat(locationsform.longitude.replace(",", ".")) : locationMap.lng}] } lat={props.id && locationsform.latitude ? parseFloat(locationsform.latitude.replace(",", ".")) : locationMap.lat} lng={props.id && locationsform.longitude ? parseFloat(locationsform.longitude.replace(",", ".")) : locationMap.lng} zoomLevel={10} draggable={true} onChangeLocation={onChangeLocation} show /> {/* include it here */}
                        </div>
                        <TextValidator
                            className={classes.textvalidator}
                            label="Latitud*"
                            //onChange={handleChange}
                            type="text"
                            name="latitude"
                            disabled={true}
                            value={locationsMapform.latitude}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Longitud*"
                            //onChange={handleChange}
                            type="text"
                            name="longitude"
                            disabled={true}
                            value={locationsMapform.longitude}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
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