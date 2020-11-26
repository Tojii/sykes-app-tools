import React, { useState, useEffect } from "react";
import { CircularProgress, Icon } from "@material-ui/core";
import { setApplyData, setValidations } from "../../../redux/actions/ApplyActions";
import { connect } from "react-redux";

const ResumeStep = ({
    user,
    growth_detail,
    validations,
    setValidations,
    handleCallback,
}) => {
    const [validated, setValidated] = useState(validations);
    useEffect(() => {
        // setTimeout(function() { 
            !validations && setValidations(user.badgeId, growth_detail.openingId)
        // }, 3000);
    }, []);

    useEffect(() => {
        validations && handleNextStep()
    }, [validations]);

    const handleNextStep = () => {
        setValidated(true);
        setTimeout(function() { 
            handleCallback();
        }, 1000);
    }

    return (
        <>
            { validated ? 
                <div className="text-center">
                    <Icon color="primary" fontSize="large">{'done'}</Icon>
                    <p>Validated!</p>
                </div> 
                : <div className="text-center">
                    <CircularProgress className="text-center"/>
                    <p className="text-muted">Validating, please wait...</p>
                </div>
            }
        </>
    );
}

const mapStateToProps = ({ applyReducer }) => {
    const { user, growth_detail, validations } = applyReducer;
    return {
        user, 
        growth_detail,
        validations
    };
};

export default connect(mapStateToProps, {
    setApplyData, setValidations,
})(ResumeStep);