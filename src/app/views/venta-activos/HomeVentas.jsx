import React, { useEffect } from "react";
import CampaignTable from "./ventasTables/CampaignTable"
import ComprasTable from "./ventasTables/ComprasTable"
import {
    Card,
    Grid,
} from "@material-ui/core";
import { getGrowthOpportunities, getJobsApplied } from "../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import Loading from "../../../matx/components/MatxLoadable/Loading";

const HomeVentas = () => {

    useEffect(() => {
      
    }, [])

    return (
        <>
        {/* {(!growth_opportunities || !jobs_applied || loading ) 
            ? <Loading />  */}
             <>
                <Card className="m-sm-30">
                    <Grid >
                        <CampaignTable admin={false}/>
                    </Grid>
                </Card>
                <Card className="m-sm-30">
                    <Grid >
                        <ComprasTable admin={false}/>
                    </Grid>
                </Card>
            </>
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

export default HomeVentas;