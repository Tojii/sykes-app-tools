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
    Tooltip
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Link } from 'react-router-dom';
import history from "history.js";
import CustomFooter from '../muidatatable/CustomFooter';
import NotFound from "../sessions/NotFound"
import { makeStyles } from '@material-ui/core/styles';
import { GetCampaignItemsById, DeleteCampaignItem, GetCampaignsItems } from "../../redux/actions/CampaignActions";
import ValidationModal from '../growth-opportunities/components/ValidationDialog';
import Details from "@material-ui/icons/Details";

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
        marginBottom: "25%",
    },
    "@media (min-width: 1024px)": {
        marginBottom: "5%",
    },
  },
});

const AdminBenefitsTable = () => {
    const employeeRefunds = useSelector(state => state.refound.employeeRefunds.filter(item => item.anio != -1));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const image = null;
    const campaignitem = [
        {id: "3",
        idCategory: "3",
        name: "nombre",
        detail: "detail",
        description: "description",
        logo: null,
        link: "www.link.com",
        facebook: "www.facebook.com",
        instagram: "www.intagram.com",
        email: "email",}
    ];
    const successCampaignItems = useSelector(state => state.campaign.success);
    const isLoading  = useSelector(state => state.campaign.loading);
    const [open, setOpen] = useState(false);
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    

    useEffect(() => {
      //dispatch(GetCampaignsItems());
    }, []);

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const handleDelete = async (id) => {
      await dispatch(DeleteCampaignItem(id));
      setOpen(true);
    };

    const handleEdit= (id) => {
      history.push(`/Benefits/FormAdminBenefits/${id}`);
      
    };

    const addButton = () => {
      return (
          <React.Fragment>
            <Tooltip title={"Nuevo"}>
              <Button
                component={Link} to="/Benefits/FormAdminBenefits"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                New
              </Button>
            </Tooltip>
          </React.Fragment>
      );
    }

    const handleDetalle = (item) => {    
      history.push({
        pathname: `/Benefits/AdminFormBenefitsDetails/${item.id}`,
        prev: history.location.pathname
      });
    };
  
    const detallesButton = (item) => {
      return (
          <React.Fragment>
            <Tooltip title={"Detalles"}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDetalle(item)}
                startIcon={<Details />}
              >
                Details
              </Button>
            </Tooltip>
          </React.Fragment>
      );
    }

    const showImage = (item) => {
      return (
        item.logo ?
        <img
        className={classes.sectionbutton}                                         
        alt="..."
        src={`${item.logo}`}
        /> : ""
      );
    }

    const builddata = campaignitem.map(item => {
      if (item != undefined) {
      return [
          item.id,
          item.idCategory,
          item.name,
          item.detail,
          item.description,
          item.link,
          item.facebook,
          item.instagram,
          item.email,
          showImage(item),
          detallesButton(item)
      ]}
    })

    const columns = [
        {
          name: "id",
          label: "ID Benefit",
          options: {
            filter: false,
            sort: true,
            display: false,
            //viewColumns: false,
          }
        },
        {
            name: "idCategory",
            label: "ID Category",
            options: {
             filter: false,
             sort: true,
             display: false,
             //viewColumns: false,
            }
        },
        {
          name: "name",
          label: "Name",
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
          name: "detail",
          label: "Detail",
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
          label: "Description",
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
              sort: true,
              filterOptions: { 
                fullWidth: window.screen.width <= 1024 ? true : false
              }
            }
          },
        {
            name: "logo",
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
        //prevents selection of any additional row after the third
        if (selectedRows.data.length > 0 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        //prevents selection of row with title "Attorney"
        return campaignitem[dataIndex][1] != "Attorney";
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
      
  }

  return (
    (isLoading || user.badge == undefined) ? <Loading /> :
      admin ?
        <div className={classes.tableMargin + " m-sm-30"}>
          {(isLoading) ? <Loading /> :<ValidationModal idioma={"Español"} path={"/Benefits/AdminFormBenefits"} state={(successCampaignItems) ? "Success!" : "Error!"} save={() => {dispatch(GetCampaignsItems());}} message={(successCampaignItems) ? "¡Eliminado exitosamente!" : "¡Se produjo un error, el artículo no pudo ser eliminado!"} setOpen={setOpen} open={open} />}
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              {/* { isLoading ? <Loading /> :   */}
                      <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                          <MuiThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable  className="w-100"
                                title={<div style={{display: "inline-flex"}}>{addButton()} &nbsp; &nbsp; &nbsp;  <h4 style={{alignSelf: "flex-end"}}>Benefits Administration</h4></div>}
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

export default AdminBenefitsTable
