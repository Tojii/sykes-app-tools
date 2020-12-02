import React, { useEffect, useState } from 'react'
import MyMetrics from './components/MyMetrics';
import { connect } from "react-redux";
import { getMetrics } from "../../redux/actions/MetricsActions"
import Loading from "../../../matx/components/MatxLoadable/Loading";

const Metrics = (props) => {
    const { history, metrics, getMetrics } = props;

    useEffect(() =>{
        getMetrics();
    }, []);

    return (
        metrics ?
        <>
            <MyMetrics metrics={metrics} history={history}/>
        </>
        : <Loading />
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