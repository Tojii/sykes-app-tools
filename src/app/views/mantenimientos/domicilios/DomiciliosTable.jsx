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
  getAllDomicilio,
  deleteDomicilio,
  getDomicilioByProject
} from "../../../redux/actions/MantenimientoActions";
import MemberEditorDialog from "./MemberEditorDialogDomicilio";
import { Breadcrumb, ConfirmationDialog } from "matx";
import shortid from "shortid";

class DomiciliosTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    domicilio: [],
    domicilios: [],
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

  handleDeleteDomicilio = domicilio => {
    this.setState({
      domicilio,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = async () => {
    await this.props.deleteDomicilio(this.state.domicilio);
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
      await this.props.getAllDomicilio(); 
    } else{
      await this.props.getDomicilioByProject(parseInt(this.props.proyecto,10));
    }
  };

  render() {
    let {
      rowsPerPage,
      page,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog
    } = this.state;
    let { domicilios = [] } = this.props;
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Domicilios" }]} />
        </div>
        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ uid: { //se envía un domicilio vacío para cargar el modal
            "idProyecto": "",
            "codigoDomicilio": "",
            "estatusPropiaAlquiler": "",
            "alicuota": "",
            "nota": ""
          }, shouldOpenEditorDialog: true })}
        >
          Agregar domicilio
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
                <TableCell>Número domicilio</TableCell>
                <TableCell>Estatus Propia Alquiler</TableCell>
                <TableCell>Alicuota</TableCell>
                <TableCell>Nota</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {domicilios.length > 0 ? (
              domicilios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((domicilio, index) => (
                  <TableRow key={shortid.generate()}>
                    {this.props.proyecto !== "General" ? null 
                    : (
                      <TableCell className="px-0" align="left">
                      {domicilio.idProyecto}
                      </TableCell>
                    )}
                    <TableCell className="px-0" align="left">
                      {domicilio.codigoDomicilio}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {domicilio.estatusPropiaAlquiler}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {domicilio.alicuota}
                    </TableCell>
                    <TableCell className="px-0" align="left">
                      {domicilio.nota}
                    </TableCell>
                    <TableCell className="px-0 border-none">
                      <IconButton
                        onClick={() =>
                          this.setState({
                            uid: domicilio,
                            shouldOpenEditorDialog: true
                          })
                        }
                        title="Editar"
                      >
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton onClick={() => this.handleDeleteDomicilio(domicilio)} title="Borrar">
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                ) : ( //Si no hay datos se muestra en mensaje "No hay domicilios"
                <TableRow>
                  <TableCell colSpan={5} align="center">No hay domicilios</TableCell> 
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            className="px-16"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={domicilios.length}
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
              text="¿Está seguro que desea eliminar este domicilio?"
            />
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllDomicilio: PropTypes.func.isRequired,
  getDomicilioByProject: PropTypes.func.isRequired,
  deleteDomicilio: PropTypes.func.isRequired,
  domicilios: state.mantenimientos.domicilios,
  proyecto: state.mantenimientos.proyecto
});

export default connect(
  mapStateToProps,
  { getAllDomicilio, getDomicilioByProject, deleteDomicilio }
)(DomiciliosTable);
