import React from "react";
import { Formik } from 'formik';
import * as Yup from "yup";
import {
    Grid,
    Button,
    Card,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setApplyData } from "../../../redux/actions/ApplyActions"
import { connect } from "react-redux";

const UserSchema = () =>
    Yup.object().shape({
        email: Yup.string().required("Email required"),
        phone: Yup.string().required("Phone number required"),
    }
);

const UserForm = (props) => {
    const {
        handleSubmitCallback,
        setDisableNext,
        user,
        match,
        history,
    } = props

    const handleClose = () => {
        const path = match.params.opp_id ? `/growth-opportunities/${match.params.opp_id}` : "/"
        history.push(path);
    }

    const handleCustomChange = (e, setFieldValue, name) => {
        if (e === "" && setDisableNext) setDisableNext(true);
        else if (setDisableNext) setDisableNext(false);
        setFieldValue(name, e);
    }

    const onSubmit = (values) => {
        const payload = {
            ...values,
            badge: user.badgeId
        }
        handleSubmitCallback(payload);
    }

    return (
        <>
            <Grid item lg={11}>
                <h3 className="p-sm-24">Personal Information</h3>
                <Formik
                    initialValues={{ 
                        email: user.email || "",
                        phone: user.phone || "",
                    }}
                    validationSchema={UserSchema()}
                    onSubmit={onSubmit}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        setFieldValue,
                        touched,
                        values,
                        errors
                    }) => (
                        <ValidatorForm onSubmit={handleSubmit}>
                            <Grid item xs={12}>
                                <TextValidator
                                    className="w-100 mx-24 my-16"
                                    label="Email"
                                    onChange={(e) => 
                                        handleCustomChange(e.target.value, setFieldValue, 'email')
                                    }
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    className="w-100 mx-24 my-16"
                                    label="Phone number"
                                    onChange={(e) => 
                                        handleCustomChange(e.target.value, setFieldValue, 'phone')
                                    }
                                    type="text"
                                    name="phone"
                                    value={values.phone}
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                />
                            </Grid>
                            { history ?
                            <div className="flex flex-space-start flex-middle mx-24 my-16">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Save
                                </Button>
                                <Button
                                    className="ml-24"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                            </div> : null }
                        </ValidatorForm>
                    )}
                </Formik>
            </Grid>
        </>
    )
}

const mapStateToProps = ({ applyReducer }) => {
    const { user } = applyReducer;
    return {
        user,
    };
};

export default connect(mapStateToProps, {
    setApplyData,
})(UserForm);
