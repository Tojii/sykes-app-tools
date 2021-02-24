import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getGrowthOpportunity } from "app/redux/actions/GrowthOpportunityActions";
import Job from "./components/Job"
import Loading from "../../../matx/components/MatxLoadable/Loading";

const OpportunityDetail = (props) => {

    useEffect(() => {
        props.getGrowthOpportunity();
    }, []);

    return (
        (!props.growth_opportunity 
            ? <Loading /> 
            : <Job {...props} />
        )
    )
}

const mapStateToProps = ({ growthReducer }) => {
    const { growth_opportunity } = growthReducer;
    return {
        growth_opportunity,
    };
};

export default connect(mapStateToProps, {
    getGrowthOpportunity
})(OpportunityDetail);