import React, { useState, Component, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Grid, 
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import {addRaft} from "../../../redux/actions/RaftActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import { GetCampaignItemsById } from "../../../redux/actions/CampaignActions";


const useStyles = makeStyles({
    textvalidator: {     
        "@media (min-width: 0px)": {
            marginLeft: "0%",
            width: "50%",
            marginTop: "3%",
        },
        "@media (min-width: 1024px)": {
            marginLeft: "0%",
            width: "25%",
            marginTop: "3%",
        },
    },
    imageadd: {          
        "@media (min-width: 0px)": {
            marginLeft: "0%",
        },
        "@media (min-width: 1024px)": {
            marginLeft: "0%",
        },
        marginTop: "3%",
        margin: "auto"
    },
    formcard: {
        marginLeft: "0%",
        width: "100%",
    },
    sectionbutton: {
        marginLeft: "25%",
        width: "50%",
        marginTop: "3%",
        marginBottom: "2%",
        textAlign: "center"
    },
    sectionimage: {
        marginLeft: "25%",
        width: "50%",
        marginTop: "3%",
        marginBottom: "2%",
    },
    cellspace:{
        whiteSpace: "unset",
    }
});

const AgregarArticulo = (props) => {
    
    const campaignItems = useSelector(state => state.campaign.campaignitem);
    const detail = props.order[props.index] != undefined ? props.order[props.index] : [{}];
    const isLoading  = useSelector(state => state.campaign.loading);
    const max = props.type == "agregar" ? props.ventas.maximo - props.ventas.totalComprados : 0;
    const cantComprada = props.type == "agregar" && props.purchases[0] != undefined ? props.purchases[0].items[props.index].totalPurchasedItems : 0
    //const cantCompradaArticulo = props.type == "agregar" && props.purchases[0] != undefined ? props.purchases[0].items[props.index].totalPurchasedItems : 0
    const cantCompradaAnterior = props.type == "agregar" && props.purchases[0] != undefined ? props.purchases[0].allowedPendingPurchaseItems - props.ventas.totalComprados : 0
    const [cantidadArticulo, setCantidadArticulo] = useState(1);
    const [disableAgregar, setDisableAgregar] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetCampaignItemsById(props.id));
        handleCantidad();
    }, []);

    const cantidad = [];

    const handleCantidad = () => {
        let i;
        if (campaignItems[0] != undefined) {
            for (i = 1; i <= (campaignItems[0].maxLimitPerPerson - cantComprada) && i <= campaignItems[0].stockQuantity && i <= max && i <= cantCompradaAnterior ; i++) {
                cantidad.push(i);
            }
        } 
    }

    const handleFormSubmit = async () => {
        setDisableAgregar(true);
        if(props.ventas.maximo < props.ventas.totalComprados + cantidadArticulo) {
            //console.log("se sobrepasa el limite")
        } else { 
            if (!props.indexlist.includes(props.id)) {
                props.setCarrito(
                    [ 
                        ...props.carrito,
                        {id: campaignItems[0].id,
                        name: campaignItems[0].name,
                        buyquantity: cantidadArticulo,
                        unitPrice: campaignItems[0].unitPrice,
                        quantity: campaignItems[0].quantity,
                        subtotal: cantidadArticulo * campaignItems[0].unitPrice,
                        maxLimitPerPerson: campaignItems[0].maxLimitPerPerson - cantComprada,
                        stockQuantity: campaignItems[0].stockQuantity,
                        limiteActual: props.ventas.maximo - props.ventas.totalComprados + cantidadArticulo,
                        image: campaignItems[0].image
                    },    
                ]);

                props.setventas({
                    ...props.ventas,
                    totalComprados: props.ventas.totalComprados + cantidadArticulo,
                    totalCompra: props.ventas.totalCompra + cantidadArticulo * campaignItems[0].unitPrice,
                });

                props.close();

                props.setIndex([...props.indexlist, props.id])
            }
        }
    };
    
    const presave = () => {
        //setDisableAgregar(true);
    }

    const handleChange = (event) => {
        setCantidadArticulo( 
            event.target.value,
        );
    };

    return (
        <div className="m-sm-30">
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}> 
                    <Card className={classes.formcard} elevation={6}>
                        <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>                 
                            { campaignItems[0] == undefined ? <Loading /> : <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={"25%"} className={classes.cellspace + " pl-sm-24 border-none"}><h6>Artículo:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ campaignItems[0] == undefined ? "" : campaignItems[0].name }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"50%"} className={classes.cellspace + " pl-sm-24 border-none"}><h6>Descripción del Artículo:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ campaignItems[0] == undefined ? "" : campaignItems[0].description }</TableCell>
                                    </TableRow>
                                    {campaignItems[0].image != null ?
                                    <TableRow>
                                        <TableCell colSpan={3} className="px-sm-24 border-none">
                                            <div className={classes.sectionimage}>
                                                <img
                                                //height={"515px"}
                                                //width={"390px"}
                                                className={classes.imageadd}                                          
                                                alt="..."
                                                src={`${campaignItems[0].image}`}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow> : null
                                    }
                                    <TableRow>
                                        <TableCell width={"25%"} className={classes.cellspace + " pl-sm-24 border-none"}><h6>Valor del artículo:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ campaignItems[0] == undefined ? "" : "₡" + campaignItems[0].unitPrice }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"25%"} className={classes.cellspace + " pl-sm-24 border-none"}><h6>Cantidad:</h6></TableCell>
                                        { props.type == "agregar" ? <TableCell className="px-sm-24 border-none">
                                            <SelectValidator  
                                                name="cantidad"
                                                className={classes.textvalidator} 
                                                value={cantidadArticulo} 
                                                onChange={handleChange} 
                                                validators={["required"]}
                                                errorMessages={["Este campo es requerido"]}
                                            >
                                                {handleCantidad()}
                                                {cantidad.map(categoria => (
                                                                <MenuItem key={`categoria-${categoria}`} value={categoria ? categoria : ""}>
                                                                {categoria || " "}
                                                                </MenuItem>
                                                            ))}
                                            </SelectValidator> 
                                        </TableCell>
                                        : <TableCell className="px-sm-24 border-none">{ detail.amount }</TableCell>}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"25%"} className={classes.cellspace + " pl-sm-24 border-none"}> <h6>Subtotal:</h6> </TableCell>
                                        { props.type == "agregar" ?
                                            <TableCell className="px-sm-24 border-none">{campaignItems[0] == undefined ? "" : "₡" + cantidadArticulo * campaignItems[0].unitPrice}</TableCell>
                                            : <TableCell className="px-sm-24 border-none">{detail == undefined ? "" : "₡" + detail.subTotal}</TableCell>
                                        }
                                    </TableRow>
                                </TableBody>
                            </Table>}
                      
                            <div className={classes.sectionbutton}>
                                <Button variant="contained" color="primary" onClick={presave} disabled={disableAgregar} style={{margin: "1%", width: "105.92px", display: (campaignItems[0] == undefined || props.type == "detalles") ? "none" : null}} type="submit">
                                    AGREGAR
                                </Button>
                                <Button variant="contained" style={{margin: "1%", display: (campaignItems[0] == undefined || props.order == undefined)? "none" : null}} onClick={props.close} color="default">
                                    {props.type == "detalles" ? "VOLVER" : "CANCELAR"}
                                </Button>
                            </div> 
                        </ValidatorForm>
                    </Card>
                </Grid>
          </Grid>
        </div>
    );
}

export default AgregarArticulo