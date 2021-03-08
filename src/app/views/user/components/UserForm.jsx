import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from "yup";
import {
    Grid,
    Button,
    Card,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setApplyData } from "../../../redux/actions/ApplyActions";
import { setUserData, setUserDataV2 } from "../../../redux/actions/UserActions";
import { validateEmail } from '../../../../utils';
import { connect } from "react-redux";
import Loading from "../../../../matx/components/MatxLoadable/Loading";
import history from "history.js";

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
    const dispatch = useDispatch();
    const [form_user, setUserForm] = useState(user);
    
    useEffect(()=>{
        setUserForm(user);
    },[]);

    const validateEmail = (email) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
      }

    const validatePhone = (phone) => {
        const regexp = 	/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{2})$/
        return regexp.test(phone)
    }

    const handleClose = () => {
        const path = match.params.opp_id ? `/growth-opportunities/${match.params.opp_id}` : "/"
        history.push(path);
    }

    const handleCustomChange = (event) => {
        let value = event.target.value
        setUserForm({...form_user, [event.target.name]: value});
    }

    const handleUserEmail = (event) => {
        if (event.target.value !== "" && validateEmail(event.target.value))
        { 
            dispatch(setUserDataV2(user.username, event.target.value, user.phone));
            apply['phone'] = form_user.phone;
            apply['email'] = event.target.value;
            apply['badge'] = user.badge;
            setApplyData(apply);
        }
    }

    const handleUserPhone = (event) => {
        if (event.target.value !== "" && event.target.value.length < 8 && validatePhone(event.target.phone))
        {       
            dispatch(setUserDataV2(user.username, user.email,event.target.value));
            apply['phone'] = event.target.value.phone;
            apply['email'] = user.email;
            apply['badge'] = user.badge;
            setApplyData(apply);
        }
    }

    const handlePhoneError = () => {
        if (form_user === null || form_user.phone === "" || form_user.phone === undefined) return "This field is required"
        else if (form_user.phone.length < 8) return "This field is too short"
        else if(!validatePhone(form_user.phone)) return "Phone number invalid format"
        return ""
    }

    const handleEmailError = () => {
        if (form_user === null || form_user.email === "" || form_user.email === undefined) return "This field is required"
        return ""
    }

    const handleNext = () => {
        if (!setDisableNext) return false;
        if (form_user === null || form_user.phone === undefined || form_user.email === undefined || form_user.phone.length < 8 || !validatePhone(form_user.phone) || form_user.email === "" || !validateEmail(form_user.email))
        return setDisableNext(true)
        user.email = form_user.email;
        user.phone = form_user.phone;
        //dispatch(setUserData(user));
        setDisableNext(false); 
    }

    const handleValid = () => {
        return (form_user === null || form_user.phone === undefined || form_user.email === undefined || form_user.phone.length < 8 || !validatePhone(form_user.phone) ||  form_user.email === "" || !validateEmail(form_user.email))
    }

    useEffect(() => {
        handleNext();
        handleValid();
        if (form_user === null || form_user.phone === undefined || form_user.email === undefined) {
            setUserForm(user)
        }
    }, [user]);

    const onSubmit = () => {
        // const payload = {
        //     phone: form_user.phone,
        //     email: form_user.email,
        //     badge: user.badge
        // }
        // user.email = form_user.email;
        // user.phone = form_user.phone;
        // dispatch(setUserData(user));
        
        // // apply['phone'] = form_user.phone;
        // // apply['email'] = form_user.email;
        // // apply['badge'] = user.badge;
        // // setApplyData(apply);
        // handleSubmitCallback(payload);
        // history.push({
        //     pathname: "/"
        //   });
    } 

    return (
        <>
            {(form_user.phone === undefined || form_user.email === undefined) ? <Loading/> :
            <Grid item lg={12}>
                <h3 className="p-sm-24">Personal Information</h3>
                <ValidatorForm  onSubmit={onSubmit}>
                    <Grid item lg={6} md={6} sm={10} xs={10}>
                        <TextValidator
                            className="w-100 mx-24 my-16 mx-24 my-16"
                            label="Email"
                            onChange={handleCustomChange}
                            onBlur={handleUserEmail}
                            type="text"
                            name="email"
                            value={form_user.email}
                            validators={["required", "isEmail"]}
                            errorMessages={["This field is required", "Invalid email format"]}
                            error={form_user.email === "" || form_user.email === undefined} 
                            helperText={handleEmailError()}
                        />
                    </Grid>
                    <Grid  
                        item lg={6} md={6} sm={10} xs={10}>
                        <TextValidator
                            className="w-100 mx-24 my-16"
                            label="Phone number"
                            onChange={handleCustomChange}
                            onBlur={handleUserPhone}
                            type="text"
                            name="phone"
                            value={form_user != null ? form_user.phone : ""}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            error={ handlePhoneError().length > 0 }
                            helperText={ handlePhoneError() }
                        />
                    </Grid>
                    { history ?
                    <div className="flex flex-end mx-24 my-16">
                        <Button
                            className="ml-24"
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Home
                        </Button>
                    </div> : null }
                </ValidatorForm>
            </Grid>
            }
        </>
    )
}

const mapStateToProps = state => ({
    apply: state.apply.apply,
    user: state.user,
});

export default connect(mapStateToProps, {
    setApplyData,
})(UserForm);
