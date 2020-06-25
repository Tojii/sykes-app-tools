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
  updateDomicilio,
  addNewDomicilio
} from "../../../redux/actions/MantenimientoActions";
import PropTypes from "prop-types";

class MemberEditorDialogDomicilio extends Component {
  state = {  
      idProyecto: "",
      codigoDomicilio: "",
      estatusPropiaAlquiler: "",
      alicuota: "",
      nota: "",
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
      await this.props.addNewDomicilio({
        ...this.state
      });
    } else {
      await this.props.updateDomicilio({
        ...this.state
      });
    } 
    this.props.handleClose();   
  };

  componentWillMount() {
    this.setState({ 
      idProyecto: this.props.uid.idProyecto,
      codigoDomicilio: this.props.uid.codigoDomicilio,
      estatusPropiaAlquiler: this.props.uid.estatusPropiaAlquiler,
      alicuota: this.props.uid.alicuota,
      nota: this.props.uid.nota
    })

    this.props.getAllProyecto();
  }

  render() {
    let {
      idProyecto,
      codigoDomicilio,
      estatusPropiaAlquiler,
      alicuota,
      nota
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
                  label="Estatus propia alquiler"
                  onChange={this.handleChange}
                  type="text"
                  name="estatusPropiaAlquiler"
                  value={estatusPropiaAlquiler}
                  validators={["isNumber"]}
                  errorMessages={["Solo se permiten números"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Nota"
                  onChange={this.handleChange}
                  type="text"
                  name="nota"
                  value={nota}
                  validators={["maxStringLength:500"]}
                  errorMessages={["Máximo 500 carácteres"]}
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
                    label="Número domicilio *"
                    onChange={this.handleChange}
                    type="text"
                    name="codigoDomicilio"
                    disabled={editar} //si es el cuadro de editar se deshabilita este campo
                    value={codigoDomicilio}
                    validators={["required","maxStringLength:10"]}
                    errorMessages={["Este campo es requerido","Máximo 10 carácteres"]}
                  />
                </FormControl>
                <TextValidator
                  className="w-100 mb-16"
                  label="Alicuota"
                  onChange={this.handleChange}
                  type="text"
                  name="alicuota"
                  value={alicuota}
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

const mapStateToProps = state => ({
  addNewDomicilio: PropTypes.func.isRequired,
  updateDomicilio: PropTypes.func.isRequired,
  getAllProyecto: PropTypes.func.isRequired,
  proyectos: state.mantenimientos.proyectos
});

export default connect(
  mapStateToProps,
  { updateDomicilio, addNewDomicilio, getAllProyecto }
)(MemberEditorDialogDomicilio);