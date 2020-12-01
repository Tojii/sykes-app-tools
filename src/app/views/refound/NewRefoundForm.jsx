import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { SimpleCard } from "matx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  FormControl,
  InputLabel,
  TextField,
  Icon,
  Button,
  StepLabel,
  Step,
  Stepper,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import {
  getStudiesCatergory,
  GetIformationLists,
  SaveRefund
} from "../../redux/actions/RefoundActions";
import UploadForm from "./UploadForm";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { format } from 'date-fns';
import es from "date-fns/locale/es";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import MuiAlert from '@material-ui/lab/Alert';

function getSteps() {
  return ["Categoria del Curso", "Datos del Curso", "Archivos Adjuntos"];
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const  UNIVERSITY_STUDIES = "ESTUDIOS UNIVERSITARIOS";
export const  CERTIFICATION = "CERTIFICACIÓN";
export const  CISCO = "CISCO";
export const  LANGUAGES = "IDIOMAS";
export const  TECHNICAL_STUDIES = "ESTUDIOS TÉCNICOS";
export const  OTHERS = "OTROS";

const NewRefoundForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const studiesCatergory = useSelector(state => state.refound.studiesCatergory);
  const universityInstitutes = useSelector(state => state.refound.universityInstitutes);
  const ciscoAcademies = useSelector(state => state.refound.ciscoAcademies);
  const techStudiesCenter =  useSelector(state => state.refound.techStudiesCenter);
  const languageAcademies = useSelector(state => state.refound.languageAcademies);
  const certifications = useSelector(state => state.refound.certifications);
  const saveRefound = useSelector(state => state.refound.saveRefound);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isLoading = useSelector(state => state.refound.loading);
  const [isError, setError] = useState(false);
  const [isErrorUpload, setIsErrorUpload] = useState(false);
  const [isErrorSaveRefound, setisErrorSaveRefound] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [files, setFiles] = useState([]);
  const [submitMessage, setSubmitMessage] = useState([]);
  let date = new Date();
  
  const [form, setForm] = useState({
    badge:user.badge, //'42553',,
    name: user.fullname,
    studiesCategory: '',
    universityInstitute: '',
    techStudiesCenter: '',
    languajeCenter: '',
    certification: '',
    ciscoAcademy: '',
    others: '',
    course: '',
    invoiceNumber: '',
    certificationDate: new Date(),
    startDate: new Date(),
    endDate: date.setDate(date.getDate()+1),
    email: ''
  });

  useEffect(() => {
    dispatch(GetIformationLists(user.badge));
    dispatch(getStudiesCatergory());
  }, []);

  function validateEmail (email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  const handleChange = (event) => {
    event.persist();
    if(event.target.name == "email"){
        if(!validateEmail(event.target.value)){
          setError(true);
          setErrorMessage(errorMessage => ({...errorMessage, email: "*Se debe ingresar el correo en formato correcto"}));
        }else{
          setError(false);
          setErrorMessage(errorMessage => ({...errorMessage, email: null}));
        }
    }
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const ValidateSelect = () => {
    switch (form.studiesCategory.toUpperCase()) {
      case UNIVERSITY_STUDIES:
        if(form.universityInstitute == "" || form.universityInstitute == undefined ){
          setError(true);
          setErrorMessage(errorMessage => ({...errorMessage, customFormControl:"*Se debe seleccionar una Insitución Universitaria"})); 
          return true;
        }
        break;
      case CERTIFICATION:
        if(form.certification == "" || form.certification == undefined ){
          setError(true);
          setErrorMessage(errorMessage => ({...errorMessage, customFormControl:"*Se debe seleccionar un centro de Certificación"})); 
          return true;
        }
        break;
      case CISCO:
        if(form.ciscoAcademy == "" || form.ciscoAcademy == undefined ){
          setError(true);
          setErrorMessage(errorMessage => ({...errorMessage, customFormControl:"*Se debe seleccionar una academia de CISCO"})); 
          return true;
        }
        break;
      case LANGUAGES:
        if(form.languajeCenter == "" || form.languajeCenter == undefined ){
          setError(true);
          setErrorMessage(errorMessage => ({...errorMessage, customFormControl:"*Se debe seleccionar un centro de Idiomas"})); 
          return true;
        }
        break;
      case TECHNICAL_STUDIES:
        if(form.techStudiesCenter == "" || form.techStudiesCenter == undefined ){
          setError(true);
          setErrorMessage(errorMessage => ({...errorMessage, customFormControl:"*Se debe seleccionar un centro de estudios técnico"})); 
          return true;
        }
        break;
      case OTHERS:
        if(form.others == "" || form.others == undefined ){
          setError(true);
          setErrorMessage(errorMessage => ({...errorMessage, others:"*Se debe ingresar un valor"})); 
          return true;
        }
        break;
      default:
        return false;
        break;
    }

  }

  const handleNext = () => {
    let isErrorValidation = false;
    if(activeStep == 1){
      
      isErrorValidation = ValidateSelect();

      if(form.course == "" || form.course == undefined ){
        isErrorValidation = true;
        setErrorMessage(errorMessage => ({...errorMessage, course:"*Se debe ingresar el nombre del curso"}));   
      }

      if(form.invoiceNumber == "" || form.invoiceNumber == undefined ){
        isErrorValidation = true;  
        setErrorMessage(errorMessage => ({...errorMessage, invoiceNumber:"*Se debe ingresar una factura válida"}));
      }

      if(form.email == "" || form.email == undefined){
        isErrorValidation = true;
        setErrorMessage(errorMessage => ({...errorMessage, email:"*Se debe ingresar el correo en formato correcto"}));
      }
      
    }
     
    if (!isErrorValidation) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else {
      return;
    }

  };

  const handleBack = () => {
    setActiveStep(prevActiveStep =>prevActiveStep - 1);
    
    if(activeStep == 1){
      setForm({
        ...form,
        universityInstitute: '',
        techStudiesCenter: '',
        languajeCenter: '',
        certification: '',
        ciscoAcademy: '',
        others: '',
      })
    };
    setError(false);
    setErrorMessage([]);
  };

  const handleReset = () => {
    setActiveStep(0);
    setForm({
      ...form,
      studiesCategory: '',
      universityInstitute: '',
      techStudiesCenter: '',
      languajeCenter: '',
      certification: '',
      ciscoAcademy: '',
      others: '',
      course: '',
      invoiceNumber: '',
      certificationDate: '',
      startDate: new Date(),
      endDate: new Date(),
      email: ''
    });
    setError(false);
    setErrorMessage([]);
  };

  const handleSubmit = async () => {
    if(files.length <= 0 ){
      setIsErrorUpload(true);
      setErrorMessage(errorMessage => ({...errorMessage, files:"*Se debe seleccionar al menos un archivo"}));   
      return;
    }
    setActiveStep(steps.length);
    await dispatch(SaveRefund(form, files));
    
    // if(saveRefound != null){
    //   if(saveRefound.success == true){
    //     console.log("saveRefound Inside", saveRefound)
    //     setSubmitMessage({message:"¡Guardado existosamente!"});
        
    //   }else{
    //     setisErrorSaveRefound(true);
    //     setSubmitMessage({message:"¡Se produjo un error, por favor vuelva a intentarlo!"})
    //   } 
    // }
  }

  const handleDateChangeStartDate = date => {  
    setForm({
      ...form,
      startDate: date,
    });
  };

  const handleDateChangeEndDate = date => {
    setForm({
      ...form,
      endDate: date,
    });
  };

  const handleDateChangeCertificationDate = date => {
    setForm({
      ...form,
      certificationDate: date,
    });
  };
  const CustomFormControl = (props) => (  
    <FormControl className="form-control-leader mt-24 mr-24" error={isError}>
      <InputLabel id={`input-${props.id}`}>{props.label}</InputLabel>
      <Select labelId={`label-${props.id}`} onChange={event => handleChange(event)}
        value={props.value}
        name={props.id}
        error={!!errorMessage.customFormControl}
      >
        {props.dataArray.map(item => (
          <MenuItem key={`item-${item.id}`} value={item.id}>
            {item.tittle}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
              {errorMessage.customFormControl}
      </FormHelperText>
    </FormControl>
  );

  const handleSelectCategory = () => {
    switch (form.studiesCategory.toUpperCase()) {
      case UNIVERSITY_STUDIES:
      return (
           <CustomFormControl label="Institución Universitaria *" id="universityInstitute" value={form.universityInstitute} dataArray={universityInstitutes} />
        );
      case CERTIFICATION:
        return (
          <CustomFormControl label="Centros de certificación *" id="certification" value={form.certification} dataArray={certifications}/>
        );
      case CISCO:
        return (
          <CustomFormControl label="Academia CISCO *" id="ciscoAcademy" value={form.ciscoAcademy} dataArray={ciscoAcademies}/>
        );
      case LANGUAGES:
        return (
          <CustomFormControl label="Centros de Idiomas *" id="languajeCenter" value={form.languajeCenter} dataArray={languageAcademies}/>
        );
      case TECHNICAL_STUDIES:
        return (
          <CustomFormControl label="Centro de estudios técnico *" id="techStudiesCenter" value={form.techStudiesCenter} dataArray={techStudiesCenter}/>
        );
      case OTHERS:
        return (
          <TextField name="others" value={form.others} className="mr-24 mt-24" style={{ width: "calc(50% - 24px)" }} label="Otros" onChange={event => handleChange(event)} 
            error={!!errorMessage.others}
            helperText={errorMessage.others}
          />
        );
      default:
        return "";
    }
  }

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="mb-24">
            <TextField name="bagde" value={form.badge} className="mr-24 mt-24" style={{ width: "calc(50% - 24px)" }} label="Bagde"
              InputProps={{
                readOnly: true,
              }} />
            <TextField name="nombre" value={form.name} className="mr-24 mt-24" style={{ width: "calc(50% - 24px)" }} label="Nombre"
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl className="form-control-leader mt-24">
              <InputLabel id="CategoriaEstudio">Categoría de estudio *</InputLabel>
              <Select labelId="CategoriaEstudio" onChange={event => handleChange(event)}
                value={form.studiesCategory}
                name="studiesCategory"
                validators={[
                  "required",
                ]}
              >
                {studiesCatergory.map(categoria => (
                  <MenuItem key={`categoria-${categoria}`} value={categoria}>
                    {categoria}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="Message">
                <p>Seleccione una categoría de Estudio.</p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="mb-24">
            {handleSelectCategory()}

            <TextField className="mr-24 mt-24"
              style={{ width: "calc(50% - 24px)" }} label="Nombre de la materia o curso*" name="course" value={form.course} onChange={event => handleChange(event)}
              error={!!errorMessage.course}
              helperText={errorMessage.course}
            />

            <TextField className="mr-24 mt-24" style={{ width: "calc(50% - 24px)" }} label="Factura*"
              name="invoiceNumber" value={form.invoiceNumber} onChange={event => handleChange(event)}
              error={!!errorMessage.invoiceNumber}
              helperText={errorMessage.invoiceNumber}
            />

            <TextField className="mr-24 mt-24 " style={{ width: "calc(50% - 24px)" }} label="Correo Electrónico*"
              name="email" value={form.email}
              onChange={event => handleChange(event)}
              error={!!errorMessage.email}
              helperText={errorMessage.email}
            />

            {form.studiesCategory.toUpperCase() != CERTIFICATION ?
            <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
              <KeyboardDatePicker
                className="mr-24 mt-24"
                style={{ width: "calc(50% - 24px)" }}
                margin="none"
                id="mui-pickers-date"
                label="Fecha de Inicio*"
                inputVariant="standard"
                type="text"
                autoOk={true}
                value={form.startDate}
                name="startDate"
                onChange={handleDateChangeStartDate}
                format="dd/MM/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
              <KeyboardDatePicker
                className="mr-24 mt-24"
                style={{ width: "calc(50% - 24px)" }}
                margin="none"
                id="mui-pickers-date"
                label="Fecha de Finalización*"
                inputVariant="standard"
                type="text"
                autoOk={true}
                value={form.endDate}
                name="endDate"
                onChange={handleDateChangeEndDate}
                format="dd/MM/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                minDate= {new Date().setDate(form.startDate.getDate()+1)}
              />
            </MuiPickersUtilsProvider>
            </div> : 
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
              <KeyboardDatePicker
                className="mr-24 mt-24"
                style={{ width: "calc(50% - 24px)" }}
                margin="none"
                id="mui-pickers-date"
                label="Fecha de Certificación*"
                inputVariant="standard"
                type="text"
                autoOk={true}
                value={form.certificationDate}
                name="endDate"
                onChange={handleDateChangeCertificationDate}
                format="dd/MM/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
            }
          </div>
        );
      case 2:
        return <UploadForm files={files} setFiles= {setFiles} isError={isErrorUpload} setErrorMessage={setIsErrorUpload} errorMessage={errorMessage.files} />
      default:
        return "";
    }
  }

  return (
    <div>
      {isLoading ? <Loading /> :
        <div className="m-sm-30">
          <SimpleCard title="Horizontal Stepper">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div className="">
                  <div className="d-flex justify-content-center mb-16">
                    <Alert severity={!saveRefound.succes ? "success": "warning"}>
                      {!saveRefound.succes ? "¡Guardado existosamente!" : "¡Se produjo un error, por favor vuelva a intentarlo!"}
                    </Alert>
                  </div>
                  <Button variant="contained" color="secondary" onClick={handleReset}>
                    Volver a nuevo
                  </Button>
                </div>
              ) : (
                  <div>
                    {getStepContent(activeStep)}
                    <div className="pt-24">
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                      >
                        Regresar
                      </Button>
                      <Button
                        className="ml-16"
                        variant="contained"
                        color="primary"
                        onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                        disabled={form.studiesCategory ? false : true}
                      >
                        {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                      </Button>
                    </div>
                  </div>
                )}
            </div>
          </SimpleCard>
        </div>
      }
    </div>
  )
}

export default NewRefoundForm
