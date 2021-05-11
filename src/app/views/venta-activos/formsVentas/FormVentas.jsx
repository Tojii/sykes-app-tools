import React, { useState, useRef, useEffect } from "react";
import {
    Button,
    Card,
    Grid,
    Dialog,
    IconButton,
    CardContent,
    CardHeader
} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import { AddOrder } from "../../../redux/actions/OrderActions";
import { useSelector, useDispatch } from 'react-redux';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AgregarDialog from './AgregarArticulo'
import moment from "moment";
import { useParams } from "react-router";
import { GetUserPurchased } from "../../../redux/actions/OrderActions";
import { GetCampaignsById } from "../../../redux/actions/CampaignActions";
import { GetProvince, GetCantons, GetDistricts } from "../../../redux/actions/LocationActions";
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
import { updateUserData, setUserData } from "../../../redux/actions/UserActions"
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import history from "history.js";
import './FormVentas.css';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

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
    textmessage: {
        "@media (min-width: 0px)": {
            marginLeft: "7.5%",
            width: "85%",
            marginTop: "3%",
        },
        "@media (min-width: 1025px)": {
            marginLeft: "15%",
            width: "75%",
            marginTop: "3%",
        },
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
    card__root: {
        marginBottom: '8%',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)',
    },
    card__header: {
        color: "#fff",
        backgroundColor: '#3497D3',
    },
    card__title: {
        margin: "10px 10px 0 0",
        padding: "5px 10px"
    },
    action__btn: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '5%',
        marginTop: '5%'
    },
    img__container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '5px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: '4px',
        marginTop: '5%',
        marginBottom: '5%'
    },
    img__size: {
        borderRadius: '4px',
        width: '80%',
        height: 'auto',
        margin: '5px'
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
    const [maximolist, setMaximolist] = useState([0]);
    const addOrder = useSelector(state => state.order.addOrder);
    const successOrder = useSelector(state => state.order.success);
    const purchases = useSelector(state => state.order.purchases);
    const provinces = useSelector(state => state.locations.provinces);
    const cantons = useSelector(state => state.locations.cantons);
    const districts = useSelector(state => state.locations.districts);
    const isLoadingCampaign = useSelector(state => state.campaign.loading);
    const isLoadingOrder = useSelector(state => state.order.loading);
    let { idcampaign } = useParams();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openPurchase, setOpenPurchase] = useState(false);
    const [disableCarrito, setDisableCarrito] = useState(false);
    const [disableMaximo, setDisableMaximo] = useState(false);
    const [disableCanton, setDisableCanton] = useState(true);
    const [disableDistrict, setDisableDistrict] = useState(true);
    const [showInformation, setshowInformation] = useState(false);
    const [showEdificio, setshowEdificio] = useState(false);
    const classes = useStyles();
    const [shouldOpenDetailsDialog, setShouldOpenDetailsDialog] = useState(
        {
            open: false,
            index: 0
        }
    );
    const message = "Costo de servicio de entrega no está incluido y varia dependiendo de la distancia"
    const activeEdificio = true;
    const activeEnvioCasa = true;

    useEffect(() => {
        setOpenPurchase(false);
        dispatch(GetUserPurchased(idcampaign));
        dispatch(GetCampaignsById(idcampaign));
        dispatch(GetProvince());
    }, []);

    useEffect(() => {
        if (cantidad[0] == undefined) { handleCantidad(); }
        if ((ventasform.badge == undefined && ventasform.name == undefined) || ventasform.email == user.email && ventasform.phone == user.phone) {
            setVentasForm({
                ...ventasform,
                badge: user.badge,
                name: user.fullname,
                email: user.email,
                phone: user.phone,
                campaignName: campaign[0] != undefined ? campaign[0].name : "",
                campaign: { id: campaign[0] != undefined ? campaign[0].id : "" },
                fechaInicio: campaign[0] != undefined ? moment(new Date(campaign[0].startDate)).format("DD/MM/yyyy") : "",
                fechaFinal: campaign[0] != undefined ? moment(new Date(campaign[0].endDate)).format("DD/MM/yyyy") : "",
                maximo: campaign[0] != undefined ? campaign[0].maxLimitPerPerson : "",
                compradosCampaign: purchases[0] != undefined ? purchases[0].totalPurchasedItems : ""
            })
        }

        if (purchases[0] != undefined && purchases[0].canPurchase == false) {
            setOpenPurchase(true);
        } else { setOpenPurchase(false); }

        if (campaign[0] != undefined) {
            campaign[0].campaignItems.map((item, index) => {
                if (!maximolist.includes(item.id) && purchases[0] != undefined && purchases[0].items[index] != undefined && (item.maxLimitPerPerson - purchases[0].items[index].totalPurchasedItems) == 0) {
                    //setMaximolist([...maximolist, item.id])
                    maximolist.push(item.id);
                }
            })
        }

    }, [campaign, user, indexlist, purchases]);

    const handleSingleRemove = index => {
        setDisableMaximo(false);
        let carritolist = [...carrito];
        let tempindexlist = [...indexlist];
        tempindexlist.splice(index + 1, 1);
        setIndexlist([...tempindexlist]);

        setVentasForm({
            ...ventasform,
            totalComprados: ventasform.totalComprados - carrito[index].buyquantity,
            freightVentas: ventasform.freightVentas - carrito[index].estimatedPrice,
            totalCompra: Math.round((ventasform.totalCompra - carrito[index].subtotal) * 100) / 100, 
        })
        carritolist.splice(index, 1);
        setCarrito([...carritolist]);
    }

    const handleClose = () => {
        setShouldOpenDetailsDialog({ open: false, index: 0 });
    }

    const handleBack = () => {
        history.push("/Ventas/Home");
    }

    const handleCantidad = () => {
        let i;
        if (campaign[0] != undefined) {
            for (i = 1; i <= campaign[0].maxLimitPerPerson && (purchases[0] != undefined && i <= (purchases[0].allowedPendingPurchaseItems - ventasform.totalCompra)); i++) {
                cantidad.push(i);
            }
        }
    }

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
        sendMethod: "",
        building: "",
        freightVentas: 0,
        cantonCode: "",
        districtCode: "",
        fecha: moment(new Date()).format("DD/MM/yyyy"),
        address: "",
        campaign: { id: campaign[0] != undefined ? campaign[0].id : "" },
        campaignName: campaign[0] != undefined ? campaign[0].name : "",
        fechaInicio: campaign[0] != undefined ? moment(new Date(campaign[0].startDate)).format("DD/MM/yyyy") : "",
        fechaFinal: campaign[0] != undefined ? moment(new Date(campaign[0].endDate)).format("DD/MM/yyyy") : "",
        notes: "",
        totalComprados: 0,
        totalCompra: 0,
        maximo: campaign[0] != undefined ? campaign[0].maxLimitPerPerson : "",
        compradosCampaign: purchases[0] != undefined ? purchases[0].totalPurchasedItems : ""
    });

    const handleFormSubmit = async () => {
        if (carrito.length > 0 && (purchases[0] != undefined && ventasform.totalComprados <= (ventasform.maximo - purchases[0].totalPurchasedItems))) {
            setDisableCarrito(false);
            let details = carrito.map(item => {
                return (
                    {
                        item: {
                            id: item.id
                        },
                        amount: item.buyquantity,
                        itemName: item.name,
                        itemDescription: item.description,
                        itemUnitPrice: item.unitPrice,
                    }
                )
            })
            await dispatch(AddOrder({ ...ventasform, detail: details, freight: ventasform.sendMethod == "Envío a la casa" ? ventasform.freightVentas : 0 }));
            const payloadUser = {
                email: ventasform.email,
                phone: ventasform.phone,
                badge: ventasform.badge,
            }
            await dispatch(setUserData(payloadUser));
            await dispatch(updateUserData(payloadUser));
            setOpen(true);
        } else {
            if (carrito.length <= 0) { setDisableCarrito(true); }
            if ((purchases[0] != undefined && ventasform.totalComprados > (ventasform.maximo - purchases[0].totalPurchasedItems))) { setDisableMaximo(true); }
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        setVentasForm({
            ...ventasform,
            [name]: event.target.value,
        });
    };

    const handleChangeEdificio = (event) => {
        const name = event.target.name;
        setVentasForm({
            ...ventasform,
            [name]: {"id":event.target.value},
        });
    };

    const handleChangeEntrega = (event) => {
        const name = event.target.name;
        if(event.target.value == "Envío a la casa") {
            setshowInformation(true)
            setshowEdificio(false)
            setVentasForm({
                ...ventasform,
                [name]: event.target.value,
                building: "",
            });
        } else {
            setshowInformation(false)
            setshowEdificio(true)
            setDisableCanton(true)
            setDisableDistrict(true)
            setVentasForm({
                ...ventasform,
                [name]: event.target.value,
                province: "",
                canton: "",
                district: "",
                provinceCode: "",
                address: "",
                cantonCode: "",
                districtCode: "",
            });
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
            subtotal: Math.round((event.target.value * carrito[index].unitPrice) * 100) / 100,
            maxLimitPerPerson: carrito[index].maxLimitPerPerson,
            stockQuantity: carrito[index].stockQuantity,
            limiteActual: carrito[index].limiteActual,
            estimatedPrice: carrito[index].estimatedPrice,
            image: carrito[index].image
        };
        setCarrito([...carritolist]);
        setVentasForm({
            ...ventasform,
            totalComprados: totalcomprados + event.target.value,
            totalCompra: Math.round((totalcompra + event.target.value * carrito[index].unitPrice) * 100) / 100,
        })
        if ((purchases[0] != undefined && (totalcomprados + event.target.value) > (ventasform.maximo - purchases[0].totalPurchasedItems))) {
            setDisableMaximo(true);
        } else {
            setDisableMaximo(false);
        }
    }

    return (
        <div className="m-sm-30">
            {console.log("carrito", carrito)}
            {(isLoadingCampaign || isLoadingOrder) ? <Loading /> : <ValidationModal idioma={"Español"} path={"/Ventas/Home"} state={(successOrder) ? "Success!" : "Error!"} save={() => { }} message={(successOrder) ? "¡Guardado exitosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"} setOpen={setOpen} open={open} />}
            {(isLoadingCampaign || isLoadingOrder) ? <Loading /> : <ValidationModal idioma={"Español"} path={"/Ventas/Home"} state={"¡Lo sentimos!"} save={() => { }} message={"¡Ya se ha alcanzado el máximo de artículos comprados en esta campaña!"} setOpen={setOpenPurchase} open={openPurchase && !isLoadingCampaign} />}
            <Card className={classes.formcard} elevation={6}>
                {(isLoadingCampaign || isLoadingOrder) ? <Loading /> : <Alert severity="info" className={classes.textmessage}>*El rebajo de artículos comprados se hará de planilla</Alert>}
                {(isLoadingCampaign || isLoadingOrder) ? <Loading /> : message && <Alert severity="info" className={classes.textmessage}>{campaign[0] ? campaign[0].message : ""}</Alert>}
                {(isLoadingCampaign || isLoadingOrder) ? <Loading /> : showInformation ? <Alert severity="info" className={classes.textmessage}>{campaign[0] != undefined ? campaign[0].shippingMessage : ""}</Alert> : null}
                {(isLoadingCampaign || isLoadingOrder) ? <Loading /> : <h2 style={{ textAlign: "center", marginTop: "2%" }} className="mb-20">Datos del usuario</h2>}
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>
                    {(isLoadingCampaign || isLoadingOrder) ? <Loading /> :
                        <>
                            <TextValidator
                                className={classes.textvalidator}
                                label="Badge*"
                                onChange={handleChange}
                                type="text"
                                name="badge"
                                disabled={true}
                                value={ventasform.badge}
                                validators={["required", "maxStringLength:5"]}
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
                                validators={["required", "maxStringLength:150"]}
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
                                validators={["required", "isNumber", "isPositive", "maxStringLength:8", "minStringLength:8"]}
                                errorMessages={["Este campo es requerido", "Solo se permiten números", "No se aceptan negativos", "Máximo 8 carácteres", "Mínimo 8 carácteres"]}
                            />
                            <SelectValidator
                                label="Método de Entrega*"
                                name="sendMethod"
                                className={classes.textvalidator}
                                value={ventasform.sendMethod}
                                onChange={handleChangeEntrega}
                                validators={["required"]}
                                errorMessages={["Este campo es requerido"]}
                            >
                                {(campaign[0] && campaign[0].sentToHome) && <MenuItem key={`entrega-envío`} id={"Envío a la casa"} value={"Envío a la casa"}>
                                    {"Envío a la casa"}
                                </MenuItem>}  
                                {(campaign[0] && campaign[0].pickUpInBuilding) && <MenuItem key={`entrega-edificio`} id={"Entrega en edificio"} value={"Recoger en edificio"}>
                                    {"Recoger en edificio"}
                                </MenuItem>}  
                            </SelectValidator>
                            {showEdificio ? <SelectValidator
                                label="Edificio*"
                                name="building"
                                className={classes.textvalidator}
                                value={ventasform.building.id}
                                onChange={handleChangeEdificio}
                                validators={["required"]}
                                errorMessages={["Este campo es requerido"]}
                            >
                                {campaign[0].buildings.map(edificio => (
                                    edificio.active && <MenuItem key={`edificio-${edificio.id}`} id={edificio.id} value={edificio.building.name ? edificio.building.id : ""}>
                                        {edificio.building.name || " "}
                                    </MenuItem>
                                ))}
                            </SelectValidator> : null}
                            {showInformation ? <SelectValidator
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
                            </SelectValidator> : null}
                            {showInformation ? <SelectValidator
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
                            </SelectValidator> : null}
                            {showInformation ? <SelectValidator
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
                            </SelectValidator> : null}
                            {showInformation ? <TextValidator
                                className={classes.textvalidator}
                                label="Dirección Exacta*"
                                onChange={handleChange}
                                //disabled={true}
                                type="text"
                                name="address"
                                value={ventasform.address}
                                validators={["required", "minStringLength:30"]}
                                errorMessages={["Este campo es requerido", "La dirección debe ser de al menos 30 caracteres"]}
                            /> : null}
                            <h2 style={{ textAlign: "center", marginTop: "2%" }} className="mb-20">Datos de la compra:</h2>
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
                            <TextValidator
                                className={classes.textvalidator}
                                label="Cant artículos comprados en la campaña"
                                onChange={handleChange}
                                type="text"
                                name="maximo"
                                value={ventasform.compradosCampaign}
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
                            <br />
                            {<h5 className={classes.textvalidator}>Articulos disponibles para compra:</h5>}
                            <div className={classes.gridtext} elevation={2}>
                                {(campaign[0] == undefined || campaign[0].campaignItems == undefined || campaign[0].campaignItems.length == 0 || (indexlist.length > 1 && campaign[0].campaignItems.length == (indexlist.length + maximolist.length - 2))) && <p className="px-16">No hay ningun artículo disponible para compra</p>}

                                {(campaign[0] == undefined || campaign[0].campaignItems.length == maximolist.length - 1) && <p className="px-16">Ha alcanzado el límite de compra de todos los artículos disponibles</p>}

                                {(campaign[0] != undefined && campaign[0].campaignItems != undefined) ? campaign[0].campaignItems.map((item, index) => {
                                    return (
                                        (!indexlist.includes(item.id) && item.stockQuantity > 0 && (purchases[0] != undefined && purchases[0].items[index] != undefined && (item.maxLimitPerPerson - purchases[0].items[index].totalPurchasedItems) > 0)) ?
                                            <>
                                                <Card className={classes.card__root}>
                                                    <Grid className={classes.card__header} container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <h5 className={classes.card__title}>{item.name}</h5>
                                                        </Grid>
                                                    </Grid>
                                                    <CardContent>
                                                        <Grid container
                                                            justify="center"
                                                            alignItems="center">
                                                            <div className={classes.img__container}>
                                                                <img className={classes.img__size} src={item.image} alt={item.name} />
                                                            </div>
                                                        </Grid>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Grid container 
                                                                    direction="row"
                                                                    justify="center"
                                                                    alignItems="center"
                                                                    spacing={2}>
                                                                    <Grid item zeroMinWidth xs={6}>
                                                                        <Typography gutterBottom variant="subtitle1">
                                                                            Cantidad:
                                                                        </Typography>
                                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                                            {item.stockQuantity}
                                                                        </Typography>

                                                                    </Grid>
                                                                    <Grid item zeroMinWidth xs={6}>
                                                                        <Typography gutterBottom variant="subtitle1">
                                                                            Precio:
                                                                    </Typography>
                                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                                            ₡{item.unitPrice}
                                                                        </Typography>
                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <div className={classes.action__btn}>
                                                        <Button
                                                            variant="contained"
                                                            className={(ventasform.maximo - ventasform.totalComprados <= 0 || (purchases[0] != undefined && purchases[0].allowedPendingPurchaseItems - ventasform.totalComprados <= 0)) ? "bg-default" : "bg-primary"}
                                                            style={{ color: (ventasform.maximo - ventasform.totalComprados <= 0 || (purchases[0] != undefined && purchases[0].allowedPendingPurchaseItems - ventasform.totalComprados <= 0)) ? "gray" : "white" }}
                                                            disabled={(ventasform.maximo - ventasform.totalComprados <= 0 || (purchases[0] != undefined && purchases[0].allowedPendingPurchaseItems - ventasform.totalComprados <= 0))}
                                                            onClick={() => setShouldOpenDetailsDialog({ open: true, id: item.id, index: index })}
                                                            startIcon={<AddIcon />}
                                                        >
                                                            Agregar
                                                            </Button>
                                                    </div>
                                                </Card>
                                            </>
                                            : null
                                    );
                                })
                                    : null}
                            </div>
                            <div className={classes.gridtext}>
                                <span style={{ color: "red", display: (ventasform.maximo - ventasform.totalComprados <= 0 || (purchases[0] != undefined && purchases[0].allowedPendingPurchaseItems - ventasform.totalComprados <= 0)) ? null : "none" }} className={classes.textvalidator + "text-center"} id="image">Los artículos añadidos han alcanzado el límite de artículos permitidos para la compra</span>
                            </div>

                            {<h5 className={classes.textvalidator}>Articulos añadidos a la compra:</h5>}
                            <div className={classes.gridtext} elevation={2}>
                                {carrito.length == 0 && <p className="px-16">No hay ningun artículo</p>}
                                {carrito.map((item, index) => {
                                    return (
                                        <>
                                            <Card className={classes.card__root}>
                                                <Grid className={classes.card__header} container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <h5 className={classes.card__title}>{item.name}</h5>
                                                    </Grid>
                                                </Grid>
                                                <CardContent>
                                                    <Grid container
                                                        justify="center"
                                                        alignItems="center">
                                                        <div className={classes.img__container}>
                                                            <img className={classes.img__size} src={item.image} alt={item.name} />
                                                        </div>
                                                    </Grid>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Grid container direction="row"
                                                                justify="center"
                                                                alignItems="center"
                                                                spacing={2}>
                                                                <Grid
                                                                    item zeroMinWidth xs={6}
                                                                    
                                                                >
                                                                    <Typography gutterBottom variant="subtitle1">
                                                                        Cantidad:
                                                                        </Typography>
                                                                    <SelectValidator
                                                                        name="buyquantity"
                                                                        value={item.buyquantity}
                                                                        onChange={(e) => handleChangeCantidad(index, e)}
                                                                        validators={["required"]}
                                                                        errorMessages={["Este campo es requerido"]}
                                                                    >
                                                                        { //console.log("cant carrito", item.limiteActual),
                                                                            cantidad.map((cantidaditem, index) => (
                                                                                (cantidaditem <= item.maxLimitPerPerson && cantidaditem <= item.stockQuantity && cantidaditem <= item.limiteActual) ?
                                                                                    <MenuItem key={`cantidad-${cantidaditem}`} value={cantidaditem ? cantidaditem : ""}>
                                                                                        {cantidaditem || " "}
                                                                                    </MenuItem> : null
                                                                            ))}
                                                                    </SelectValidator>

                                                                </Grid>
                                                                <Grid item zeroMinWidth xs={6}>
                                                                    <Typography gutterBottom variant="subtitle1">
                                                                        Subtotal:
                                                                    </Typography>
                                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                                        ₡{item.subtotal}
                                                                    </Typography>
                                                                </Grid>

                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                                <div className={classes.action__btn}>
                                                    <Button
                                                        variant="contained"
                                                        className="bg-error"
                                                        onClick={() => handleSingleRemove(index)}
                                                        startIcon={<DeleteIcon />}
                                                    >
                                                        Eliminar
                                                        </Button>
                                                </div>
                                            </Card>
                                        </>
                                    );
                                })}
                            </div>
                            <div className={classes.gridtext}>
                                <span style={{ color: "red", display: disableCarrito ? null : "none" }} className={classes.textvalidator + "text-center"} id="image2">Se debe añadir al menos un artículo a la compra</span>
                                <span style={{ color: "red", display: disableMaximo ? null : "none" }} className={classes.textvalidator + "text-center"} id="image2">{`¡Ha superado la cantidad máxima de artículos para la compra!`}</span>
                            </div>
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
                             {/* {showInformation ? <TextValidator
                                className={classes.textvalidator}
                                label="Flete aproximado"
                                onChange={handleChange}
                                type="text"
                                name="freightVentas"
                                disabled={true}
                                value={ventasform.freightVentas}
                            /> : null} */}
                            <div className={classes.sectionbutton}>
                                <Button style={{ margin: "1%", width: "105.92px" }} variant="contained" color="primary" type="submit">
                                    ENVIAR
                                </Button>
                                <Button style={{ margin: "1%" }} variant="contained" onClick={handleBack} color="default">
                                    CANCELAR
                                </Button>
                            </div>
                        </>
                    }
                </ValidatorForm>
                <Dialog fullWidth maxWidth="md" onClose={handleClose} open={shouldOpenDetailsDialog.open}>
                {isLoadingCampaign ? <Loading/> : <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Detalles del artículo:
                    </DialogTitle>}
                    <AgregarDialog type={"agregar"} close={handleClose} purchases={purchases} ventas={ventasform} setventas={setVentasForm} indexlist={indexlist} setIndex={setIndexlist} carrito={carrito} setCarrito={setCarrito} order={[{}]} id={shouldOpenDetailsDialog.id} index={shouldOpenDetailsDialog.index} />
                </Dialog>
            </Card>
        </div>
    );
}

export default FormVentas