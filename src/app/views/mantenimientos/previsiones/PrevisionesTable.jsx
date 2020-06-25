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
  getAllPrevision,
  deletePrevision
} from "../../../redux/actions/MantenimientoActions";
import MemberEditorDialog from "./MemberEditorDialogPrevision";
import { Breadcrumb, ConfirmationDialog } from "matx";
import shortid from "shortid";

class PrevisionesTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    prevision: [],
    previsiones: [],
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

  handleDeletePrevision = prevision => {
    this.setState({
      prevision,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = async () => {
    await this.props.deletePrevision(this.state.prevision);
    this.handleDialogClose();
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = async () => {
    await this.props.getAllPrevision();
  };

  render() {
    let {
      rowsPerPage,
      page,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog
    } = this.state;
    let { previsiones = [] } = this.props;
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Previsiones" }]} />
        </div>
        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ uid: { //se envía una previsión vacía para cargar el modal
            "idPrevision": "",
            "nombrePrevision": "",
            "debe": "",
            "haber": ""
          }, shouldOpenEditorDialog: true })}
        >
          Agregar previsión
        </Button>
        <Card className="w-100 overflow-auto" elevation={6}>
          <Table className="crud-table" style={{ whiteSpace: "pre", minWidth: "750px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nombre previsión</TableCell>
                <TableCell>Debe</TableCell>
                <TableCell>Haber</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {previsiones.length > 0 ? (
              previsiones
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((prevision, index) => (
                  <TableRow key={shortid.generate()}>
                    <TableCell className="px-0" align="left">
                      {prevision.idPrevision}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {prevision.nombrePrevision}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {prevision.debe}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {prevision.haber}
                    </TableCell>
                    <TableCell className="px-0 border-none">
                      <IconButton
                        onClick={() =>
                          this.setState({
                            uid: prevision,
                            shouldOpenEditorDialog: true
                          })
                        }
                        title="Editar"
                      >
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton onClick={() => this.handleDeletePrevision(prevision)} title="Borrar">
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                ) : ( //Si no hay datos se muestra en mensaje "No hay previsiones"
                <TableRow>
                  <TableCell colSpan={5} align="center">No hay previsiones</TableCell> 
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            className="px-16"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={previsiones.length}
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
              text="¿Está seguro que desea eliminar esta prevision?"
            />
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllPrevision: PropTypes.func.isRequired,
  deletePrevision: PropTypes.func.isRequired,
  previsiones: state.mantenimientos.previsiones
});

export default connect(
  mapStateToProps,
  { getAllPrevision, deletePrevision }
)(PrevisionesTable);