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
import {addRaft, getAcademicGrades, getEnglishLevel, getPaymentMethod, getPositions} from "../../redux/actions/RaftActions";
import { useSelector, useDispatch } from 'react-redux';
import history from "history.js";
import { useParams } from "react-router";

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

const FormRaft = () => {
    
    const user = useSelector(state => state.user);
    const academiclist = useSelector(state => state.raft.academicgrades);
    const englishlevel = useSelector(state => state.raft.englishlevel);
    const paymentmethods = useSelector(state => state.raft.paymentmethods);
    const positions = useSelector(state => state.raft.positions);
    const [errorFile, setErrorFile] = useState({error: false, errorMessage: ""});
    const dispatch = useDispatch();
    let { id } = useParams();
    
    const handleFormSubmit = async () => {
        if (raftform.resume != null) {     
            console.log("submit")
            await dispatch(addRaft(raftform));
        }
    };

    useEffect(() => {
        if (id) {
            if(id.length == 9 || id.length == 11 || id.length == 12 || id.length == 18 || id.length == 25) {
                fetch(`https://sykescostaricahr.com/RegistroCivil/api/PadronElectoral?Cedula=${id}`).then(response => {
                   return response.json();
                }).then((res) => {
                    console.log(res);
                    setRaftForm({
                    ...raftform,
                    ["identificationNumber"]: id,
                    ["firstName"]: res.data[0].FirstName,
                    ["lastName"]: res.data[0].LastName1,
                    ["secondLastName"]: res.data[0].LastName2,
                    ["secondName"]: res.data[0].SecondName,
                    });
                }).catch((err) => console.error('Problem fetching my IP', err))
            }
        }
        async function fetchAcademy() {
            // You can await here
            await dispatch(getAcademicGrades());
        }
        async function fetchEnglish() {
            // You can await here
            await dispatch(getEnglishLevel());
        }
        async function fetchPaymentMethod() {
            // You can await here
            await dispatch(getPaymentMethod());
        }
        async function fetchPositions() {
            await dispatch(getPositions())
        }
        fetchAcademy();
        fetchEnglish();
        fetchPaymentMethod();
        fetchPositions();
        

    }, []);

    const presave = () => {
        if (raftform.resume == null) {
            setErrorFile({error: true, errorMessage:`You must attach a file`});
        }
    }

    const handleBack = () => {
        history.push("/Raft/MakeReferral");
    }
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRaftForm({
          ...raftform,
          [name]: event.target.value,
        });
        console.log("change", event.target.value);
        if(name == "identificationNumber"){
            if(event.target.value.length == 9 || event.target.value.length == 11 || event.target.value.length == 12 || event.target.value.length == 18 || event.target.value.length == 25) {
                fetch(`https://sykescostaricahr.com/RegistroCivil/api/PadronElectoral?Cedula=${event.target.value}`).then(response => {
                   return response.json();
                }).then((res) => {
                    console.log(res);
                    setRaftForm({
                    ...raftform,
                    [name]: value,
                    ["firstName"]: res.data[0].FirstName,
                    ["lastName"]: res.data[0].LastName1,
                    ["secondLastName"]: res.data[0].LastName2,
                    ["secondName"]: res.data[0].SecondName,
                    });
                }).catch((err) => console.error('Problem fetching my IP', err))
            }
        }
        console.log("posiciones load", positions);
    };

    const handleFileSelect = event => {
        let filesList = event.target.files[0] != undefined ? event.target.files[0] : null;
        let list = [];
        let sizes = 0;

        if(filesList != null && (filesList.type == "application/msword" || filesList.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
        filesList.type == "application/pdf" || filesList.name.includes('.docx') || filesList.name.includes('.doc'))){
                // if(filesList.name.includes('.jfif') || filesList.name.includes('.pjp') || filesList.name.includes('.pjpeg')) { 
                //     setErrorFile({error: true, errorMessage:`File format is invalid`});
                //     //setFiles(null);
                //     setRaftForm({...raftform, resume: null});
                // }
                if (filesList.size/1024/1024 > 2) {
                    setErrorFile({error: true, errorMessage:`File size must not exceed 2MB`});
                    //setFiles(null);
                    setRaftForm({...raftform, resume: null});
                } else {
                    setErrorFile({error: false, errorMessage:``});
                    //setFiles(event.target.files[0]);
                    setRaftForm({...raftform, resume: event.target.files[0]});
                }
        } else {
            setErrorFile({error: true, errorMessage:`File format is invalid`});
            //setFiles(null);
            setRaftForm({...raftform, resume: null});
        }
      };
    
    const [raftform, setRaftForm] = useState({
        badge: user.badge,
        fullName: user.fullname,
        personalEmail: user.email,
        personalPhone: user.phone,
        identificationNumber: id ? id : "",
        firstName: "",
        secondName: "",
        lastName: "",
        secondLastName: "",
        phone: "",
        candidateEmail: "",
        englishLevel: "",
        locationPreference: "",
        othersDetails: "",
        candidateProfile: "",
        academicGrade: "",
        isResumeActive: true,
        isResumeRequired: true,
        isExternalreference: true,
        paymentMethod: "",
        workType: "",
        resume: null 
    });
    const classes = useStyles();

    return (
        <div className="p-24">
            {console.log(raftform)}
            <Card className={classes.formcard} elevation={6}>
                <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Refer your friends here!</h2>
                <ValidatorForm {...useRef('form')} onSubmit={handleFormSubmit}>                 
                    <TextValidator
                        className={classes.textvalidator}
                        label="1. Badge Number: (5 digits)*"
                        onChange={handleChange}
                        type="text"
                        name="badge"
                        disabled={true}
                        value={raftform.badge}
                        validators={["required","maxStringLength:5"]}
                        errorMessages={["Este campo es requerido", "Máximo 5 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="2. Your full name:*"
                        onChange={handleChange}
                        type="text"
                        name="fullName"
                        disabled={true}
                        value={raftform.fullName}
                        validators={["required","maxStringLength:150"]}
                        errorMessages={["Este campo es requerido", "Máximo 150 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="3. Your email address:*"
                        onChange={handleChange}
                        type="text"
                        name="personalEmail"
                        value={raftform.personalEmail}
                        validators={["required", "matchRegexp:^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+(;[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?))*$"]}
                        errorMessages={["Este campo es requerido", "Correo no válido"]} 
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="4. Your phone number:*"
                        onChange={handleChange}
                        type="text"
                        name="personalPhone"
                        value={raftform.personalPhone}
                        validators={["required","isNumber", "isPositive","maxStringLength:8","minStringLength:8"]}
                        errorMessages={["Este campo es requerido","Solo se permiten números", "No se aceptan negativos", "Máximo 8 carácteres", "Mínimo 8 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="5. Friend's Id (Cédula):*"
                        onChange={handleChange}
                        type="text"
                        name="identificationNumber"
                        disabled={true}
                        value={raftform.identificationNumber}
                        validators={["required","isNumber", "isPositive","maxStringLength:25","minStringLength:9"]}
                        errorMessages={["Este campo es requerido","Solo se permiten números", "No se aceptan negativos", "Máximo 25 carácteres", "Mínimo 9 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="6. Friend's first name:*"
                        onChange={handleChange}
                        disabled={true}
                        type="text"
                        name="firstName"
                        value={raftform.firstName}
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="7. Friend's middle name:"
                        onChange={handleChange}
                        disabled={true}
                        type="text"
                        name="secondName"
                        value={raftform.secondName}
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="8. Friend's first surname:*"
                        onChange={handleChange}
                        disabled={true}
                        type="text"
                        name="lastName"
                        value={raftform.lastName}
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="9. Friend's second surname:"
                        onChange={handleChange}
                        disabled={true}
                        type="text"
                        name="secondLastName"
                        value={raftform.secondLastName}
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="10. Friend's phone number:*"
                        onChange={handleChange}
                        type="text"
                        name="phone"
                        value={raftform.phone}
                        validators={["required","isNumber", "isPositive","maxStringLength:8","minStringLength:8"]}
                        errorMessages={["Este campo es requerido","Solo se permiten números", "No se aceptan negativos", "Máximo 8 carácteres", "Mínimo 8 carácteres"]}
                    />
                    <TextValidator
                        className={classes.textvalidator}
                        label="11. Friend's email address:*"
                        onChange={handleChange}
                        type="text"
                        name="candidateEmail"
                        value={raftform.candidateEmail}
                        validators={["required", "matchRegexp:^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+(;[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?))*$"]}
                        errorMessages={["Este campo es requerido", "Correo no válido"]}
                    />
                    <SelectValidator 
                        label="12. Friend's english level:*" 
                        name="englishLevel" 
                        className={classes.textvalidator} 
                        value={raftform.englishLevel} 
                        onChange={handleChange} 
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    >
                        {englishlevel.map(english => (
                                        <MenuItem key={`english-${english.level}`} value={english.title ? english.title : ""}>
                                        {english.title || " "}
                                        </MenuItem>
                                    ))}
                    </SelectValidator>                  
                    <SelectValidator 
                        label="13. Location Preference:*" 
                        name="locationPreference" 
                        className={classes.textvalidator} 
                        value={raftform.locationPreference} 
                        onChange={handleChange} 
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    >
                        <MenuItem key="GAM" value="GAM">
                            GAM
                        </MenuItem>
                        <MenuItem key="Liberia" value="Liberia">
                            Liberia
                        </MenuItem>
                    </SelectValidator>                
                    <SelectValidator 
                        label="14. Friend's Profile:*" 
                        name="candidateProfile"
                        className={classes.textvalidator} 
                        value={raftform.candidateProfile} 
                        onChange={handleChange} 
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    >
                        {/* {categoriasDeEstudio.map(categoria => (
                                        <MenuItem key={`categoria-${categoria.id}`} value={categoria.item ? categoria.item : ""}>
                                        {categoria.item || " "}
                                        </MenuItem>
                                    ))} */}
                        <MenuItem key="" value="">
                            Seleccionar
                        </MenuItem>
                    </SelectValidator>
                    <SelectValidator 
                        label="15. Academic Grade Level:*" 
                        name="academicGrade"
                        className={classes.textvalidator} 
                        value={raftform.academicGrade} 
                        onChange={handleChange} 
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    >
                        {academiclist.map(academia => (
                                        <MenuItem key={`academia-${academia.title}`} value={academia.title ? academia.title : ""}>
                                        {academia.title || " "}
                                        </MenuItem>
                                    ))} 
                    </SelectValidator>
                    <SelectValidator 
                        label="16. Payment Method:*" 
                        name="paymentMethod"
                        className={classes.textvalidator} 
                        value={raftform.paymentMethod} 
                        onChange={handleChange} 
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    >
                        {paymentmethods.map(payment => (
                                        <MenuItem key={`payment-${payment.title}`} value={payment.title ? payment.title : ""}>
                                        {payment.title || " "}
                                        </MenuItem>
                                    ))}
                    </SelectValidator>                  
                    <SelectValidator 
                        label="17. Work Mode:*" 
                        name="workType"
                        className={classes.textvalidator} 
                        value={raftform.workType} 
                        onChange={handleChange} 
                        validators={["required"]}
                        errorMessages={["Este campo es requerido"]}
                    >
                        <MenuItem key="Work from Home" value="Work from Home">
                            Work from Home
                        </MenuItem>
                        <MenuItem key="En Sitio" value="En Sitio">
                            En Sitio
                        </MenuItem>
                    </SelectValidator>                   
                    <FormControl className={classes.textvalidator}>
                        <label className={classes.filelabel} id="Resume">18. Resume(applicable formats: .doc, .docx, .pdf) (Max 2MB)*</label>
                        <Input type="file" name="resume" error={errorFile.error} aria-describedby="my-helper-text" accept=".doc, .docx, .pdf" onChange={handleFileSelect} />  
                        <FormHelperText error={errorFile.error} id="my-helper-text">{errorFile.errorMessage}</FormHelperText>                               
                    </FormControl>

                    <div className={classes.sectionbutton}>
                        <Button variant="contained" color="primary" onClick={presave} type="submit">
                            SUBMIT
                        </Button>
                        <Button style={{margin: "1%"}} variant="contained" onClick={handleBack} color="default">
                            CANCEL
                        </Button>
                        {/* <Button className={classes.formbutton} component={Link} to="/Raft">Cancelar</Button> */}
                    </div>
                </ValidatorForm>
            </Card>
        </div>
    );
}

export default FormRaft