import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetBuildings } from "../../../redux/actions/BuildingActions";
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
import { Link } from 'react-router-dom';
import history from "history.js";
import CustomFooter from '../../muidatatable/CustomFooter';
import NotFound from "../../sessions/NotFound"

const EdificiosTable = (props) => {
    const dispatch = useDispatch();
    const isAdmin = props.admin != undefined ? props.admin : true;
    const user = useSelector(state => state.user);
    const buildings = useSelector(state => state.building.buildings);
    const isLoading  = useSelector(state => state.campaign.loading);
    const isLoadingBuilding  = useSelector(state => state.building.loading);
    const [open, setOpen] = useState(false);
    

    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
  
    useEffect(() => {
        dispatch(GetBuildings());
    }, []);

    useEffect(() => {
      setBuilddata(props.edificiosCampaign.length == 0 ? buildings.sort(function(a, b) {
        var textA = a.idBuilding;
        var textB = b.idBuilding;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }).map((item, index) => {
        return { 
          "idBuilding": item.id,
          "nameBuilding": item.name,
          "activeBuilding": item.active,
          "active": false,
        }
      }) : buildings.sort(function(a, b) {
        var textA = a.idBuilding;
        var textB = b.idBuilding;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }).map((item, index) => {
        return { 
          "id": props.edificiosCampaign[index] == undefined ? undefined : props.edificiosCampaign[index].id,
          "nameBuilding": item.name,
          "active": props.edificiosCampaign[index] == undefined ? false : props.edificiosCampaign[index].active,
          "activeBuilding": item.active,
          "idBuilding": item.id,
        }
      }))
  }, [buildings, props.edificiosCampaign]);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const handleDelete = async (id) => {
      setOpen(true);
    };

    const handleEdit = (id) => { 
      history.push(`/Ventas/FormAdminEdificios/${id}`);
    };

    const changeStatus = (dataIndex) => {
      var edificiosChange = props.edificiosCampaign.length == 0 ? buildings.map((item, index) => {
        return { 
          "idBuilding": item.id,
          "nameBuilding": item.name,
          "activeBuilding": item.active,
          "active": index == dataIndex ? (builddata[index] && builddata[index].active ? false : true) : builddata[index].active 
        }
      }) : buildings.map((item, index) => {
        return { 
            "id": props.edificiosCampaign[index] == undefined ? undefined : props.edificiosCampaign[index].id,
            "nameBuilding": item.name,
            "active": index == dataIndex ? (props.edificiosCampaign[index] != undefined ? (props.edificiosCampaign[index] && props.edificiosCampaign[index].active ? false : true) : (buildings[index].active ? false : true)) : (props.edificiosCampaign[index] != undefined ? props.edificiosCampaign[index].active : false),
            "activeBuilding": item.active,
            "idBuilding": item.id,
        }
      });
      setBuilddata(edificiosChange) 
      props.setEdificiosCampaign(edificiosChange); 
      //console.log("buildata", edificiosChange)
    }

    const [builddata, setBuilddata] = useState( props.edificiosCampaign.length == 0 ? buildings.map((item, index) => {
      return { 
         "idBuilding": item.id,
         "nameBuilding": item.name,
         "activeBuilding": item.active,
         "active": false,
      }
    }) : buildings.map((item, index) => {
      return { 
        "id": props.edificiosCampaign[index] == undefined ? undefined : props.edificiosCampaign[index].id,
        "nameBuilding": item.name,
        "active": props.edificiosCampaign[index] == undefined ? false : props.edificiosCampaign[index].active,
        "activeBuilding": item.active,
        "idBuilding": item.id,
      }
    }))

    const columns = [
        {
            name: "idBuilding",
            label: "ID Edificio ",
            options: {
             filter: false,
             sort: true,
            }
        },
        {
          name: "nameBuilding",
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
            filter: false,
            viewColumns: false,
            //display: false,
            customBodyRenderLite: (dataIndex) => {
              let value = builddata[dataIndex].active;
              
              return <Chip onClick={() => changeStatus(dataIndex)} style={{backgroundColor: value == true ? "#039be5" : "gray", margin: "1%", color: "white"}} label={value == true ? "Habilitado" : "Deshabilitado"}  />;
             
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
      (isLoading || isLoadingBuilding) ? <Loading /> :
        (admin || !isAdmin) ?
          <div className="m-sm-30">
            {/* {console.log("buildata",builddata)} */}
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
