import React, { useEffect, useState } from "react";
import {
    IconButton,
    Icon, 
    Tooltip,
    Card,
    Button,
    makeStyles
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { setGrowthOpportunity } from "../../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import MyMetrics from '../metrics';
import { string } from "yup";
import moment from "moment";

const GrowthOppTable = ({
    growth_opportunities,
    setGrowthOpportunity, 
    props
}) => {
    const { history, match } = props
    const [shouldOpenMetricsDialog, setShouldOpenMetricsDialog] = useState(false);
    const SPACED_DATE_FORMAT = "DD/MM/YYYY hh:mm:ss"; 
    
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

    const getMuiTheme = () =>
    createMuiTheme({
    });

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
       },
       {
        name: "Area",
       },
       {
        name: "Expiration Date",
        options: {
            filter: true,
            sort: true,
            // customBodyRender: value =>
            // moment(new Date(value)).format(SPACED_DATE_FORMAT)
        }
       },
       {
        name: "Details",
        options: {
            filter: false
        }
       },
    ]

        
    const options = {
        selectableRowsHideCheckboxes: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: false,
        download: false,
        print: false,      
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
            {console.log("growth data", buildData)}
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
