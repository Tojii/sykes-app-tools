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
        getJobsApplied,
        user,
        loading
    } = props

    useEffect(() => {
        getGrowthOpportunities();
        if (user) { getJobsApplied(user.badge); }
    }, [user])

    return (
        <>
            {(!growth_opportunities || !jobs_applied || loading)
                ? <Loading />
                : <>
                    <Card className="m-sm-30">
                        <Grid container>
                            <GrowthOppTable props={props} />
                        </Grid>
                    </Card>
                    <Card className="m-sm-30">
                        <Grid container>
                            <ApplicationsTable jobs_applied={jobs_applied} />
                        </Grid>
                    </Card>
                </>}
        </>
    )
}

const mapStateToProps = ({ growthReducer, user, applyReducer }) => {
    const { growth_opportunities, jobs_applied } = growthReducer;
    const { loading } = applyReducer;
    return {
        growth_opportunities,
        jobs_applied,
        user,
        loading,
    };
};

export default connect(mapStateToProps, {
    getGrowthOpportunities,
    getJobsApplied,
})(GrowthOpportunities);