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
  getAllProyecto,
  deleteProyecto
} from "../../../redux/actions/MantenimientoActions";
import MemberEditorDialog from "./MemberEditorDialogProyecto";
import { Breadcrumb, ConfirmationDialog } from "matx";
import shortid from "shortid";

class ProyectosTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    proyecto: [],
    proyectos: [],
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

  handleDeleteProyecto = proyecto => {
    this.setState({
      proyecto,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = async () => {
    await this.props.deleteProyecto(this.state.proyecto);
    this.handleDialogClose();
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = async () => {
    await this.props.getAllProyecto(); 
  };

  render() {
    let {
      rowsPerPage,
      page,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog
    } = this.state;
    let { proyectos = [] } = this.props;
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Proyectos" }]} />
        </div>

        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ uid: { //se envía un proyecto vacío para cargar el modal
            "idProyecto": "",
            "descripcionProyecto": "",
            "cedulaJuricica": "",
            "pais": "",
            "provincia": "",
            "canton": "",
            "distrito": "",
            "direccion": "",
            "telefonoPrincipal": "",
            "telefonoSecundario": "",
            "telefonoSeguridad": "",
            "correoElectronico": "",
            "cantidadDomicilios": "",
            "textoRecibos": "",
            "textoEstadoCuenta": "",
            "comentario": "",
            "iva": ""
          }, shouldOpenEditorDialog: true })}
        >
          Agregar proyecto
        </Button>
        <Card className="w-100 overflow-auto" elevation={6}>
          <Table className="crud-table" style={{ whiteSpace: "pre", minWidth: "750px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Cédula Jurídica</TableCell>
                <TableCell>Teléfono principal</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Cantidad domicilios</TableCell>
                <TableCell>Comentario</TableCell>
                <TableCell>IVA</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proyectos.length > 0 ? (
              proyectos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((proyecto, index) => (
                  <TableRow key={shortid.generate()}>
                    <TableCell className="px-0" align="left">
                      {proyecto.idProyecto}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proyecto.descripcionProyecto}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proyecto.cedulaJuricica}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proyecto.telefonoPrincipal}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proyecto.correoElectronico}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proyecto.direccion}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proyecto.cantidadDomicilios}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proyecto.comentario}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proyecto.iva}
                    </TableCell>
                    <TableCell className="px-0 border-none">
                      <IconButton
                        onClick={() =>
                          this.setState({
                            uid: proyecto,
                            shouldOpenEditorDialog: true
                          })
                        }
                        title="Editar"
                      >
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton onClick={() => this.handleDeleteProyecto(proyecto)} title="Borrar">
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                ) : ( //Si no hay datos se muestra en mensaje "No hay proyectos"
                <TableRow>
                  <TableCell colSpan={10} align="center">No hay proyectos</TableCell> 
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            className="px-16"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={proyectos.length}
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
              text="¿Está seguro que desea eliminar este proyecto?"
            />
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllProyecto: PropTypes.func.isRequired,
  deleteProyecto: PropTypes.func.isRequired,
  proyectos: state.mantenimientos.proyectos
});

export default connect(
  mapStateToProps,
  { getAllProyecto, deleteProyecto }
)(ProyectosTable);