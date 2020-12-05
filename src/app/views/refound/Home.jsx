import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Icon,
    Button,
    Card,
    Tooltip,
    IconButton,
} from "@material-ui/core";
import { GetRefoundListByUser } from "../../redux/actions/RefoundActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import MUIDataTable from "mui-datatables";
import AddIcon from "@material-ui/icons/Add";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";

const Home = () => {
    const summary = useSelector(state => state.refound.summary);
    const dispatch = useDispatch();
    const isLoading  = useSelector(state => state.refound.loading);
    const user = useSelector(state => state.user);
    
    const addButton = () => {
        return (
            <React.Fragment>
              <Tooltip title={"Nuevo"}>
                <IconButton component={Link} to="/ReembolsoEducativo/Nuevo">
                  <AddIcon/>
                </IconButton>
              </Tooltip>
            </React.Fragment>
        );
    }

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const columns = [
        {
         name: "id",
         label: "REID",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
            name: "category",
            label: "Categoría",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "course",
            label: "Curso",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "state",
            label: "Estado",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "amount",
            label: "Monto a Depositar",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "applicationDate",
            label: "Fecha de Solicitud",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "desposit",
            label: "Fecha de Depósito",
            options: {
             filter: true,
             sort: true,
            }
        }
    ]

    const options = {
        selectableRowsHideCheckboxes: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: false,
        print:false,
        download: false,
        vertical: true,
        customToolbar: () => {
            return (addButton());
        },
        textLabels: {
          body: {
            noMatch: "Disculpas, no se encontraron registros",
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
            all: "TODAS",
            title: "FILTRADAS",
            reset: "ELIMINAR FILTROS",
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

    useEffect(() => {
        dispatch(GetRefoundListByUser(user.badge));
    }, []);

    return (
        <div>
            { isLoading ? <Loading /> : 
                <div className="m-sm-30">
                    <Card className="w-100 overflow-auto" elevation={6}>
                        <MuiThemeProvider theme={getMuiTheme()}>
                          <MUIDataTable  className="w-100"
                              title={"Lista de Reembolsos"}
                              data={summary}
                              columns={columns}
                              options={options}
                          />
                        </MuiThemeProvider>
                    </Card>
                </div>
            }
        </div>
    )
}

export default Home
