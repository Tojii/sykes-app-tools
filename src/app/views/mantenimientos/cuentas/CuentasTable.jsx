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
  getAllCuenta,
  deleteCuenta,
  getCuentaByProject
} from "../../../redux/actions/MantenimientoActions";
import MemberEditorDialog from "./MemberEditorDialogCuenta";
import { Breadcrumb, ConfirmationDialog } from "matx";
import shortid from "shortid";

class CuentasTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    cuentas: [],
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

  handleDeleteCuenta = cuenta => {
    this.setState({
      cuenta,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = async () => {
    await this.props.deleteCuenta(this.state.cuenta);
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
      await this.props.getAllCuenta(); 
    } else{
      await this.props.getCuentaByProject(parseInt(this.props.proyecto,10));
    }
  };
  
  render() {
    let {
      rowsPerPage,
      page,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog
    } = this.state;
    let { cuentas = [] } = this.props;
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Cuentas" }]} />
        </div>
        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ uid: { //se envía una cuenta vacía para cargar el modal
            "idProyecto": "",
            "idBanco": "",
            "numeroCuenta": "",
            "cuentaIBAN": "",
            "cuentaCliente": "",
            "moneda": "",
            "debe": "",
            "haber": ""
          }, shouldOpenEditorDialog: true })}
        >
          Agregar cuenta
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
                <TableCell>Banco</TableCell>
                <TableCell>Número cuenta</TableCell>
                <TableCell>Cuenta IBAN</TableCell>
                <TableCell>Cuenta cliente</TableCell>
                <TableCell>Moneda</TableCell>
                <TableCell>Debe</TableCell>
                <TableCell>Haber</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cuentas.length > 0 ? (
              cuentas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cuenta, index) => (
                  <TableRow key={shortid.generate()}>
                    {this.props.proyecto !== "General" ? null 
                    : (
                      <TableCell className="px-0" align="left">
                      {cuenta.idProyecto}
                      </TableCell>
                    )}
                    <TableCell className="px-0" align="left">
                      {cuenta.idBanco}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {cuenta.numeroCuenta}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {cuenta.cuentaIBAN}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {cuenta.cuentaCliente}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {cuenta.moneda}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {cuenta.debe}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {cuenta.haber}
                    </TableCell>
                    <TableCell className="px-0 border-none">
                      <IconButton
                        onClick={() =>
                          this.setState({
                            uid: cuenta,
                            shouldOpenEditorDialog: true
                          })
                        }
                        title="Editar"
                      >
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton onClick={() => this.handleDeleteCuenta(cuenta)} title="Borrar">
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                ) : ( //Si no hay datos se muestra en mensaje "No hay cuentas"
                <TableRow>
                  <TableCell colSpan={8} align="center">No hay cuentas</TableCell> 
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            className="px-16"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cuentas.length}
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
              text="¿Está seguro que desea eliminar esta cuenta?"
            />
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllCuenta: PropTypes.func.isRequired,
  getCuentaByProject: PropTypes.func.isRequired,
  deleteCuenta: PropTypes.func.isRequired,
  cuentas: state.mantenimientos.cuentas,
  proyecto: state.mantenimientos.proyecto
});

export default connect(
  mapStateToProps,
  { getAllCuenta, getCuentaByProject, deleteCuenta }
)(CuentasTable);