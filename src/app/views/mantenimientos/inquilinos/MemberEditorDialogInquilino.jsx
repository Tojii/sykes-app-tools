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
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import {
  getAllProyecto,
  updateInquilino,
  addNewInquilino
} from "../../../redux/actions/MantenimientoActions";
import PropTypes from "prop-types";

class MemberEditorDialogInquilino extends Component {
  state = {  
      idProyecto: "",
      codigoDomicilio: "",
      inquilinoCedula: "",
      inquilinoApellido1: "",
      inquilinoApellido2: "",
      inquilinoNombre: "",
      celular: "",
      otroTelefono: "",
      correoElectronico: "",
      fechaInicioAlquiler: "",
      fechaFinAlquiler: null,
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
      await this.props.addNewInquilino({
        ...this.state
      });
    } else {
      await this.props.updateInquilino({
        ...this.state
      });
    } 
    this.props.handleClose();   
  };

  // handleFormTitle = () => {
  //   if (this.props.uid.idProyecto == "") {
  //     <h4 className="mb-20">Agregar</h4>
  //   } else {
  //     <h4 className="mb-20">Editar</h4>
  //   }
  // };

  componentWillMount() {
    this.setState({ 
      idProyecto: this.props.uid.idProyecto,
      codigoDomicilio: this.props.uid.codigoDomicilio,
      inquilinoCedula: this.props.uid.inquilinoCedula,
      inquilinoApellido1: this.props.uid.inquilinoApellido1,
      inquilinoApellido2: this.props.uid.inquilinoApellido2,
      inquilinoNombre: this.props.uid.inquilinoNombre,
      celular: this.props.uid.celular,
      otroTelefono: this.props.uid.otroTelefono,
      correoElectronico: this.props.uid.correoElectronico,
      fechaInicioAlquiler: this.props.uid.fechaInicioAlquiler,
      fechaFinAlquiler: this.props.uid.fechaFinAlquiler,
      bloquear: this.props.uid.bloquear
    })

    // fetch('https://localhost:44365/api/Proyecto/GetAll')
    // .then((response) => {
    //   return response.json()
    // })
    // .then((proyectos) => {
    //   this.setState({ proyectos: proyectos })
    //  })
    this.props.getAllProyecto();
  }

  render() {
    let {
      idProyecto,
      codigoDomicilio,
      inquilinoCedula,
      inquilinoApellido1,
      inquilinoApellido2,
      inquilinoNombre,
      celular,
      otroTelefono,
      correoElectronico,
      fechaInicioAlquiler,
      fechaFinAlquiler,
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
                {/* <TextValidator
                  className="w-100 mb-16"
                  label="Proyecto"
                  onChange={this.handleChange}
                  type="text"
                  name="idProyecto"
                  disabled={editar} //si es el cuadro de editar se deshabilita este campo
                  value={idProyecto}
                  validators={["required","isNumber"]}
                  errorMessages={["Este campo es requerido","Solo se permiten números"]}
                /> */}
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
                  name="inquilinoCedula"
                  maxlength="20"
                  disabled={editar} //si es el cuadro de editar se deshabilita este campo
                  value={inquilinoCedula}
                  validators={["required","maxStringLength:15"]}
                  errorMessages={["Este campo es requerido","Máximo 15 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Primer apellido *"
                  onChange={this.handleChange}
                  type="text"
                  name="inquilinoApellido1"
                  value={inquilinoApellido1}
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
                  errorMessages={["Correo no válido","Máximo 150 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Fecha fin alquiler"
                  onChange={this.handleChange}
                  value={fechaFinAlquiler}
                  type="date"
                  name="fechaFinAlquiler"
                  InputLabelProps={{ shrink: true, }}
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
                  name="inquilinoNombre"
                  value={inquilinoNombre}
                  validators={["required","maxStringLength:100"]}
                  errorMessages={["Este campo es requerido","Máximo 100 carácteres"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label="Segundo apellido"
                  onChange={this.handleChange}
                  type="text"
                  name="inquilinoApellido2"
                  value={inquilinoApellido2}
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
                  label="Fecha inicio alquiler *"
                  onChange={this.handleChange}
                  type="date"
                  name="fechaInicioAlquiler"
                  value={fechaInicioAlquiler}
                  validators={["required"]}
                  errorMessages={["Este campo es requerido"]}
                  InputLabelProps={{ shrink: true, }}
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
  addNewInquilino: PropTypes.func.isRequired,
  updateInquilino: PropTypes.func.isRequired,
  getAllProyecto: PropTypes.func.isRequired,
  proyectos: state.mantenimientos.proyectos
});

export default connect(
  mapStateToProps,
  { updateInquilino, addNewInquilino, getAllProyecto }
)(MemberEditorDialogInquilino);
