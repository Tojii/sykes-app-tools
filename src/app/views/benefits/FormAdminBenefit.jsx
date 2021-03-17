import React, { useState, Component, useRef, useEffect } from "react";
import {
  Button,
  Card,
  FormHelperText
} from "@material-ui/core";
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { GetCampaignItemsById, UpdateCampaignItems, AddCampaignItems, GetCampaigns, GetCampaignsActive, GetCampaignsItems } from "../../redux/actions/CampaignActions";
import ValidationModal from '../growth-opportunities/components/ValidationDialog';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import history from "history.js";
import LocationsTable from "./ubicacionesTable";

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
    const classes = useStyles();
    let { id } = useParams();
    const campaignitem = useSelector(state => state.campaign.campaignitem);
    const campaigns = useSelector(state => state.campaign.campaigns);
    const addCampaignItems = useSelector(state => state.campaign.addCampaignItems);
    const successCampaignItems = useSelector(state => state.campaign.success);
    const isLoading  = useSelector(state => state.campaign.loading);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState(null);
    const [logo, setLogo] = useState(null);
    const [errorFile, setErrorFile] = useState({error: false, errorMessage: ""});
    
    const [benefitsform, setBenefitsForm] = useState({
        idcampaign: "",
        name: "",
        description: "",
        logo: null,
        detail: "",
        link: "",
        facebook: "",
        instagram: "",
        email: ""
    });

    const handleFormSubmit = async () => {
        if (((id && benefitsform.logo != null))) {
            await dispatch(UpdateCampaignItems(id, benefitsform));
            setOpen(true);
        } else if ((benefitsform.logo != null)) {
            await dispatch(AddCampaignItems(benefitsform.idcampaign,benefitsform));
            setOpen(true);
        }
    };

    const presave = () => {
        if (benefitsform.logo == null) {
            setErrorFile({error: true, errorMessage:`Debe adjuntar una imagen`});
        }
    }

    const handleBack = () => {
        history.push("/Benefits/AdminFormBenefits");
    }

    useEffect(() => {
        // dispatch(GetCampaigns());
        // if (id) {
        //     dispatch(GetCampaignItemsById(id));
        // } 
    }, []);

    useEffect(() => {
        // if(id && campaignitem != [] && campaignitem[0] != [""] && campaignitem[0] != undefined) {setBenefitsForm({
        //     idcampaign: campaignitem[0].campaign.id,
        //     name: campaignitem[0].name,
        //     description: campaignitem[0].description ? campaignitem[0].description : "",
        //     logo: campaignitem[0].logo,
        //     quantity: campaignitem[0].quantity != undefined ? campaignitem[0].quantity.toString() : null,
        //     stockQuantity: campaignitem[0].stockQuantity != undefined ? campaignitem[0].stockQuantity.toString() : null,
        //     unitPrice: campaignitem[0].unitPrice != undefined ? campaignitem[0].unitPrice.toString() : null,
        //     maxLimitPerPerson: campaignitem[0].maxLimitPerPerson != undefined ? campaignitem[0].maxLimitPerPerson.toString() : "0",
        //     files: null
        // });}


    }, [campaignitem]);


    const handleChange = (event) => {
        const name = event.target.name;
        setBenefitsForm({
        ...benefitsform,
        [name]: event.target.value,
        })
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
             {(isLoading) ? <Loading/> : <ValidationModal idioma={"Español"} path={"/Benefits/AdminForm"} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => {dispatch(GetCampaignsItems());}} message={(successCampaignItems) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoading) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{id ? "Editar Beneficio" : "Agregar Beneficio"}</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>  
                    {(isLoading) ? <Loading/> :
                    <>               
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
                        {id ? <LocationsTable idBenefit={id} /> : null}
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