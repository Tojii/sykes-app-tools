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
  updatePrevision,
  addNewPrevision
} from "../../../redux/actions/MantenimientoActions";
import PropTypes from "prop-types";

class MemberEditorDialogPrevision extends Component {
  state = {
    idPrevision: "",
    nombrePrevision: "",
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
    if (this.props.uid.idPrevision == "") {
      await this.props.addNewPrevision({
        ...this.state
      });
    } else {
      await this.props.updatePrevision({
        ...this.state
      });
    } 
    this.props.handleClose();   
  };

  componentWillMount() {
    this.setState({ 
      idPrevision: this.props.uid.idPrevision,
      nombrePrevision: this.props.uid.nombrePrevision,
      debe: this.props.uid.debe,
      haber: this.props.uid.haber
    })
  }

  render() {
    let {
      idPrevision,
      nombrePrevision,
      debe,
      haber
    } = this.state;
    let { open, handleClose } = this.props;
    let editar = true;
    if (this.props.uid.idPrevision==""){editar=false} //sirve para deshabilitar la edición de campos llave en editar

    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="p-24">
          {this.props.uid.idPrevision == "" ? (
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
                  name="idPrevision"
                  disabled={editar} //si es el cuadro de editar se deshabilita este campo
                  value={idPrevision}
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
                  label="Nombre previsión *"
                  onChange={this.handleChange}
                  type="text"
                  name="nombrePrevision"
                  value={nombrePrevision}
                  validators={["required","maxStringLength:50"]}
                  errorMessages={["Este campo es requerido","Máximo 50 carácteres"]}
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
  addNewPrevision: PropTypes.func.isRequired,
  updatePrevision: PropTypes.func.isRequired,
});

export default connect(
  mapStateToProps,
  { updatePrevision, addNewPrevision }
)(MemberEditorDialogPrevision);