import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetRefoundListByUser } from "../../../redux/actions/RefoundActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import CustomToolbarSelect from "./CustomSelect"
import {
    Icon,
    Button,
    Card,
    Grid,
    Tooltip
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Link } from 'react-router-dom';
import history from "history.js";
import CustomFooter from '../../muidatatable/CustomFooter';
import { GetImages } from "../../../redux/actions/CommonActions";
import NotFound from "../../sessions/NotFound"
import { GetCampaignItemsById, DeleteCampaignItem, GetCampaignsItems } from "../../../redux/actions/CampaignActions";
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';

const InventarioTable = () => {
    const employeeRefunds = useSelector(state => state.refound.employeeRefunds.filter(item => item.anio != -1));
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const image = null;
    const campaignitem = useSelector(state => state.campaign.campaignitems);
    const successCampaignItems = useSelector(state => state.campaign.success);
    const isLoading  = useSelector(state => state.campaign.loading);
    const [open, setOpen] = useState(false);
    const admin = (user != null && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    

    useEffect(() => {
      dispatch(GetCampaignsItems());
    }, []);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const handleDelete = async (id) => {
      await dispatch(DeleteCampaignItem(id));
      setOpen(true);
    };

    const handleEdit= (id) => {
      history.push(`/Ventas/FormAdminInventario/${id}`);
      
    };

    const addButton = () => {
      return (
          <React.Fragment>
            <Tooltip title={"Nuevo"}>
              <Button
                component={Link} to="/Ventas/FormAdminInventario"
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

    const showImage = (item) => {
      return (
        item.image ? <img
        height={"257px"}
        width={"195px"}                                         
        alt="..."
        src={`${item.image}`}
        /> : ""
      );
    }

    const builddata = campaignitem.map(item => {
      if (item != undefined) {
      return [
          item.id,
          item.campaign.id,
          item.name,
          item.description,
          showImage(item),
          item.quantity,
          item.stockQuantity,
          "₡" + item.unitPrice,
          item.maxLimitPerPerson,
      ]}
    })

    const columns = [
        {
          name: "id",
          label: "ID Artículo",
          options: {
            filter: false,
            sort: true,
            display: false,
            //viewColumns: false,
          }
        },
        {
            name: "campaignid",
            label: "ID Campaña",
            options: {
             filter: false,
             sort: true,
             display: false,
             //viewColumns: false,
            }
        },
        {
          name: "name",
          label: "Nombre Artículo",
          options: {
           filter: true,
           sort: true,
           filterOptions: { 
            fullWidth: window.screen.width <= 1024 ? true : false
           }
          }
        },
        {
          name: "description",
          label: "Descripción Artículo",
          options: {
            filter: true,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
          name: "image",
          label: " ",
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
        {
          name: "quantity",
          label: "Inventario Inicial ",
          options: {
            filter: true,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
          name: "stockQuantity",
          label: "Existencias",
          options: {
            filter: true,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
          name: "unitPrice",
          label: "Valor Artículo",
          options: {
            filter: true,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
          name: "maxLimitPerPerson",
          label: "Límite Máximo Artículo",
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
      selectableRowsOnClick: true,
      isRowSelectable: (dataIndex, selectedRows) => {
        //prevents selection of any additional row after the third
        if (selectedRows.data.length > 0 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        //prevents selection of row with title "Attorney"
        return campaignitem[dataIndex][1] != "Attorney";
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} question={"¿Desea eliminar el artículo "} index={2} setSelectedRows={setSelectedRows} eliminar={handleDelete} editar={handleEdit} />
      ),
      print:false,
      download: true,
      downloadOptions: {
        filename: 'Inventario.csv',
        filterOptions: {
          useDisplayedColumnsOnly: true,
          useDisplayedRowsOnly: true
        }
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
          text: "Linea(s) seleccionadas",
          delete: "Delete",
          deleteAria: "Delete Selected Rows",
        },
      }
  }

  return (
    (isLoading || !user) ? <Loading /> :
      admin ?
        <div className="m-sm-30">
          <ValidationModal idioma={"Español"} path={"/Ventas/Inventario"} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => {dispatch(GetCampaignsItems());}} message={(successCampaignItems) ? "¡Eliminado exitosamente!" : "¡Se produjo un error, el artículo no pudo ser eliminado!"} setOpen={setOpen} open={open} />
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              {/* { isLoading ? <Loading /> :   */}
                      <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                          <MuiThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable  className="w-100"
                                title={<div style={{display: "inline-flex"}}>{addButton()} &nbsp; &nbsp; &nbsp;  <h4 style={{alignSelf: "flex-end"}}>Administración de Inventario</h4></div>}
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

export default InventarioTable
