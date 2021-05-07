import React, { useState, useRef, useEffect } from "react";
import { Button, Card, FormHelperText, FormControlLabel, Switch } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { GetBenefitsById, UpdateBenefit, AddBenefit, GetBenefits, GetBenefitsActive, GetBenefitsCategory, GetBenefitsLocations } from "../../../redux/actions/BenefitsActions";
import { GetBenefitsDiscountById, UpdateDiscount, AddDiscount, GetDiscounts } from "../../../redux/actions/BenefitsDiscountActions";
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import history from "history.js";
import LocationsTable from "../tables/ubicacionesTable";
import MenuItem from '@material-ui/core/MenuItem';
import {
    MuiPickersUtilsProvider,
    DatePicker 
  } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import es from "date-fns/locale/es";

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
    margindiv: {
        "@media (min-width: 0px)": {
            marginBottom: "20%",
        },
        "@media (min-width: 1024px)": {
            marginBottom: "5%",
        },
    }   
});

const FormDiscountBenefits = () => {
    
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let { id } = useParams();
    const classes = useStyles();
    const discount = useSelector(state => state.discount.discount);
    const benefits = useSelector(state => state.benefit.benefits);
    const successBenefit = useSelector(state => state.discount.success);
    const isLoading  = useSelector(state => state.benefit.loading);
    const [open, setOpen] = useState(false);
    const [disabledLocation, setDisabledLocation] = useState(true);
    const [files, setFiles] = useState(null);
    const [image, setImage] = useState(null);
    const [errorFile, setErrorFile] = useState({error: false, errorMessage: ""});
    const [errorMessage, setErrorMessage] = useState([]);
    const [locationsSelect, setLocationsSelect] = useState([]);
    
    const [discountform, setDiscountForm] = useState({
        idBenefits: "",
        idLocation: "",
        name: "",
        image: null,
        startDate: null,
        endDate: null
    });

    const handleFormSubmit = async () => {
        if (discountform.startDate != null && discountform.endDate != null && new Date(discountform.startDate).getTime() < new Date(discountform.endDate).getTime()) {
            if (((id && discountform.image != null))) {
                await dispatch(UpdateDiscount(id, discountform, files));
                setOpen(true);
            } else if ((discountform.image != null)) {
                await dispatch(AddDiscount(discountform, files));
                setOpen(true);
            }
        }
    };

    const presave = () => {
        if (discountform.image == null) {
            setErrorFile({error: true, errorMessage:`Debe adjuntar una imagen`});
        }
        if (discountform.startDate == null || discountform.endDate == null) { 
            if (discountform.startDate == null) {
                setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "*Se debe seleccionar la fecha de inicio" }));
            }
            if (discountform.endDate == null) {
                setErrorMessage(errorMessage => ({ ...errorMessage, endDate: "*Se debe seleccionar la fecha de finalización" }));
            }
        }
        if (new Date(discountform.startDate).getTime() >= new Date(discountform.endDate).getTime()) {
            setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "*La fecha de inicio no puede ser mayor que la fecha de finalización" }));
        }
    }

    const handleBack = () => {
        history.push("/Benefits/Discounts");
    }

    const handleDateChangeStartDate = date => {
        if (date != null) {
          setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "", endDate: "" }));
        }
        if (discountform.endDate != null && date.getTime() >= new Date(discountform.endDate).getTime()) {
            setErrorMessage(errorMessage => ({ ...errorMessage, startDate: "*La fecha de inicio no puede ser mayor que la fecha de finalización" }));
        }
        setDiscountForm({
          ...discountform,
          startDate: date,
        });
    };

    const handleDateChangeEndDate = date => {
        if (date != null) {
          setErrorMessage(errorMessage => ({ ...errorMessage, endDate: "", endDate: "" }));
        }
        setDiscountForm({
          ...discountform,
          endDate: date,
        });
      };

    useEffect(() => {
        dispatch(GetBenefits());
        //dispatch(GetBenefitsLocations());
        if (id) {
            dispatch(GetBenefitsDiscountById(id));
        } 
    }, []);

    useEffect(() => {
        if(id && discount != [] && discount[0] != [""] && discount[0] != undefined && discount[0].benefit != null) {setDiscountForm({
            idBenefits: discount[0].benefit.idBenefit,
            idLocation: discount[0].location.idLocation,
            name: discount[0].discountName,
            image: discount[0].image,
            startDate: discount[0].startDate,
            endDate: discount[0].endDate,
            });
            for(var i = 0; benefits.length > i; i++) {
                if (benefits[i].benefit.idBenefit == discount[0].benefit.idBenefit) {
                    setLocationsSelect(benefits[i].locations)
                }
            }
            setDisabledLocation(false)
        }
    }, [discount, benefits]);


    const handleChange = (event) => {
        const name = event.target.name;
        console.log("prueba", event)
        if (name == "active") {
            setDiscountForm({
                ...discountform,
                [name]: event.target.checked,
            })
        } else {
            setDiscountForm({
                ...discountform,
                [name]: event.target.value,
            })
        }
    };

    const handleChangeBenefit = (event, index) => {
        const name = event.target.name;
        console.log("prueba", event)
        setDiscountForm({
            ...discountform,
            [name]: event.target.value,
            idLocation: "",
        })
        for(var i = 0; benefits.length > i; i++) {
            if (benefits[i].benefit.idBenefit == event.target.value) {
                console.log("locations", benefits[i].locations)
                setLocationsSelect(benefits[i].locations)
            }
        }
        setDisabledLocation(false)
    };

    const getBase64 = (file) => {
        let reader = new FileReader();
        let imageupload = ""
        reader.readAsDataURL(file);
        reader.onload = function () {
            imageupload = reader.result
            setImage(imageupload)
            setDiscountForm({...discountform, image: imageupload});
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const handleFileSelect = event => {
        let filesList = event.target.files[0] != undefined ? event.target.files[0] : null;

        if(filesList != null && (filesList.type == "image/png" || filesList.type == "image/jpeg" || filesList.type == "image/jpg")){
                if(filesList.name.includes('.jfif') || filesList.name.includes('.pjp') || filesList.name.includes('.pjpeg')) { 
                    setErrorFile({error: true, errorMessage:`El formato del archivo no es válido`});
                    setFiles(null);
                    setDiscountForm({...discountform, files: null, image: null});
                    setImage(null);
                }
                else if (filesList.size/1024/1024 > 2) {
                    setErrorFile({error: true, errorMessage:`El tamaño del archivo no debe ser mayor a 2 MB`});
                    setFiles(null);
                    setDiscountForm({...discountform, files: null, image: null});
                    setImage(null);
                } else {
                    setErrorFile({error: false, errorMessage:``});
                    setFiles(event.target.files[0]);
                    setDiscountForm({...discountform, files: event.target.files[0]});
                    getBase64(event.target.files[0]);
                }
        } else if (filesList != null) {
            setErrorFile({error: true, errorMessage:`El formato del archivo no es válido`});
            setFiles(null);
            setDiscountForm({...discountform, files: null, image: null});
            setImage(null);
        }
    };

    return (
        <div className={classes.margindiv + " p-24"}>
            {console.log(discountform)}
            {(isLoading) ? <Loading/> : <ValidationModal idioma={"Español"} path={"/Benefits/Discounts"} state={(successBenefit) ? "Success!" : "Error!"} save={() => {dispatch(GetDiscounts());}} message={(successBenefit) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoading) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{id ? "Editar Promoción" : "Agregar Promoción"}</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>  
                    {(isLoading) ? <Loading/> :
                    <>  
                        <SelectValidator 
                            label="Beneficio*" 
                            name="idBenefits"
                            className={classes.textvalidator} 
                            value={discountform.idBenefits} 
                            onChange={handleChangeBenefit} 
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        >
                            {benefits.map((benefit, index) => (
                                <MenuItem key={`category-${benefit.benefit.idBenefit}`} id={benefit.benefit.idBenefit} value={benefit.benefit.idBenefit ? benefit.benefit.idBenefit : ""}>
                                {benefit.benefit.name || " "}
                                </MenuItem> 
                            ))}
                        </SelectValidator>
                        <SelectValidator 
                            label="Localización*" 
                            name="idLocation"
                            className={classes.textvalidator} 
                            value={discountform.idLocation} 
                            onChange={handleChange} 
                            validators={["required"]}
                            disabled={disabledLocation}
                            errorMessages={["Este campo es requerido"]}
                        >
                            {locationsSelect.map((location, index) => (
                                <MenuItem key={`category-${location.idLocation}`} id={location.idLocation} value={location.idLocation ? location.idLocation : ""}>
                                {location.address || " "}
                                </MenuItem> 
                            ))}
                        </SelectValidator>            
                        <TextValidator
                            className={classes.textvalidator}
                            label="Promoción*"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={discountform.name}
                            validators={["required","maxStringLength:100"]}
                            errorMessages={["Este campo es requerido", "Máximo 100 carácteres"]}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                            <DatePicker
                                className={classes.textvalidator}
                                cancelLabel="CANCELAR"
                                error={!!errorMessage.startDate}
                                helperText={errorMessage.startDate}
                                format="dd/MM/yyyy"
                                label="Fecha de Inicio*"
                                value={discountform.startDate}
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
                                value={discountform.endDate}
                                name="endDate"
                                onChange={handleDateChangeEndDate}
                                minDate={discountform.startDate != null ? new Date(discountform.startDate).setTime(new Date(discountform.startDate).getTime() + 1 * 86400000) : null}
                                disabled={!discountform.startDate}
                            />
                        </MuiPickersUtilsProvider>
                        <FormControl className={classes.textvalidator}>
                            <label className={classes.filelabel} id="image">Imagen (formatos aplicables: .png, .jpeg, .jpg) (Max 2MB)*</label>
                            <Input type="file" name="files" error={errorFile.error} aria-describedby="my-helper-text" accept="image/png, image/jpeg, image/jpg" onChange={handleFileSelect} 
                                 />  
                            <FormHelperText error={errorFile.error} id="my-helper-text">{errorFile.errorMessage}</FormHelperText>                               
                        </FormControl>
                        <div className={classes.sectionbutton}>
                            {discountform.image ? 
                                <img
                                className={classes.imageadd}                                          
                                alt="..."
                                src={`${discountform.image}`}
                                />
                                : null
                            }
                        </div>
                        {/* {id ? <LocationsTable benefitslocations={benefit[0] ? benefit[0].locations : []} idBenefit={id} /> : null} */}
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

export default FormDiscountBenefits