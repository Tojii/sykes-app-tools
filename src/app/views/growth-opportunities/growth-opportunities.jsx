import React, { useEffect } from "react";
import GrowthOppTable from "./components/GrowthOppTable"
import ApplicationsTable from "./components/ApplicationsTable"
import {
    Card,
    Grid,
} from "@material-ui/core";
import { getGrowthOpportunities, getJobsApplied } from "../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import Loading from "../../../matx/components/MatxLoadable/Loading";

const GrowthOpportunities = (props) => {
    const { 
        growth_opportunities,
        getGrowthOpportunities, 
        jobs_applied,
        getJobsApplied 
    } = props

    useEffect(() => {
        getGrowthOpportunities();
        getJobsApplied();
    }, [])

    return (
        (!growth_opportunities || !jobs_applied ) 
            ? <Loading /> 
            : <>
                <Card className="m-sm-30">
                    <Grid container>
                        <GrowthOppTable props={props}/>
                    </Grid>
                </Card>
                <Card className="m-sm-30">
                    <Grid container>
                        <ApplicationsTable jobs_applied={jobs_applied}/>
                    </Grid>
                </Card>
            </>
    )
}

const mapStateToProps = ({ growthReducer }) => {
    const { growth_opportunities, jobs_applied } = growthReducer;
    return {
        growth_opportunities,
        jobs_applied
    };
};

export default connect(mapStateToProps, {
    getGrowthOpportunities,
    getJobsApplied,
})(GrowthOpportunities);