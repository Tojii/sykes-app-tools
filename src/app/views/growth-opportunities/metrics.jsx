import React, { useEffect, useState } from 'react'
import MyMetrics from './components/MyMetrics';
import { connect } from "react-redux";
import { getMetrics } from "../../redux/actions/MetricsActions"
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { Breadcrumb } from "matx";

const Metrics = (props) => {
    const { history, metrics, getMetrics, user } = props;

    useEffect(() =>{
        getMetrics(user.badge);
    }, []);

    return (
        metrics ?
        <>
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                    routeSegments={[
                    { name: "Growth Opportunities", path: "/growth-opportunities" },
                    { name: "Metrics", path: "/my-metrics" },                
                    ]}
                />
                </div>
                <MyMetrics metrics={metrics} history={history}/>
            </div>
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