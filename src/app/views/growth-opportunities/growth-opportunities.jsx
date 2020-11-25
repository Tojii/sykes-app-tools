import React from "react";
import GrowthOppTable from "./components/GrowthOppTable"
import ApplicationsTable from "./components/ApplicationsTable"
import {
    Card,
    Grid,
} from "@material-ui/core";
import localStorageService from "../../services/localStorageService"

const GrowthOpportunities = (props) => {
    const user = {
        badgeId: "53662",
        networkLogin: "HERNANALE",
        fullUserName: "HERNANDEZ VARGAS ALVARO ENRIQUE",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE3NzE3IiwidXNlcm5hbWUiOiJIRVJOQU5BTEUiLCJmdWxsbmFtZSI6IkhFUk5BTkRFWiBWQVJHQVMgQUxWQVJPIEVOUklRVUUiLCJiYWRnZSI6IjUzNjYyIiwiZW1haWwiOiJ0ZXN0NkB0ZXN0LmNvbSIsInBob25lIjoiMjIyMjIyMjUiLCJleHAiOjE2MDYyNzc0NDcsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6InRvamlpLmNvbSJ9.quMIlqwsjjMquE3V2qLI87l4SLA2MYm_ah3m1wLciY4",
        phone: "22222225",
        email: "test6@test.com"
    }
    localStorageService.setItem("auth_user", user);
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