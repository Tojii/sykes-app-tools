import React, { useState, Component, useRef } from "react";
import {
  Button,
  Card
} from "@material-ui/core";
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
import {addRaft} from "../../../redux/actions/RaftActions";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";

const useStyles = makeStyles({
    textvalidator: {
      marginLeft: "25%",
      width: "50%",
      marginTop: "3%",
    },
    formcard: {
      marginLeft: "25%",
      width: "50%",
    },
    sectionbutton: {
        marginLeft: "25%",
        width: "50%",
        marginTop: "3%",
        marginBottom: "2%",
        textAlign: "center"
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
    
    const [inventarioform, setInventarioForm] = useState({
        nombre: "",
        description: "",
        inventarioinicial: "",
        existencias: "",
        valorarticulo: "",
        maximoarticulo: "",
    });
    const classes = useStyles();

    const handleFormSubmit = async () => {
        //await dispatch(addRaft(raftform));
    };
    
    const handleChange = (event) => {
        const name = event.target.name;
        setInventarioForm({
          ...inventarioform,
          [name]: event.target.value,
        });
    };

    return (
        <div className="p-24">
            {console.log(inventarioform)}
            <Card className={classes.formcard} elevation={6}>
                <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">{id ? "Editar" : "Agregar"}</h2>
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>                 
                    <TextValidator
                        className={classes.textvalidator}
                        label="Nombre Artículo*"
                        onChange={handleChange}
                        type="text"
                        name="nombre"
                        value={inventarioform.nombre}
                        validators={["required","maxStringLength:5"]}
                        errorMessages={["Este campo es requerido", "Máximo 5 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="Descripción Artículo*"
                        onChange={handleChange}
                        type="text"
                        name="description"
                        value={inventarioform.description}
                        validators={["required","maxStringLength:150"]}
                        errorMessages={["Este campo es requerido", "Máximo 150 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="Inventario Inicial*"
                        onChange={handleChange}
                        type="number"
                        name="inventarioinicial"
                        //disabled={true}
                        value={inventarioform.inventarioinicial}
                        validators={["required","isNumber","maxStringLength:15"]}
                        errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 15 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="Existencias*"
                        onChange={handleChange}
                        type="number"
                        name="existencias"
                        value={inventarioform.existencias}
                        validators={["required","isNumber","maxStringLength:15"]}
                        errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 15 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="Valor Artículo*"
                        onChange={handleChange}
                        type="number"
                        name="valorarticulo"
                        value={inventarioform.valorarticulo}
                        validators={["required","isNumber","maxStringLength:15"]}
                        errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 15 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="Límite Máximo Artículo*"
                        onChange={handleChange}
                        type="number"
                        name="maximoarticulo"
                        value={inventarioform.maximoarticulo}
                        validators={["required","isNumber","maxStringLength:15"]}
                        errorMessages={["Este campo es requerido","Solo se permiten números", "Máximo 15 carácteres"]}
                    />
                    <FormControl className={classes.textvalidator}>
                        <label className={classes.filelabel} id="Resume">Imagen Artículo (applicable formats: .png) (Max 2MB)*</label>
                        <Input type="file" name="resume" accept="image"/>                                 
                    </FormControl> 
                   
                    <div className={classes.sectionbutton}>
                        <Button variant="contained" color="primary" type="submit">
                            ENVIAR
                        </Button>
                    </div>
                </ValidatorForm>
            </Card>
        </div>
    );
}

export default FormAdminInventario