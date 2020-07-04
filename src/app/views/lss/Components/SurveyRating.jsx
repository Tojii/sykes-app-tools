import React from 'react';
import { RatingField } from './Rating';
import {
    Grid,
} from "@material-ui/core";

export const SurveyRating = (props) => (
    <Grid container>
        <Grid item sm={6} xs={12}>
          <label className="label-rating">{props.label}</label>
          {props.errors[props.name] && props.touched[props.name] ? <div className="input-feedback">{props.errors[props.name]}</div> : null}
        </Grid>
        <Grid item sm={6} xs={12}>
          <RatingField name={props.name} setFieldValue={props.setFieldValue} />
        </Grid>
    </Grid>
);