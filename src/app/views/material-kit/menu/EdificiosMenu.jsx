import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from "react-redux";
import {
  getAllProyecto,
  selectProject
} from "../../../redux/actions/MantenimientoActions";
import PropTypes from "prop-types";

class EdificiosMenu extends Component {
  state={
    idProyecto: "General"
  }

  handleChange = (event, source) => {
    event.persist();

    this.setState({
      [event.target.name]: event.target.value
    });
    this.props.selectProject(event.target.value);
  };

  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget);
  // }

  // function getAllProyectos () {
  //   this.props.getAllProyecto();
  // }

  // function handleClose() {
  //   setAnchorEl(null);
  // }

  componentDidMount() {
    this.props.getAllProyecto();
  }

  
  render() {
    let {
      idProyecto,
    } = this.state;
    let { handleClose } = this.props;
    let { proyectos = [] } = this.props;
    return (
      <div>  
          <InputLabel id="simple-select">Proyecto: </InputLabel>
          <Select
            value={idProyecto}
            className="w-100 mb-16"
            name="idProyecto"
            onChange={this.handleChange}
          >
            <MenuItem value="General">General</MenuItem>
            {proyectos.map(proyecto => (
              <MenuItem key={proyecto} value={proyecto.idProyecto}>
                {proyecto.idProyecto}
              </MenuItem>
            ))}
          </Select>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  getAllProyecto: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  proyectos: state.mantenimientos.proyectos,
  proyecto: state.mantenimientos.proyecto
});

export default connect(
  mapStateToProps,
  { getAllProyecto, selectProject }
)(EdificiosMenu);