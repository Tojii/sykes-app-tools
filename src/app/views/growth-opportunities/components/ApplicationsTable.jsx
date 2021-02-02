import React, { useEffect } from "react";
import { classList } from "utils";
import { getJobsApplied } from "../../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import moment from "moment";
import CustomFooter from '../../muidatatable/CustomFooter';

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
    const SPACED_DATE_FORMAT = "DD/MM/YYYY"; 

    const buildData = jobs_applied.map(item => {
        return [item.job, buildStatusLabel(item), item.created, ]
    });

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

    const columns = [
        {
            name: "Job Position"
        },
        {
            name:"Status",
            options: {
                filter: false
            }
        },
        {
            name:"Application Date",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value =>
                (value != null && value != undefined && value != "") ? moment(new Date(value)).format(SPACED_DATE_FORMAT) : ""           
            }
            
        }
    ]

    return (
        <>
            <Card style={{position: "sticky"}} className="w-100 overflow-auto" elevation={6}>
                <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable className="w-100" 
                        title={"My applications"}
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
    const { jobs_applied } = growthReducer;
    return {
        jobs_applied,
    };
};

export default connect(mapStateToProps, {
})(ApplicationsTable);
