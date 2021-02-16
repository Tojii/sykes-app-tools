import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetCampaigns, GetCampaignsActive, GetCampaignsById, UpdateCampaign, DeleteCampaign } from "../../../redux/actions/CampaignActions";
import { GetUserPurchased, CleanPurchase } from "../../../redux/actions/OrderActions";
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
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { Link } from 'react-router-dom';
import history from "history.js";
import CustomFooter from '../../muidatatable/CustomFooter';
import NotFound from "../../sessions/NotFound"
import moment from "moment"
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';

const CampaignTable = (props) => {
    //const employeeRefunds = useSelector(state => state.refound.employeeRefunds.filter(item => item.anio != -1));
    const dispatch = useDispatch();
    const isAdmin = props.admin != undefined ? props.admin : true;
    const user = useSelector(state => state.user);
    const campaigns = useSelector(state => state.campaign.campaigns);
    const purchases = useSelector(state => state.order.purchases);
    const addCampaign = useSelector(state => state.campaign.addCampaign);
    const successCampaign = useSelector(state => state.campaign.success);
    const campaignsActive = useSelector(state => state.campaign.campaignsActive);
    const isLoading  = useSelector(state => state.campaign.loading);
    const SPACED_DATE_FORMAT = "DD/MM/YYYY";  
    const [open, setOpen] = useState(false);
    const [purchaseList, setPurchaseList] = useState([]);
    

    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    //console.log("admin", isAdmin)
    //const isLoading  = useSelector(state => state.refound.loading);
    //const user = useSelector(state => state.user);
  
    useEffect(() => {
        dispatch(CleanPurchase());
        isAdmin && dispatch(GetCampaigns());
        !isAdmin && dispatch(GetCampaignsActive());
        // dispatch(GetCampaignsById("4"));
        
        // dispatch(UpdateCampaign("4",{
        //   "id": 4,
        //   "name": "UpdateCampaña",
        //   "description": "update by app6",
        //   "startDate": "2021-02-09T19:54:18.297Z",
        //   "endDate": "2021-02-09T19:54:18.297Z",
        //   "maxLimitPerPerson": 5
        // }));
    }, []);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const handleDelete = async (id) => {
      //alert(`Eliminado!` + id);
      await dispatch(DeleteCampaign(id));
      //await dispatch(GetCampaigns());
      setOpen(true);
      //setShouldOpenConfirmationDialog(true)
      
    };

    const handleEdit = (id) => {
      //alert(`Edit!` + id);
      //setShouldOpenConfirmationDialog(true)   
      //dispatch(GetCampaignsById("5"));   
      history.push(`/Ventas/FormAdminCampaign/${id}`);
    };

    const handleComprar = (item) => {
      //alert(`Edit!` + id);
      //setShouldOpenConfirmationDialog(true)      
      history.push(`/Ventas/form/${item.id}`);
    };

    const addButton = () => {
      return (
          <React.Fragment>
            <Tooltip title={"Nuevo"}>
              {/* <IconButton component={Link} to="/ReembolsoEducativo/Nuevo">
                <AddIcon/>
              </IconButton> */}
              <Button
                component={Link} to="/Ventas/FormAdminCampaign"
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

    const compraButton = (item) => {
      //dispatch(GetUserPurchased(item.id));
      return (
          <React.Fragment>
            <Tooltip title={"Comprar"}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleComprar(item)}
                startIcon={<ShoppingCart />}
              >
                Comprar
              </Button>
            </Tooltip>
          </React.Fragment>
      );
    }

    // const data = [
    //   {
    //     "id": "5",
    //     "name": "Campaña 1",
    //     "description": "Temporary Quality",
    //     "fechaInicio": "2021/01/03",
    //     "fechaFinalizacion": "2021/01/31",
    //     "limite": "10",
    //   },
    //   {
    //     "id": "1222",
    //     "name": "Campaña 2",
    //     "description": "description",
    //     "fechaInicio": "2021/01/13",
    //     "fechaFinalizacion": "2021/01/28",
    //     "limite": "5",
    //   },
    // ];

    const builddata = isAdmin ? campaigns.map(item => {
      return [
          item.id,
          item.name, 
          item.description,
          item.startDate,
          item.endDate,
          item.maxLimitPerPerson,
          compraButton(item)
      ]
  }) : campaignsActive.map(item => {
    return [
        item.id,
        item.name, 
        item.description,
        item.startDate,
        item.endDate,
        item.maxLimitPerPerson,
        compraButton(item)
    ]
  })

    const columns = [
        {
            name: "id",
            label: "ID Campaña ",
            options: {
             filter: false,
             sort: true,
             display: false,
             //viewColumns: false,
            }
        },
        {
          name: "name",
          label: "Nombre Campaña ",
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
          label: "Descripción Campaña ",
          options: {
            filter: true,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
          name: "startDate",
          label: "Fecha Inicio ",
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
          name: "endDate",
          label: "Fecha Finalización",
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
          name: "maxLimitPerPerson",
          label: "Límite Máximo Artículos ",
          options: {
            filter: true,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
          name: "compra",
          label: " ",
          options: {
          filter: false,
          sort: true,
          display: !isAdmin,
          viewColumns: false,
          }
        },
       
    ]

    const options = {
      selectableRowsHideCheckboxes: !isAdmin,
      selectableRowsHeader: false,
      isRowSelectable: (dataIndex, selectedRows) => {
        //prevents selection of any additional row after the third
        if (selectedRows.data.length > 0 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        //prevents selection of row with title "Attorney"
        return builddata[dataIndex][1] != "Attorney";
      },
      selectableRowsOnClick: isAdmin,
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} question={"¿Desea eliminar la campaña "} index={1} setSelectedRows={setSelectedRows} eliminar={handleDelete} editar={handleEdit} />
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
          text: "línea seleccionada",
          delete: "Delete",
          deleteAria: "Delete Selected Rows",
        },
      }
  }

  return (
      console.log("clean",purchases),
      isLoading ? <Loading /> :
        (admin || !isAdmin) ?
          <div className="m-sm-30">
            <ValidationModal idioma={"Español"} path={"/Ventas/Campaign"} state={(successCampaign) ? "Success!" : "Error!"} save={() => {dispatch(GetCampaigns());}} message={(successCampaign) ? "¡Eliminado exitosamente!" : "¡Se produjo un error, la campaña no pudo ser eliminada!"} setOpen={setOpen} open={open} />
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                {/* { isLoading ? <Loading /> :   */}
                        <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                            <MuiThemeProvider theme={getMuiTheme()}>
                              <MUIDataTable  className="w-100"
                                  title={isAdmin ? <div style={{display: "inline-flex"}}>{addButton()} &nbsp; &nbsp; &nbsp;  <h4 style={{alignSelf: "flex-end"}}>Administración de Campaña</h4></div> : <h4 style={{alignSelf: "flex-end"}}>Campañas activas</h4>}
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

export default CampaignTable
