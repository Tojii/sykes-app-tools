import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetOrder, GetAllOrder, GetAllOrderItems } from "../../../redux/actions/OrderActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import {
  Button,
  Card,
  Grid,
  Tooltip,
  FormLabel,
  FormGroup
} from "@material-ui/core";
import Details from "@material-ui/icons/Details";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import history from "history.js";
import CustomFooter from '../../muidatatable/CustomFooter';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import es from "date-fns/locale/es";
import {
  MuiPickersUtilsProvider,
  DatePicker
} from "@material-ui/pickers";
import moment from "moment";
import NotFound from "../../sessions/NotFound"
import ComprasItems from "./ComprasItemsTable"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tableMargin: {
    "@media (min-width: 0px)": {
      marginBottom: "25%",
    },
    "@media (min-width: 1024px)": {
      marginBottom: "5%",
    },
  },
})

const ComprasTable = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const orders = useSelector(state => state.order.orders);
  const isLoading = useSelector(state => state.order.loading);
  const user = useSelector(state => state.user);
  const isAdmin = props.admin != undefined ? props.admin : true;
  const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
  const SPACED_DATE_FORMAT = "DD/MM/YYYY";

  useEffect(() => {
    isAdmin && dispatch(GetAllOrder());
    !isAdmin && dispatch(GetOrder());
  }, []);

  const getMuiTheme = () =>
    createMuiTheme({
    });

  const columns = [
    {
      name: "id",
      label: "ID. Compra",
      options: {
        filter: true,
        viewColumns: isAdmin,
        sort: true,
        display: false,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "badge",
      label: "Badge",
      options: {
        filter: true,
        viewColumns: isAdmin,
        sort: true,
        display: isAdmin,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "name",
      label: "Nombre",
      options: {
        filter: true,
        viewColumns: isAdmin,
        sort: true,
        display: false,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "email",
      label: "Correo Electrónico",
      options: {
        filter: true,
        viewColumns: isAdmin,
        sort: true,
        display: false,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "phone",
      label: "Teléfono",
      options: {
        filter: true,
        viewColumns: isAdmin,
        sort: true,
        display: false,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "province",
      label: "Provincia",
      options: {
        filter: true,
        viewColumns: isAdmin,
        sort: true,
        display: false,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "canton",
      label: "Cantón",
      options: {
        filter: true,
        viewColumns: isAdmin,
        sort: true,
        display: false,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "district",
      label: "Distrito",
      options: {
        filter: true,
        viewColumns: isAdmin,
        sort: true,
        display: false,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "address",
      label: "Dirección",
      options: {
        filter: true,
        viewColumns: isAdmin,
        sort: true,
        display: false,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        },
        setCellProps: value => {
          return {
            style: {
              wordBreak: "break-word"
            }
          };
        },
      }
    },
    {
      name: "campaign",
      label: "Campaña ",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "CreatedDate",
      label: "Fecha compra",
      options: {
        filter: true,
        filterType: 'custom',
        customFilterListOptions: {
          render: v => {
            if (v[0] && v[1] && false) {
              return [`Fecha Inicio: ${new Date(v[0]).toLocaleDateString()}`, `Fecha Final: ${new Date(v[1]).toLocaleDateString()}`];
            } else if (v[0] && v[1] && true) {
              return `Fecha Inicio: ${new Date(v[0]).toLocaleDateString()}, Fecha Final: ${new Date(v[1]).toLocaleDateString()}`;
            } else if (v[0]) {
              return `Fecha Inicio: ${new Date(v[0]).toLocaleDateString()}`;
            } else if (v[1]) {
              return `Fecha Final: ${new Date(v[1]).toLocaleDateString()}`;
            }
            return [];
          },
          update: (filterList, filterPos, index) => {
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, '');
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false,
          names: [],
          logic(age, filters) {
            var date = new Date(age.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
            if (filters[0] && filters[1]) {
              return date.getTime() < new Date(filters[0]).getTime() || date.getTime() > new Date(filters[1]).getTime();
            } else if (filters[0]) {
              return date.getTime() < new Date(filters[0]).getTime();
            } else if (filters[1]) {
              return date.getTime() > new Date(filters[1]).getTime();
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div style={{ width: '100%' }}>
              <FormLabel>Fecha</FormLabel>
              <FormGroup row>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <DatePicker
                    cancelLabel="CANCELAR"
                    error={false}
                    format="dd/MM/yyyy"
                    label="Inicio"
                    value={filterList[index][0] || null}
                    onChange={event => {
                      filterList[index][0] = event;
                      filterList[index][1] = null;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: '48%' }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <DatePicker
                    style={{ width: '48%', marginLeft: '4%' }}
                    cancelLabel="CANCELAR"
                    error={false}
                    format="dd/MM/yyyy"
                    label="Final"
                    value={filterList[index][1] || null}
                    onChange={event => {
                      filterList[index][1] = event;
                      onChange(filterList[index], index, column);
                    }}
                    minDate={filterList[index][0] != null ? new Date(filterList[index][0]).setTime(new Date(filterList[index][0]).getTime() + 1 * 86400000) : null}
                  />
                </MuiPickersUtilsProvider>
              </FormGroup>
            </div>
          ),
        },
        customBodyRender: value =>
          (value != null && value != undefined && value != "") ? moment(new Date(value)).format(SPACED_DATE_FORMAT) : "",
        print: false,
      },
    },
    {
      name: "notes",
      label: "Notas",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        },
        setCellProps: value => {
          return {
            style: {
              wordBreak: "break-word"
            }
          };
        },
      }
    },
    {
      name: "totalItems",
      label: "Total Artículos ",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    // {
    //   name: "freight",
    //   label: "Flete aproximado ",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     display: false,
    //     filterOptions: { 
    //       fullWidth: window.screen.width <= 1024 ? true : false
    //     }
    //   }
    // },
    {
      name: "total",
      label: "Total Compra",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "sendMethod",
      label: "Método de entrega",
      options: {
        filter: true,
        viewColumns: true,
        sort: true,
        display: true,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "detalles",
      label: " ",
      options: {
        filter: false,
        sort: true,
        viewColumns: false,
        download: false
      }
    },
  ]

  const handleDetalle = (item) => {
    history.push({
      pathname: `/Ventas/CompraDetalle/${item.id}`,
      prev: history.location.pathname
    });
  };

  const detallesButton = (item) => {
    return (
      <React.Fragment>
        <Tooltip title={"Detalles"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDetalle(item)}
            startIcon={<Details />}
          >
            Detalles
              </Button>
        </Tooltip>
      </React.Fragment>
    );
  }

  const builddata = orders.map(item => {
    return [
      item.id,
      item.badge,
      item.name,
      item.email,
      item.phone,
      item.province,
      item.canton,
      item.district,
      item.address,
      item.campaign.name,
      item.createdDate,
      item.notes,
      item.totalItems,
      // "₡" + (item.freight ? item.freight : 0),
      "₡" + parseFloat(item.total).toFixed(2),
      item.sendMethod,
      detallesButton(item)
    ]
  })

  const options = {
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: false,
    print: false,
    download: isAdmin,
    downloadOptions: {
      filename: 'Compras.csv',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    },
    onDownload: (buildHead, buildBody, columns, data) => {
      return "\uFEFF" + buildHead(columns) + buildBody(data);
    },
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
    customSort: (data, colIndex, order) => { return data.sort((a, b) => { if (colIndex === 5 || colIndex === 6) { return (new Date(a.data[colIndex]) < new Date(b.data[colIndex]) ? -1 : 1) * (order === 'desc' ? 1 : -1); } else { return (a.data[colIndex] < b.data[colIndex] ? -1 : 1) * (order === 'desc' ? 1 : -1); } }); },
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
    (isLoading) ? <Loading /> :
      (admin || !isAdmin) ?
        <div className={classes.tableMargin + " m-sm-30"}>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              {/* { isLoading ? <Loading /> :   */}
              <Card style={{ position: "sticky" }} className="w-100 overflow-auto" elevation={6}>
                <MuiThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable className="w-100"
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
        : <NotFound />

  )
}

export default ComprasTable
