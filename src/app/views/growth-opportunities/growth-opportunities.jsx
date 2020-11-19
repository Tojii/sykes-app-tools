import React from "react";
import GrowthOppTable from "./components/GrowthOppTable"
import ApplicationsTable from "./components/ApplicationsTable"
import {
    Card,
    Grid,
} from "@material-ui/core";

const GrowthOpportunities = (props) => {
    return (
        <>
            <Card className="m-sm-30">
                <Grid container>
                    <GrowthOppTable props={props}/>
                </Grid>
            </Card>
            <Card className="m-sm-30">
                <Grid container>
                    <ApplicationsTable/>
                </Grid>
            </Card>
        </>
    )
}

export default GrowthOpportunities;