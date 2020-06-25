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
  updateGasto,
  addNewGasto
} from "../../../redux/actions/MantenimientoActions";
import PropTypes from "prop-types";

class MemberEditorDialogMaestroGasto extends Component {
  state = {
    idGasto: "",
    nombreGasto: "",
    debe: "",
    haber: "",
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
    if (this.props.uid.idGasto == "") {
      await this.props.addNewGasto({
        ...this.state
      });
    } else {
      await this.props.updateGasto({
        ...this.state
      });
    } 
    this.props.handleClose();   
  };

  componentWillMount() {
    this.setState({ 
      idGasto: this.props.uid.idGasto,
      nombreGasto: this.props.uid.nombreGasto,
      debe: this.props.uid.debe,
      haber: this.props.uid.haber
    })
  }

  render() {
    let {
      idGasto,
      nombreGasto,
      debe,
      haber
    } = this.state;
    let { open, handleClose } = this.props;
    let editar = true;
    if (this.props.uid.idGasto==""){editar=false} //sirve para deshabilitar la edición de campos llave en editar

    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="p-24">
          {this.props.uid.idGasto == "" ? (
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
                  name="idGasto"
                  disabled={editar} //si es el cuadro de editar se deshabilita este campo
                  value={idGasto}
                  validators={["required","isNumber"]}
                  errorMessages={["Este campo es requerido","Solo se permiten números"]}
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
                <TextValidator
                  className="w-100 mb-16"
                  label="Nombre gasto"
                  onChange={this.handleChange}
                  type="text"
                  name="nombreGasto"
                  value={nombreGasto}
                  validators={["maxStringLength:50"]}
                  errorMessages={["Máximo 50 carácteres"]}
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

const mapStateToProps = () => ({
  addNewGasto: PropTypes.func.isRequired,
  updateGasto: PropTypes.func.isRequired,
});

export default connect(
  mapStateToProps,
  { updateGasto, addNewGasto }
)(MemberEditorDialogMaestroGasto);