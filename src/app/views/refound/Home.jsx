import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Icon,
    Button,
    Card,
    Tooltip,
    IconButton,
    Grid,
    Dialog
} from "@material-ui/core";
import { GetRefoundListByUser } from "../../redux/actions/RefoundActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import MUIDataTable from "mui-datatables";
import AddIcon from "@material-ui/icons/Add";
import DetailsIcon from "@material-ui/icons/ReorderSharp";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import DetalleTable from "./RefoundDetails";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import history from "history.js";
import moment from "moment"
import CustomFooter from '../muidatatable/CustomFooter';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const Home = () => {
    const dispatch = useDispatch();  
    const summary = useSelector(state => state.refound.summary);
    const isLoading  = useSelector(state => state.refound.loading);
    const user = useSelector(state => state.user);
    const [shouldOpenDetailsDialog, setShouldOpenDetailsDialog] = useState(false);
    const SPACED_DATE_FORMAT = "DD/MM/YYYY";  
    const handleDetailsClick = () => {
      setShouldOpenDetailsDialog(true);
    }

    const handleClose = () => {
      setShouldOpenDetailsDialog(false);
    }
    
    const addButton = () => {
        return (
            <React.Fragment>
              <Tooltip title={"Nuevo"}>
                {/* <IconButton component={Link} to="/ReembolsoEducativo/Nuevo">
                  <AddIcon/>
                </IconButton> */}
                <Button
                  component={Link} to="/ReembolsoEducativo/Nuevo"
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

    const addButtonDetails = () => {
      return (
          <React.Fragment>
            <Tooltip title={"Detalles"}>
              {/* <IconButton component={Link} to="/ReembolsoEducativo/Nuevo">
                <AddIcon/>
              </IconButton> */}
              <Button
                onClick={handleDetailsClick}
                variant="contained"
                color="primary"
                //className={classes.button}
                startIcon={<DetailsIcon />}
              >
                Detalles
              </Button>
            </Tooltip>
          </React.Fragment>
      );
  }

    const getMuiTheme = () =>
    createMuiTheme({
    })

    const columns = [
        {
         name: "id",
         label: "REID",
         options: {
          filter: true,
          sort: true,
          filterOptions: { 
            fullWidth: window.screen.width <= 1024 ? true : false
          }
         }
        },
        {
            name: "category",
            label: "Categoría",
            options: {
             filter: true,
             sort: true,
             filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
             }
            }
        },
        {
            name: "course",
            label: "Curso",
            options: {
             filter: true,
             sort: true,
             filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
             }
            }
        },
        {
            name: "state",
            label: "Estado",
            options: {
             filter: true,
             sort: true,
             filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
             }
            }
        },
        {
            name: "amount",
            label: "Monto a Depositar",
            options: {
             filter: true,
             sort: true,
             filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
             }
            }
        },
        {
            name: "applicationDate",
            label: "Fecha de Solicitud",
            options: {
             filter: true,
             sort: true,
             filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
             },
             customBodyRender: value =>
             (value != null && value != undefined && value != "") ? moment(new Date(value)).format(SPACED_DATE_FORMAT) : ""
            }
        },
        {
            name: "desposit",
            label: "Fecha de Depósito",
            options: {
             filter: true,
             sort: true,
             filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
             },
             customBodyRender: value =>
             (value != null && value != undefined && value != "") ? moment(new Date(value)).format(SPACED_DATE_FORMAT) : ""
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
        customSort: (data, colIndex, order) => { return data.sort((a, b) => { if (colIndex === 5 || colIndex === 6) { return (new Date(a.data[colIndex]) < new Date(b.data[colIndex]) ? -1: 1 ) * (order === 'desc' ? 1 : -1); } else { return (a.data[colIndex] < b.data[colIndex] ? -1: 1 ) * (order === 'desc' ? 1 : -1); } }); },
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

    useEffect(() => {
        dispatch(GetRefoundListByUser(user.badge));
    }, [user]);

    return (
        <div>
            { (!summary || isLoading) ? <Loading /> : 
                <div className="m-sm-30">
                    <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                        <MuiThemeProvider theme={getMuiTheme()}>
                          <MUIDataTable  className="w-100"
                              //title={"Lista de Reembolsos"}
                               title={<div style={{display: "inline-flex"}}>{addButton()} &nbsp; {addButtonDetails()} &nbsp; &nbsp; &nbsp;  <h4 style={{alignSelf: "flex-end"}}>Lista de Reembolsos</h4></div>}
                              data={summary}
                              columns={columns}
                              options={options}
                          />
                        </MuiThemeProvider>
                    </Card>
                </div>
            }
             <Dialog maxWidth="md" onClose={handleClose} open={shouldOpenDetailsDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                
                 </DialogTitle>
                {/* <div className="mb-sm-30">
                    <Breadcrumb
                    routeSegments={[
                    { name: "Growth Opportunities", path: "/growth-opportunities" },
                    { name: "Metrics", path: "/my-metrics" },                
                    ]}
                />
                </div> */}
                <DetalleTable/>
            </Dialog>
        </div>
    )
}

export default Home
