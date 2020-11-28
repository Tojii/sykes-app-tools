import React, { useEffect } from "react";
import { classList } from "utils";
import { getJobsApplied } from "../../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";

const ApplicationsTable = ({
    jobs_applied,
    getJobsApplied,
    props
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

    const buildData = jobs_applied.map(item => {
        return [item.job, buildStatusLabel(item), item.created, ]
    })

    const columns = ["Job Position", "Status", "Application Date"]

    useEffect(() => {
        getJobsApplied();
    }, [])

    return (
        <>
            <MUIDataTable
                title={"My applications"}
                data={buildData}
                columns={columns}
            />
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
    getJobsApplied,
})(ApplicationsTable);
