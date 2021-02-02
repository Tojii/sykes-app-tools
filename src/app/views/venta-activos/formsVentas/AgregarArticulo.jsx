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
import {
    GetImages
} from "../../../redux/actions/CommonActions";


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
            marginLeft: "25%",
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
});

const AgregarArticulo = (props) => {
    
    const image = useSelector(state => state.common.images);
    const disponibles = props.disponibles[props.index];
    const [cantidadArticulo, setCantidadArticulo] = useState(1);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetImages());
        handleCantidad();
    }, []);

    const cantidad = [];

    const handleCantidad = () => {
        let i;
        if (disponibles != undefined) {
            for (i = 1; i <= disponibles.cantidad; i++) {
                cantidad.push(i);
            }
        } 
        console.log("cantidad", cantidad)
    }

    const handleFormSubmit = async () => {
        if(props.ventas.maximo < props.ventas.totalComprados + cantidadArticulo) {
            console.log("se sobrepasa el limite")
        } else { 
            props.setCarrito(
                [ 
                    ...props.carrito,
                    {articulo: disponibles.articulo,
                    cantidad: cantidadArticulo,
                    valor: disponibles.valor,
                    disponibles: disponibles.cantidad,
                    subtotal: cantidadArticulo * disponibles.valor,
                },    
            ]);

            props.setventas({
                ...props.ventas,
                totalComprados: props.ventas.totalComprados + cantidadArticulo,
                totalCompra: props.ventas.totalCompra + cantidadArticulo * disponibles.valor,
            });

            props.close();

            let disponibleslist = [...props.disponibles];
            disponibleslist.splice(props.index, 1);
            props.setDisponibles([...disponibleslist]);
        }
    };
    
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
                                                
                            {/* <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Detalle del artículo:</h2> */}
                            { image[0] == undefined ? <Loading /> : <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={"25%"} className="pl-sm-24 border-none"><h6>Artículo:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ disponibles == undefined ? "" : disponibles.articulo }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"50%"} className="pl-sm-24 border-none"><h6>Descripción del Artículo:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ "descripcion" }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={3} className="px-sm-24 border-none">
                                       
                                            <img
                                            height={"515px"}
                                            width={"390px"}
                                            className={classes.imageadd}                                          
                                            alt="..."
                                            src={`data:image/png;base64,${image[0].content}`}
                                            />
                                        
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"25%"} className="pl-sm-24 border-none"><h6>Valor del artículo:</h6></TableCell>
                                        <TableCell className="px-sm-24 border-none">{ disponibles == undefined ? "" : disponibles.valor }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"25%"} className="pl-sm-24 border-none"><h6>Cantidad:</h6></TableCell>
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
                                        : <TableCell className="px-sm-24 border-none">{ disponibles.cantidad }</TableCell>}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"25%"} className="pl-sm-24 border-none"> <h6>Subtotal:</h6> </TableCell>
                                        { props.type == "agregar" ?
                                            <TableCell className="px-sm-24 border-none">{disponibles == undefined ? "" : cantidadArticulo * disponibles.valor}</TableCell>
                                            : <TableCell className="px-sm-24 border-none">{disponibles == undefined ? "" : disponibles.cantidad * disponibles.valor}</TableCell>
                                        }
                                    </TableRow>
                                </TableBody>
                            </Table>}
                      
                            <div className={classes.sectionbutton}>
                                <Button variant="contained" color="primary" style={{display: (image[0] == undefined || props.type == "detalles") ? "none" : null}} type="submit">
                                    AGREGAR
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