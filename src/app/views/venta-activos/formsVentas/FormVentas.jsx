import React, { useState, Component, useRef } from "react";
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
import {addRaft} from "../../../redux/actions/RaftActions";
import { useSelector, useDispatch } from 'react-redux';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AgregarDialog from './AgregarArticulo'
import moment from "moment";
import { useParams } from "react-router";

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
    const [campaign, setCampaign] = useState([]) 
    let indexCampaign;
    let { idcampaign } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [shouldOpenDetailsDialog, setShouldOpenDetailsDialog] = useState(
        {
            open: false,
            index: 0
        }   
    );
    
    const handleSingleRemove = index => {
        let carritolist = [...carrito];
        setDisponibles(
            [...disponibles,
            {articulo: carrito[index].articulo,
            cantidad: carrito[index].disponibles,
            valor: carrito[index].valor}
            ]
        )
        setVentasForm({
            ...ventasform,
            totalComprados: ventasform.totalComprados - carrito[index].cantidad,
            totalCompra: ventasform.totalCompra - carrito[index].subtotal,
        })
        carritolist.splice(index, 1);
        setCarrito([...carritolist]);
    }

    const handleClose = () => {
        setShouldOpenDetailsDialog({open: false, index: 0});
      }

    const cantidad = [
    1,
    2,
    3,
    4,
    5,
    ]

    const data = [
        {
          "id": "1613",
          "name": "Campaña 1",
          "description": "Temporary Quality",
          "fechaInicio": "2021/01/03",
          "fechaFinalizacion": "2021/01/31",
          "limite": "10",
        },
        {
          "id": "1222",
          "name": "Campaña 2",
          "description": "description",
          "fechaInicio": "2021/01/13",
          "fechaFinalizacion": "2021/01/28",
          "limite": "5",
        },
    ];

    {data.map((item, index) => {
        if (item.id == idcampaign) {
            indexCampaign = index
        }
    })}

    const [disponibles, setDisponibles] = useState([
        {articulo: "Monitor MSI",
        cantidad: 3,
        valor: 10000},
        {articulo: "Audifonos MSI",
        cantidad: 4,
        valor: 12000,
        },
    ]);

    const [carrito, setCarrito] = useState([]);
    
    const [ventasform, setVentasForm] = useState({
        badge: user.badge,
        fullName: user.fullname,
        personalEmail: user.email,
        personalPhone: user.phone,
        identificationNumber: "",
        provincia: "",
        firstName: "",
        secondName: "",
        fecha: moment(new Date()).format("DD/MM/yyyy"),
        lastName: "",
        campaign: data[indexCampaign].name,
        phone: "",
        candidateEmail: "",
        englishLevel: "English",
        locationPreference: "",
        othersDetails: "",
        candidateProfile: "Profile",
        academicGrade: "Grade",
        isResumeActive: true,
        isResumeRequired: true,
        isExternalreference: true,
        paymentMethod: "Money",
        workType: "",
        resumeUrl: "",
        file: null,
        isEmpty: false,
        totalComprados: 0,
        totalCompra: 0,
        maximo: data[indexCampaign].limite
    });

    const handleFormSubmit = async () => {
        // await dispatch(addRaft(raftform));
    };
    
    const handleChange = (event) => {
        const name = event.target.name;
        setVentasForm({
          ...ventasform,
          [name]: event.target.value,
        });
    };

    const handleChangeCantidad = (index, event) => {
        let carritolist = [...carrito];
        let totalcomprados = ventasform.totalComprados - carrito[index].cantidad;
        let totalcompra = ventasform.totalCompra - carrito[index].subtotal;
        carritolist[index] = {
            articulo: carrito[index].articulo,
            cantidad: event.target.value,
            valor: carrito[index].valor,
            disponibles: carrito[index].disponibles,
            subtotal: event.target.value * carrito[index].valor,
        };
        setCarrito([...carritolist]);
        setVentasForm({
            ...ventasform,
            totalComprados: totalcomprados + event.target.value,
            totalCompra: totalcompra + event.target.value * carrito[index].valor,
        })
    }

    return (
        <div className="m-sm-30">
            { }
            <Card className={classes.formcard} elevation={6}>
                <h4 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">El rebajo de artículos comprados se hará de planilla</h4>
                <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Datos del usuario</h2>
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>                 
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
                        name="fullName"
                        disabled={true}
                        value={ventasform.fullName}
                        validators={["required","maxStringLength:150"]}
                        errorMessages={["Este campo es requerido", "Máximo 150 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="Correo electronico*"
                        onChange={handleChange}
                        type="text"
                        name="personalEmail"
                        value={ventasform.personalEmail}
                        validators={["required", "matchRegexp:^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+(;[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?))*$"]}
                        errorMessages={["Este campo es requerido", "Correo no válido"]} 
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="Telefono*"
                        onChange={handleChange}
                        type="text"
                        name="personalPhone"
                        value={ventasform.personalPhone}
                        validators={["required","isNumber","maxStringLength:8"]}
                        errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 8 carácteres"]}
                    />
                    <SelectValidator 
                        label="Provincia *" 
                        name="provincia"
                        className={classes.textvalidator} 
                        value={ventasform.provincia} 
                        onChange={handleChange} 
                        //validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    >
                        {/* {categoriasDeEstudio.map(categoria => (
                                        <MenuItem key={`categoria-${categoria.id}`} value={categoria.item ? categoria.item : ""}>
                                        {categoria.item || " "}
                                        </MenuItem>
                                    ))} */}
                        <MenuItem key="" value="">
                            Seleccionar
                        </MenuItem>
                    </SelectValidator> 
                    <SelectValidator 
                        label="Cantón *" 
                        name="canton"
                        className={classes.textvalidator} 
                        value={ventasform.paymentMethod} 
                        onChange={handleChange} 
                        disabled={true}
                        //validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    >
                        {/* {categoriasDeEstudio.map(categoria => (
                                        <MenuItem key={`categoria-${categoria.id}`} value={categoria.item ? categoria.item : ""}>
                                        {categoria.item || " "}
                                        </MenuItem>
                                    ))} */}
                        <MenuItem key="" value="">
                            Seleccionar
                        </MenuItem>
                    </SelectValidator> 
                    <SelectValidator 
                        label="Distrito *" 
                        name="distrito"
                        className={classes.textvalidator} 
                        value={ventasform.paymentMethod} 
                        onChange={handleChange} 
                        disabled={true}
                        //validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    >
                        {/* {categoriasDeEstudio.map(categoria => (
                                        <MenuItem key={`categoria-${categoria.id}`} value={categoria.item ? categoria.item : ""}>
                                        {categoria.item || " "}
                                        </MenuItem>
                                    ))} */}
                        <MenuItem key="" value="">
                            Seleccionar
                        </MenuItem>
                    </SelectValidator> 
                    <TextValidator
                        className={classes.textvalidator}
                        label="Dirección Exacta"
                        onChange={handleChange}
                        //disabled={true}
                        type="text"
                        name="lastName"
                        value={ventasform.lastName}
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    />
                    <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Datos de la compra:</h2>
                    <TextValidator
                        className={classes.textvalidator}
                        label="Campaña"
                        onChange={handleChange}
                        disabled={true}
                        type="text"
                        name="campaign"
                        value={ventasform.campaign}
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="Fecha"
                        onChange={handleChange}
                        type="text"
                        name="fecha"
                        value={ventasform.fecha}
                        disabled={true}
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="Notas"
                        onChange={handleChange}
                        type="text"
                        name="candidateEmail"
                        value={ventasform.candidateEmail}
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

                        {disponibles.length == 0 && <p className="px-16">No hay ningun artículo</p>}

                        {disponibles.map((item, index) => {
                        return (
                            <div className="px-16 py-16" key={item.articulo}>
                            <Grid
                                container
                                spacing={2}
                                justify="center"
                                alignItems="center"
                                direction="row"
                            >
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                {item.articulo}
                                </Grid>
                                <Grid item lg={2} md={2} sm={2} xs={2}>
                                {item.cantidad}
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                {item.valor}
                                </Grid>
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                <div className="flex">
                                
                                    <Button
                                    variant="contained"
                                    className="bg-primary"
                                    style={{color: "white"}}
                                    onClick={() => setShouldOpenDetailsDialog({open: true, index: index})}
                                    >
                                    Agregar
                                    </Button>
                                </div>
                                </Grid>
                            </Grid>
                            </div>
                        ); 
                        })} 
                    </Card>

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
                            <div className="px-16 py-16" key={item.articulo}>
                            <Grid
                                container
                                spacing={2}
                                justify="center"
                                alignItems="center"
                                direction="row"
                            >
                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                {item.articulo}
                                </Grid>
                                <Grid item lg={2} md={2} sm={2} xs={2}>
                                <SelectValidator 
                                    //label="Cantidad*" 
                                    name="cantidad"
                                    //className={classes.textvalidator} 
                                    value={item.cantidad} 
                                    onChange={(e) => handleChangeCantidad(index, e)} 
                                    validators={["required"]}
                                    errorMessages={["Este campo es requerido"]}
                                >
                                    {cantidad.map(cantidaditem => (
                                                    (cantidaditem <= item.disponibles) ?
                                                    <MenuItem key={`cantidad-${cantidaditem}`} value={cantidaditem ? cantidaditem : ""}>
                                                    {cantidaditem || " "}
                                                    </MenuItem> : null
                                                ))}
                                </SelectValidator>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                {item.subtotal}
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
                        <Button variant="contained" color="primary" type="submit">
                            ENVIAR
                        </Button>
                    </div>
                </ValidatorForm>
                <Dialog fullWidth maxWidth="md" onClose={handleClose} open={shouldOpenDetailsDialog.open}>
                <DialogTitle  id="customized-dialog-title" onClose={handleClose}>
                Detalles del artículo:
                 </DialogTitle>
                <AgregarDialog type={"agregar"} close={handleClose} ventas={ventasform} setventas={setVentasForm} carrito={carrito} setCarrito={setCarrito} disponibles={disponibles} setDisponibles={setDisponibles} index={shouldOpenDetailsDialog.index} />
                </Dialog>
            </Card>
        </div>
    );
}

export default FormVentas