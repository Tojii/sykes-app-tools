import React, { useEffect, useState } from 'react'
import MyMetrics from './components/MyMetrics';
import { connect } from "react-redux";
import { getMetrics } from "../../redux/actions/MetricsActions"
import Loading from "../../../matx/components/MatxLoadable/Loading";

const Metrics = (props) => {
    const { history, metrics, getMetrics, user } = props;

    useEffect(() =>{
        getMetrics(user.badge);
    }, []);

    return (
        metrics ?
        <>
            <MyMetrics metrics={metrics} history={history}/>
        </>
        : <Loading />
    )
}

const mapStateToProps = ({ metricsReducer, user }) => {
    const { metrics } = metricsReducer;
    return {
        metrics,
        user
    };
};

export default connect(mapStateToProps, {
    getMetrics,
})(Metrics);