import React, { useEffect, useState } from "react";
import {
    IconButton,
    Icon, 
    Tooltip,
    Card
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { setGrowthOpportunity } from "../../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";

const GrowthOppTable = ({
    growth_opportunities,
    setGrowthOpportunity, 
    props
}) => {
    const { history, match } = props
    
    const handleDetailsClick = (item) => {
        setGrowthOpportunity(item);
        history.push(`${match.path}/${item.id}`);
    }

    const handleMyMetricsClick = () => {
        history.push(`my-metrics`);
    }

    const getMuiTheme = () =>
    createMuiTheme({
     
    });

    const buildDetailButton = (item) => {
        return (
            <>
                <IconButton
                    color="primary"
                    onClick={() => handleDetailsClick(item)}
                >
                <Icon>chevron_right</Icon>
                </IconButton>
            </>
        )
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
        customToolbar: () => {
            return (
                <>
                    <Tooltip title={"My metrics"}>
                        <IconButton onClick={handleMyMetricsClick}>
                            <DashboardIcon/>
                        </IconButton>
                    </Tooltip>
                </>
            );
        }
    };

    return (
        <>
            <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable className="w-100"
                    title={"Growth opportunities"}
                    data={buildData}
                    columns={columns}
                    options={options}
                />
            </MuiThemeProvider>
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
