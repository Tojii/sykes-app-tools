import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import CustomToolbarSelect from "../../venta-activos/ventasTables/CustomSelect"
import { Button, Card, Grid, Tooltip, FormLabel, FormGroup } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import history from "history.js";
import CustomFooter from '../../muidatatable/CustomFooter';
import NotFound from "../../sessions/NotFound"
import { makeStyles } from '@material-ui/core/styles';
import { DeleteBenefitCategory, GetCategories } from "../../../redux/actions/BenefitsCategoryActions";
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
import { Link } from 'react-router-dom';
import { Breadcrumb } from "matx";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import es from "date-fns/locale/es";
import {
    MuiPickersUtilsProvider,
    DatePicker 
  } from "@material-ui/pickers";
import moment from "moment";


const useStyles = makeStyles({
  sectionbutton: {
    "@media (min-width: 0px)": {
      maxWidth: "140px",
      marginLeft: "0%" 
    },
    "@media (min-width: 1024px)": {
      maxWidth: "150px",
    }
  },
  tableMargin: {     
    "@media (min-width: 0px)": {
        marginBottom: "25%",
    },
    "@media (min-width: 1024px)": {
        marginBottom: "5%",
    },
  },
});

const CategoriesTable = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const categories = useSelector(state => state.category.benefitscategories);
    const image = null;
    const successCampaignItems = useSelector(state => state.category.success);
    const isLoading  = useSelector(state => state.category.loading);
    const [open, setOpen] = useState(false);
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner')) : false
    const [shouldOpenNewDialog, setShouldOpenNewDialog] = useState({ open: false, type: "new" });
    const SPACED_DATE_FORMAT = "DD/MM/YYYY"; 

    useEffect(() => {
      dispatch(GetCategories());
      console.log("effect")
    }, []);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const handleDelete = async (id) => {
      await dispatch(DeleteBenefitCategory(id));
      setOpen(true);
    };

    const handleEdit= (id) => {
      //console.log(id)
      history.push(`/Benefits/FormCategoryBenefits/${id}`);
    };

    const handleClose = () => {
      setShouldOpenNewDialog({open: false, index: 0});
    }

    const showImage = (item) => {
      return (
        item.image ?
        <img
          className={classes.sectionbutton}                                         
          alt="..."
          src={`${item.image}`}
        /> : ""
      );
    }

    const addButton = () => {
      return (
          <React.Fragment>
            <Tooltip title={"Nuevo"}>
              <Button
                component={Link} to="/Benefits/FormCategoryBenefits"
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

    const builddata = categories.map(item => {
      if (item != undefined) {
      return [
          item.idCategory,
          item.name,
          item.order,
          showImage(item),
      ]}
    })

    const columns = [
        {
          name: "id",
          label: "ID Categoría",
          options: {
            filter: false,
            sort: true,
            display: false,
          }
        },
        {
          name: "name",
          label: "Nombre",
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
          name: "order",
          label: "Orden",
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
          name: "image",
          label: "Imagen",
          options: {
            download: false,
            viewColumns: false,
            filter: false,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
    ]

    const options = {
      selectableRowsHeader: false,
      selectableRowsOnClick: true,
      isRowSelectable: (dataIndex, selectedRows) => {
        //prevents selection of any additional row after the third
        if (selectedRows.data.length > 0 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        //prevents selection of row with title "Attorney"
        return categories[dataIndex][1] != "Attorney";
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} question={"¿Desea eliminar la categoría "} index={1} setSelectedRows={setSelectedRows} eliminar={handleDelete} editar={handleEdit} />
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
    (isLoading || user.badge == undefined) ? <Loading /> :
      admin ?
        <div className={props.type != "detail" ? classes.tableMargin + " m-sm-30" : "m-sm-30"}>
          {console.log(categories)}
          <div className="mb-sm-30">
                <Breadcrumb
                routeSegments={[
                { name: "Benefits Home", path: "/Benefits/Home" },
                { name: "Configuraciones", path: `/Benefits/Configuration` }, 
                { name: "Admin Categorías", path: "/Benefits/Categories" },               
                ]}
            />
          </div>
          {(isLoading) ? <Loading /> : <ValidationModal idioma={"Español"} path={history.location.pathname} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => {dispatch(GetCategories())}} message={(successCampaignItems) ? "¡Eliminado exitosamente!" : "¡Se produjo un error, la categoría no pudo ser eliminada!"} setOpen={setOpen} open={open} />}
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              {/* { isLoading ? <Loading /> :   */}
                <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                    <MuiThemeProvider theme={getMuiTheme()}>
                      <MUIDataTable  className="w-100"
                          title={<div style={{display: "inline-flex"}}>{props.type != "detail" ? addButton() : null} &nbsp; &nbsp; &nbsp;  <h4 style={{alignSelf: "flex-end"}}>Administración de Categorías</h4></div>}
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
      : <NotFound/>
  )
}

export default CategoriesTable
