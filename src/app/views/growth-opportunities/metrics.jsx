import React, { useEffect, useState } from 'react'
import MyMetrics from './components/MyMetrics';
import { connect } from "react-redux";
import { getMetrics } from "../../redux/actions/MetricsActions"

const Metrics = (props) => {
    const { metrics, getMetrics } = props;

    useEffect(() =>{
        getMetrics();
    }, []);

    return (
        <>
            <MyMetrics metrics={metrics}/>
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