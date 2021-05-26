import React, { useState, Component, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Grid, 
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  IconButton
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AgregarDialog from './AgregarArticulo'
import { GetOrderById } from "../../../redux/actions/OrderActions";
import history from "history.js";
import { useParams } from "react-router";
import moment from "moment";
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles({
    cardcarrito: {     
        marginLeft: "3%",
        width: "96%",
        marginTop: "3%",
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
    cellspace:{
        whiteSpace: "unset",
    },
    break:{
        wordBreak: "break-word"
    }
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

const CompraDetalle = (props) => {
    
    const order = useSelector(state => state.order.order);
    const isLoading  = useSelector(state => state.order.loading);
    const dispatch = useDispatch();
    const classes = useStyles();
    let { id } = useParams();
    const SPACED_DATE_FORMAT = "DD/MM/YYYY";
    const [shouldOpenDetailsDialog, setShouldOpenDetailsDialog] = useState(
        {
            open: false,
            index: 0,
        }   
    );

    useEffect(() => {
        dispatch(GetOrderById(id));
    }, []);
    
    const handleClose = () => {
        setShouldOpenDetailsDialog({open: false, index: 0});
      }

    const handleBack = () => {
        if (history.location.prev) { 
            history.push(history.location.prev);
        } else {
            history.push("/Ventas/Home");
        }
    }

    return (
        <div className="m-sm-30">
            {(isLoading) ? <Loading/> : 
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}> 
                    <Card className={classes.formcard} elevation={6}>                              
                            <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Datos del usuario:</h2>
                             <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Badge:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].badge }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Nombre:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].name }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Correo electronico:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].email }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Telefono:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].phone }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Método de entrega:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].sendMethod }</TableCell>
                                    </TableRow>
                                    {order[0] != undefined && order[0].sendMethod == "Envío a la casa" && <TableRow>
                                        <TableCell colSpan={3} width={"70%"} className="px-sm-24"><Alert style={{marginTop:"10px"}} severity="info" >{order[0] ? order[0].campaign.shippingMessage : ""}</Alert> </TableCell>
                                    </TableRow>}
                                    {(order[0] != undefined && order[0].sendMethod == "Envío a la casa") ? <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Provincia:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].province }</TableCell>
                                    </TableRow> : null}
                                    {(order[0] != undefined && order[0].sendMethod == "Envío a la casa") ? <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Cantón:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].canton }</TableCell>
                                    </TableRow> : null}
                                    {(order[0] != undefined && order[0].sendMethod == "Envío a la casa") ? <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Distrito:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].district }</TableCell>
                                    </TableRow> : null}
                                    {(order[0] != undefined && order[0].sendMethod == "Envío a la casa") ? <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Dirección exacta:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].address }</TableCell>
                                    </TableRow> : null}
                                    {(order[0] != undefined && order[0].sendMethod == "Recoger en edificio") ? <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Edificio:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].building.name }</TableCell>
                                    </TableRow> : null}
                                </TableBody>
                            </Table>
                            <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Datos de la compra:</h2>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Campaña:</h6></TableCell>
                                        <TableCell width={"70%"} className="px-sm-24">{ order[0] == undefined ? "" : order[0].campaign.name }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Fecha:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ (order[0] != null && order[0] != undefined && order[0].createdDate != "") ? moment(new Date(order[0].createdDate)).format(SPACED_DATE_FORMAT) : "" }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Notas:</h6></TableCell>
                                        <TableCell width={"70%"} className="px-sm-24">{ order[0] == undefined ? "" : order[0].notes }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Total articulos comprados:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].totalItems }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Total Compra:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : "₡" + parseFloat(order[0].total).toFixed(2) }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={3} className="px-sm-24 border-none">
                                        {<h5 className={classes.cardcarrito}>Articulos añadidos a la compra:</h5>}
                                        <Card className={classes.cardcarrito} elevation={2}>
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

                                            {(order[0] == undefined || order[0].detail == undefined || order[0].detail.length == 0) && <p className="px-16">No hay ningun artículo</p>}

                                            {(order[0] != undefined && order[0].detail != undefined) ? order[0].detail.map((item, index) => {
                                            return ( 
                                                <div className="px-16 py-16" key={item.item.id}>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                    justify="center"
                                                    alignItems="center"
                                                    direction="row"
                                                >
                                                    <Grid className={classes.break} item lg={3} md={3} sm={3} xs={3}>
                                                    {item.itemName}
                                                    </Grid>
                                                    <Grid className={classes.break} item lg={2} md={2} sm={2} xs={2}>
                                                    {item.amount}
                                                    </Grid>
                                                    <Grid className={classes.break} item lg={4} md={4} sm={4} xs={4}>
                                                    ₡ {parseFloat(item.subTotal).toFixed(2)}
                                                    </Grid>
                                                    <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <div className="flex">
                                                    
                                                        <Button
                                                        variant="contained"
                                                        className="bg-primary"
                                                        style={{color: "white"}}
                                                        onClick={() => setShouldOpenDetailsDialog({open: true, id: item.item.id, index: index})}
                                                        >
                                                        Detalles
                                                        </Button>
                                                    </div>
                                                    </Grid>
                                                </Grid>
                                                </div>
                                            ); 
                                            })
                                            : null }
                                        </Card>
                                        <br/>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>   
                            <div className={classes.sectionbutton}>
                                <Button variant="contained" onClick={handleBack} color="primary">
                                    VOLVER
                                </Button>
                            </div>
                            <Dialog fullWidth maxWidth="md" onClose={handleClose} open={shouldOpenDetailsDialog.open}>
                                <DialogTitle  id="customized-dialog-title" onClose={handleClose}>
                                Detalles del artículo:
                                </DialogTitle>
                                <AgregarDialog type={"detalles"} close={handleClose}  order={(order[0] != undefined && order[0].detail != undefined) ? order[0].detail : [{}]} id={shouldOpenDetailsDialog.id} index={shouldOpenDetailsDialog.index} />
                            </Dialog>  
                    </Card>
                </Grid>
          </Grid>}
        </div>
    );
}

export default CompraDetalle