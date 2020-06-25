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
  getAllProveedor,
  deleteProveedor
} from "../../../redux/actions/MantenimientoActions";
import MemberEditorDialog from "./MemberEditorDialogProveedor";
import { Breadcrumb, ConfirmationDialog } from "matx";
import shortid from "shortid";

class ProveedoresTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    proveedor: [],
    proveedores: [],
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

  handleDeleteProveedor = proveedor => {
    this.setState({
      proveedor,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = async () => {
    await this.props.deleteProveedor(this.state.proveedor);
    this.handleDialogClose();
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = async () => {
    await this.props.getAllProveedor(); 
  };

  render() {
    let {
      rowsPerPage,
      page,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog
    } = this.state;
    let { proveedores = [] } = this.props;
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Proveedores" }]} />
        </div>
        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ uid: { //se envía un proveedor vacío para cargar el modal
            "idProveedor": "",
            "descripcionProveedor": "",
            "cedulaJuricica": "",
            "pais": "",
            "provincia": "",
            "canton": "",
            "distrito": "",
            "direccion": "",
            "telefonoPrincipal": "",
            "telefonoSecundario": "",
            "correoElectronico": "",
            "idBanco": "",
            "numeroCuenta": "",
            "moneda": "",
            "contacto": "",
            "activo": true
          }, shouldOpenEditorDialog: true })}
        >
          Agregar proveedor
        </Button>
        <Card className="w-100 overflow-auto" elevation={6}>
          <Table className="crud-table" style={{ whiteSpace: "pre", minWidth: "750px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Cédula Jurídica</TableCell>
                <TableCell>Número cuenta</TableCell>
                <TableCell>Teléfono principal</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Banco</TableCell>
                <TableCell>Moneda</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Activo</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proveedores.length > 0 ? (
              proveedores
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((proveedor, index) => (
                  <TableRow key={shortid.generate()}>
                    <TableCell className="px-0" align="left">
                      {proveedor.idProveedor}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proveedor.descripcionProveedor}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proveedor.cedulaJuricica}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proveedor.numeroCuenta}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proveedor.telefonoPrincipal}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proveedor.correoElectronico}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proveedor.direccion}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proveedor.idBanco}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proveedor.moneda}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {proveedor.contacto}
                    </TableCell>
                    <TableCell className="px-0">
                      {proveedor.activo ? (
                        <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                          Activo
                        </small>
                      ) : (
                        <small className="border-radius-4 bg-light-gray px-8 py-2 ">
                          Inactivo
                        </small>
                      )}
                    </TableCell>
                    <TableCell className="px-0 border-none">
                      <IconButton
                        onClick={() =>
                          this.setState({
                            uid: proveedor,
                            shouldOpenEditorDialog: true
                          })
                        }
                        title="Editar"
                      >
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton onClick={() => this.handleDeleteProveedor(proveedor)} title="Borrar">
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                ) : ( //Si no hay datos se muestra en mensaje "No hay proveedores"
                <TableRow>
                  <TableCell colSpan={12} align="center">No hay proveedores</TableCell> 
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            className="px-16"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={proveedores.length}
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
              text="¿Está seguro que desea eliminar este proveedor?"
            />
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllProveedor: PropTypes.func.isRequired,
  deleteProveedor: PropTypes.func.isRequired,
  proveedores: state.mantenimientos.proveedores
});

export default connect(
  mapStateToProps,
  { getAllProveedor, deleteProveedor }
)(ProveedoresTable);