import React, { useState, useEffect } from "react";
import { CircularProgress, Icon } from "@material-ui/core";
import { setApplyData, setValidations } from "../../../redux/actions/ApplyActions";
import { connect } from "react-redux";
import ValidationModal from './ValidationDialog';

const ResumeStep = ({
    user,
    validations,
    growth_opportunity,
    setValidations,
    setDisableNext,
    handleCallback,
}) => {

    const [validated, setValidated] = useState(validations);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        !validations && setValidations(growth_opportunity.openingId, growth_opportunity.title)
    }, []);

    useEffect(() => {
        if (validations){
            if(validations.approvedFinal){ 
                handleNextStep();
                setOpen(false);
            }
            else{ 
                setOpen(true);
            }
        }
    }, [validations]);

    const handleNextStep = () => {
        setDisableNext(false);
        if (validated) return false;
        setValidated(true);
        setTimeout(function() { 
            handleCallback();
        }, 1000);
    }

    return (
        <>
            <ValidationModal idioma={"Ingles"} path={"/growth-opportunities"} save={() => {}} state={"Error!"} message={(validations != null) ? validations.message : "Lo sentimos, pero el usuario actual no puede aplicar a este job"} setOpen={setOpen} open={open} />
            { validations != null ? (
                validations.approvedFinal ?
                    <div className="text-center">
                        <Icon color="primary" fontSize="large">{'done'}</Icon>
                        <p>Validated!</p>
                    </div> :
                    <div className="text-center">
                        <Icon color="primary" fontSize="large">{'done'}</Icon>
                        <p>Sorry!</p>
                    </div>
                
                ) : <div className="text-center">
                    <CircularProgress className="text-center"/>
                    <p className="text-muted">Validating, please wait...</p>
                </div>
            }
        </>
    );
}

const mapStateToProps = state => ({
    validations: state.apply.validations,
    growth_opportunity: state.growth.growth_opportunity,
    user: state.user,
});

export default connect(mapStateToProps, {
    setApplyData, setValidations
})(ResumeStep);