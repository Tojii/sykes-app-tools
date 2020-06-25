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
  updateProyecto,
  addNewProyecto
} from "../../../redux/actions/MantenimientoActions";
import PropTypes from "prop-types";

class MemberEditorDialogProyecto extends Component {
  state = {
    idProyecto: "",
    descripcionProyecto: "",
    cedulaJuricica: "",
    pais: "",
    provincia: "",
    canton: "",
    distrito: "",
    direccion: "",
    telefonoPrincipal: "",
    telefonoSecundario: "",
    telefonoSeguridad: "",
    correoElectronico: "",
    cantidadDomicilios: "",
    textoRecibos: "",
    textoEstadoCuenta: "",
    comentario: "",
    iva: "",
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
      await this.props.addNewProyecto({
        ...this.state
      });
    } else {
      await this.props.updateProyecto({
        ...this.state
      });
    } 
    this.props.handleClose();   
  };

  componentWillMount() {
    this.setState({ 
      idProyecto: this.props.uid.idProyecto,
      descripcionProyecto: this.props.uid.descripcionProyecto,
      cedulaJuricica: this.props.uid.cedulaJuricica,
      pais: this.props.uid.pais,
      provincia: this.props.uid.provincia,
      canton: this.props.uid.canton,
      distrito: this.props.uid.distrito,
      direccion: this.props.uid.direccion,
      telefonoPrincipal: this.props.uid.telefonoPrincipal,
      telefonoSecundario: this.props.uid.telefonoSecundario,
      telefonoSeguridad: this.props.uid.telefonoSeguridad,
      correoElectronico: this.props.uid.correoElectronico,
      cantidadDomicilios: this.props.uid.cantidadDomicilios,
      textoRecibos: this.props.uid.textoRecibos,
      textoEstadoCuenta: this.props.uid.textoEstadoCuenta,
      comentario: this.props.uid.comentario,
      iva: this.props.uid.iva
    })
  }

  render() {
    let {
      idProyecto,
      descripcionProyecto,
      cedulaJuricica,
      pais,
      provincia,
      canton,
      distrito,
      direccion,
      telefonoPrincipal,
      telefonoSecundario,
      telefonoSeguridad,
      correoElectronico,
      cantidadDomicilios,
      textoRecibos,
      textoEstadoCuenta,
      comentario,
      iva
    } = this.state;
    let { open, handleClose } = this.props;
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
                <TextValidator
                  className="w-100 mb-16"
                  label="Código *"
                  onChange={this.handleChange}
                  type="text"
                  disabled={editar} //si es el cuadro de editar se deshabilita este campo
                  name="idProyecto"
                  value={idProyecto}
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
                  label="Teléfono seguridad"
                  onChange={this.handleChange}
                  type="tel"
                  name="telefonoSeguridad"
                  value={telefonoSeguridad}
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
                  validators={["matchRegexp:^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+(;[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?))*$","maxStringLength:300"]}
                  errorMessages={["Email no válido","Máximo 300 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Texto recibos"
                  onChange={this.handleChange}
                  type="text"
                  name="textoRecibos"
                  value={textoRecibos}
                  validators={["maxStringLength:500"]}
                  errorMessages={["Máximo 500 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Comentario"
                  onChange={this.handleChange}
                  type="text"
                  name="comentario"
                  value={comentario}
                  validators={["maxStringLength:500"]}
                  errorMessages={["Máximo 500 carácteres"]}
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
                  name="descripcionProyecto"
                  value={descripcionProyecto}
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
                  label="Cantidad domicilios"
                  onChange={this.handleChange}
                  type="text"
                  name="cantidadDomicilios"
                  value={cantidadDomicilios}
                  validators={["isNumber"]}
                  errorMessages={["Solo se permiten números"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Texto estado cuenta"
                  onChange={this.handleChange}
                  type="text"
                  name="textoEstadoCuenta"
                  value={textoEstadoCuenta}
                  validators={["maxStringLength:500"]}
                  errorMessages={["Máximo 500 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="IVA"
                  onChange={this.handleChange}
                  type="text"
                  name="iva"
                  value={iva}
                  validators={["isNumber"]}
                  errorMessages={["Solo se permiten números"]}
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
  addNewProyecto: PropTypes.func.isRequired,
  updateProyecto: PropTypes.func.isRequired,
});

export default connect(
  mapStateToProps,
  { updateProyecto, addNewProyecto }
)(MemberEditorDialogProyecto);
