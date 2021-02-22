import React, { useEffect } from "react";
import { SimpleCard } from "matx";
import ApplyStepper from "./components/ApplyStepper"
import { connect } from "react-redux";
import { getGrowthOpportunity } from "app/redux/actions/GrowthOpportunityActions";
import Loading from "../../../matx/components/MatxLoadable/Loading";

const ApplySteps = (props) => {

    useEffect(() => {
        props.getGrowthOpportunity();
    }, []);

    return (
        (!props.growth_opportunity 
            ? <Loading /> 
            :   <div className="m-sm-30">
                    <SimpleCard title={props.growth_opportunity.title}>
                        <ApplyStepper {...props}/>
                    </SimpleCard>
                </div>
        )
    )
}

const mapStateToProps = state => ({
    growth_opportunity: state.growth.growth_opportunity,
});

export default connect(mapStateToProps, {
    getGrowthOpportunity
})(ApplySteps);