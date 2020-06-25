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
  getAllGasto,
  deleteGasto
} from "../../../redux/actions/MantenimientoActions";
import MemberEditorDialog from "./MemberEditorDialogMaestroGasto";
import { Breadcrumb, ConfirmationDialog } from "matx";
import shortid from "shortid";

class MaestroGastosTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    gasto: [],
    gastos: [],
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

  handleDeleteGasto = gasto => {
    this.setState({
      gasto,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = async () => {
    await this.props.deleteGasto(this.state.gasto);
    this.handleDialogClose();
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = async () => {
    await this.props.getAllGasto(); 
  };

  render() {
    let {
      rowsPerPage,
      page,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog
    } = this.state;
    let { gastos = [] } = this.props;
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "MaestroGastos" }]} />
        </div>
        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ uid: { //se envía un gasto vacío para cargar el modal
            "idGasto": "",
            "nombreGasto": "",
            "debe": "",
            "haber": ""
          }, shouldOpenEditorDialog: true })}
        >
          Agregar gasto
        </Button>
        <Card className="w-100 overflow-auto" elevation={6}>
          <Table className="crud-table" style={{ whiteSpace: "pre", minWidth: "750px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nombre gasto</TableCell>
                <TableCell>Debe</TableCell>
                <TableCell>Haber</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gastos.length > 0 ? (
              gastos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((gasto, index) => (
                  <TableRow key={shortid.generate()}>
                    <TableCell className="px-0" align="left">
                      {gasto.idGasto}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {gasto.nombreGasto}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {gasto.debe}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {gasto.haber}
                    </TableCell>
                    <TableCell className="px-0 border-none">
                      <IconButton
                        onClick={() =>
                          this.setState({
                            uid: gasto,
                            shouldOpenEditorDialog: true
                          })
                        }
                        title="Editar"
                      >
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton onClick={() => this.handleDeleteGasto(gasto)} title="Borrar">
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                ) : ( //Si no hay datos se muestra en mensaje "No hay gastos"
                <TableRow>
                  <TableCell colSpan={5} align="center">No hay gastos</TableCell> 
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            className="px-16"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={gastos.length}
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
              text="¿Está seguro que desea eliminar este maestro de gastos?"
            />
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllGasto: PropTypes.func.isRequired,
  deleteGasto: PropTypes.func.isRequired,
  gastos: state.mantenimientos.gastos
});

export default connect(
  mapStateToProps,
  { getAllGasto, deleteGasto }
)(MaestroGastosTable);