import React, { useState, Component, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Grid, 
  Divider,
  Dialog,
  IconButton
} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import { AddOrder } from "../../../redux/actions/OrderActions";
import { useSelector, useDispatch } from 'react-redux';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AgregarDialog from './AgregarArticulo'
import moment from "moment";
import { useParams } from "react-router";
import { GetUserPurchased } from "../../../redux/actions/OrderActions";
import { GetCampaignsById } from "../../../redux/actions/CampaignActions";
import { GetProvince, GetCantons, GetDistricts } from "../../../redux/actions/LocationActions";
import Campaigns from "app/views/dashboard/shared/Campaigns";
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
import { updateUserData, setUserData } from "../../../redux/actions/UserActions"
import Loading from "../../../../matx/components/MatxLoadable/Loading";
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
        }
    },
    gridtext: {
        "@media (min-width: 0px)": {
             marginLeft: "2%",
             width: "96%",
             marginTop: "3%",
         },
         "@media (min-width: 1025px)": {
             marginLeft: "25%",
             width: "50%",
             marginTop: "3%",
         }
     },
    formcard: {
        "@media (min-width: 1023px)": {
            marginLeft: "0%",
            width: "100%",
        },
        "@media (min-width: 1024px)": {
            marginLeft: "25%",
            width: "50%",
        }
     
    },
    titulo: {
        color: "red", 
        textAlign: "center", 
        marginTop: "2%"
    },
    sectionbutton: {
        marginLeft: "25%",
        width: "50%",
        marginTop: "3%",
        marginBottom: "2%",
        textAlign: "center"
    },
});

const styles = (theme) => ({
    root: {
      margin: "auto",
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

const FormVentas = () => {
    
    const user = useSelector(state => state.user);
    const campaign = useSelector(state => state.campaign.campaign);
    const [cantidad, setCantidad] = useState([]);
    const [indexlist, setIndexlist] = useState([0]);
    const addOrder = useSelector(state => state.order.addOrder);
    const successOrder = useSelector(state => state.order.success);
    const purchases = useSelector(state => state.order.purchases);
    const provinces = useSelector(state => state.locations.provinces);
    const cantons = useSelector(state => state.locations.cantons);
    const districts = useSelector(state => state.locations.districts);
    const isLoadingCampaign  = useSelector(state => state.campaign.loading);
    const isLoadingOrder  = useSelector(state => state.order.loading);
    let { idcampaign } = useParams();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openPurchase, setOpenPurchase] = useState(false);
    const [disableCarrito, setDisableCarrito] = useState(false);
    const [disableMaximo, setDisableMaximo] = useState(false);
    const [disableCanton, setDisableCanton] = useState(true);
    const [disableDistrict, setDisableDistrict] = useState(true);
    const classes = useStyles();
    const [shouldOpenDetailsDialog, setShouldOpenDetailsDialog] = useState(
        {
            open: false,
            index: 0
        }   
    );

    useEffect(() => {
        setOpenPurchase(false);
        dispatch(GetUserPurchased(idcampaign));
        dispatch(GetCampaignsById(idcampaign));
        dispatch(GetProvince());
    }, []);

    useEffect(() => {
        if (cantidad[0] == undefined) {handleCantidad();}
        if ((ventasform.badge == undefined && ventasform.name == undefined) || ventasform.email == user.email && ventasform.phone == user.phone) {
            setVentasForm({
            ...ventasform,
            badge: user.badge,
            name: user.fullname,
            email: user.email,
            phone: user.phone,
            campaignName: campaign[0] != undefined ? campaign[0].name : "",
            campaign: {id: campaign[0] != undefined ? campaign[0].id : ""},
            fechaInicio: campaign[0] != undefined ? moment(new Date(campaign[0].startDate)).format("DD/MM/yyyy") : "",
            fechaFinal: campaign[0] != undefined ? moment(new Date(campaign[0].endDate)).format("DD/MM/yyyy") : "",
            maximo: campaign[0] != undefined ? campaign[0].maxLimitPerPerson : ""
            }) 
        }
        if (purchases[0] != undefined && purchases[0].canPurchase == false) {
            setOpenPurchase(true);
        } else {setOpenPurchase(false);}
    }, [campaign, indexlist, user, purchases]);
    
    const handleSingleRemove = index => {
        setDisableMaximo(false);
        let carritolist = [...carrito];
        let tempindexlist = [...indexlist];
        tempindexlist.splice(index + 1, 1);
        setIndexlist([...tempindexlist]);

        setVentasForm({
            ...ventasform,
            totalComprados: ventasform.totalComprados - carrito[index].buyquantity,
            totalCompra: ventasform.totalCompra - carrito[index].subtotal,
        })
        carritolist.splice(index, 1);
        setCarrito([...carritolist]);
    }

    const handleClose = () => {
        setShouldOpenDetailsDialog({open: false, index: 0});
    }
    
    const handleBack = () => {
        history.push("/VentasHome");
    }
    
    const handleCantidad = () => {
        let i;
        console.log("cantidad", purchases[0] != undefined ? (purchases[0].allowedPendingPurchaseItems - ventasform.totalCompra) : "meh")
        console.log("cantidad", campaign[0] != undefined ? campaign[0].maxLimitPerPerson : "nah")
        if (campaign[0] != undefined) {
            for (i = 1; i <= campaign[0].maxLimitPerPerson && (purchases[0] != undefined && i <= (purchases[0].allowedPendingPurchaseItems - ventasform.totalCompra)); i++) {
                cantidad.push(i);
            }
        } 
    }

    const [disponibles, setDisponibles] = useState([
        {id:1, name: "Monitor MSI",
        quantity: 3,
        unitPrice: 10000},
        {id:2,name: "Audifonos MSI",
        quantity: 4,
        unitPrice: 12000,
        },
    ]);

    const [carrito, setCarrito] = useState([]);
    
    const [ventasform, setVentasForm] = useState({
        badge: user.badge,
        name: user.fullname,
        email: user.email,
        phone: user.phone,
        province: "",
        canton: "",
        district: "",
        provinceCode: "",
        cantonCode: "",
        districtCode: "",
        fecha: moment(new Date()).format("DD/MM/yyyy"),
        address: "",
        campaign: {id: campaign[0] != undefined ? campaign[0].id : ""},
        campaignName: campaign[0] != undefined ? campaign[0].name : "",
        fechaInicio: campaign[0] != undefined ? moment(new Date(campaign[0].startDate)).format("DD/MM/yyyy") : "",
        fechaFinal: campaign[0] != undefined ? moment(new Date(campaign[0].endDate)).format("DD/MM/yyyy") : "",
        notes: "",
        totalComprados: 0,
        totalCompra: 0,
        maximo: campaign[0] != undefined ? campaign[0].maxLimitPerPerson : ""
    });

    const handleFormSubmit = async () => {
        if (carrito.length > 0 && (purchases[0] != undefined && ventasform.totalComprados <= (ventasform.maximo - purchases[0].totalPurchasedItems))) {
            setDisableCarrito(false);
            let details = carrito.map(item => {
                return (
                    {
                        item:{
                            id: item.id
                        },
                        amount: item.buyquantity,
                        itemName: item.name,
                        itemDescription: item.description,
                        itemUnitPrice: item.unitPrice,
                    }
                )
            })
            await dispatch(AddOrder({...ventasform, detail: details}));
            const payloadUser = {
                email: ventasform.email,
                phone: ventasform.phone,
                badge: ventasform.badge,
            }
            await dispatch(setUserData(payloadUser));
            await dispatch(updateUserData(payloadUser));
            setOpen(true);
        } else {
            if(carrito.length <= 0) {setDisableCarrito(true);}
            if((purchases[0] != undefined && ventasform.totalComprados > (ventasform.maximo - purchases[0].totalPurchasedItems))) {setDisableMaximo(true);}
        }
    };
    
    const handleChange = (event) => {
        const name = event.target.name;
        setVentasForm({
          ...ventasform,
          [name]: event.target.value,
        });
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
        setVentasForm({
          ...ventasform,
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
        dispatch(GetDistricts(ventasform.provinceCode, event.target.value));
        cantons.map(canton => (
            (canton.code == event.target.value) ? cantonName = canton.name : null
         ));
        const name = event.target.name;
        setVentasForm({
          ...ventasform,
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
        setVentasForm({
          ...ventasform,
          [name]: event.target.value,
          district: districtName
        });
    };

    const handleChangeCantidad = (index, event) => {
        let carritolist = [...carrito];
        let totalcomprados = ventasform.totalComprados - carrito[index].buyquantity;
        let totalcompra = ventasform.totalCompra - carrito[index].subtotal;
        carritolist[index] = {
            id: carrito[index].id,
            name: carrito[index].name,
            buyquantity: event.target.value,
            unitPrice: carrito[index].unitPrice,
            quantity: carrito[index].quantity,
            subtotal: event.target.value * carrito[index].unitPrice,
            maxLimitPerPerson: carrito[index].maxLimitPerPerson,
            stockQuantity: carrito[index].stockQuantity,
            limiteActual: carrito[index].limiteActual,
        };
        setCarrito([...carritolist]);
        setVentasForm({
            ...ventasform,
            totalComprados: totalcomprados + event.target.value,
            totalCompra: totalcompra + event.target.value * carrito[index].unitPrice,
        })
    }

    return (
        <div className="m-sm-30">
            { console.log("purchases", purchases)}
            { console.log("carrito", carrito)}
            <ValidationModal idioma={"Español"} path={"/VentasHome"} state={(successOrder) ? "Success!" : "Error!"} save={() => {}} message={(successOrder) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />
            {(isLoadingCampaign || isLoadingOrder) ? <Loading/> : <ValidationModal idioma={"Español"} path={"/VentasHome"} state={"¡Lo sentimos!"} save={() => {}} message={"¡Ya se ha alcanzado el máximo de artículos comprados en esta campaña!"} setOpen={setOpenPurchase} open={openPurchase && !isLoadingCampaign} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoadingCampaign || isLoadingOrder) ? <Loading/> : <h4 className={classes.titulo}>*El rebajo de artículos comprados se hará de planilla</h4>}
                {(isLoadingCampaign || isLoadingOrder) ? <Loading/> : <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Datos del usuario</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>                 
                    {(isLoadingCampaign || isLoadingOrder) ? <Loading/> :
                    <>
                        <TextValidator
                            className={classes.textvalidator}
                            label="Badge*"
                            onChange={handleChange}
                            type="text"
                            name="badge"
                            disabled={true}
                            value={ventasform.badge}
                            validators={["required","maxStringLength:5"]}
                            errorMessages={["Este campo es requerido", "Máximo 5 carácteres"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Nombre*"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            disabled={true}
                            value={ventasform.name}
                            validators={["required","maxStringLength:150"]}
                            errorMessages={["Este campo es requerido", "Máximo 150 carácteres"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Correo electronico*"
                            onChange={handleChange}
                            type="text"
                            name="email"
                            value={ventasform.email}
                            validators={["required", "matchRegexp:^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$"]}
                            errorMessages={["Este campo es requerido", "Correo no válido"]} 
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Telefono*"
                            onChange={handleChange}
                            type="text"
                            name="phone"
                            value={ventasform.phone}
                            validators={["required","isNumber","maxStringLength:8"]}
                            errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 8 carácteres"]}
                        />
                        <SelectValidator 
                            label="Provincia*" 
                            name="provinceCode"
                            className={classes.textvalidator} 
                            value={ventasform.provinceCode} 
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
                            value={ventasform.cantonCode} 
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
                            value={ventasform.districtCode} 
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
                            label="Dirección Exacta*"
                            onChange={handleChange}
                            //disabled={true}
                            type="text"
                            name="address"
                            value={ventasform.address}
                            validators={["required","minStringLength:30"]}
                            errorMessages={["Este campo es requerido","La dirección debe ser de al menos 30 caracteres"]}
                        />
                        <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Datos de la compra:</h2>
                        <TextValidator
                            className={classes.textvalidator}
                            label="Campaña"
                            onChange={handleChange}
                            disabled={true}
                            type="text"
                            name="campaignName"
                            value={ventasform.campaignName}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        />
                        <TextValidator
                            className={classes.textvalidator}
                            label="Fecha Inicio Campaña"
                            onChange={handleChange}
                            type="text"
                            name="fechaInicio"
                            value={ventasform.fechaInicio}
                            disabled={true}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        />
                         <TextValidator
                            className={classes.textvalidator}
                            label="Fecha Final Campaña"
                            onChange={handleChange}
                            type="text"
                            name="fechaFinal"
                            value={ventasform.fechaFinal}
                            disabled={true}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        />
                         <TextValidator
                            className={classes.textvalidator}
                            label="Cant máxima artículos para compra"
                            onChange={handleChange}
                            type="text"
                            name="maximo"
                            value={ventasform.maximo}
                            disabled={true}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        />
                         {/* <TextValidator
                            className={classes.textvalidator}
                            label="Fecha compra"
                            onChange={handleChange}
                            type="text"
                            name="fecha"
                            value={ventasform.fecha}
                            disabled={true}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        /> */}
                        <TextValidator
                            className={classes.textvalidator}
                            label="Notas"
                            onChange={handleChange}
                            type="text"
                            name="notes"
                            value={ventasform.notes}
                            validators={[]}
                            errorMessages={[]}
                        />
                        <br/>
                        {<h5 className={classes.textvalidator}>Articulos disponibles para compra:</h5>}
                        <Card className={classes.gridtext} elevation={2}>
                            <div className="p-16">
                            <Grid
                                container
                                spacing={2}
                                justify="center"
                                alignItems="center"
                                direction="row"
                            >
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                Articulo
                                </Grid>
                                <Grid item lg={2} md={2} sm={2} xs={2}>
                                Cant
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                Valor
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                Acciones
                                </Grid>
                            </Grid>
                            </div>
                            <Divider></Divider>

                            {(campaign[0] == undefined || campaign[0].campaignItems == undefined || campaign[0].campaignItems.length == 0 || campaign[0].campaignItems.length == indexlist.length - 1) && <p className="px-16">No hay ningun artículo</p>}

                            {(campaign[0] != undefined && campaign[0].campaignItems != undefined) ? campaign[0].campaignItems.map((item, index) => {
                            return (
                                (!indexlist.includes(item.id) && item.stockQuantity > 0 && (purchases[0] != undefined && purchases[0].items[index] != undefined && purchases[0].items[index].allowedPendingPurchaseItems > 0)) ?
                                <div className="px-16 py-16" key={item.id}>
                                <Grid
                                    container
                                    spacing={2}
                                    justify="center"
                                    alignItems="center"
                                    direction="row"
                                >
                                    <Grid item lg={3} md={3} sm={3} xs={3}>
                                    {item.name}
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                    {item.stockQuantity}
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={4}>
                                    ₡{item.unitPrice}
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} xs={3}>
                                    <div className="flex">
                                    
                                        <Button
                                        variant="contained"
                                        className= {(ventasform.maximo - ventasform.totalComprados <= 0 || (purchases[0] != undefined && purchases[0].allowedPendingPurchaseItems - ventasform.totalComprados <= 0) ) ? "bg-default" : "bg-primary"}
                                        style={{color: (ventasform.maximo - ventasform.totalComprados <= 0 || (purchases[0] != undefined && purchases[0].allowedPendingPurchaseItems - ventasform.totalComprados <= 0) ) ? "gray" : "white"}}
                                        disabled={(ventasform.maximo - ventasform.totalComprados <= 0 || (purchases[0] != undefined && purchases[0].allowedPendingPurchaseItems - ventasform.totalComprados <= 0) )}
                                        onClick={() => setShouldOpenDetailsDialog({open: true, id: item.id, index: index})}
                                        >
                                        Agregar
                                        </Button>
                                    </div>
                                    </Grid>
                                </Grid>
                                </div> : null
                            
                            ); 
                            }) 
                            : null }
                        </Card>
                        <label style={{color: "red", display: (ventasform.maximo - ventasform.totalComprados <= 0 || (purchases[0] != undefined && purchases[0].allowedPendingPurchaseItems - ventasform.totalComprados <= 0)) ? null : "none"}} className={classes.textvalidator} id="image">Los artículos añadidos han alcanzado el límite de artículos permitidos para la compra</label>
                        <br/>
                        {<h5 className={classes.textvalidator}>Articulos añadidos a la compra:</h5>}
                        <Card className={classes.gridtext} elevation={2}>
                            <div className="p-16">
                            <Grid
                                container
                                spacing={2}
                                justify="center"
                                alignItems="center"
                                direction="row"
                            >
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                Articulo
                                </Grid>
                                <Grid item lg={2} md={2} sm={2} xs={2}>
                                Cant
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                Subtotal
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                Acciones
                                </Grid>
                            </Grid>
                            </div>
                            <Divider></Divider>

                            {carrito.length == 0 && <p className="px-16">No hay ningun artículo</p>}

                            {carrito.map((item, index) => {
                            return ( 
                                <div className="px-16 py-16" key={item.id}>
                                <Grid
                                    container
                                    spacing={2}
                                    justify="center"
                                    alignItems="center"
                                    direction="row"
                                >
                                    <Grid item lg={3} md={3} sm={3} xs={3}>
                                    {item.name}
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                    <SelectValidator  
                                        name="buyquantity"
                                        value={item.buyquantity} 
                                        onChange={(e) => handleChangeCantidad(index, e)} 
                                        validators={["required"]}
                                        errorMessages={["Este campo es requerido"]}
                                    >
                                        { console.log("cant carrito", item.limiteActual),
                                        cantidad.map(cantidaditem => (
                                                        (cantidaditem <= item.maxLimitPerPerson && cantidaditem <= item.stockQuantity && cantidaditem <= item.limiteActual) ?
                                                        <MenuItem key={`cantidad-${cantidaditem}`} value={cantidaditem ? cantidaditem : ""}>
                                                        {cantidaditem || " "}
                                                        </MenuItem> : null
                                                    ))}
                                    </SelectValidator>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={4}>
                                    ₡{item.subtotal}
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} xs={3}>
                                    <div className="flex">
                                    
                                        <Button
                                        variant="contained"
                                        className="bg-error"
                                        onClick={() => handleSingleRemove(index)}
                                        >
                                        Eliminar
                                        </Button>
                                    </div>
                                    </Grid>
                                </Grid>
                                </div>
                            );
                            })} 
                        </Card>
                        <label style={{color: "red", display: disableCarrito ? null : "none"}} className={classes.textvalidator} id="image2">Se debe añadir al menos un artículo a la compra</label>
                        <label style={{color: "red", display: disableMaximo ? null : "none"}} className={classes.textvalidator} id="image2">{`¡Ha superado la cantidad máxima de artículos para la compra!`}</label>
                        
                        <br/>
                        <TextValidator
                            className={classes.textvalidator}
                            label="Total de artículos comprados*"
                            onChange={handleChange}
                            type="text"
                            name="totalComprados"
                            disabled={true}
                            value={ventasform.totalComprados}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
                        /> 
                        <TextValidator
                            className={classes.textvalidator}
                            label="Total Compra*"
                            onChange={handleChange}
                            type="text"
                            name="totalCompra"
                            disabled={true}
                            value={ventasform.totalCompra}
                            validators={["required"]}
                            errorMessages={["Este campo es requerido"]}
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
                <Dialog fullWidth maxWidth="md" onClose={handleClose} open={shouldOpenDetailsDialog.open}>
                <DialogTitle  id="customized-dialog-title" onClose={handleClose}>
                Detalles del artículo:
                 </DialogTitle>
                <AgregarDialog type={"agregar"} close={handleClose} purchases={purchases} ventas={ventasform} setventas={setVentasForm} indexlist={indexlist} setIndex={setIndexlist} carrito={carrito} setCarrito={setCarrito} order={[{}]} setDisponibles={setDisponibles} id={shouldOpenDetailsDialog.id} index={shouldOpenDetailsDialog.index} />
                </Dialog>
            </Card>
        </div>
    );
}

export default FormVentas