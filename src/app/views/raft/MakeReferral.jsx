import React, { useState, Component, useRef, useEffect } from "react";
import {
  Button,
  Card,
  FormHelperText
} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { makeStyles } from '@material-ui/core/styles';
//import {addRaft, getAcademicGrades, getEnglishLevel, getPaymentMethod, getPositions} from "../../redux/actions/RaftActions";
import { useSelector, useDispatch } from 'react-redux';
import history from "history.js";

const useStyles = makeStyles({
    textvalidator: {
        "@media (min-width: 0px)": {
             marginLeft: "7.5%",
             width: "85%",
             marginTop: "3%",
         },
         "@media (min-width: 1025px)": {
             marginLeft: "25%",
             width: "50%",
             marginTop: "3%",
         }
     },
     formcard: {
        "@media (min-width: 1023px)": {
            marginLeft: "0%",
            width: "100%",
        },
        "@media (min-width: 1024px)": {
            marginLeft: "25%",
            width: "50%",
        }
     
    },
    sectionbutton: {
        marginLeft: "25%",
        width: "50%",
        marginTop: "3%",
        marginBottom: "2%",
        textAlign: "center"
    },
    filelabel: {
        color: "rgba(74, 70, 109, 0.54)",
        padding: 0,
        fontSize: "14px",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: "0.00938em",
    },
});

const MakeRaft = () => {
    
    const user = useSelector(state => state.user);
    const [errorId, setErrorId] = useState({error: false, errorMessage: ""});
    const dispatch = useDispatch();
    
    const handleFormSubmit = async () => {
        if(referralform.identificationNumber.length == 9 || referralform.identificationNumber.length == 11 || referralform.identificationNumber.length == 12 
        || referralform.identificationNumber.length == 18 || referralform.identificationNumber.length == 25) {
            console.log("submit")
            history.push(`/Raft/FormRefer/${referralform.identificationNumber}`);
        }
    };

    useEffect(() => {
    }, []);
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setReferralform({
        ...referralform,
        [name]: event.target.value,
        });
        if(event.target.value.length == 9 || event.target.value.length == 11 || event.target.value.length == 12 || event.target.value.length == 18 || event.target.value.length == 25) {
            setErrorId({error: false, errorMessage:``});
        } else {
            setErrorId({error: true, errorMessage:`Id length must be 9, 11, 12, 18 or 25`});
        }
    };
    
    const [referralform, setReferralform] = useState({
        identificationNumber: "",
    });
    const classes = useStyles();

    return (
        <div className="p-24">
            {console.log(referralform)}
            <Card className={classes.formcard} elevation={6}>
                {/* <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Refer your friends here!</h2> */}
                <h4 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Please enter your friend's ID to verify if can be referred</h4>
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>                 
                    <FormControl className={classes.textvalidator}>
                        <TextValidator
                            //className={classes.textvalidator}
                            fullWidth
                            label="Friend's Id (Cédula):*"
                            onChange={handleChange}
                            error={errorId.error}
                            type="text"
                            name="identificationNumber"
                            value={referralform.identificationNumber}
                            validators={["required","isNumber", "isPositive"]}
                            errorMessages={["Este campo es requerido","Solo se permiten números", "No se aceptan negativos"]} 
                        />
                        <FormHelperText error={errorId.error} id="my-helper-text">{errorId.errorMessage}</FormHelperText> 
                    </FormControl>                
                    <div className={classes.sectionbutton}>
                        <Button variant="contained" color="primary" type="submit">
                            VERIFY
                        </Button>
                        {/* <Button className={classes.formbutton} component={Link} to="/Raft">Cancelar</Button> */}
                    </div>
                </ValidatorForm>
            </Card>
        </div>
    );
}

export default MakeRaft