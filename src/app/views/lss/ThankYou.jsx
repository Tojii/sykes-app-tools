import React from "react";
import { Grid } from "@material-ui/core";
import { SimpleCard } from "matx";

const ThankYou = () => (
    <SimpleCard>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <h1>Leader Satisfaction Survey</h1>
          <h2>Thank You</h2>
          <h4>Su respuesta ya fue registrada, gracias por haber contestado el survey.</h4>
        </Grid>
        <Grid item xs={12} sm={4} className="h-200vh">
          <img src={"./assets/images/illustrations/ThankYou.jpg"} alt="" />
        </Grid>
        <Grid item xs={12} sm={8}></Grid>
      </Grid>
    </SimpleCard>
);

export default ThankYou;