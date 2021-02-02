import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetRefoundListByUser } from "../../../redux/actions/RefoundActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import {
    Icon,
    Button,
    Card,
    Grid,
    Tooltip
} from "@material-ui/core";
import Details from "@material-ui/icons/Details";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import history from "history.js";
import CustomFooter from '../../muidatatable/CustomFooter';


const RefoundDetails = () => {
    const employeeRefunds = useSelector(state => state.refound.employeeRefunds.filter(item => item.anio != -1));
    const dispatch = useDispatch();
    const isLoading  = useSelector(state => state.refound.loading);
    const user = useSelector(state => state.user);

    // useEffect(() => {
    //     dispatch(GetRefoundListByUser(user.badge));
    // }, []);

    const getMuiTheme = () =>
    createMuiTheme({
    });
   
    const columns = [
        {
            name: "campaign",
            label: "Campaña ",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
          name: "date",
          label: "Fecha",
          options: {
           filter: true,
           sort: true,
          }
        },
        {
          name: "notes",
          label: "Notas",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "totalArticulos",
          label: "Total Artículos ",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "totalCompra",
          label: "Total Compra",
          options: {
          filter: true,
          sort: true,
          }
        },
        {
          name: "detalles",
          label: " ",
          options: {
          filter: true,
          sort: true,
          }
        },
    ]

    const handleComprar = (item) => {    
      history.push(`/Ventas/CompraDetalle/${item.id}`);
    };

    const detallesButton = (item) => {
      return (
          <React.Fragment>
            <Tooltip title={"Detalles"}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleComprar(item)}
                startIcon={<Details />}
              >
                Detalles
              </Button>
            </Tooltip>
          </React.Fragment>
      );
    }

    const data = [
      {
        "campaign": "Campaña 1",
        "date": "2021/01/23",
        "notes": "Temporary Quality",
        "totalArticulos": "2",
        "totalCompra": "52000",
      },
      {
        "campaign": "Campaña 1",
        "date": "2021/01/03",
        "notes": "notes",
        "totalArticulos": "5",
        "totalCompra": "140500",
      },
    ];

    const builddata = data.map(item => {
      return [
          item.campaign,
          item.date, 
          item.notes,
          item.totalArticulos,
          item.totalCompra,
          detallesButton(item)
      ]
  })

    const options = {
      selectableRowsHideCheckboxes: true,
      selectableRowsHeader: false,
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
                              title={`Compras`}
                              data={builddata}
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

export default RefoundDetails
