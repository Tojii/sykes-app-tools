import React, { useEffect, useState } from "react";
import {
    IconButton,
    Icon, 
    Tooltip,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { setGrowthOpportunity } from "../../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";

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
        return [item.title, item.area, item.expirationDate, buildDetailButton(item)]
    })

    const columns = ["Job Position", "Area", "Expiration Date", "Details"]

        
    const options = {
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
            <MUIDataTable
                title={"Growth opportunities"}
                data={buildData}
                columns={columns}
                options={options}
            />
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
