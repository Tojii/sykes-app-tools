import React, { useState, useRef, useEffect } from "react";
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
import { GetBenefitsById, UpdateBenefit, AddBenefit, GetBenefits, GetBenefitsActive, GetBenefitsCategory, GetBenefitsLocations } from "../../redux/actions/BenefitsActions";
import ValidationModal from '../growth-opportunities/components/ValidationDialog';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import history from "history.js";
import LocationsTable from "./ubicacionesTable";
import MenuItem from '@material-ui/core/MenuItem';

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

const FormAdminBenefits = () => {
    
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let { id } = useParams();
    const classes = useStyles();
    const benefit = useSelector(state => state.benefit.benefit);
    const benefitscategories = useSelector(state => state.benefit.benefitscategories);
    const successBenefit = useSelector(state => state.benefit.success);
    const isLoadingLocation  = useSelector(state => state.benefit.loadingLocation);
    const isLoading  = useSelector(state => state.benefit.loading);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState(null);
    const [logo, setLogo] = useState(null);
    const [errorFile, setErrorFile] = useState({error: false, errorMessage: ""});
    
    const [benefitsform, setBenefitsForm] = useState({
        idBenefit: "",
        idCategory: "",
        benefitInfo: "",
        name: "",
        description: "",
        logo: null,
        detail: "",
        link: "",
        facebook: "",
        instagram: "",
        email: "",
        active: false
    });

    const handleFormSubmit = async () => {
        if (((id && benefitsform.logo != null))) {
            await dispatch(UpdateBenefit(id, benefitsform, files));
            setOpen(true);
        } else if ((benefitsform.logo != null)) {
            await dispatch(AddBenefit(benefitsform, files));
            setOpen(true);
        }
    };

    const presave = () => {
        if (logo == null) {
            setErrorFile({error: true, errorMessage:`Debe adjuntar una imagen`});
        }
    }

    const handleBack = () => {
        history.push("/Benefits/AdminFormBenefits");
    }

    useEffect(() => {
        dispatch(GetBenefitsCategory());
        dispatch(GetBenefitsLocations());
        if (id) {
            dispatch(GetBenefitsById(id));
        } 
    }, []);

    useEffect(() => {
        if(id && benefit != [] && benefit[0] != [""] && benefit[0] != undefined && benefit[0].benefit != null) {setBenefitsForm({
            idBenefit: benefit[0].benefit.idBenefit,
            idCategory: benefit[0].benefit.category.idCategory,
            name: benefit[0].benefit.name,
            description: benefit[0].benefit.description ? benefit[0].benefit.description : "",
            logo: benefit[0].benefit.logo,
            detail: benefit[0].benefit.detail,
            benefitInfo: benefit[0].benefit.benefitInfo,
            link: benefit[0].benefit.link,
            facebook: benefit[0].benefit.facebook ? benefit[0].benefit.facebook : "",
            instagram: benefit[0].benefit.instagram ? benefit[0].benefit.instagram : "",
            email: benefit[0].benefit.email ? benefit[0].benefit.email : "",
            active: benefit[0].benefit.active,
        });}
    }, [benefit]);


    const handleChange = (event) => {
        const name = event.target.name;
        if (name == "active") {
            setBenefitsForm({
                ...benefitsform,
                [name]: event.target.checked,
            })
        } else {
            setBenefitsForm({
                ...benefitsform,
                [name]: event.target.value,
            })
        }
    };

    const getBase64 = (file) => {
        let reader = new FileReader();
        let imageupload = ""
        reader.readAsDataURL(file);
        reader.onload = function () {
            imageupload = reader.result
            setLogo(imageupload)
            setBenefitsForm({...benefitsform, logo: imageupload});
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
                    setBenefitsForm({...benefitsform, files: null, logo: null});
                    setLogo(null);
                }
                else if (filesList.size/1024/1024 > 2) {
                    setErrorFile({error: true, errorMessage:`El tamaño del archivo no debe ser mayor a 2 MB`});
                    setFiles(null);
                    setBenefitsForm({...benefitsform, files: null, logo: null});
                    setLogo(null);
                } else {
                    setErrorFile({error: false, errorMessage:``});
                    setFiles(event.target.files[0]);
                    setBenefitsForm({...benefitsform, files: event.target.files[0]});
                    getBase64(event.target.files[0]);
                }
        } else {
            setErrorFile({error: true, errorMessage:`El formato del archivo no es válido`});
            setFiles(null);
            setBenefitsForm({...benefitsform, files: null, logo: null});
            setLogo(null);
        }
    };

    return (
        <div className={classes.margindiv + " p-24"}>
            {console.log(benefitsform)}
             {(isLoading || isLoadingLocation) ? <Loading/> : <ValidationModal idioma={"Español"} path={"/Benefits/AdminFormBenefits"} state={(successBenefit) ? "Success!" : "Error!"} save={() => {dispatch(GetBenefits());}} message={(successBenefit) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoading) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{id ? "Editar Beneficio" : "Agregar Beneficio"}</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>  
                    {(isLoading) ? <Loading/> :
                    <>  
                        <SelectValidator 
                            label="Category*" 
                            name="idCategory"
                            className={classes.textvalidator} 
                            value={benefitsform.idCategory} 
                            onChange={handleChange} 
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        >
                            {benefitscategories.map(category => (
                                <MenuItem key={`category-${category.idCategory}`} id={category.idCategory} value={category.idCategory ? category.idCategory : ""}>
                                {category.name || " "}
                                </MenuItem> 
                            ))}
                        </SelectValidator>           
                        <TextValidator
                            className={classes.textvalidator}
                            label="Name*"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={benefitsform.name}
                            validators={["required","maxStringLength:100"]}
                            errorMessages={["Este campo es requerido", "Máximo 100 carácteres"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Detail*"
                            onChange={handleChange}
                            type="text"
                            name="detail"
                            value={benefitsform.detail}
                            validators={["required","maxStringLength:250"]}
                            errorMessages={["Este campo es requerido","Máximo 250 carácteres"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Description*"
                            onChange={handleChange}
                            type="text"
                            name="description"
                            value={benefitsform.description}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Benefit Information*"
                            onChange={handleChange}
                            type="text"
                            name="benefitInfo"
                            value={benefitsform.benefitInfo}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Link*"
                            onChange={handleChange}
                            type="text"
                            name="link"
                            
                            value={benefitsform.link}
                            validators={["required"]}
                            validators={["required","maxStringLength:200"]}
                            errorMessages={["Este campo es requerido","Máximo 200 carácteres"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Facebook"
                            onChange={handleChange}
                            type="text"
                            name="facebook" 
                            value={benefitsform.facebook}
                            validators={["maxStringLength:200"]}
                            errorMessages={["Máximo 200 carácteres"]}
                        />
                         <TextValidator
                            className={classes.textvalidator}
                            label="Instagram"
                            onChange={handleChange}
                            type="text"
                            name="instagram" 
                            value={benefitsform.instagram}
                            validators={["maxStringLength:200"]}
                            errorMessages={["Máximo 200 carácteres"]}
                        />
                         <TextValidator
                            className={classes.textvalidator}
                            label="Email"
                            onChange={handleChange}
                            type="text"
                            name="email" 
                            value={benefitsform.email}
                            validators={["maxStringLength:200"]}
                            errorMessages={["Máximo 200 carácteres"]}
                        />
                        <FormControlLabel
                            className={classes.textvalidator}
                            label="Active Benefit"
                            control={
                                <Switch
                                checked={benefitsform.active}
                                name="active"
                                color="primary"
                                onChange={handleChange}
                                />
                            }
                        />
                        <FormControl className={classes.textvalidator}>
                            <label className={classes.filelabel} id="logo">Logo (applicable formats: .png, .jpeg, .jpg) (Max 2MB)*</label>
                            <Input type="file" name="files" error={errorFile.error} aria-describedby="my-helper-text" accept="image/png, image/jpeg, image/jpg" onChange={handleFileSelect} 
                                 />  
                            <FormHelperText error={errorFile.error} id="my-helper-text">{errorFile.errorMessage}</FormHelperText>                               
                        </FormControl>
                        <div className={classes.sectionbutton}>
                            {benefitsform.logo ? 
                                <img
                                className={classes.imageadd}                                          
                                alt="..."
                                src={`${benefitsform.logo}`}
                                />
                                : null
                            }
                        </div>
                        {id ? <LocationsTable benefitslocations={benefit[0] ? benefit[0].locations : []} idBenefit={id} /> : null}
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

export default FormAdminBenefits