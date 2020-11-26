import React, { useEffect } from "react";
import {
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { classList } from "utils";
import { getJobsApplied } from "../../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";

const ApplicationsTable = ({
    jobs_applied,
    getJobsApplied,
    props
}) => {


    useEffect(() => {
        getJobsApplied();
    }, [])
    return (
        <>
            <Grid item lg={12}>
                <h3 className="p-sm-24">My applications</h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={"50%"}className="pl-sm-24">Job Position</TableCell>
                            <TableCell className="pl-sm-24">Status</TableCell>
                            <TableCell className="pl-sm-24">Application Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { jobs_applied.map(item => {
                            return (
                                <TableRow key={ item.id }>
                                    <TableCell className="p-sm-24">{ item.job }</TableCell>
                                    <TableCell className="pl-sm-24 capitalize">
                                        <small
                                        className={classList({
                                            "border-radius-4 text-white px-8 py-2": true,
                                            "bg-primary": `${item.status}` === 'Approved',
                                            "bg-error": `${item.status}` === 'Denied',
                                        })}
                                    >
                                        { item.status }
                                        </small>
                                    </TableCell>
                                    <TableCell className="pl-sm-24">{ item.created }</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Grid>
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
