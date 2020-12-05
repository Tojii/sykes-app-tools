import React, { useEffect } from "react";
import { classList } from "utils";
import { getJobsApplied } from "../../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";

const ApplicationsTable = ({
    jobs_applied
}) => {

    const buildStatusLabel = (item) => {
        return (
            <>
                <small
                    className={classList({
                        "border-radius-4 text-white px-8 py-2": true,
                        "bg-primary": `${item.status}` === 'Approved',
                        "bg-error": `${item.status}` === 'Denied',
                    })}
                >
                { item.status }
                </small>
            </>
        )
    }

    const getMuiTheme = () =>
    createMuiTheme({
    });

    const buildData = jobs_applied.map(item => {
        return [item.job, buildStatusLabel(item), item.created, ]
    });

    const options = {
        selectableRowsHideCheckboxes: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: false,
        download: false,
        print: false, 
    };

    const columns = ["Job Position", "Status", "Application Date"]

    return (
        <>
            <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable className="w-100"
                    title={"My applications"}
                    data={buildData}
                    columns={columns}
                    options={options}
                />
            </MuiThemeProvider>
        </>
    )
}

const mapStateToProps = ({ growthReducer }) => {
    const { jobs_applied } = growthReducer;
    return {
        jobs_applied,
    };
};

export default connect(mapStateToProps, {
})(ApplicationsTable);
