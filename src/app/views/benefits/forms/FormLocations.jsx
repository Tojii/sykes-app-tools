import React, { useState, useRef, useEffect } from "react";
import { Button, Card, FormControlLabel, Switch, FormHelperText, FormControl } from "@material-ui/core";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AddBenefitLocation, GetBenefitsLocationsById, UpdateBenefitLocation, GetBenefitsById } from "../../../redux/actions/BenefitsActions";
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import MenuItem from '@material-ui/core/MenuItem';
import history from "history.js";
import { GetProvince, GetCantons, GetDistricts } from "../../../redux/actions/LocationActions";
import Places from '../../../components/maps/SetPlace';
import NotFound from "app/views/sessions/NotFound";

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
    const [disableCanton, setDisableCanton] = useState(true);
    const [disableDistrict, setDisableDistrict] = useState(true);
    const [showInformation, setshowInformation] = useState(true);
    const provinces = useSelector(state => state.locations.provinces);
    const cantons = useSelector(state => state.locations.cantons);
    const districts = useSelector(state => state.locations.districts);
    const [errorPhone, setErrorPhone] = useState({error: false, errorMessage: ""});
    const [errorWhatsApp, setErrorWhatsApp] = useState({error: false, errorMessage: ""});
    const [errorProvince, setErrorProvince] = useState({error: false, errorMessage: ""});
    const [errorType, setErrorType] = useState({error: false, errorMessage: ""});
    const [errorCanton, setErrorCanton] = useState({error: false, errorMessage: ""});
    const [errorDistrito, setErrorDistrito] = useState({error: false, errorMessage: ""});
    const [errorAddress, setErrorAddress] = useState({error: false, errorMessage: ""});
    const [locationsMapform, setLocationsMapForm] = useState({ latitude: "", longitude: "",})
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner')) : false
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
        ubicationType: "",
        active: false,
        principalLocation: false,
    });
    const locationMap = {
        address: 'San José, Costa Rica',
        lat: 9.903329970416294, lng: -84.08271419551181
      } // our location object from earlier

    useEffect(() => {
        GetBenefitsById(props.idBenefit)
        dispatch(GetProvince());
        if (props.id) {
            dispatch(GetBenefitsLocationsById(props.id));
        } 
    }, []);

    useEffect(() => { //load data when is edit form
        if(props.id && location != [] && location[0] != [""] && location[0] != undefined) {setLocationsForm({
            idBenefit: location[0].benefit.idBenefit,
            province: location[0].provincia ? location[0].provincia : "",
            canton: location[0].canton ? location[0].canton : "",
            district: location[0].distrito ? location[0].distrito : "",
            provinceCode: location[0].codProvincia ? location[0].codProvincia : "",
            cantonCode: location[0].codCanton ? location[0].codCanton : "",
            districtCode: location[0].codDistrito ? location[0].codDistrito : "",
            address: location[0].address,
            latitude: location[0].latitude ? location[0].latitude : "",
            longitude: location[0].longitude ? location[0].longitude : "",
            phone: location[0].phone,
            whatsapp: location[0].whatsApp ? location[0].whatsApp : "",
            active: location[0].active,
            principalLocation: location[0].principalLocation,
            ubicationType: location[0].ubicationType,
            });
            setLocationsMapForm({
                latitude: location[0].latitude ? location[0].latitude : "",
                longitude: location[0].longitude ? location[0].longitude : "",
            })
            location[0].codProvincia && dispatch(GetCantons(location[0].codProvincia));
            location[0].codProvincia && location[0].codCanton && dispatch(GetDistricts(location[0].codProvincia, location[0].codCanton));
            location[0].ubicationType == "Remota" ? setshowInformation(false) : setshowInformation(true)
            setDisableCanton(false);
            setDisableDistrict(false);
        }
    }, [location]);

    const handleFormSubmitLocation = async () => {
        const regex = /^\+?(0|[1-9]\d*)$/;

        // Validaciones de los campos del form
        if(locationsform.phone == "") {setErrorPhone({error: true, errorMessage:`Este campo es requerido`});}
            else if (!regex.test(locationsform.phone)) {setErrorPhone({error: true, errorMessage:`Solo se permiten números válidos`});}
                else if(locationsform.phone.length != 8) {setErrorPhone({error: true, errorMessage:`El número debe tener 8 caracteres`});}
                    else {setErrorPhone({error: false, errorMessage:``});}
        if (!regex.test(locationsform.whatsapp) && locationsform.whatsapp.length != 0) {setErrorWhatsApp({error: true, errorMessage:`Solo se permiten números válidos`});}
                else if(locationsform.whatsapp.length != 8 && locationsform.whatsapp.length != 0) {setErrorWhatsApp({error: true, errorMessage:`El número debe tener 8 caracteres`});}
                    else {setErrorWhatsApp({error: false, errorMessage:``});}
        if(locationsform.address == "") {setErrorAddress({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorAddress({error: false, errorMessage:``});}
        if(locationsform.province == "") {setErrorProvince({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorProvince({error: false, errorMessage:``});}
        if(locationsform.canton == "") {setErrorCanton({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorCanton({error: false, errorMessage:``});}
        if(locationsform.district == "") {setErrorDistrito({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorDistrito({error: false, errorMessage:``});}
        if(locationsform.ubicationType == "") {setErrorType({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorType({error: false, errorMessage:``});}
        
        //Si se eligió la ubicación pricipal entonces se pasa la anterior a false
        if (locationsform.principalLocation) {
            var mainlocation = benefitslocations[0].benefitLocations.filter(function(item) {
                if (item.idLocation == props.id || !item.principalLocation) {
                  return false; // skip
                }
                return true;
            }).map((item, index) => {
                return (
                    item
                )
            })
            mainlocation.length != 0 && await dispatch(UpdateBenefitLocation(mainlocation[0].idLocation, {...mainlocation[0], provinceCode: mainlocation[0].codProvincia ? mainlocation[0].codProvincia : "", whatsapp: mainlocation[0].whatsApp,
            cantonCode: mainlocation[0].codCanton ? mainlocation[0].codCanton : "", districtCode: mainlocation[0].codDistrito ? mainlocation[0].codDistrito : "", district: mainlocation[0].distrito ? mainlocation[0].distrito : "", province: mainlocation[0].provincia ? mainlocation[0].provincia : "",
            idBenefit: props.idBenefit, canton: mainlocation[0].canton ? mainlocation[0].canton : "" , principalLocation: false}, {latitude: mainlocation[0].latitude ? mainlocation[0].latitude : "", longitude: mainlocation[0].longitude ? mainlocation[0].longitude : ""}));
        }
        // Guarda o edita según sea el caso si todas las validaciones son correctas
        if (location.ubicationType != "" && locationsform.phone != "" && locationsform.address != "" && locationsform.ubicationType != "" && (locationsform.province != "" || !showInformation) && (locationsform.canton != "" || !showInformation) && (locationsform.district != "" || !showInformation)
            && locationsform.phone.length == 8 && (locationsform.whatsapp.length == 8 || locationsform.whatsapp.length == 0) && regex.test(locationsform.phone) && ((regex.test(locationsform.whatsapp)) || locationsform.whatsapp.length == 0) && props.id) {
            await dispatch(UpdateBenefitLocation(props.id, locationsform, locationsMapform));
            setOpen(true);
        } else if (location.ubicationType != "" && locationsform.phone != "" && locationsform.address != "" && locationsform.ubicationType != "" && (locationsform.province != "" || !showInformation) && (locationsform.canton != "" || !showInformation) != "" && (locationsform.district != "" || !showInformation)
            && locationsform.phone.length == 8 && (locationsform.whatsapp.length == 8 || locationsform.whatsapp.length == 0) && regex.test(locationsform.phone) && ((regex.test(locationsform.whatsapp)) || locationsform.whatsapp.length == 0)) {
            await dispatch(AddBenefitLocation(locationsform, locationsMapform));
            setOpen(true);
        }
    };

    const handleType = (event) => { //show or hide fields when ubication type changes
        const name = event.target.name;
        if(event.target.value != "Remota") {
            setshowInformation(true)
            setLocationsForm({
                ...locationsform,
                [name]: event.target.value,
            })
        } else {
            setshowInformation(false)
            setLocationsForm({
                ...locationsform,
                [name]: event.target.value,
                province: "",
                provinceCode: "",
                cantonCode: "",
                canton: "",
                districtCode: "",
                district: "",
                latitude: "",
                longitude: "",
            })
            setLocationsMapForm({
                latitude: "",
                longitude: "",
            })
        }
        if(event.target.name == "ubicationType" && event.target.value == "") {setErrorType({error: true, errorMessage:`Este campo es requerido`});}
            else if (event.target.name == "ubicationType") {setErrorType({error: false, errorMessage:``});}
    }
    
    const handleChange = (event) => {
        const name = event.target.name;
        const regex = /^\+?(0|[1-9]\d*)$/;
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
        if(event.target.name == "phone" && event.target.value == "") {setErrorPhone({error: true, errorMessage:`Este campo es requerido`});}
            else if (event.target.name == "phone" && !regex.test(event.target.value)) {setErrorPhone({error: true, errorMessage:`Solo se permiten números válidos`});}
                else if(event.target.name == "phone" && event.target.value.length != 8) {setErrorPhone({error: true, errorMessage:`El número debe tener 8 caracteres`});}
                    else if (event.target.name == "phone") {setErrorPhone({error: false, errorMessage:``});}
        if (event.target.name == "whatsapp" && !regex.test(event.target.value) && event.target.value.length != 0) {setErrorWhatsApp({error: true, errorMessage:`Solo se permiten números válidos`});}
                else if(event.target.name == "whatsapp" && event.target.value.length != 8 && event.target.value.length != 0) {setErrorWhatsApp({error: true, errorMessage:`El número debe tener 8 caracteres`});}
                    else if (event.target.name == "whatsapp") {setErrorWhatsApp({error: false, errorMessage:``});}
        if(event.target.name == "address" && event.target.value == "") {setErrorAddress({error: true, errorMessage:`Este campo es requerido`});}
            else if (event.target.name == "address") {setErrorAddress({error: false, errorMessage:``});}
    };

    const onChangeLocation = (lat, lng) => {
        setLocationsMapForm({
            latitude: lat,
            longitude: lng,
        })
    }

    const handleChangeMap = (event) => {
        setLocationsMapForm({
            ...locationsMapform,
            [event.target.name]: event.target.value,
        })
        setLocationsForm({
            ...locationsform,
            [event.target.name]: event.target.value,
        })
    }

    const handleChangeProvince = (event) => { // obtains the cantons associated with the province
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
        if(event.target.value == "") {setErrorProvince({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorProvince({error: false, errorMessage:``});}
    };

    const handleChangeCanton = (event) => { // obtains the districts associated with the canton
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
        if(event.target.value == "") {setErrorCanton({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorCanton({error: false, errorMessage:``});}
    };

    const handleChangeDistrict = (event) => { // validations for districts
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
        if(event.target.value == "") {setErrorDistrito({error: true, errorMessage:`Este campo es requerido`});}
            else {setErrorDistrito({error: false, errorMessage:``});}
    };

    return (
        <div className={"p-24"}>
            {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> : <ValidationModal idioma={"Español"} path={history.location.pathname} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => {dispatch(GetBenefitsById(props.idBenefit))}} message={(successCampaignItems) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> : <ValidationModal idioma={"Español"} path={""} state={"Recordatorio"} save={() => {}} message={"Se va a establecer esta localización como la principal del beneficio"} setOpen={setOpenMessage} open={openMessage} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> : (admin ? <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{props.id ? "Editar Localización" : "Agregar Localización"}</h2> : null)}
                <ValidatorForm {...useRef('formLocation')} onSubmit={handleFormSubmitLocation}>  
                    {(isLoading || isLoadingLocation || isLoadingProvince) ? <Loading/> :
                    admin ? <>               
                        <FormControl className={classes.textvalidator}>
                            <SelectValidator 
                                label="Tipo de Ubicación*" 
                                name="ubicationType"
                                style={{width: "100%"}}
                                value={locationsform.ubicationType} 
                                onChange={handleType} 
                                error={errorType.error}
                            >
                                <MenuItem key={`type-remote`} id={`type-remote`} value={"Remota"}>
                                    {"Remota"}
                                </MenuItem>
                                <MenuItem key={`type-fisica`} id={`type-fisica`} value={"Física"}>
                                    {"Física"}
                                </MenuItem>
                            </SelectValidator> 
                            <FormHelperText error={errorType.error} id="my-helper-textprovince">{errorType.errorMessage}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.textvalidator}>
                            <TextValidator
                                style={{width: "100%"}}
                                label={locationsform.ubicationType == "Remota" ? "Información*" : "Dirección*"}
                                onChange={handleChange}
                                type="text"
                                name="address"
                                value={locationsform.address}
                                error={errorAddress.error}
                            />
                            <FormHelperText error={errorAddress.error} id="my-helper-textaddress">{errorAddress.errorMessage}</FormHelperText>
                        </FormControl>
                        {showInformation ? <FormControl className={classes.textvalidator}>
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
                        </FormControl> : null}
                        {showInformation ? <FormControl className={classes.textvalidator}>
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
                        </FormControl> : null}
                        {showInformation ? <FormControl className={classes.textvalidator}>
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
                        </FormControl> : null}
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
                                label="Whatsapp"
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
                        {showInformation ? <div style={{ height: "350px", marginLeft: "25%", marginBottom: "5%", width: "50%" }}>
                        <Places location={ [{id: 1, lat: props.id && locationsform.latitude ? parseFloat(locationsform.latitude.replace(",", ".")) : locationMap.lat, lng: props.id && locationsform.longitude ? parseFloat(locationsform.longitude.replace(",", ".")) : locationMap.lng}] } lat={props.id && locationsform.latitude ? parseFloat(locationsform.latitude.replace(",", ".")) : locationMap.lat} lng={props.id && locationsform.longitude ? parseFloat(locationsform.longitude.replace(",", ".")) : locationMap.lng} zoomLevel={10} draggable={true} onChangeLocation={onChangeLocation} show /> {/* include it here */}
                        </div> : null}
                        {showInformation ? <FormControl className={classes.textvalidator}>
                            <TextValidator
                                style={{width: "100%"}}
                                label="Latitud*"
                                onChange={handleChangeMap}
                                type="text"
                                name="latitude"
                                value={locationsMapform.latitude}
                                validators={["required"]}
                                errorMessages={["Este campo es requerido"]}
                            />
                        </FormControl> : null}
                        {showInformation ? <FormControl className={classes.textvalidator}>
                            <TextValidator
                                style={{width: "100%"}}
                                label="Longitud*"
                                onChange={handleChangeMap}
                                type="text"
                                name="longitude"
                                value={locationsMapform.longitude}
                                validators={["required"]}
                                errorMessages={["Este campo es requerido"]}
                            />
                        </FormControl> : null}
                        <div className={classes.sectionbutton}>
                            <Button style={{margin: "1%", marginTop: "10%", marginBottom: "5%", width: "105.92px"}} onClick={handleFormSubmitLocation} variant="contained" color="primary">
                                ENVIAR  
                            </Button>

                            <Button style={{margin: "1%", marginTop: "10%", marginBottom: "5%"}} variant="contained" onClick={props.close} color="default">
                                CANCELAR
                            </Button>
                        </div>
                    </> : <NotFound/>
                    }
                </ValidatorForm>
            </Card>
        </div>
    );
}

export default FormAdminBenefits