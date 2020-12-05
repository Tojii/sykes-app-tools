import React, { useState, useEffect } from "react";
import { Formik } from 'formik';
import * as Yup from "yup";
import {
    Grid,
    Button,
    Card,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setApplyData } from "../../../redux/actions/ApplyActions";
import { setUserData } from "../../../redux/actions/UserActions";
import { validateEmail } from '../../../../utils';
import { connect } from "react-redux";

const UserForm = (props) => {
    const {
        handleSubmitCallback,
        setDisableNext,
        setApplyData,
        apply,
        user,
        match,
        history,
    } = props

    
    const [form_user, setUserForm] = useState(user);

    const handleClose = () => {
        const path = match.params.opp_id ? `/growth-opportunities/${match.params.opp_id}` : "/"
        history.push(path);
    }

    const handleCustomChange = (event) => {
        let value = event.target.value
        setUserForm({...form_user, [event.target.name]: value});
    }

    const handleUserEmail = (event) => {
        if (event.target.value !== "" || validateEmail(event.target.value))
        {
            user.email = event.target.value;
            setUserData(user);
        }
    }

    const handleUserPhone = (event) => {
        if (event.target.value !== "" || event.target.value.length < 8)
        {
            user.phone = event.target.value;
            setUserData(user);
        }
    }

    const handlePhoneError = () => {
        if (form_user.phone === "") return "This field is required"
        else if (form_user.phone.length < 8) return "This field is too short"
        return ""
    }

    const handleEmailError = () => {
        if (form_user.email === "") return "This field is required"
        return ""
    }

    const handleNext = () => {
        if (!setDisableNext) return false;
        if (form_user.phone.length < 8 || form_user.email === "" || !validateEmail(form_user.email))
        return setDisableNext(true)
        setDisableNext(false);
    }

    const handleValid = () => {
        return (form_user.phone.length < 8 || form_user.email === "" || !validateEmail(form_user.email))
    }

    useEffect(() => {
        handleNext();
        handleValid();
    }, [form_user]);

    const onSubmit = () => {
        const payload = {
            phone: form_user.phone,
            email: form_user.email,
            badge: user.badge
        }
        // apply['phone'] = form_user.phone;
        // apply['email'] = form_user.email;
        // apply['badge'] = user.badge;
        // setApplyData(apply);
        handleSubmitCallback(payload);
    }

    return (
        <>
            <Grid item lg={11}>
                <h3 className="p-sm-24">Personal Information</h3>
                <ValidatorForm    onSubmit={onSubmit}>
                    <Grid item xs={12}>
                        <TextValidator
                            className="w-100 mx-24 my-16"
                            label="Email"
                            onChange={handleCustomChange}
                            onBlur={handleUserEmail}
                            type="email"
                            name="email"
                            value={form_user.email}
                            validators={["required", "isEmail"]}
                            errorMessages={["This field is required", "Invalid email format"]}
                            error={form_user.email === ""}
                            helperText={handleEmailError()}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            className="w-100 mx-24 my-16"
                            label="Phone number"
                            onChange={handleCustomChange}
                            type="text"
                            name="phone"
                            value={form_user.phone}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            error={ handlePhoneError().length > 0 }
                            helperText={ handlePhoneError() }
                        />
                    </Grid>
                    { history ?
                    <div className="flex flex-space-start flex-middle mx-24 my-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={handleValid()}
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
            </Grid>
        </>
    )
}

const mapStateToProps = ({ user, applyReducer }) => {
    const { apply } = applyReducer;
    return {
        user,
        apply,
    };
};

export default connect(mapStateToProps, {
    setApplyData,
})(UserForm);
