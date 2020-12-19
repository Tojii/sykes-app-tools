import React, { useState } from "react";
import {
  Icon,
  Button,
  StepLabel,
  Step,
  Stepper,
  CardActions,
} from "@material-ui/core";
import UserForm from "../../user/components/UserForm";
import ValidationStep from "./ValidationStep";
import ResumeStep from "./ResumeStep";
import ScheduleStep from "./ScheduleStep";
import ConfirmStep from "./ConfirmStep";
import { setApplyData, saveJobApplication } from "../../../redux/actions/ApplyActions"
import { updateUserData } from "../../../redux/actions/UserActions"
import { connect, useDispatch } from "react-redux";
import format from "date-fns/format";

function getSteps() {
  return ["Personal Information", "Validation", "Resume", "Schedule", "Confirm"];
}

const ApplyStepper = (props) => {
    const { 
      history, 
      match, 
      apply, 
      user,
      validations,
      growth_opportunity, 
      saveJobApplication,
    } = props
    const dispatch = useDispatch();  
    const [activeStep, setActiveStep] = useState(0);
    const [disableNext, setDisableNext] = useState(false);
    const steps = getSteps();


    function getStepContent(stepIndex) {
      switch (stepIndex) {
      case 0:
          return <UserForm setDisableNext={setDisableNext}/>
      case 1:
          return <ValidationStep setDisableNext={setDisableNext} handleCallback={handleNextValidation}/>
      case 2:
          return <ResumeStep setDisableNext={setDisableNext}/>
      case 3:
          return <ScheduleStep setDisableNext={setDisableNext}/>
      case 4:
          return <ConfirmStep setDisableNext={setDisableNext}/>
      default:
        return "";
      }
    }

    const handleNext = () => {
        if(!disableNext){
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
        setDisableNext(true);
        if (activeStep == 0) {
          const payloadUser = {
            email: user.email,
            phone: user.phone,
            badge: user.badge,
          }
          dispatch(updateUserData(payloadUser));
        }
    };

    const handleNextValidation = () => {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setDisableNext(true);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
      history.push('/growth-opportunities');
    };

    const handleSubmit = () => {
      const payload = {
        created: format(new Date(), "P p").toString(),
        email: user.email,
        phone: user.phone,
        badge: user.badge,
        fullName: user.fullname,
        id: growth_opportunity.id,
        openingId: growth_opportunity.openingId,
        job: growth_opportunity.title,
        ...apply,
        ...validations,
      }
      saveJobApplication(payload);
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleCancel = () => {
        history.push(`/growth-opportunities/${match.params.opp_id}`)
    };

    return (
        <div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <div className="text-center">
                    <Icon color="primary" fontSize="large">{'done'}</Icon>
                    <p>Application done!</p>
                </div> 
                <Button variant="contained" color="secondary" onClick={handleReset}>
                  Close
                </Button>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep, props)}
                <div className="pt-24">
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    className="ml-16 align-self-end"
                    variant="contained"
                    color="primary"
                    disabled={disableNext}
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                  <CardActions style={{ justifyContent: 'flex-end' }}>
                    <Button
                        className="ml-16"
                        variant="contained"
                        color="default"
                        onClick={handleCancel}
                    >
                        {"Cancel"}
                    </Button>
                  </CardActions>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

const mapStateToProps = ({ applyReducer, growthReducer, user }) => {
  const { apply, validations } = applyReducer;
    const { growth_opportunity } = growthReducer;
    return {
      apply,
      user,
      validations,
      growth_opportunity,
  };
};

export default connect(mapStateToProps, {
  setApplyData, saveJobApplication,
})(ApplyStepper);