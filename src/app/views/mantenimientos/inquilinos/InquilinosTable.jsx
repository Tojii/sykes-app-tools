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
  getAllInquilino,
  deleteInquilino,
  getInquilinoByProject
} from "../../../redux/actions/MantenimientoActions";
import MemberEditorDialog from "./MemberEditorDialogInquilino";
import { Breadcrumb, ConfirmationDialog } from "matx";
import shortid from "shortid";

class InquilinosTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    inquilino: [],
    inquilinos: [],
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

  handleDeleteInquilino = inquilino => {
    this.setState({
      inquilino,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = async () => {
    await this.props.deleteInquilino(this.state.inquilino);
    this.handleDialogClose();
  };

  // componentDidMount() {
  //   fetch('https://localhost:44365/api/Inquilino/GetAll')
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((inquilinos) => {
  //     this.setState({ inquilinos: inquilinos })
  //   })
  // }

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
      await this.props.getAllInquilino(); 
    } else{
      await this.props.getInquilinoByProject(parseInt(this.props.proyecto,10));
    }
  };

  render() {
    let {
      rowsPerPage,
      page,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog
    } = this.state;
    let { inquilinos = [] } = this.props;
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Inquilinos" }]} />
        </div>

        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ uid: { //se envía un inquilino vacío para cargar el modal
            "idProyecto": "",
            "codigoDomicilio": "",
            "inquilinoCedula": "",
            "inquilinoApellido1": "",
            "inquilinoApellido2": "",
            "inquilinoNombre": "",
            "celular": "",
            "otroTelefono": "",
            "correoElectronico": "",
            "fechaInicioAlquiler": "",
            "fechaFinAlquiler": null,
            "bloquear": false
          }, shouldOpenEditorDialog: true })}
        >
          Agregar inquilino
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
              {inquilinos.length > 0 ? (
              inquilinos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((inquilino, index) => (
                  <TableRow key={shortid.generate()}>
                    {this.props.proyecto !== "General" ? null 
                    : (
                      <TableCell className="px-0" align="left">
                      {inquilino.idProyecto}
                      </TableCell>
                    )}
                    <TableCell className="px-0" align="left">
                      {inquilino.inquilinoCedula}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {inquilino.codigoDomicilio}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {inquilino.inquilinoNombre}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {inquilino.inquilinoApellido1}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {inquilino.inquilinoApellido2}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {inquilino.celular}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {inquilino.correoElectronico}
                    </TableCell>
                    <TableCell className="px-0" align="center">
                      {inquilino.bloquear ? (
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
                            uid: inquilino,
                            shouldOpenEditorDialog: true
                          })
                        }
                        title="Editar"
                      >
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton onClick={() => this.handleDeleteInquilino(inquilino)} title="Borrar">
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                ) : ( //Si no hay datos se muestra en mensaje "No hay inquilinos"
                <TableRow>
                  <TableCell colSpan={9} align="center">No hay inquilinos</TableCell> 
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            className="px-16"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={inquilinos.length}
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
              text="¿Está seguro que desea eliminar este inquilino?"
            />
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllInquilino: PropTypes.func.isRequired,
  getInquilinoByProject: PropTypes.func.isRequired,
  deleteInquilino: PropTypes.func.isRequired,
  inquilinos: state.mantenimientos.inquilinos,
  proyecto: state.mantenimientos.proyecto
});

export default connect(
  mapStateToProps,
  { getAllInquilino, getInquilinoByProject, deleteInquilino }
)(InquilinosTable);