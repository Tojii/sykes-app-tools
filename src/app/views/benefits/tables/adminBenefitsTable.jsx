import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import CustomToolbarSelect from "../../venta-activos/ventasTables/CustomSelect"
import { Button, Card, Grid, Tooltip } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Link } from 'react-router-dom';
import history from "history.js";
import CustomFooter from '../../muidatatable/CustomFooter';
import NotFound from "../../sessions/NotFound"
import { makeStyles } from '@material-ui/core/styles';
import { DeleteBenefit, GetBenefits } from "../../../redux/actions/BenefitsActions";
import ValidationModal from '../../growth-opportunities/components/ValidationDialog';
import Details from "@material-ui/icons/Details";
import Chip from '@material-ui/core/Chip';

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

const AdminBenefitsTable = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const benefits = useSelector(state => state.benefit.benefits);
    const successBenefit = useSelector(state => state.benefit.success);
    const isLoading  = useSelector(state => state.benefit.loading);
    const [open, setOpen] = useState(false);
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner')) : false

    useEffect(() => {
      dispatch(GetBenefits());
    }, []);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const handleDelete = async (id) => {
      await dispatch(DeleteBenefit(id));
      setOpen(true);
    };

    const handleEdit= (id) => {
      history.push(`/Benefits/FormAdminBenefits/${id}`);
    };

    const addButton = () => { //button in table to add New Benefit
      return (
          <React.Fragment>
            <Tooltip title={"Nuevo"}>
              <Button
                component={Link} to="/Benefits/FormAdminBenefits"
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

    const handleDetalle = (item) => {    
      history.push({
        pathname: `/Benefits/AdminFormBenefitsDetails/${item.benefit.idBenefit}`,
        prev: history.location.pathname
      });
    };
  
    const detallesButton = (item) => { //button in table to show benefit details 
      return (
          <React.Fragment>
            <Tooltip title={"Detalles"}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDetalle(item)}
                startIcon={<Details />}
              >
                Detalles
              </Button>
            </Tooltip>
          </React.Fragment>
      );
    }

    const showImage = (item) => { // function to show images in rows
      return (
        item.benefit.logo ?
        <img
          className={classes.sectionbutton}                                         
          alt="..."
          src={`${item.benefit.logo}`}
        /> : ""
      );
    }

    const builddata = benefits.map(item => {
      if (item != undefined) {
      return [
          item.benefit.idBenefit,
          item.benefit.category.idCategory,
          item.benefit.category.name,
          item.benefit.name,
          item.benefit.detail,
          item.benefit.description,
          item.benefit.benefitInfo,
          item.benefit.link,
          item.benefit.facebook,
          item.benefit.instagram,
          item.benefit.email,
          item.benefit.active ? ["Active"] : ["Inactive"],
          (Array.from(new Set(item.locations.map(item2 => {return item2.provincia })))),
          (Array.from(new Set(item.locations.map(item2 => {return item2.canton })))),
          (Array.from(new Set(item.locations.map(item2 => {return item2.distrito })))),
          showImage(item),
          detallesButton(item)
      ]}
    })

    const columns = [
        {
          name: "id",
          label: "ID Beneficio",
          options: {
            filter: false,
            sort: true,
            display: false,
          }
        },
        {
            name: "idCategory",
            label: "ID Categoría",
            options: {
             filter: false,
             sort: true,
             display: false,
            }
        },
        {
          name: "category",
          label: "Categoría",
          options: {
           filter: true,
           sort: true,
           display: true,
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
          name: "detail",
          label: "Detalle",
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
          label: "Descripción",
          options: {
            filter: true,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
          name: "benefitInfo",
          label: "Información de Beneficio",
          options: {
            filter: true,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
          name: "link",
          label: "Link",
          options: {
            filter: true,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
          name: "facebook",
          label: "Facebook",
          options: {
            filter: true,
            display: false,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
          name: "instagram",
          label: "Instagram",
          options: {
            filter: true,
            display: false,
            sort: true,
            filterOptions: { 
              fullWidth: window.screen.width <= 1024 ? true : false
            }
          }
        },
        {
            name: "email",
            label: "Email",
            options: {
              filter: true,
              display: false,
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
              let value = builddata[dataIndex][11];
              return value.map((val, key) => {
                return <Chip style={{backgroundColor: val == "Active" ? "#4cb050" : "#939598", margin: "1%", color: "white"}} label={val} key={key} />;
              });
            },
          }
        },  
        {
          name: "Provincias",
          options: {
            filter: true,
            customBodyRenderLite: (dataIndex) => {
              let value = builddata[dataIndex][12];
              return value.filter((val, key) => {
                if (!val || val == "") {return false}
                return true 
              }).map((val, key) => {
                return <Chip style={{backgroundColor: "#039be5", margin: "1%", color: "white"}} label={val} key={key} />;
              });
            },
          }
        },
        {
          name: "Cantones",
          options: {
            filter: true,
            customBodyRenderLite: (dataIndex) => {
              let value = builddata[dataIndex][13];
              return value.filter((val, key) => {
                if (!val || val == "") {return false}
                return true 
              }).map((val, key) => {
                return <Chip style={{backgroundColor: "#039be5", margin: "1%", color: "white"}} label={val} key={key} />;
              });
            },
          }
        },
        {
          name: "Distritos",
          options: {
            filter: true,
            display: false,
            customBodyRenderLite: (dataIndex) => {
              let value = builddata[dataIndex][14];
              return value.filter((val, key) => {
                if (!val || val == "") {return false}
                return true 
              }).map((val, key) => {
                return <Chip style={{backgroundColor: "#039be5", margin: "1%", color: "white"}} label={val} key={key} />;
              });
            },
          }
        },
        {
          name: "logo",
          label: "Logo",
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
          name: "detalles",
          label: " ",
          options: {
            filter: false,
            sort: true,
            viewColumns: false,
            download: false
          }
        },
    ]

    const options = {
      selectableRowsHeader: false,
      selectableRowsOnClick: true,
      isRowSelectable: (dataIndex, selectedRows) => {
        if (selectedRows.data.length > 0 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        return benefits[dataIndex][1] != "Attorney";
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} question={"¿Desea eliminar el beneficio "} index={2} setSelectedRows={setSelectedRows} eliminar={handleDelete} editar={handleEdit} />
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
        <div className={classes.tableMargin + " m-sm-20"}>
          {console.log(benefits)}
          {(isLoading) ? <Loading /> :<ValidationModal idioma={"Español"} path={"/Benefits/AdminFormBenefits"} state={(successBenefit) ? "Success!" : "Error!"} save={() => {dispatch(GetBenefits());}} message={(successBenefit) ? "¡Eliminado exitosamente!" : "¡Se produjo un error, el beneficio no pudo ser eliminado!"} setOpen={setOpen} open={open} />}
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                  <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable  className="w-100"
                        title={<div style={{display: "inline-flex"}}>{addButton()} &nbsp; &nbsp; &nbsp;  <h4 style={{alignSelf: "flex-end"}}>Administración de Beneficios</h4></div>}
                        data={builddata}
                        columns={columns}
                        options={options}
                    />
                  </MuiThemeProvider>
              </Card>
            </Grid>
          </Grid>
        </div> 
      : <NotFound/>
  )
}

export default AdminBenefitsTable
