import React, { useEffect, useState } from "react";
import {
    IconButton,
    Icon, 
    Tooltip,
    Card,
    Button,
    makeStyles,
    FormControl,
    ListItemText,
    Checkbox,
    Select,
    InputLabel,
    MenuItem
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { setGrowthOpportunity } from "../../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import MyMetrics from '../metrics';
import { string } from "yup";
import moment from "moment";
import CustomFooter from '../../muidatatable/CustomFooter';

const GrowthOppTable = ({
    growth_opportunities,
    setGrowthOpportunity, 
    props
}) => {
    const { history, match } = props
    const [shouldOpenMetricsDialog, setShouldOpenMetricsDialog] = useState(false);
    const SPACED_DATE_FORMAT = "DD/MM/YYYY"; 
    
    const handleDetailsClick = (item) => {
        setGrowthOpportunity(item);
        history.push(`${match.path}/${item.id}`);
    }

    const handleMyMetricsClick = () => {
        // history.push(`my-metrics`);
        //return (<MyMetrics/>);
        setShouldOpenMetricsDialog(true);
    }

    const handleDialogClose = () => {
        setShouldOpenMetricsDialog(false);
      };

    const getMuiTheme = () => createMuiTheme({
        overrides: {
          MuiMenuItem: {
            root: {
              whiteSpace: "unset"
            }
          }
        }
    })

    const buildDetailButton = (item) => {
        return (
            <>
                <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleDetailsClick(item)}
                >
                <Icon>chevron_right</Icon>
                </IconButton>
            </>
        )
    }

    const addButton = () => {
        return (
            <React.Fragment>
              <Tooltip title={"Metrics"}>
                <Button
                  onClick={handleMyMetricsClick}
                  //component={Link} to="/ReembolsoEducativo/Nuevo"
                  variant="contained"
                  color="primary"
                  //className={classes.button}
                  startIcon={<DashboardIcon/>}
                >
                  Metrics
                </Button>
              </Tooltip>
            </React.Fragment>
        );
    }

    const buildData = growth_opportunities.map(item => {
        return [
            item.title,
            item.area, 
            item.expirationDate,
            buildDetailButton(item)
        ]
    })

    const columns = [ 
       {
        name: "Job Position",
        options: {
            filterOptions: { 
                fullWidth: window.screen.width <= 1024 ? true : false,
            }
        }
       },
       {
        name: "Area",
        options: {
            filterOptions: { 
                fullWidth: window.screen.width <= 1024 ? true : false
            }
        }
       },
       {
        name: "Expiration Date",
        options: {
            filter: true,
            sort: true,
            filterOptions: { 
                fullWidth: window.screen.width <= 1024 ? true : false
            },
            customBodyRender: value =>
            (value != null && value != undefined && value != "") ? moment(new Date(value)).format(SPACED_DATE_FORMAT) : ""
            // customFilterListRender: value =>
            // moment(new Date(value)).format(SPACED_DATE_FORMAT),
            // customFilterListOptions: {
            //     render: v => moment(new Date(v)).format(SPACED_DATE_FORMAT)
            //   },
            // filterOptions: {
            //     renderValue: v => moment(new Date(v)).format(SPACED_DATE_FORMAT)
            // },
            
           
        }
       },
       {
        name: "Details",
        options: {
            filter: false,
        }
       },
    ]

        
    const options = {
        selectableRowsHideCheckboxes: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: false,
        download: false,
        print: false,  
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
    };

    return (
        <>
            {shouldOpenMetricsDialog && (
                <MyMetrics
                handleClose={handleDialogClose}
                open={shouldOpenMetricsDialog}
                //uid={this.state.uid}
                />
            )}
            <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable className="w-100" 
                        title={<div style={{display: "inline-flex"}}>{addButton()} &nbsp; &nbsp; &nbsp;  <h4 style={{alignSelf: "flex-end"}}>Growth opportunities</h4></div>}
                        data={buildData}
                        columns={columns}
                        options={options}
                    />
                </MuiThemeProvider>
            </Card>
        </>
    )
}

const mapStateToProps = ({ growthReducer }) => {
    const { growth_opportunities } = growthReducer;
    return {
        growth_opportunities,
    };
};

export default connect(mapStateToProps, {
    setGrowthOpportunity,
})(GrowthOppTable);
