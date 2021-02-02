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
import history from "history.js";


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
    
    // const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [shouldOpenDetailsDialog, setShouldOpenDetailsDialog] = useState(
        {
            open: false,
            index: 0
        }   
    );

    useEffect(() => {
        // dispatch(GetImages());
    }, []);

    const handleClose = () => {
        setShouldOpenDetailsDialog({open: false, index: 0});
      }

    const handleBack = () => {
        history.push(`/VentasHome`);
    }

    const disponibles = [
        {articulo: "Monitor MSI",
        cantidad: 5,
        valor: 10000},
        {articulo: "Audifonos MSI",
        cantidad: 4,
        valor: 12000},
    ]

    return (
        <div className="m-sm-30">
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}> 
                    <Card className={classes.formcard} elevation={6}>                              
                            <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Datos del usuario:</h2>
                             {/* {image[0] == undefined ? <Loading /> :  */}
                             <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"><h6>Badge:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ "Badge"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"><h6>Nombre:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ "descripcion" }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"><h6>Correo electronico:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ "correo" }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"> <h6>Telefono:</h6> </TableCell>
                                        <TableCell className="px-sm-24 border-none">{"88888888"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"> <h6>Provincia:</h6> </TableCell>
                                        <TableCell className="px-sm-24 border-none">{"provincia"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"> <h6>Cantón:</h6> </TableCell>
                                        <TableCell className="px-sm-24 border-none">{"canton"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"> <h6>Distrito:</h6> </TableCell>
                                        <TableCell className="px-sm-24 border-none">{"distrito"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"> <h6>Dirección exacta:</h6> </TableCell>
                                        <TableCell className="px-sm-24 border-none">{"distrito"}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Datos de la compra:</h2>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"><h6>Campaña:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ "Campaña"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"><h6>Fecha:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ "Fecha" }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"><h6>Notas:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ "Notas" }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={3}>
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
                                                        Detalles
                                                        </Button>
                                                    </div>
                                                    </Grid>
                                                </Grid>
                                                </div>
                                            ); 
                                            })}  
                                        </Card>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"> <h6>Total articulos comprados:</h6> </TableCell>
                                        <TableCell className="px-sm-24 border-none">{"5"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className="pl-sm-24 border-none"> <h6>Total Compra:</h6> </TableCell>
                                        <TableCell className="px-sm-24 border-none">{"12300000"}</TableCell>
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
                                <AgregarDialog type={"detalles"} close={handleClose}  disponibles={disponibles} index={shouldOpenDetailsDialog.index} />
                            </Dialog>  
                    </Card>
                </Grid>
          </Grid>
        </div>
    );
}

export default CompraDetalle