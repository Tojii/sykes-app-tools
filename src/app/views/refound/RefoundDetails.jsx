import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetRefoundListByUser } from "../../redux/actions/RefoundActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import {
    Icon,
    Button,
    Card,
    Grid
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";

const RefoundDetails = () => {
    const employeeRefunds = useSelector(state => state.refound.employeeRefunds.filter(item => item.anio != -1));
    const dispatch = useDispatch();
    const isLoading  = useSelector(state => state.refound.loading);
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(GetRefoundListByUser(user != null ? user.badge : ""));
    }, []);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const columns = [
        {
            name: "category",
            label: "Categoría",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "bounus",
            label: "Bono",
            options: {
             filter: true,
             sort: true,
             customBodyRender: value =>
                (value != null && value != undefined && value != "") ? ("$" + value) : "$0"
            }
        },
        {
            name: "balance",
            label: "Saldo",
            options: {
             filter: true,
             sort: true,
             customBodyRender: value =>
             (value != null && value != undefined && value != "") ? ("$" + value) : "$0"
            }
        },
       
    ]

    const options = {
        selectableRowsHideCheckboxes: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: false,
        print:false,
        download: false,
        pagination: false,
        filter: false,
        viewColumns: false,
        search: false,
        textLabels: {
          body: {
            noMatch: "Disculpas, no se encontraron registros",
            toolTip: "Sort",
            columnHeaderTooltip: column => `Ordenar por ${column.label}`
          },
          pagination: {
            next: "Siguente",
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
            all: "TODAS",
            title: "FILTRADAS",
            reset: "ELIMINAR FILTROS",
          },
          viewColumns: {
            title: "Mostar Colmnas",
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
              { isLoading ? <Loading /> :  
                      <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                          <MuiThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable  className="w-100"
                                title={`Lista de Reembolsos ${employeeRefunds.length > 0 ? employeeRefunds[0].anio : "" }`}
                                data={employeeRefunds.length > 0 ? employeeRefunds[0].balanceCategories : [] }
                                columns={columns}
                                options={options}
                            />
                          </MuiThemeProvider>
                      </Card>
              }
            </Grid>
            <Grid item md={12} xs={12}>
              { isLoading ? <Loading /> :  
                      <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                          <MuiThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable  className="w-100"
                                title={`Lista de Reembolsos ${employeeRefunds.length > 0 ? employeeRefunds[1].anio : "" }`}
                                data={employeeRefunds.length > 0 ? employeeRefunds[1].balanceCategories : [] }
                                columns={columns}
                                options={options}
                            />
                          </MuiThemeProvider>
                      </Card>
              }
            </Grid>
          </Grid>
        </div>
    )
}

export default RefoundDetails
