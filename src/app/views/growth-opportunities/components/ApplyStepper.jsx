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
import { connect, useDispatch, useSelector } from "react-redux";
import format from "date-fns/format";
import ValidationModal from './ValidationDialog';
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import { makeStyles } from '@material-ui/core/styles';
import ScrollContainer from 'react-indiana-drag-scroll'

function getSteps() {
  return ["Personal Information", "Validation", "Resume", "Schedule", "Confirm"];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  stepperscroll: {
    overflow: "auto",
    "-webkit-overflow-scrolling": "touch",
   
  },
}));

const ApplyStepper = (props) => {
    const { 
      history, 
      match, 
      apply, 
      user,
      validations,
      growth_opportunity, 
      saveJobApplication,
      saveApplication
    } = props
    const dispatch = useDispatch();  
    const isLoading = useSelector(state => state.applyReducer.loading);
    const [activeStep, setActiveStep] = useState(0);
    const [disableNext, setDisableNext] = useState(false);
    const steps = getSteps();
    const [open, setOpen] = useState(false);
    const classes = useStyles();


    function getStepContent(stepIndex) {
      switch (stepIndex) {
      case 0:
          return <UserForm setDisableNext={setDisableNext}/>
      case 1:
          return <ValidationStep validations={validations} setDisableNext={setDisableNext} handleCallback={handleNextValidation}/>
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
        if (activeStep <= 3) {
          apply["backResume"] = true;
        }
        if (activeStep <= 4) {
          apply["backSchedule"] = true;
        }
    };

    const handleReset = () => {
      history.push('/growth-opportunities');
    };

    const handleSubmit = async () => {
      const payload = {
        email: user.email,
        phone: user.phone,
        badge: user.badge,
        fullName: user.fullname,
        openingId: growth_opportunity.openingId,
        job: growth_opportunity.title,
        refresh: false,
        ...apply,
      }
      await saveJobApplication(payload);
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setOpen(true);
    };

    const handleCancel = () => {
        history.push(`/growth-opportunities/${match.params.opp_id}`)
    };

    return (
        <div>
          {(isLoading || user.phone === undefined || user.email === undefined) ? <Loading /> :  
          <div>     
            <ValidationModal idioma={"Ingles"} save={() => {}} path={"/growth-opportunities"} state={saveApplication ? "Success!" : "Error!"} message={saveApplication ? "Application done!" : "An error occurred, please try again!"} setOpen={setOpen} open={open} />
            <ScrollContainer nativeMobileScroll={false} className="scroll-container">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            </ScrollContainer>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <div className="text-center">
                      <Icon color="primary" fontSize="large">{saveApplication ? 'done' : 'error'}</Icon>
                      {saveApplication ? <p>Application done!</p> : <p>"An error occurred, please try again!"</p> }
                  </div> 
                  {/* <Button variant="contained" color="secondary" onClick={handleReset}>
                    Close
                  </Button> */}
                </div>
              ) : (
                <div>
                  { getStepContent(activeStep, props) }
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
          </div>}
        </div>
      );
}

const mapStateToProps = ({ applyReducer, growthReducer, user }) => {
  const { apply, validations, saveApplication } = applyReducer;
    const { growth_opportunity } = growthReducer;
    return {
      apply,
      user,
      validations,
      growth_opportunity,
      saveApplication
  };
};

export default connect(mapStateToProps, {
  setApplyData, saveJobApplication,
})(ApplyStepper);