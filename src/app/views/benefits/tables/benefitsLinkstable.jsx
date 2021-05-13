import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetSocialLinks } from "../../../redux/actions/BenefitsLinksActions";
// import { CleanPurchase } from "../../../redux/actions/OrderActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
// import CustomToolbarSelect from "./CustomSelect"
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
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

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
  miniatureimage: {
    maxWidth: "40px"
  },
});

const BenefitsLinksTable = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const isAdmin = props.admin != undefined ? props.admin : true;
    const user = useSelector(state => state.user);
    const links = useSelector(state => state.links.benefitslinks);
    //const buildings = useSelector(state => state.building.buildings);
    // const purchases = useSelector(state => state.order.purchases);
    // const addCampaign = useSelector(state => state.campaign.addCampaign);
    const successCampaign = useSelector(state => state.campaign.success);
    const campaignsActive = useSelector(state => state.campaign.campaignsActive);
    const isLoading  = useSelector(state => state.links.loading);
    const SPACED_DATE_FORMAT = "DD/MM/YYYY";  
    //const [open, setOpen] = useState(false);
    const edificios = [{id:1, name: "Edificio 1", active: false}, {id:2, name: "Edificio 2", active: false}, {id:3, name: "Edificio 3", active: false}]
    const [edificioshabilitados, setEdificiosHabilitados] = useState([{id:1, name: "Edificio 1"}])
    // const [purchaseList, setPurchaseList] = useState([]);
    const buildings = [{name: "Facebook", link: ""}, {name: "Instagram", link: ""}]
    

    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
  
    useEffect(() => {
        // dispatch(CleanPurchase());
        dispatch(GetSocialLinks());
        // !isAdmin && dispatch(GetCampaignsActive());
    }, []);

  //   useEffect(() => {
  //     setBuilddata(props.benefitsLinks.length == 0 ? buildings.map((item, index) => {
  //       return { 
  //         "idBuilding": item.id,
  //         "nameBuilding": item.name,
  //         "activeBuilding": item.active,
  //         "active": false,
  //       }
  //     }) : buildings.map((item, index) => {
  //       return { 
  //         "id": props.benefitsLinks[index] == undefined ? undefined : props.benefitsLinks[index].id,
  //         "nameBuilding": item.name,
  //         "active": props.benefitsLinks[index] == undefined ? false : props.benefitsLinks[index].active,
  //         "activeBuilding": item.active,
  //         "idBuilding": item.id,
  //       }
  //     }))
  // }, [buildings]);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const showImage = (item) => {
      return (
        item.icon ?
        <img
          width= {"40px"}
          className={classes.miniatureimage}                                        
          alt="..."
          src={`${item.icon}`}
        /> : ""
      );
    }

    const changeLink = (link, dataIndex) => {
      //console.log(link, dataIndex)
      var linksChange = links.filter(function(item) {
        if (!item.active) {
          return false; // skip
        }
        return true;
        }).map((item, index) => {
        return { 
          "idBenefitLink": item.idBenefitLink,
          "name": item.name,
          "icon": showImage(item),
          "active": item.active,
          "order": builddata[index].order,
          "link": index == dataIndex ? link : builddata[index].link 
        }
      });
      //console.log("cambio",linksChange)
      setBuilddata(linksChange) 
      props.setBenefitsLinks(linksChange);
    }

    const changeOrder = (order, dataIndex) => {
      //console.log(link, dataIndex)
      var actualorder = builddata[dataIndex].order
      var linksChange = links.filter(function(item) {
        if (!item.active) {
          return false; // skip
        }
        return true;
        }).map((item, index) => {
        return { 
          "idBenefitLink": item.idBenefitLink,
          "name": item.name,
          "icon": showImage(item),
          "active": item.active,
          "order": index == dataIndex ? order : order == builddata[index].order ? actualorder : builddata[index].order,
          "link": builddata[index].link 
        }
      });
      //console.log("cambio",linksChange)
      setBuilddata(linksChange) 
      props.setBenefitsLinks(linksChange);
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

    const [builddata, setBuilddata] = useState( props.benefitsLinks.length == 0 ? links.filter(function(item) {
      if (!item.active) {
        return false; // skip
      }
      return true;
      }).map((item, index) => {
      return { 
         "idBenefitLink": item.idBenefitLink,
         "name": item.name,
         "link": item.link != null ? item.link : "",
         "icon": showImage(item),
         "order" : index + 1,
      }
    }) : links.filter(function(item) {
      if (!item.active) {
        return false; // skip
      }
      return true;
      }).map((item, index) => {
      return { 
        "idBenefitLink": item.idBenefitLink,
        "name": item.name,
        "link": item.link != null ? item.link : "",
        "icon": showImage(item),
        "order" : index + 1,
      }
    }))

    const columns = [
        {
          name: "id",
          label: "ID Vínculo",
          options: {
            filter: false,
            sort: true,
            display: false,
          }
        },
        {
          name: "icon",
          label: " ",
          options: {
            download: false,
            viewColumns: false,
            filter: true,
            sort: true,
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
           sort: true,
           filterOptions: { 
            fullWidth: window.screen.width <= 1024 ? true : false
           }
          }
        },   
        {
          name: "Link",
          options: {
            filter: true,
            //display: false,
            customBodyRenderLite: (dataIndex) => {
              let value = builddata[dataIndex].link
              //console.log("hola",builddata)
              //return <TextField onClick={() => changeStatus(dataIndex)} style={{backgroundColor: value == true ? "#039be5" : "gray", margin: "1%", color: "white"}} label={value == true ? "Habilitado" : "Deshabilitado"}  />;
              return <TextValidator
              //className={classes.textvalidator}
              //label="Prueba*"
              onBlur={(e) => {changeLink(e.target.value, dataIndex)}}
              type="text"
              name="prueba"
              defaultValue={value}
              validators={["matchRegexp:^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$"]}
              errorMessages={["Formato de url no válido"]}
              //value={value}
              />
            },
          }
        },  
        {
          name: "Orden",
          options: {
            filter: true,
            //display: false,
            customBodyRenderLite: (dataIndex) => {
              let value = builddata[dataIndex].order
              //console.log("hola",builddata)
              //return <TextField onClick={() => changeStatus(dataIndex)} style={{backgroundColor: value == true ? "#039be5" : "gray", margin: "1%", color: "white"}} label={value == true ? "Habilitado" : "Deshabilitado"}  />;
              return <SelectValidator
              //className={classes.textvalidator}
              //label="Prueba*"
              onChange={(e) => {changeOrder(e.target.value, dataIndex)}}
              type="text"
              name="prueba"
              //defaultValue={value}
              //validators={["matchRegexp:^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$"]}
              //errorMessages={["Formato de url no válido"]}
              value={value}
              >
                {builddata.map(data => (
                    <MenuItem key={`data-${data.order}`} id={data.order} value={data.order}>
                    {data.order || " "}
                    </MenuItem> 
                ))}
              </SelectValidator>
            },
          }
        },    
    ]

    const options = {
      selectableRowsHideCheckboxes: true,
      selectableRowsHeader: false,
      selectableRowsOnClick: false,
      print:false,
      download: false,
      vertical: true,
      filter: false,
      search: false,
      viewColumns: false,
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
          <div className={classes.tableMargin + " m-sm-30"}>
            {console.log("links", links)}
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                {/* { isLoading ? <Loading /> :   */}
                        <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                            <MuiThemeProvider theme={getMuiTheme()}>
                              <MUIDataTable  className="w-100"
                                  title={<div style={{display: "inline-flex"}}><h4 style={{alignSelf: "flex-end"}}>Vínculos del beneficio</h4></div>}
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