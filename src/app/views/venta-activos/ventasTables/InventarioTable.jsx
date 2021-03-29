import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetReimbursementListByUser } from "../../../redux/actions/EducationalReimbursementActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import CustomToolbarSelect from "./CustomSelect"
import {
    Icon,
    Button,
    Card,
    Grid,
    Tooltip
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Link } from 'react-router-dom';
import history from "history.js";
import CustomFooter from '../../muidatatable/CustomFooter';

const EducationalReimbursementDetails = () => {
    const employeeReimbursements = useSelector(state => state.reimbursement.employeeReimbursements.filter(item => item.anio != -1));
    const dispatch = useDispatch();
    const isLoading  = useSelector(state => state.reimbursement.loading);
    const user = useSelector(state => state.user);

    // useEffect(() => {
    //     dispatch(GetReimbursementListByUser(user.badge));
    // }, []);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const handleDelete = (id) => {
      alert(`Eliminado!` + id);
      //setShouldOpenConfirmationDialog(true)
      
    };

    const handleEdit= (id) => {
      //alert(`Edit!` + id);
      //setShouldOpenConfirmationDialog(true)
      history.push(`/Ventas/FormAdminInventario/${id}`);
      
    };

    const addButton = () => {
      return (
          <React.Fragment>
            <Tooltip title={"Nuevo"}>
              {/* <IconButton component={Link} to="/ReembolsoEducativo/Nuevo">
                <AddIcon/>
              </IconButton> */}
              <Button
                component={Link} to="/Ventas/FormAdminInventario"
                variant="contained"
                color="primary"
                //className={classes.button}
                startIcon={<AddIcon />}
              >
                Nuevo
              </Button>
            </Tooltip>
          </React.Fragment>
      );
  }

    const data = [
      {
        "idArticulo": "1613",
        "idCampaign": "JO101540",
        "name": "Temporary Quality",
        "description": "Capital One",
        "image": "2021/01/13 21:00",
        "inventarioInicial": "2021/01/20 23:00",
        "existencias": "14",
        "valorArticulo": "4555",
        "limiteMaximo": "4"
      },
    ];

    const columns = [
        {
          name: "idArticulo",
          label: "ID Artículo",
          options: {
          filter: false,
          sort: true,
          display: false
          }
        },
        {
            name: "idCampaign",
            label: "ID Campaña",
            options: {
             filter: false,
             sort: true,
             display: false,
            }
        },
        {
          name: "name",
          label: "Nombre Artículo",
          options: {
           filter: true,
           sort: true,
          }
        },
        {
          name: "description",
          label: "Descripción Artículo",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "image",
          label: "Imagen Artículo",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "inventarioInicial",
          label: "Inventario Inicial ",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "existencias",
          label: "Existencias",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "valorArticulo",
          label: "Valor Artículo",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "limiteMaximo",
          label: "Límite Máximo Artículo",
          options: {
          filter: true,
          sort: true,
          }
        },
    ]

    const options = {
      //selectableRowsHideCheckboxes: true,
      selectableRowsHeader: false,
      selectableRowsOnClick: true,
      isRowSelectable: (dataIndex, selectedRows) => {
        //prevents selection of any additional row after the third
        if (selectedRows.data.length > 0 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        //prevents selection of row with title "Attorney"
        return data[dataIndex][1] != "Attorney";
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} eliminar={handleDelete} editar={handleEdit} />
      ),
      print:false,
      download: false,
      vertical: true,
      customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
        return (
          <CustomFooter
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            textLabels={textLabels}
          />
        );
      },
      customSort: (data, colIndex, order) => { return data.sort((a, b) => { if (colIndex === 5 || colIndex === 6) { return (new Date(a.data[colIndex]) < new Date(b.data[colIndex]) ? -1: 1 ) * (order === 'desc' ? 1 : -1); } else { return (a.data[colIndex] < b.data[colIndex] ? -1: 1 ) * (order === 'desc' ? 1 : -1); } }); },
      textLabels: {
        body: {
          noMatch: "Lo sentimos, no se encontraron registros",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Ordenar por ${column.label}`
        },
        pagination: {
          next: "Siguiente",
          previous: "Regresar",
          rowsPerPage: "Filas por página:",
          displayRows: "de",
        },
        toolbar: {
          search: "Buscar",
          downloadCsv: "Descargar CSV",
          //print: "Imprimir",
          viewColumns: "Ver Columnas",
          filterTable: "Filtrar tabla",
        },
        filter: {
          all: "Todas",
          title: "Filtradas",
          reset: "Eliminar filtros",
        },
        viewColumns: {
          title: "Mostrar Columnas",
          titleAria: "Show/Hide Table Columns",
        },
        selectedRows: {
          text: "Linea(s) seleccionadas",
          delete: "Delete",
          deleteAria: "Delete Selected Rows",
        },
      }
  }

  return (
      <div className="m-sm-30">
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            {/* { isLoading ? <Loading /> :   */}
                    <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                        <MuiThemeProvider theme={getMuiTheme()}>
                          <MUIDataTable  className="w-100"
                              title={<div style={{display: "inline-flex"}}>{addButton()} &nbsp; &nbsp; &nbsp;  <h4 style={{alignSelf: "flex-end"}}>Administración de Inventario</h4></div>}
                              data={data}
                              columns={columns}
                              options={options}
                          />
                        </MuiThemeProvider>
                    </Card>
            {/* } */}
          </Grid>
        </Grid>
      </div>
  )
}

export default EducationalReimbursementDetails
