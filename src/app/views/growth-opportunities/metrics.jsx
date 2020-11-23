import React, { useEffect, useState } from 'react'
import MyMetrics from './components/MyMetrics';
import {
    Card,
    Grid,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getMetrics } from "../../redux/actions/MetricsActions"

const Metrics = (props) => {
    const { metrics, getMetrics } = props;

    useEffect(() =>{
        getMetrics();
    }, []);

    return (
        <>
            <Card className="m-sm-30">
                <Grid container>
                    <MyMetrics metrics={metrics} {...props}/>
                </Grid>
            </Card>
        </>
    )
}

const mapStateToProps = ({ metricsReducer }) => {
    const { metrics } = metricsReducer;
    return {
        metrics,
    };
};

export default connect(mapStateToProps, {
    getMetrics,
})(Metrics);