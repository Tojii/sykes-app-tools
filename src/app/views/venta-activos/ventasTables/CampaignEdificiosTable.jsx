import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetCampaigns, GetCampaignsActive, DeleteCampaign } from "../../../redux/actions/CampaignActions";
import { CleanPurchase } from "../../../redux/actions/OrderActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import CustomToolbarSelect from "./CustomSelect"
import {
    Button,
    Card,
    Grid,
    Tooltip,
    Chip
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

const EdificiosTable = (props) => {
    const dispatch = useDispatch();
    const isAdmin = props.admin != undefined ? props.admin : true;
    const user = useSelector(state => state.user);
    const campaigns = useSelector(state => state.campaign.campaigns);
    // const purchases = useSelector(state => state.order.purchases);
    // const addCampaign = useSelector(state => state.campaign.addCampaign);
    const successCampaign = useSelector(state => state.campaign.success);
    const campaignsActive = useSelector(state => state.campaign.campaignsActive);
    const isLoading  = useSelector(state => state.campaign.loading);
    const SPACED_DATE_FORMAT = "DD/MM/YYYY";  
    const [open, setOpen] = useState(false);
    const edificios = [{id:1, name: "Edificio 1"}, {id:2, name: "Edificio 2"}, {id:3, name: "Edificio 3"}]
    const [edificioshabilitados, setEdificiosHabilitados] = useState([{id:1, name: "Edificio 1"}])
    // const [purchaseList, setPurchaseList] = useState([]);
    

    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
  
    useEffect(() => {
        // dispatch(CleanPurchase());
        // isAdmin && dispatch(GetCampaigns());
        // !isAdmin && dispatch(GetCampaignsActive());
        
    }, []);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const handleDelete = async (id) => {
      await dispatch(DeleteCampaign(id));
      setOpen(true);
    };

    const handleEdit = (id) => { 
      history.push(`/Ventas/FormAdminEdificios/${id}`);
    };

    const addButton = () => {
      return (
          <React.Fragment>
            <Tooltip title={"Nuevo"}>
              <Button
                component={Link} to="/Ventas/FormAdminEdificios"
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

    const changeStatus = (dataIndex) => {
      var edificiosChange = edificios.map((item, index) => {
        return [
            item.id,
            item.name,
            index == dataIndex ? (builddata[index] && builddata[index][2].includes("Habilitado") ? ["Deshabilitado"] : ["Habilitado"]) : builddata[index][2] 
        ]
      });
      setBuilddata(edificiosChange) 
      props.setEdificiosCampaign(edificiosChange); 
      console.log("buildata", builddata)
    }

    const [builddata, setBuilddata] = useState( edificios.map((item, index) => {
      return [
          item.id,
          item.name,
          props.edificiosCampaign.length == 0 ? ["Deshabilitado"] : props.edificiosCampaign[index][2],
      ]
    }))

    const columns = [
        {
            name: "id",
            label: "ID Edificio ",
            options: {
             filter: false,
             sort: true,
             //display: false,
             //viewColumns: isAdmin,
            }
        },
        {
          name: "name",
          label: "Nombre Edificio ",
          options: {
           filter: true,
           sort: true,
           filterOptions: { 
            fullWidth: window.screen.width <= 1024 ? true : false
           }
          }
        },   
        {
          name: " ",
          options: {
            filter: true,
            //display: false,
            customBodyRenderLite: (dataIndex) => {
              let value = builddata[dataIndex][2];
              return value.map((val, key) => {
                return <Chip onClick={() => changeStatus(dataIndex)} style={{backgroundColor: val == "Habilitado" ? "#039be5" : "gray", margin: "1%", color: "white"}} label={val} key={key} />;
              });
            },
          }
        },    
    ]

    const options = {
      selectableRowsHideCheckboxes: true,
      selectableRowsHeader: false,
      isRowSelectable: (dataIndex, selectedRows) => {
        //prevents selection of any additional row after the third
        if (selectedRows.data.length > 0 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        //prevents selection of row with title "Attorney"
        return builddata[dataIndex][1] != "Attorney";
      },
      selectableRowsOnClick: false,
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} question={"¿Desea eliminar el edificio "} index={1} setSelectedRows={setSelectedRows} eliminar={handleDelete} editar={handleEdit} />
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
          text: "línea seleccionada",
          delete: "Delete",
          deleteAria: "Delete Selected Rows",
        },
      }
  }

  return (
      isLoading ? <Loading /> :
        (admin || !isAdmin) ?
          <div className="m-sm-30">
            
            {isLoading ? <Loading /> : <ValidationModal idioma={"Español"} path={"/Ventas/Campaign"} state={(successCampaign) ? "Success!" : "Error!"} save={() => {dispatch(GetCampaigns());}} message={(successCampaign) ? "¡Eliminado exitosamente!" : "¡Se produjo un error, el edificio no pudo ser eliminado!"} setOpen={setOpen} open={open} />}
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                {/* { isLoading ? <Loading /> :   */}
                        <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                            <MuiThemeProvider theme={getMuiTheme()}>
                              <MUIDataTable  className="w-100"
                                  title={<div style={{display: "inline-flex"}}><h4 style={{alignSelf: "flex-end"}}>Selección de Edificios</h4></div>}
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

export default EdificiosTable
