import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetReimbursementListByUser } from "../../../redux/actions/EducationalReimbursementActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import {
    Icon,
    Button,
    Card,
    Grid
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
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

    const columns = [
        {
            name: "id",
            label: "ID Campaña ",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
          name: "name",
          label: "Nombre Campaña ",
          options: {
           filter: true,
           sort: true,
          }
        },
        {
          name: "description",
          label: "Descripción Campaña ",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "fechaInicio",
          label: "Fecha Inicio ",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "fechaFinalizacion",
          label: "Fecha Finalización",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "limite",
          label: "Límite Máximo Campaña ",
          options: {
          filter: true,
          sort: true,
          }
        },
       
    ]

    const options = {
      selectableRowsHideCheckboxes: true,
      selectableRowsHeader: false,
      selectableRowsOnClick: false,
      print:false,
      download: false,
      vertical: true,
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
                              title={`Ventas`}
                              data={employeeReimbursements.length > 0 ? employeeReimbursements[0].balanceCategories : [] }
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
