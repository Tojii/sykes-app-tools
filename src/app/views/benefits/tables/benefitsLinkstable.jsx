import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { GetSocialLinks } from "../../../redux/actions/BenefitsLinksActions";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import {
    Button,
    Card,
    Grid,
    Tooltip,
    Chip
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import CustomFooter from '../../muidatatable/CustomFooter';
import NotFound from "../../sessions/NotFound"
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
    const isLoading  = useSelector(state => state.links.loading);
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner')) : false
  
    useEffect(() => {
        dispatch(GetSocialLinks());
    }, []);

    useEffect(() => {
      console.log("effect", props.benefitsLinks)
      setBuilddata( props.benefitsLinks.length == 0 ? links.filter(function(item) {
        if (!item.active) {
          return false; // skip
        }
        return true;
        }).map((item, index) => {
        return { 
           "idBenefitLink": item.idBenefitLink,
           "name": item.name,
           "link": item.link != null ? item.link : "",
           "showIcon": showImage(item),
           "order" : index + 1,
           "icon": item.icon,
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
          "link": props.benefitsLinks[index] != undefined ? props.benefitsLinks[index].link : "",
          "showIcon": showImage(item),
          "order" : props.benefitsLinks.find(element => element.idBenefitLink == item.idBenefitLink) != undefined ? props.benefitsLinks.find(element => element.idBenefitLink == item.idBenefitLink).order : index + 1,
          "icon": item.icon,
        }
      }))
  }, [links, props.benefitsLinks]);

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
          "showIcon": showImage(item),
          "active": item.active,
          "order": builddata[index].order,
          "link": index == dataIndex ? link : builddata[index].link,
          "icon": item.icon
        }
      });
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
          "showIcon": showImage(item),
          "active": item.active,
          "order": index == dataIndex ? order : order == builddata[index].order ? actualorder : builddata[index].order,
          "link": builddata[index].link,
          "icon": item.icon
        }
      });
      setBuilddata(linksChange) 
      props.setBenefitsLinks(linksChange);
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
         "showIcon": showImage(item),
         "order" : index + 1,
         "icon": item.icon,
      }
    }) : links.filter(function(item) {
      if (!item.active) {
        console.log("find", props.benefitsLinks.find(element => element.idBenefitLink == item.idBenefitLink))
        return false; // skip
      }
      return true;
      }).map((item, index) => {
      return { 
        "idBenefitLink": item.idBenefitLink,
        "name": item.name,
        "link": props.benefitsLinks.find(element => element.idBenefitLink == item.idBenefitLink) != undefined ? (props.benefitsLinks.find(element => element.idBenefitLink == item.idBenefitLink)).link : "",
        "showIcon": showImage(item),
        "order" : props.benefitsLinks.find(element => element.idBenefitLink == item.idBenefitLink) != undefined ? props.benefitsLinks.find(element => element.idBenefitLink == item.idBenefitLink).order : index + 1,
        "icon": item.icon,
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
          name: "showIcon",
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
              if (isAdmin) {return <TextValidator
              onBlur={(e) => {changeLink(e.target.value, dataIndex)}}
              type="text"
              name="prueba"
              defaultValue={value}
              validators={["matchRegexp:^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$"]}
              errorMessages={["Formato de url no válido"]}
              />} else {return value}
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
              if (isAdmin) {return <SelectValidator
              onChange={(e) => {changeOrder(e.target.value, dataIndex)}}
              type="text"
              name="prueba"
              value={value}
              >
                {links.map((data, index) => (
                    <MenuItem key={`data-${data.order}`} id={data.order} value={index + 1}>
                    {index + 1 || " "}
                    </MenuItem> 
                ))}
              </SelectValidator>} else {return value}
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
            {console.log("links", builddata)}
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