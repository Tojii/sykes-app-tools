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
import InputAdornment from '@material-ui/core/InputAdornment';
import { GetCampaignItemsById, UpdateCampaignItems, AddCampaignItems, GetCampaigns, GetCampaignsActive, GetCampaignsItems } from "../../../redux/actions/CampaignActions";
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import MenuItem from '@material-ui/core/MenuItem';
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
            marginLeft: "15%",
            width: "70%",
        },
        "@media (min-width: 1281px)": {
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

const FormAdminInventario = () => {
    
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let { id } = useParams();
    const campaignitem = useSelector(state => state.campaign.campaignitem);
    const campaigns = useSelector(state => state.campaign.campaigns);
    const addCampaignItems = useSelector(state => state.campaign.addCampaignItems);
    const successCampaignItems = useSelector(state => state.campaign.success);
    const isLoading  = useSelector(state => state.campaign.loading);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState(null);
    const [image, setImage] = useState(null);
    const [errorFile, setErrorFile] = useState({error: false, errorMessage: ""});
    const [errorStock, setErrorStock] = useState({error: false, errorMessage: ""});
    
    const [inventarioform, setInventarioForm] = useState({
        idcampaign: "",
        name: "",
        description: "",
        image: null,
        quantity: "",
        stockQuantity: "",
        unitPrice: "",
        shippingPrice: "0",
        maxLimitPerPerson: "",
        files: null
    });
    const classes = useStyles();

    const handleFormSubmit = async () => {
        if (((id && files != null) || (id && inventarioform.image != null)) && (parseInt(inventarioform.quantity, 10) >= parseInt(inventarioform.stockQuantity, 10))) {
            await dispatch(UpdateCampaignItems(id, inventarioform, files));
            setOpen(true);
        } else if ((files != null || inventarioform.image != null) && (parseInt(inventarioform.quantity, 10) >= parseInt(inventarioform.stockQuantity, 10))) {
            await dispatch(AddCampaignItems(inventarioform.idcampaign,inventarioform, files));
            setOpen(true);
        }
    };

    const presave = () => {
        if (files == null && inventarioform.image == null) {
            setErrorFile({error: true, errorMessage:`Debe adjuntar una imagen`});
        }
        if (parseInt(inventarioform.quantity, 10) < parseInt(inventarioform.stockQuantity, 10)) {
            setErrorStock({error: true, errorMessage:`Las existencias no pueden ser mayores al inventario inicial`});
        }
    }

    const handleBack = () => {
        history.push("/Ventas/Inventario");
    }

    useEffect(() => {
        dispatch(GetCampaigns());
        if (id) {
            dispatch(GetCampaignItemsById(id));
        } 
    }, []);

    useEffect(() => {
        if(id && campaignitem != [] && campaignitem[0] != [""] && campaignitem[0] != undefined) {setInventarioForm({
            idcampaign: campaignitem[0].campaign.id,
            name: campaignitem[0].name,
            description: campaignitem[0].description ? campaignitem[0].description : "",
            image: campaignitem[0].image,
            quantity: campaignitem[0].quantity != undefined ? campaignitem[0].quantity.toString() : null,
            stockQuantity: campaignitem[0].stockQuantity != undefined ? campaignitem[0].stockQuantity.toString() : null,
            unitPrice: campaignitem[0].unitPrice != undefined ? campaignitem[0].unitPrice.toString() : null,
            maxLimitPerPerson: campaignitem[0].maxLimitPerPerson != undefined ? campaignitem[0].maxLimitPerPerson.toString() : "0",
            shippingPrice: campaignitem[0].estimatedPrice != undefined ? campaignitem[0].estimatedPrice.toString() : "0",
            files: null
        });}


    }, [campaignitem]);


    const handleChange = (event) => {
        const name = event.target.name;
        if (id && (event.target.name == "quantity") && (parseInt(event.target.value, 10) >= parseInt(inventarioform.stockQuantity, 10))) {
            setErrorStock({error: false, errorMessage:``});
        } else if (id && event.target.name == "quantity") {
            if (event.target.value == "" || inventarioform.stockQuantity == ""){
                setErrorStock({error: false, errorMessage:``});
            } else { 
                setErrorStock({error: true, errorMessage:`Las existencias no pueden ser mayores al inventario inicial`});
            }
        }
        if (id && (event.target.name == "stockQuantity") && (parseInt(inventarioform.quantity, 10) >= parseInt(event.target.value, 10))) {
            setErrorStock({error: false, errorMessage:``});
        } else if (id && event.target.name == "stockQuantity") {
            if (event.target.value == "" || inventarioform.quantity == ""){
                setErrorStock({error: false, errorMessage:``});
            } else {
                setErrorStock({error: true, errorMessage:`Las existencias no pueden ser mayores al inventario inicial`});
            }
        }
        if ((event.target.name == "quantity") && !id) {
            setInventarioForm({
                ...inventarioform,
                [name]: event.target.value,
                "stockQuantity": event.target.value
              });
        } else {
            setInventarioForm({
            ...inventarioform,
            [name]: event.target.value,
            });
        }
    };

    const getBase64 = (file) => {
        let reader = new FileReader();
        let imageupload = ""
        reader.readAsDataURL(file);
        reader.onload = function () {
            imageupload = reader.result
            setImage(imageupload)
            setInventarioForm({...inventarioform, image: imageupload});
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const handleFileSelect = event => {
        let filesList = event.target.files[0] != undefined ? event.target.files[0] : null;
        let list = [];
        let sizes = 0;
        console.log("image prop", event.target.files[0])

        if(filesList != null && (filesList.type == "image/png" || filesList.type == "image/jpeg" || filesList.type == "image/jpg")){
                if(filesList.name.includes('.jfif') || filesList.name.includes('.pjp') || filesList.name.includes('.pjpeg')) { 
                    setErrorFile({error: true, errorMessage:`El formato del archivo no es válido`});
                    setFiles(null);
                    setInventarioForm({...inventarioform, files: null, image: null});
                    setImage(null);
                }
                else if (filesList.size/1024/1024 > 2) {
                    setErrorFile({error: true, errorMessage:`El tamaño del archivo no debe ser mayor a 2 MB`});
                    setFiles(null);
                    setInventarioForm({...inventarioform, files: null, image: null});
                    setImage(null);
                } else {
                    setErrorFile({error: false, errorMessage:``});
                    setFiles(event.target.files[0]);
                    setInventarioForm({...inventarioform, files: event.target.files[0]});
                    getBase64(event.target.files[0]);
                }
        } else if (filesList != null) {
            setErrorFile({error: true, errorMessage:`El formato del archivo no es válido`});
            setFiles(null);
            setInventarioForm({...inventarioform, files: null, image: null});
            setImage(null);
        }
      };

    return (
        <div className="p-24">
             {(isLoading) ? <Loading/> : <ValidationModal idioma={"Español"} path={"/Ventas/Inventario"} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => {dispatch(GetCampaignsItems());}} message={(successCampaignItems) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoading) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{id ? "Editar Artículo" : "Agregar Artículo"}</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>  
                    {(isLoading) ? <Loading/> :
                    <>               
                         <SelectValidator 
                            label="Campaña*" 
                            name="idcampaign"
                            className={classes.textvalidator} 
                            value={inventarioform.idcampaign} 
                            onChange={handleChange} 
                            validators={["required"]}
                            disabled={id != undefined}
                            errorMessages={["Este campo es requerido"]}
                        >
                            {campaigns.map(campaign => (
                                (new Date(campaign.endDate).getTime() > new Date().getTime()) ?
                                <MenuItem key={`province-${campaign.id}`} id={campaign.id} value={campaign.id ? campaign.id : ""}>
                                {campaign.name || " "}
                                </MenuItem> : null
                            ))}
                        </SelectValidator> 
                        <TextValidator
                            className={classes.textvalidator}
                            label="Nombre Artículo*"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={inventarioform.name}
                            validators={["required","maxStringLength:100"]}
                            errorMessages={["Este campo es requerido", "Máximo 100 carácteres"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Descripción Artículo*"
                            onChange={handleChange}
                            type="text"
                            name="description"
                            value={inventarioform.description}
                            validators={["required","maxStringLength:150"]}
                            errorMessages={["Este campo es requerido","Máximo 150 carácteres"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Inventario Inicial*"
                            onChange={handleChange}
                            type="text"
                            name="quantity"
                            //disabled={true}
                            value={inventarioform.quantity}
                            validators={["required","isNumber","maxStringLength:7", "isPositive"]}
                            errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 7 carácteres", "No se aceptan negativos"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Existencias*"
                            onChange={handleChange}
                            type="text"
                            name="stockQuantity"
                            disabled={!id}
                            value={inventarioform.stockQuantity}
                            validators={["required","isNumber","maxStringLength:7", "isPositive"]}
                            errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 7 carácteres", "No se aceptan negativos"]}
                            error={errorStock.error}
                        />
                        <FormHelperText style={{display: errorStock.error ? null : "none", marginTop: "0%"}} className={classes.textvalidator} error={errorStock.error} id="my-helper-text">{errorStock.errorMessage}</FormHelperText>
                        {/* <TextValidator
                            className={classes.textvalidator}
                            label="Valor Artículo*"
                            onChange={handleChange}
                            type="text"
                            name="unitPrice"
                            value={inventarioform.unitPrice}
                            validators={["required","isNumber","maxStringLength:15", "isPositive"]}
                            errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 15 carácteres", "No se aceptan negativos"]}
                        /> */}
                        <FormControl className={classes.textvalidator}>
                            <TextValidator
                                fullWidth
                                label="Valor Artículo*"
                                onChange={handleChange}
                                type="text"
                                name="unitPrice"
                                placeholder="0.00"
                                value={inventarioform.unitPrice}
                                validators={["required","matchRegexp:^[0-9]+([\.][0-9]{1,2})?$","maxStringLength:9"]} 
                                errorMessages={["Este campo es requerido","Solo se permiten números positivos, máximo dos decimales", "Máximo 9 carácteres"]}
                                InputProps={{
                                    startAdornment:<InputAdornment position="start">₡</InputAdornment>,
                                  }}  
                            />
                        </FormControl>
                        {/* <FormControl className={classes.textvalidator}>
                            <TextValidator
                                fullWidth
                                label="Precio estimado de envío*"
                                onChange={handleChange}
                                type="text"
                                name="shippingPrice"
                                placeholder="0.00"
                                value={inventarioform.shippingPrice}
                                validators={["required","matchRegexp:^[0-9]+([\.][0-9]{1,2})?$","maxStringLength:9"]} 
                                errorMessages={["Este campo es requerido","Solo se permiten números positivos, máximo dos decimales", "Máximo 9 carácteres"]}
                                InputProps={{
                                    startAdornment:<InputAdornment position="start">₡</InputAdornment>,
                                  }}
                            />
                        </FormControl> */}
                        <TextValidator
                            className={classes.textvalidator}
                            label="Límite Máximo de Venta por Empleado*"
                            onChange={handleChange}
                            type="text"
                            name="maxLimitPerPerson" 
                            value={inventarioform.maxLimitPerPerson}
                            validators={["required","isNumber","maxStringLength:3","isPositive"]}
                            errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 3 carácteres", "No se aceptan negativos"]}
                        />
                        <FormControl className={classes.textvalidator}>
                            <label className={classes.filelabel} id="image">Imagen Artículo (applicable formats: .png, .jpeg, .jpg) (Max 2MB)*</label>
                            <Input type="file" name="files" error={errorFile.error} aria-describedby="my-helper-text" accept="image/png, image/jpeg, image/jpg" onChange={handleFileSelect} 
                                 />  
                            <FormHelperText error={errorFile.error} id="my-helper-text">{errorFile.errorMessage}</FormHelperText>                               
                        </FormControl> 

                        <div className={classes.sectionbutton}>
                        {inventarioform.image ? 
                            <img
                            //height={"437px"}
                            //width={"331px"}
                            className={classes.imageadd}                                          
                            alt="..."
                            src={`${inventarioform.image}`}
                            />
                            : null
                        }
                        </div>
                    
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

export default FormAdminInventario