import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import CustomToolbarSelect from "../../venta-activos/ventasTables/CustomSelect"
import { Button, Card, Grid, Tooltip, Dialog, Typography, IconButton } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import history from "history.js";
import CustomFooter from '../../muidatatable/CustomFooter';
import NotFound from "../../sessions/NotFound"
import { makeStyles } from '@material-ui/core/styles';
import { DeleteBenefitLocation, GetBenefitsById } from "../../../redux/actions/BenefitsActions";
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
import AgregarDialog from "../forms/FormLocations"
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  sectionbutton: {
    "@media (min-width: 0px)": {
      maxWidth: "140px",
      marginLeft: "0%"
    },
    "@media (min-width: 1024px)": {
      maxWidth: "300px",
    }
  },
  tableMargin: {
    "@media (min-width: 0px)": {
    },
    "@media (min-width: 1024px)": {
      width: "70%",
      marginLeft: "15%"
    },
  },
});

const styles = (theme) => ({
  root: {
    margin: "auto",
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

const LocationsTable = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const successCampaignItems = useSelector(state => state.benefit.success);
  const isLoadingLocation = useSelector(state => state.benefit.loadingLocation);
  const isLoading = useSelector(state => state.benefit.loading);
  const [open, setOpen] = useState(false);
  const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner')) : false
  const [shouldOpenNewDialog, setShouldOpenNewDialog] = useState({ open: false, type: "new" });

  useEffect(() => {
    //dispatch(GetBenefitsLocations());
  }, []);

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiTableCell: {
          root: {
            backgroundColor: "white"
          }
        }
      }
    });

  const handleDelete = async (id) => {
    await dispatch(DeleteBenefitLocation(id));
    setOpen(true);
  };

  const handleEdit = (id) => {
    setShouldOpenNewDialog({ open: true, type: "edit", id: id, idBenefit: props.idBenefit })
  };

  const handleClose = () => {
    setShouldOpenNewDialog({ open: false, index: 0 });
  }

  const addButton = () => {
    return (
      <React.Fragment>
        <Tooltip title={"Nuevo"}>
          <Button
            onClick={() => setShouldOpenNewDialog({ open: true, type: "new", idBenefit: props.idBenefit })}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Nuevo
              </Button>
        </Tooltip>
      </React.Fragment>
    );
  }

  const builddata = props.benefitslocations.map(item => {
    if (item != undefined) {
      return [
        item.idLocation,
        props.idBenefit,
        item.address,
        item.ubicationType,
        item.provincia,
        item.canton,
        item.phone,
        item.whatsApp,
        item.active ? ["Active"] : ["Inactive"],
        item.principalLocation ? ["Active"] : ["Inactive"],
      ]
    }
  })

  const columns = [
    {
      name: "id",
      label: "ID Localización",
      options: {
        filter: false,
        sort: true,
        display: false,
      }
    },
    {
      name: "idBenefit",
      label: "ID Beneficio",
      options: {
        filter: false,
        sort: true,
        display: false,
      }
    },
    {
      name: "address",
      label: "Dirección",
      options: {
        filter: true,
        sort: true,
        display: true,
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
      name: "ubicationType",
      label: "Tipo de Ubicación",
      options: {
        filter: true,
        sort: true,
        display: true,
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
        sort: true,
        display: true,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "canton",
      label: "Canton",
      options: {
        filter: true,
        sort: true,
        display: true,
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
        sort: true,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "whatsapp",
      label: "WhatsApp",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          fullWidth: window.screen.width <= 1024 ? true : false
        }
      }
    },
    {
      name: "Activo",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let value = builddata[dataIndex][8];
          return value.map((val, key) => {
            return <Chip style={{ backgroundColor: val == "Active" ? "#4cb050" : "#939598", margin: "1%", color: "white" }} label={val} key={key} />;
          });
        },
      }
    },
    {
      name: "Localización Principal",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let value = builddata[dataIndex][9];
          return value.map((val, key) => {
            return <Chip style={{ backgroundColor: val == "Active" ? "#4cb050" : "#939598", margin: "1%", color: "white" }} label={val} key={key} />;
          });
        },
      }
    },
  ]

  const options = {
    selectableRowsHeader: false,
    selectableRowsOnClick: props.type != "detail" ? true : false,
    selectableRowsHideCheckboxes: props.type == "detail" ? true : false,
    isRowSelectable: (dataIndex, selectedRows) => {
      //prevents selection of any additional row after the third
      if (selectedRows.data.length > 0 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
      //prevents selection of row with title "Attorney"
      return props.benefitslocations[dataIndex][1] != "Attorney";
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} question={"¿Desea eliminar la localización "} index={2} setSelectedRows={setSelectedRows} eliminar={handleDelete} editar={handleEdit} />
    ),
    print: false,
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
        text: "fila seleccionada",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    }
  }

  return (
    (isLoading) ? <Loading /> :
      admin ?
        <div className={props.type != "detail" ? classes.tableMargin + " m-sm-30" : "m-sm-30"}>
          {(isLoading || isLoadingLocation) ? <Loading /> : <ValidationModal idioma={"Español"} path={history.location.pathname} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => { dispatch(GetBenefitsById(props.idBenefit)) }} message={(successCampaignItems) ? "¡Eliminado exitosamente!" : "¡Se produjo un error, la localización no pudo ser eliminada!"} setOpen={setOpen} open={open} />}
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              {/* { isLoading ? <Loading /> :   */}
              <Card style={{ position: "sticky" }} className="w-100 overflow-auto" elevation={6}>
                <MuiThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable className="w-100"
                    title={<div style={{ display: "inline-flex" }}>{props.type != "detail" ? addButton() : null} &nbsp; &nbsp; &nbsp;  <h4 style={{ alignSelf: "flex-end" }}>Localizaciones</h4></div>}
                    data={builddata}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>
              </Card>
              {/* } */}
            </Grid>
          </Grid>
          <Dialog disableBackdropClick fullWidth maxWidth="md" onClose={handleClose} open={shouldOpenNewDialog.open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}></DialogTitle>
            <AgregarDialog type={shouldOpenNewDialog.type} close={handleClose} id={shouldOpenNewDialog.id} idBenefit={shouldOpenNewDialog.idBenefit} />
          </Dialog>
        </div>
        : <NotFound />
  )
}

export default LocationsTable
