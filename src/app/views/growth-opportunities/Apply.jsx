import React from "react";
import { SimpleCard } from "matx";
import ApplyStepper from "./components/ApplyStepper"
import { connect } from "react-redux";

const Apply = (props) => {

    return (
        <div className="m-sm-30">
            <SimpleCard title={props.growth_opportunity.title}>
                <ApplyStepper {...props}/>
            </SimpleCard>
        </div>
    )
}

const mapStateToProps = ({ growthReducer }) => {
    const { growth_opportunity } = growthReducer;
    return {
        growth_opportunity,
    };
};

export default connect(mapStateToProps, null)(Apply);