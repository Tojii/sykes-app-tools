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
  updatePropietario,
  addNewPropietario
} from "../../../redux/actions/MantenimientoActions";
import PropTypes from "prop-types";

class MemberEditorDialogPropietario extends Component {
  state = {  
    idProyecto: "",
    codigoDomicilio: "",
    propietarioCedula: "",
    propietarioApellido1: "",
    propietarioApellido2: "",
    propietarioNombre: "",
    celular: "",
    otroTelefono: "",
    correoElectronico: "",
    fechaAdquisicion: null,
    bloquear: false,
    proyectos: [],
    deshabilitar: false,
    estado: "Guardar"   
  };

  handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      this.setState({ bloquear: event.target.checked });
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
    if (this.props.uid.idProyecto == "") {
      await this.props.addNewPropietario({
        ...this.state
      });
    } else {
      await this.props.updatePropietario({
        ...this.state
      });
    } 
    this.props.handleClose();   
  };

  componentWillMount() {
    this.setState({ 
      idProyecto: this.props.uid.idProyecto,
      codigoDomicilio: this.props.uid.codigoDomicilio,
      propietarioCedula: this.props.uid.propietarioCedula,
      propietarioApellido1: this.props.uid.propietarioApellido1,
      propietarioApellido2: this.props.uid.propietarioApellido2,
      propietarioNombre: this.props.uid.propietarioNombre,
      celular: this.props.uid.celular,
      otroTelefono: this.props.uid.otroTelefono,
      correoElectronico: this.props.uid.correoElectronico,
      fechaAdquisicion: this.props.uid.fechaAdquisicion,
      bloquear: this.props.uid.bloquear
    })

    this.props.getAllProyecto();
  }

  render() {
    let {
      idProyecto,
      codigoDomicilio,
      propietarioCedula,
      propietarioApellido1,
      propietarioApellido2,
      propietarioNombre,
      celular,
      otroTelefono,
      correoElectronico,
      fechaAdquisicion,
      bloquear
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
                  label="Cédula *"
                  onChange={this.handleChange}
                  type="text"
                  name="propietarioCedula"
                  maxlength="20"
                  disabled={editar} //si es el cuadro de editar se deshabilita este campo
                  value={propietarioCedula}
                  validators={["required","maxStringLength:15"]}
                  errorMessages={["Este campo es requerido","Máximo 15 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Primer apellido *"
                  onChange={this.handleChange}
                  type="text"
                  name="propietarioApellido1"
                  value={propietarioApellido1}
                  validators={["required","maxStringLength:50"]}
                  errorMessages={["Este campo es requerido","Máximo 50 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Celular *"
                  onChange={this.handleChange}
                  type="tel"
                  name="celular"
                  value={celular}
                  validators={["required","isNumber","maxStringLength:15"]}
                  errorMessages={["Este campo es requerido","Solo se permiten números","Máximo 15 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Email"
                  onChange={this.handleChange}
                  type="text"
                  name="correoElectronico"
                  value={correoElectronico}
                  validators={["matchRegexp:^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+(;[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?))*$","maxStringLength:150"]}
                  errorMessages={["Email no válido","Máximo 150 carácteres"]}
                />
                <FormControlLabel
                  className="my-20"
                  label="Bloquear"
                  control={
                    <Switch
                      checked={bloquear}
                      onChange={event => this.handleChange(event, "switch")}
                    />
                  }
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
                    validators={["required","maxStringLength:8"]}
                    errorMessages={["Este campo es requerido","Máximo 8 carácteres"]}
                  />
                </FormControl>
                <TextValidator
                  className="w-100 mb-16"
                  label="Nombre *"
                  onChange={this.handleChange}
                  type="text"
                  name="propietarioNombre"
                  value={propietarioNombre}
                  validators={["required","maxStringLength:80"]}
                  errorMessages={["Este campo es requerido","Máximo 80 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Segundo apellido"
                  onChange={this.handleChange}
                  type="text"
                  name="propietarioApellido2"
                  value={propietarioApellido2}
                  validators={["maxStringLength:50"]}
                  errorMessages={["Máximo 50 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Otro teléfono"
                  onChange={this.handleChange}
                  type="tel"
                  name="otroTelefono"
                  value={otroTelefono}
                  validators={["isNumber","maxStringLength:15"]}
                  errorMessages={["Solo se permiten números","Máximo 15 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Fecha adquisición"
                  onChange={this.handleChange}
                  type="date"
                  name="fechaAdquisicion"
                  value={fechaAdquisicion}
                  InputLabelProps={{ shrink: true, }}
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
  addNewPropietario: PropTypes.func.isRequired,
  updatePropietario: PropTypes.func.isRequired,
  getAllProyecto: PropTypes.func.isRequired,
  proyectos: state.mantenimientos.proyectos
});

export default connect(
  mapStateToProps,
  { updatePropietario, addNewPropietario, getAllProyecto }
)(MemberEditorDialogPropietario);
