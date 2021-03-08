import React, { useState, useEffect } from "react";
import { CircularProgress, Icon } from "@material-ui/core";
import { setApplyData, setValidations, saveJobApplication } from "../../../redux/actions/ApplyActions";
import { connect } from "react-redux";
import ValidationModal from './ValidationDialog';
import format from "date-fns/format";

const ResumeStep = ({
    user,
    validations,
    growth_opportunity,
    setValidations,
    setDisableNext,
    handleCallback,
    saveJobApplication,
}) => {

    const [validated, setValidated] = useState(validations);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        !validations && setValidations(user.badge, growth_opportunity.openingId)
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
    
    const saveJob = () => {
        const payload = {
            created: format(new Date(), "P p").toString(),
            email: user.email,
            phone: user.phone,
            badge: user.badge,
            fullName: user.fullname,
            id: growth_opportunity.id,
            openingId: growth_opportunity.openingId,
            job: growth_opportunity.title,
            resume: null,
            workSchedule: "Monday, Tuesday, Wednesday, Thursday, Friday",
            startTime: "8:00 AM",
            endTime: "5:00 PM",
            refresh: true,
            ...validations,
        }
        saveJobApplication(payload);
    } 

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
            <ValidationModal idioma={"Ingles"} path={"/growth-opportunities"} save={saveJob} state={"Error!"} message={(validations != null) ? validations.message : "Lo sentimos, pero el usuario actual no puede aplicar a este job"} setOpen={setOpen} open={open} />
            { validations != null ? (
                //console.log("approved",validations.approvedFinal),
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
    setApplyData, setValidations, saveJobApplication,
})(ResumeStep);