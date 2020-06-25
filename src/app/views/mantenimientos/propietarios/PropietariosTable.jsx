import React, { Component } from "react";
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination,
  Button,
  Card
} from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAllPropietario,
  deletePropietario,
  getPropietarioByProject
} from "../../../redux/actions/MantenimientoActions";
import MemberEditorDialog from "./MemberEditorDialogPropietario";
import { Breadcrumb, ConfirmationDialog } from "matx";
import shortid from "shortid";

class PropietariosTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    propietario: [],
    propietarios: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false
  };

  setPage = page => {
    this.setState({ page });
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false
    });
    this.updatePageData();
  };

  handleDeletePropietario = propietario => {
    this.setState({
      propietario,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = async () => {
    await this.props.deletePropietario(this.state.propietario);
    this.handleDialogClose();
  };

  componentDidMount() {
    this.updatePageData();
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.proyecto !== prevProps.proyecto){
      this.updatePageData();
    }
  }

  updatePageData = async () => {
    if(this.props.proyecto === "General"){
      await this.props.getAllPropietario(); 
    } else{
      await this.props.getPropietarioByProject(parseInt(this.props.proyecto,10));
    }
  };

  render() {
    let {
      rowsPerPage,
      page,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog
    } = this.state;
    let { propietarios = [] } = this.props;
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Propietarios" }]} />
        </div>
        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ uid: { //se envía un propietario vacío para cargar el modal
            "idProyecto": "",
            "codigoDomicilio": "",
            "propietarioCedula": "",
            "propietarioApellido1": "",
            "propietarioApellido2": "",
            "propietarioNombre": "",
            "celular": "",
            "otroTelefono": "",
            "correoElectronico": "",
            "fechaAdquisicion": null,
            "bloquear": false
          }, shouldOpenEditorDialog: true })}
        >
          Agregar propietario
        </Button>
        <Card className="w-100 overflow-auto" elevation={6}>
          <Table className="crud-table" style={{ whiteSpace: "pre", minWidth: "750px" }}>
            <TableHead>
              <TableRow>
                {this.props.proyecto !== "General" ? null 
                : (
                  <TableCell>Proyecto</TableCell>
                )
                }
                <TableCell>Cédula</TableCell>
                <TableCell>Número domicilio</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Primer apellido</TableCell>
                <TableCell>Segundo apellido</TableCell>
                <TableCell>Teléfono principal</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell align="center">Bloqueado</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {propietarios.length > 0 ? (
              propietarios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((propietario, index) => (
                  <TableRow key={shortid.generate()}>
                    {this.props.proyecto !== "General" ? null 
                    : (
                      <TableCell className="px-0" align="left">
                      {propietario.idProyecto}
                      </TableCell>
                    )}
                    <TableCell className="px-0" align="left">
                      {propietario.propietarioCedula}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {propietario.codigoDomicilio}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {propietario.propietarioNombre}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {propietario.propietarioApellido1}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {propietario.propietarioApellido2}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {propietario.celular}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {propietario.correoElectronico}
                    </TableCell>
                    <TableCell className="px-0" align="center">
                      {propietario.bloquear ? (
                        <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                          Sí
                        </small>
                      ) : (
                        <small className="border-radius-4 bg-light-gray px-8 py-2 ">
                          No
                        </small>
                      )}
                    </TableCell>
                    <TableCell className="px-0 border-none">
                      <IconButton
                        onClick={() =>
                          this.setState({
                            uid: propietario,
                            shouldOpenEditorDialog: true
                          })
                        }
                        title="Editar"
                      >
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton onClick={() => this.handleDeletePropietario(propietario)} title="Borrar">
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                ) : ( //Si no hay datos se muestra en mensaje "No hay propietarios"
                <TableRow>
                  <TableCell colSpan={9} align="center">No hay propietarios</TableCell> 
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            className="px-16"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={propietarios.length}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={"Filas por página"}
            page={page}
            backIconButtonProps={{
              "aria-label": "Página anterior"
            }}
            nextIconButtonProps={{
              "aria-label": "Página siguiente"
            }}
            backIconButtonText="Página anterior"
            nextIconButtonText="Página siguiente"
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.setRowsPerPage}
          />

          {shouldOpenEditorDialog && (
            <MemberEditorDialog
              handleClose={this.handleDialogClose}
              open={shouldOpenEditorDialog}
              uid={this.state.uid}
            />
          )}
          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={this.handleDialogClose}
              onYesClick={this.handleConfirmationResponse}
              text="¿Está seguro que desea eliminar este propietario?"
            />
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllPropietario: PropTypes.func.isRequired,
  getPropietarioByProject: PropTypes.func.isRequired,
  deletePropietario: PropTypes.func.isRequired,
  propietarios: state.mantenimientos.propietarios,
  proyecto: state.mantenimientos.proyecto
});

export default connect(
  mapStateToProps,
  { getAllPropietario, getPropietarioByProject, deletePropietario }
)(PropietariosTable);