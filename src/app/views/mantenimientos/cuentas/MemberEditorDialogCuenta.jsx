import React, { Component } from "react";
import axios from "axios";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import {
  getAllProyecto,
  updateCuenta,
  addNewCuenta
} from "../../../redux/actions/MantenimientoActions";
import PropTypes from "prop-types";


class MemberEditorDialogCuenta extends Component {
  state = {
    idProyecto: "",
    idBanco: "",
    numeroCuenta: "",
    cuentaIBAN: "",
    cuentaCliente: "",
    moneda: "",
    debe: "",
    haber: "",
    proyectos: [],
    deshabilitar: false,
    estado: "Guardar"
  };

  handleChange = (event) => {
    event.persist();

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = async () => { 
    this.setState({
      deshabilitar: true,
      estado: "Guardando..."
    });  
    if (this.props.uid.idProyecto == "") {
      await this.props.addNewCuenta({
        ...this.state
      });
    } else {
      await this.props.updateCuenta({
        ...this.state
      });
    } 
    this.props.handleClose();   
  };

  componentWillMount() {
    this.setState({ 
      idProyecto: this.props.uid.idProyecto,
      idBanco: this.props.uid.idBanco,
      numeroCuenta: this.props.uid.numeroCuenta,
      cuentaIBAN: this.props.uid.cuentaIBAN,
      cuentaCliente: this.props.uid.cuentaCliente,
      moneda: this.props.uid.moneda,
      debe: this.props.uid.debe,
      haber: this.props.uid.haber
    })

    this.props.getAllProyecto();
  }

  render() {
    let {
      idProyecto,
      idBanco,
      numeroCuenta,
      cuentaIBAN,
      cuentaCliente,
      moneda,
      debe,
      haber
    } = this.state;
    let { open, handleClose } = this.props;
    let { proyectos = [] } = this.props;
    let editar = true;
    if (this.props.uid.idProyecto==""){editar=false} //sirve para deshabilitar la edición de campos llave en editar

    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="p-24">
          {this.props.uid.idProyecto == "" ? (
            <h4 className="mb-20">Agregar</h4>
          ) : (
            <h4 className="mb-20">Editar</h4>
          )}
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}>
              <Grid item sm={6} xs={12}>
                <FormControl className="w-100 mb-16">
                  <InputLabel id="simple-select">Proyecto *</InputLabel>
                  <Select
                    labelId="simple-select"
                    value={idProyecto}
                    className="w-100 mb-16"
                    name="idProyecto"
                    onChange={this.handleChange}
                    disabled={editar} //si es el cuadro de editar se deshabilita este campo
                  >
                    {proyectos.map(proyecto => (
                      <MenuItem key={proyecto} value={proyecto.idProyecto}>
                        {proyecto.idProyecto}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextValidator
                  className="w-100 mb-16"
                  label="Número cuenta *"
                  onChange={this.handleChange}
                  type="text"
                  name="numeroCuenta"
                  disabled={editar} //si es el cuadro de editar se deshabilita este campo
                  value={numeroCuenta}
                  validators={["required","maxStringLength:25"]}
                  errorMessages={["Este campo es requerido","Máximo 25 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Cuenta cliente"
                  onChange={this.handleChange}
                  type="text"
                  name="cuentaCliente"
                  value={cuentaCliente}
                  validators={["maxStringLength:25"]}
                  errorMessages={["Máximo 25 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Debe"
                  onChange={this.handleChange}
                  type="text"
                  name="debe"
                  value={debe}
                  validators={["maxStringLength:20"]}
                  errorMessages={["Máximo 20 carácteres"]}
                />
                <p></p>
                <div className="w-100 mb-16">
                 <label color="gray"> * Campos obligatorios </label>
                </div>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl className="w-100 mb-16">
                  <TextValidator
                    className="w-100 mb-16"
                    label="Banco *"
                    onChange={this.handleChange}
                    type="text"
                    name="idBanco"
                    disabled={editar} //si es el cuadro de editar se deshabilita este campo
                    value={idBanco}
                    validators={["required","isNumber"]}
                    errorMessages={["Este campo es requerido","Solo se permiten números"]}
                  />
                </FormControl>
                <TextValidator
                  className="w-100 mb-16"
                  label="Cuenta IBAN"
                  onChange={this.handleChange}
                  type="text"
                  name="cuentaIBAN"
                  value={cuentaIBAN}
                  validators={["maxStringLength:25"]}
                  errorMessages={["Máximo 25 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Moneda"
                  onChange={this.handleChange}
                  type="text"
                  name="moneda"
                  value={moneda}
                  validators={["maxStringLength:3"]}
                  errorMessages={["Máximo 3 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Haber"
                  onChange={this.handleChange}
                  type="text"
                  name="haber"
                  value={haber}
                  validators={["maxStringLength:20"]}
                  errorMessages={["Máximo 20 carácteres"]}
                />
              </Grid>
            </Grid>

            <div className="flex flex-space-between flex-middle">
              <Button variant="contained" disabled={this.state.deshabilitar} color="primary" type="submit">
                {this.state.estado}
              </Button>
              <Button onClick={() => this.props.handleClose()}>Cancelar</Button>
            </div>
          </ValidatorForm>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  addNewCuenta: PropTypes.func.isRequired,
  updateCuenta: PropTypes.func.isRequired,
  getAllProyecto: PropTypes.func.isRequired,
  proyectos: state.mantenimientos.proyectos
});

export default connect(
  mapStateToProps,
  { updateCuenta, addNewCuenta, getAllProyecto }
)(MemberEditorDialogCuenta);