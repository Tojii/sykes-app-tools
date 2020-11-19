import React from "react";
import { Formik } from 'formik';
import * as Yup from "yup";
import {
    Grid,
    Button,
    Card,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const UserSchema = () =>
  Yup.object().shape({
    email: Yup.string().required("Email required"),
    phone_number: Yup.string().required("Phone number required"),
  });

const UserForm = (props) => {
    const {
        handleSubmitCallback,
        user,
        match,
        history,
    } = props

    const handleClose = () => {
        console.log(props);
        const path = match.params.opp_id ? `/growth-opportunities/${match.params.opp_id}` : "/"
        history.push(path);
    }

    return (
        <>
            <Card className="m-sm-30">
            <Grid item lg={12}>
                <h3 className="p-sm-24">Personal Information</h3>
                <Formik
                    initialValues={{ 
                        email: "test@gmail" || "",
                        phone_number: "88202414" || "",
                    }}
                    validationSchema={UserSchema()}
                    onSubmit={handleSubmitCallback}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        isValid,
                        dirty,
                        isSubmitting,
                    }) => (
                        <ValidatorForm onSubmit={handleSubmit}>
                            <Grid item xs={12}>
                                <TextValidator
                                    className="w-100 mx-24 my-16"
                                    label="Email"
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    type="text"
                                    name="phone_number"
                                    value={values.phone_number}
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                />
                            </Grid>
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
                            </div>
                        </ValidatorForm>
                    )}
                </Formik>
            </Grid>
            </Card>
        </>
    )
}

export default UserForm;