import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetBuildings } from "../../../redux/actions/BuildingActions";
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
import { Link } from 'react-router-dom';
import history from "history.js";
import CustomFooter from '../../muidatatable/CustomFooter';
import NotFound from "../../sessions/NotFound"
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";

const BenefitsLinksTable = (props) => {
    const dispatch = useDispatch();
    const isAdmin = props.admin != undefined ? props.admin : true;
    const user = useSelector(state => state.user);
    const buildings = useSelector(state => state.building.buildings);
    // const purchases = useSelector(state => state.order.purchases);
    // const addCampaign = useSelector(state => state.campaign.addCampaign);
    const successCampaign = useSelector(state => state.campaign.success);
    const campaignsActive = useSelector(state => state.campaign.campaignsActive);
    const isLoading  = useSelector(state => state.campaign.loading);
    const SPACED_DATE_FORMAT = "DD/MM/YYYY";  
    //const [open, setOpen] = useState(false);
    const edificios = [{id:1, name: "Edificio 1", active: false}, {id:2, name: "Edificio 2", active: false}, {id:3, name: "Edificio 3", active: false}]
    const [edificioshabilitados, setEdificiosHabilitados] = useState([{id:1, name: "Edificio 1"}])
    // const [purchaseList, setPurchaseList] = useState([]);
    buildings = [{name: "Facebook", link: ""}, {name: "Instagram", link: ""}]
    

    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
  
    useEffect(() => {
        // dispatch(CleanPurchase());
        //dispatch(GetBuildings());
        // !isAdmin && dispatch(GetCampaignsActive());
    }, []);

    useEffect(() => {
      setBuilddata(props.benefitsLinks.length == 0 ? buildings.map((item, index) => {
        return { 
          "idBuilding": item.id,
          "nameBuilding": item.name,
          "activeBuilding": item.active,
          "active": false,
        }
      }) : buildings.map((item, index) => {
        return { 
          "id": props.benefitsLinks[index] == undefined ? undefined : props.benefitsLinks[index].id,
          "nameBuilding": item.name,
          "active": props.benefitsLinks[index] == undefined ? false : props.benefitsLinks[index].active,
          "activeBuilding": item.active,
          "idBuilding": item.id,
        }
      }))
  }, [buildings]);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const handleDelete = async (id) => {
      //await dispatch(DeleteCampaign(id));
      //setOpen(true);
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
      var edificiosChange = props.benefitsLinks.length == 0 ? buildings.map((item, index) => {
        return { 
          "idBuilding": item.id,
          "nameBuilding": item.name,
          "activeBuilding": item.active,
          "active": index == dataIndex ? (builddata[index] && builddata[index].active ? false : true) : builddata[index].active 
        }
      }) : buildings.map((item, index) => {
        return { 
            "id": props.benefitsLinks[index] == undefined ? undefined : props.benefitsLinks[index].id,
            "nameBuilding": item.name,
            "active": index == dataIndex ? (props.benefitsLinks[index] != undefined ? (props.benefitsLinks[index] && props.benefitsLinks[index].active ? false : true) : (buildings[index].active ? false : true)) : (props.benefitsLinks[index] != undefined ? props.benefitsLinks[index].active : buildings[index].active),
            "activeBuilding": item.active,
            "idBuilding": item.id,
        }
      });
      setBuilddata(edificiosChange) 
      props.setBenefitsLinks(edificiosChange); 
      console.log("buildata", edificiosChange)
    }

    const [builddata, setBuilddata] = useState( props.benefitsLinks.length == 0 ? buildings.map((item, index) => {
      return { 
         "name": item.name,
      }
    }) : buildings.map((item, index) => {
      return { 
        "name": item.name,
      }
    }))

    const columns = [
        {
          name: "name",
          label: "Nombre",
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
              let value = builddata[dataIndex].active;
              
              //return <TextField onClick={() => changeStatus(dataIndex)} style={{backgroundColor: value == true ? "#039be5" : "gray", margin: "1%", color: "white"}} label={value == true ? "Habilitado" : "Deshabilitado"}  />;
              return <TextValidator
              //className={classes.textvalidator}
              //label="Prueba*"
              onBlur={() => {console.log("hola")}}
              type="text"
              name="prueba"
              //disabled={true}
              //value={ventasform.badge}
              //validators={["required", "maxStringLength:5"]}
              //errorMessages={["Este campo es requerido", "Máximo 5 carácteres"]}
              />
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
            {console.log(props.benefitsLinks, buildings)}
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

export default BenefitsLinksTable