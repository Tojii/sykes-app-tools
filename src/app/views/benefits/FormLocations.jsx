import React, { useState, useRef, useEffect } from "react";
import { Button, Card, FormControlLabel, Switch, FormHelperText, FormControl } from "@material-ui/core";
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
    const [errorPhone, setErrorPhone] = useState({error: false, errorMessage: ""});
    const [errorWhatsApp, setErrorWhatsApp] = useState({error: false, errorMessage: ""});
    const [errorProvince, setErrorProvince] = useState({error: false, errorMessage: ""});
    const [errorCanton, setErrorCanton] = useState({error: false, errorMessage: ""});
    const [errorDistrito, setErrorDistrito] = useState({error: false, errorMessage: ""});
    const [errorAddress, setErrorAddress] = useState({error: false, errorMessage: ""});
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
        principalLocation: false,
    });
    const locationMap = {
        address: 'San José, Costa Rica',
        lat: 9.903329970416294, lng: -84.08271419551181
      } // our location object from earlier

    const handleFormSubmitLocation = async () => {
        const regex = /^\+?(0|[1-9]\d*)$/;

        // Validaciones de los campos del form
        if(locationsform.phone == "") {setErrorPhone({error: true, errorMessage:`Este campo es requerido`});}
            else if (!regex.test(locationsform.phone)) {setErrorPhone({error: true, errorMessage:`Solo se permiten números`});}
                else if(locationsform.phone.length != 8) {setErrorPhone({error: true, errorMessage:`El número debe tener 8 caracteres`});}
                    else {setErrorPhone({error: false, errorMessage:``});}
        if(locationsform.whatsapp == "") {setErrorWhatsApp({error: true, errorMessage:`Este campo es requerido`});}
            else if (!regex.test(locationsform.whatsapp)) {setErrorWhatsApp({error: true, errorMessage:`Solo se permiten números`});}
                else if(locationsform.whatsapp.length != 8) {setErrorWhatsApp({error: true, errorMessage:`El número debe tener 8 caracteres`});}
                    else {setErrorWhatsApp({error: false, errorMessage:``});}
        if(locationsform.address == "") {setErrorAddress({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorAddress({error: false, errorMessage:``});}
        if(locationsform.province == "") {setErrorProvince({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorProvince({error: false, errorMessage:``});}
        if(locationsform.canton == "") {setErrorCanton({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorCanton({error: false, errorMessage:``});}
        if(locationsform.district == "") {setErrorDistrito({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorDistrito({error: false, errorMessage:``});}
        
        console.log(locationsform)
        //Si se eligió la ubicación pricipal entonces se pasa la anterior a false
        if (locationsform.principalLocation) {
            var mainlocation = benefitslocations[0].locations.filter(function(item) {
                if (item.idLocation == props.id || !item.principalLocation) {
                  return false; // skip
                }
                return true;
            }).map((item, index) => {
                return (
                    item
                )
            })
            console.log("main", mainlocation)
            mainlocation.length != 0 && await dispatch(UpdateBenefitLocation(mainlocation[0].idLocation, {...mainlocation[0], provinceCode: mainlocation[0].codProvincia, whatsapp: mainlocation[0].whatsApp,
            cantonCode: 7, districtCode: mainlocation[0].codDistrito, district: mainlocation[0].distrito, province: mainlocation[0].provincia,
            idBenefit: mainlocation[0].benefit.idBenefit, principalLocation: false}, {latitude: mainlocation[0].latitude, longitude: mainlocation[0].longitude }));
        }
        // Guarda o edita según sea el caso si todas las validaciones son correctas
        if (locationsform.phone != "" && locationsform.whatsapp != "" && locationsform.address != "" && locationsform.province != "" && locationsform.canton != "" && locationsform.district != ""
            && locationsform.phone.length == 8 && locationsform.whatsapp.length == 8 && regex.test(locationsform.phone) && regex.test(locationsform.whatsapp) && props.id) {
            await dispatch(UpdateBenefitLocation(props.id, locationsform, locationsMapform));
            setOpen(true);
        } else if (locationsform.phone != "" && locationsform.whatsapp != "" && locationsform.address != "" && locationsform.province != "" && locationsform.canton != "" && locationsform.district != ""
            && locationsform.phone.length == 8 && locationsform.whatsapp.length == 8 && regex.test(locationsform.phone) && regex.test(locationsform.whatsapp)) {
            await dispatch(AddBenefitLocation(locationsform, locationsMapform));
            setOpen(true);
        }
    };

    useEffect(() => {
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
            principalLocation: location[0].principalLocation
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
        if (name == "active" || name == "principalLocation") {
            if (name == "principalLocation") {
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
            {console.log("Benefit", benefitslocations[0].locations)}
            {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> : <ValidationModal idioma={"Español"} path={history.location.pathname} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => {dispatch(GetBenefitsById(props.idBenefit))}} message={(successCampaignItems) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> : <ValidationModal idioma={"Español"} path={""} state={"Recordatorio"} save={() => {}} message={"Se va a establecer esta localización como la principal del beneficio"} setOpen={setOpenMessage} open={openMessage} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{props.id ? "Editar Localización" : "Agregar Localización"}</h2>}
                <ValidatorForm {...useRef('formLocation')} onSubmit={handleFormSubmitLocation}>  
                    {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> :
                    <>               
                        <FormControl className={classes.textvalidator}>
                            <TextValidator
                                style={{width: "100%"}}
                                label="Dirección*"
                                onChange={handleChange}
                                type="text"
                                name="address"
                                value={locationsform.address}
                                error={errorAddress.error}
                            />
                            <FormHelperText error={errorAddress.error} id="my-helper-textaddress">{errorAddress.errorMessage}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.textvalidator}>
                            <SelectValidator 
                                label="Provincia*" 
                                name="provinceCode"
                                style={{width: "100%"}}
                                value={locationsform.provinceCode} 
                                onChange={handleChangeProvince} 
                                error={errorProvince.error}
                            >
                                {provinces.map(province => (
                                    <MenuItem key={`province-${province.code}`} id={province.code} value={province.code ? province.code : ""}>
                                    {province.name || " "}
                                    </MenuItem>
                                ))}
                            </SelectValidator> 
                            <FormHelperText error={errorProvince.error} id="my-helper-textprovince">{errorProvince.errorMessage}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.textvalidator}>
                            <SelectValidator 
                                label="Cantón*" 
                                name="cantonCode"
                                style={{width: "100%"}}
                                value={locationsform.cantonCode} 
                                onChange={handleChangeCanton} 
                                disabled={disableCanton}
                                error={errorCanton.error}
                            >
                                {cantons.map(canton => (
                                    <MenuItem key={`canton-${canton.code}`} value={canton.code ? canton.code : ""}>
                                    {canton.name || " "}
                                    </MenuItem>
                                ))}
                            </SelectValidator>
                            <FormHelperText error={errorCanton.error} id="my-helper-textcanton">{errorCanton.errorMessage}</FormHelperText> 
                        </FormControl>
                        <FormControl className={classes.textvalidator}>
                            <SelectValidator 
                                label="Distrito*" 
                                name="districtCode"
                                style={{width: "100%"}}
                                value={locationsform.districtCode} 
                                onChange={handleChangeDistrict} 
                                disabled={disableDistrict}
                                error={errorDistrito.error}
                            >
                                {districts.map(district => (
                                    <MenuItem key={`district-${district.code}`} value={district.code ? district.code : ""}>
                                    {district.name || " "}
                                    </MenuItem>
                                ))}
                            </SelectValidator>
                            <FormHelperText error={errorDistrito.error} id="my-helper-textdistrict">{errorDistrito.errorMessage}</FormHelperText> 
                        </FormControl> 
                        <FormControl className={classes.textvalidator}>
                            <TextValidator
                                style={{width: "100%"}}
                                label="Teléfono*"
                                onChange={handleChange}
                                type="text"
                                name="phone"
                                value={locationsform.phone}
                                error={errorPhone.error}
                            />
                            <FormHelperText error={errorPhone.error} id="my-helper-text">{errorPhone.errorMessage}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.textvalidator}>
                            <TextValidator
                                style={{width: "100%"}}
                                label="Whatsapp*"
                                onChange={handleChange}
                                type="text"
                                name="whatsapp"
                                value={locationsform.whatsapp}
                                error={errorWhatsApp.error}
                            />
                            <FormHelperText error={errorWhatsApp.error} id="my-helper-textwhats">{errorWhatsApp.errorMessage}</FormHelperText>
                        </FormControl>
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
                                checked={locationsform.principalLocation}
                                name="principalLocation"
                                color="primary"
                                onChange={handleChange}
                                />
                            }
                        />
                        <div style={{ height: "350px", marginLeft: "25%", marginBottom: "5%", width: "50%" }}>
                        <Places location={ [{id: 1, lat: props.id && locationsform.latitude ? parseFloat(locationsform.latitude.replace(",", ".")) : locationMap.lat, lng: props.id && locationsform.longitude ? parseFloat(locationsform.longitude.replace(",", ".")) : locationMap.lng}] } lat={props.id && locationsform.latitude ? parseFloat(locationsform.latitude.replace(",", ".")) : locationMap.lat} lng={props.id && locationsform.longitude ? parseFloat(locationsform.longitude.replace(",", ".")) : locationMap.lng} zoomLevel={10} draggable={true} onChangeLocation={onChangeLocation} show /> {/* include it here */}
                        </div>
                        <FormControl className={classes.textvalidator}>
                            <TextValidator
                                style={{width: "100%"}}
                                label="Latitud*"
                                //onChange={handleChange}
                                type="text"
                                name="latitude"
                                disabled={true}
                                value={locationsMapform.latitude}
                                validators={["required"]}
                                errorMessages={["Este campo es requerido"]}
                            />
                        </FormControl>
                        <FormControl className={classes.textvalidator}>
                            <TextValidator
                                style={{width: "100%"}}
                                label="Longitud*"
                                //onChange={handleChange}
                                type="text"
                                name="longitude"
                                disabled={true}
                                value={locationsMapform.longitude}
                                validators={["required"]}
                                errorMessages={["Este campo es requerido"]}
                            />
                        </FormControl>
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