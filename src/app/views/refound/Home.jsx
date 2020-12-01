import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Icon,
    Button,
    Card,
} from "@material-ui/core";
import { GetRefoundListByUser } from "../../redux/actions/RefoundActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import MUIDataTable from "mui-datatables";

const Home = () => {
    const summary = useSelector(state => state.refound.summary);
    const dispatch = useDispatch();
    const isLoading  = useSelector(state => state.refound.loading);
    const user = useSelector(state => state.user);
    
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
        textLabels: {
          body: {
            noMatch: "Disculpas, no se encontraron registros",
            toolTip: "Sort",
            columnHeaderTooltip: column => `Ordenar por ${column.label}`
          },
          pagination: {
            next: "Siguente",
            previous: "Regreasr",
            rowsPerPage: "Filas por pagina:",
            displayRows: "de",
          },
          toolbar: {
            search: "Buscar",
            downloadCsv: "Descargar CSV",
            //print: "Imprimir",
            viewColumns: "Ver Columnas",
            filterTable: "Filtar tabla",
          },
          filter: {
            all: "TODAS",
            title: "FILTRADAS",
            reset: "RESET",
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

    useEffect(() => {
        dispatch(GetRefoundListByUser(user.badge));
    }, []);

    return (
        <div>
            { isLoading ? <Loading /> : 
                <div className="m-sm-30">
                    <Button
                        className="mb-16"
                        variant="contained"
                        color="primary"
                        component={Link} to="/ReembolsoEducativo/Nuevo"
                    >
                        <Icon>add</Icon>
                        <span>Nuevo</span>
                    </Button>
                    <Card className="w-100 overflow-auto" elevation={6}>
                        <MUIDataTable
                            title={"Lista de Reembolsos"}
                            data={summary}
                            columns={columns}
                            options={options}
                        />
                    </Card>
                </div>
            }
        </div>
    )
}

export default Home
