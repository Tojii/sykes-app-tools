import React, { Component } from "react";
import axios from "axios";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import {
  updateProveedor,
  addNewProveedor
} from "../../../redux/actions/MantenimientoActions";
import PropTypes from "prop-types";

class MemberEditorDialogProveedor extends Component {
  state = {
    idProveedor: "",
    descripcionProveedor: "",
    cedulaJuricica: "",
    pais: "",
    provincia: "",
    canton: "",
    distrito: "",
    direccion: "",
    telefonoPrincipal: "",
    telefonoSecundario: "",
    correoElectronico: "",
    idBanco: "",
    numeroCuenta: "",
    moneda: "",
    contacto: "",
    activo: true,
    deshabilitar: false,
    estado: "Guardar"
  };

  handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      this.setState({ activo: event.target.checked });
      return;
    }

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = async () => { 
    this.setState({
      deshabilitar: true,
      estado: "Guardando..."
    });  
    if (this.props.uid.idProveedor == "") {
      await this.props.addNewProveedor({
        ...this.state
      });
    } else {
      await this.props.updateProveedor({
        ...this.state
      });
    } 
    this.props.handleClose();   
  };

  componentWillMount() {
    this.setState({ 
      idProveedor: this.props.uid.idProveedor,
      descripcionProveedor: this.props.uid.descripcionProveedor,
      cedulaJuricica: this.props.uid.cedulaJuricica,
      pais: this.props.uid.pais,
      provincia: this.props.uid.provincia,
      canton: this.props.uid.canton,
      distrito: this.props.uid.distrito,
      direccion: this.props.uid.direccion,
      telefonoPrincipal: this.props.uid.telefonoPrincipal,
      telefonoSecundario: this.props.uid.telefonoSecundario,
      correoElectronico: this.props.uid.correoElectronico,
      idBanco: this.props.uid.idBanco,
      numeroCuenta: this.props.uid.numeroCuenta,
      moneda: this.props.uid.moneda,
      contacto: this.props.uid.contacto,
      activo: this.props.uid.activo
    })
  }

  render() {
    let {
      idProveedor,
      descripcionProveedor,
      cedulaJuricica,
      pais,
      provincia,
      canton,
      distrito,
      direccion,
      telefonoPrincipal,
      telefonoSecundario,
      correoElectronico,
      idBanco,
      numeroCuenta,
      moneda,
      contacto,
      activo
    } = this.state;
    let { open, handleClose } = this.props;
    let editar = true;
    if (this.props.uid.idProveedor==""){editar=false} //sirve para deshabilitar la edición de campos llave en editar

    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="p-24">
          {this.props.uid.idProveedor == "" ? (
            <h4 className="mb-20">Agregar</h4>
          ) : (
            <h4 className="mb-20">Editar</h4>
          )}
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label="Código *"
                  onChange={this.handleChange}
                  type="texxt"
                  disabled={editar} //si es el cuadro de editar se deshabilita este campo
                  name="idProveedor"
                  value={idProveedor}
                  validators={["required","isNumber"]}
                  errorMessages={["Este campo es requerido","Solo se permiten números"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Cédula jurídica"
                  onChange={this.handleChange}
                  type="text"
                  name="cedulaJuricica"
                  value={cedulaJuricica}
                  validators={["maxStringLength:50"]}
                  errorMessages={["Máximo 50 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Provincia"
                  onChange={this.handleChange}
                  type="text"
                  name="provincia"
                  value={provincia}
                  validators={["isNumber"]}
                  errorMessages={["Solo se permiten números"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Distrito"
                  onChange={this.handleChange}
                  type="text"
                  name="distrito"
                  value={distrito}
                  validators={["isNumber"]}
                  errorMessages={["Solo se permiten números"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Teléfono principal"
                  onChange={this.handleChange}
                  type="tel"
                  name="telefonoPrincipal"
                  value={telefonoPrincipal}
                  validators={["isNumber","maxStringLength:15"]}
                  errorMessages={["Solo se permiten números","Máximo 15 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Correo"
                  onChange={this.handleChange}
                  type="text"
                  name="correoElectronico"
                  value={correoElectronico}
                  validators={["matchRegexp:^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+(;[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?))*$","maxStringLength:100"]}
                  errorMessages={["Email no válido","Máximo 100 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Número cuenta"
                  onChange={this.handleChange}
                  type="text"
                  name="numeroCuenta"
                  value={numeroCuenta}
                  validators={["maxStringLength:20"]}
                  errorMessages={["Máximo 20 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Contacto"
                  onChange={this.handleChange}
                  type="text"
                  name="contacto"
                  value={contacto}
                  validators={["maxStringLength:200"]}
                  errorMessages={["Máximo 200 carácteres"]}
                />
                <p></p>
                <div className="w-100 mb-16">
                 <label color="gray"> * Campos obligatorios </label>
                </div>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label="Descripción"
                  onChange={this.handleChange}
                  type="text"
                  name="descripcionProveedor"
                  value={descripcionProveedor}
                  validators={["maxStringLength:50"]}
                  errorMessages={["Máximo 50 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="País"
                  onChange={this.handleChange}
                  type="text"
                  name="pais"
                  value={pais}
                  validators={["isNumber"]}
                  errorMessages={["Solo se permiten números"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Cantón"
                  onChange={this.handleChange}
                  type="text"
                  name="canton"
                  value={canton}
                  validators={["isNumber"]}
                  errorMessages={["Solo se permiten números"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Dirección"
                  onChange={this.handleChange}
                  type="text"
                  name="direccion"
                  value={direccion}
                  validators={["maxStringLength:300"]}
                  errorMessages={["Máximo 300 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Teléfono secundario"
                  onChange={this.handleChange}
                  type="tel"
                  name="telefonoSecundario"
                  value={telefonoSecundario}
                  validators={["isNumber","maxStringLength:15"]}
                  errorMessages={["Solo se permiten números","Máximo 15 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Banco"
                  onChange={this.handleChange}
                  type="text"
                  name="idBanco"
                  value={idBanco}
                  validators={["isNumber"]}
                  errorMessages={["Solo se permiten números"]}
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
                <FormControlLabel
                  className="my-20"
                  label="Activo"
                  control={
                    <Switch
                      checked={activo}
                      onChange={event => this.handleChange(event, "switch")}
                    />
                  }
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

const mapStateToProps = () => ({
  addNewProveedor: PropTypes.func.isRequired,
  updateProveedor: PropTypes.func.isRequired,
});

export default connect(
  mapStateToProps,
  { updateProveedor, addNewProveedor }
)(MemberEditorDialogProveedor);
