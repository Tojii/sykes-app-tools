import React, { Component } from "react";
import { Breadcrumb } from "matx";
import SimpleForm from "../../material-kit/forms/SimpleFormLeader";
import {
    Button,
    Icon, Grid
  } from "@material-ui/core";
import { SimpleCard } from "matx";

class StartForm extends Component {
  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "LSS", path: "lss" },
            ]}
          />
        </div>
        <SimpleCard>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <h1>Leader Satisfaction Survey</h1>
            <h2>Thank You</h2>
            <h4>Su aporte es muy importante para la organización.</h4>
          </Grid>
          <Grid item xs={12} sm={4} className="h-200vh">
            <img src="/assets/images/illustrations/ThankYou.jpg" alt="" />
          </Grid>
           <Grid item xs={12} sm={8}></Grid>
        </Grid>
       

        </SimpleCard>
      </div>
    );
  }
}

export default StartForm;
