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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tableMargin: {     
        "@media (min-width: 0px)": {
            marginBottom: "25%",
        },
        "@media (min-width: 1024px)": {
            marginBottom: "5%",
        },
    },
})

const GrowthOpportunities = (props) => {
    const { 
        growth_opportunities,
        getGrowthOpportunities, 
        jobs_applied,
        getJobsApplied,
        user,
        loading
    } = props
    const classes = useStyles();

    useEffect(() => {
        getGrowthOpportunities();
        if (user) {getJobsApplied(user.badge);}
    }, [user])

    return (
        <>
        {(!growth_opportunities || !jobs_applied || loading ) 
            ? <Loading /> 
            : <>
                <Card className="m-sm-30">
                    <Grid container>
                        <GrowthOppTable props={props}/>
                    </Grid>
                </Card>
                <Card className={classes.tableMargin + " m-sm-30"}>
                    <Grid container>
                        <ApplicationsTable jobs_applied={jobs_applied}/>
                    </Grid>
                </Card>
            </>}
    </>
    )
}

const mapStateToProps = state => ({
    growth_opportunities: state.growth.growth_opportunities, 
    jobs_applied: state.growth.jobs_applied,
    user: state.user,
    loading: state.apply.loading,
});

export default connect(mapStateToProps, {
    getGrowthOpportunities,
    getJobsApplied,
})(GrowthOpportunities);