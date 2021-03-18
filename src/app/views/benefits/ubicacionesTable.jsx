import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import CustomToolbarSelect from "../venta-activos/ventasTables/CustomSelect"
import {
    Icon,
    Button,
    Card,
    Grid,
    Tooltip,
    Dialog,
    Typography,
    IconButton,
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Link } from 'react-router-dom';
import history from "history.js";
import CustomFooter from '../muidatatable/CustomFooter';
import NotFound from "../sessions/NotFound"
import { makeStyles } from '@material-ui/core/styles';
import { GetCampaignItemsById, DeleteCampaignItem, GetCampaignsItems } from "../../redux/actions/CampaignActions";
import { GetBenefitsLocations } from "../../redux/actions/BenefitsActions";
import ValidationModal from '../growth-opportunities/components/ValidationDialog';
import AgregarDialog from "./FormLocations"
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

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
        width: "62%",
        marginLeft: "19%"
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
    const employeeRefunds = useSelector(state => state.refound.employeeRefunds.filter(item => item.anio != -1));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const image = null;
    //const benefitslocations = useSelector(state => state.benefit.benefitslocations);
    const campaignitem = [
        {id: "3",
        idBenefit: "3",
        address: "San José, Avenida 2, Calle 15. Frente a la Plaza de la democracia",
        province: "San José",
        canton: "San José", 
        phone: "2222-2222",
        whatsapp: "+ (506) 8888-2222",
        }
    ];
    const successCampaignItems = useSelector(state => state.campaign.success);
    const isLoading  = useSelector(state => state.campaign.loading);
    const [open, setOpen] = useState(false);
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    const [shouldOpenNewDialog, setShouldOpenNewDialog] = useState({ open: false, type: "new" });

    useEffect(() => {
      //dispatch(GetBenefitsLocations());
      console.log("effect")
    }, []);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const handleDelete = async (id) => {
      await dispatch(DeleteCampaignItem(id));
      setOpen(true);
    };

    const handleEdit= (id) => {
      console.log(id)
      setShouldOpenNewDialog({ open: true, type: "edit", id: id, idBenefit: props.idBenefit })
      
    };

    const handleClose = () => {
      setShouldOpenNewDialog({open: false, index: 0});
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
          item.benefit.idBenefit,
          item.address,
          item.provincia,
          item.canton,
          item.phone,
          item.whatsApp,
      ]}
    })

    const columns = [
        {
          name: "id",
          label: "ID Location",
          options: {
            filter: false,
            sort: true,
            display: false,
            //viewColumns: false,
          }
        },
        {
            name: "idBenefit",
            label: "ID Benefit",
            options: {
             filter: false,
             sort: true,
             display: false,
             //viewColumns: false,
            }
        },
        {
          name: "address",
          label: "Address",
          options: {
           filter: true,
           sort: true,
           display: true,
           //viewColumns: false,
           filterOptions: { 
            fullWidth: window.screen.width <= 1024 ? true : false
           }
          }
        },
        {
          name: "province",
          label: "Province",
          options: {
           filter: true,
           sort: true,
           display: true,
           //viewColumns: false,
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
           //viewColumns: false,
           filterOptions: { 
            fullWidth: window.screen.width <= 1024 ? true : false
           }
          }
        },
        {
          name: "phone",
          label: "Phone",
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
    (false || user.badge == undefined) ? <Loading /> :
      admin ?
        <div className={props.type != "detail" ? classes.tableMargin + " m-sm-30" : "m-sm-30"}>
          {console.log(props.benefitslocations)}
          {(false) ? <Loading /> : <ValidationModal idioma={"Español"} path={"/Ventas/AdminFormBenefits"} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => {dispatch(GetCampaignsItems());}} message={(successCampaignItems) ? "¡Eliminado exitosamente!" : "¡Se produjo un error, el artículo no pudo ser eliminado!"} setOpen={setOpen} open={open} />}
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              {/* { isLoading ? <Loading /> :   */}
                      <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                          <MuiThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable  className="w-100"
                                title={<div style={{display: "inline-flex"}}>{props.type != "detail" ? addButton() : null} &nbsp; &nbsp; &nbsp;  <h4 style={{alignSelf: "flex-end"}}>Localizaciones</h4></div>}
                                data={builddata}
                                columns={columns}
                                options={options}
                            />
                          </MuiThemeProvider>
                      </Card>
              {/* } */}
            </Grid>
          </Grid>
          <Dialog fullWidth maxWidth="md" onClose={handleClose} open={shouldOpenNewDialog.open}>
          <DialogTitle  id="customized-dialog-title" onClose={handleClose}>
          
            </DialogTitle>
          <AgregarDialog type={shouldOpenNewDialog.type} close={handleClose} id={shouldOpenNewDialog.id} idBenefit={shouldOpenNewDialog.idBenefit} />
          </Dialog>
        </div> 
      : <NotFound/>
  )
}

export default LocationsTable
