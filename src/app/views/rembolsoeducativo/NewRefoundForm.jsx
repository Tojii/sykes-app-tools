import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup'; // for everything
import { SimpleCard } from "matx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Grid,
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
} from "@material-ui/core";
import {getCategoriaEstudio} from "../../redux/actions/ReembolsoEducativoActions";
import UploadForm from "./UploadForm";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import es from "date-fns/locale/es";

function getSteps() {
  return ["Categoria del Curso", "Datos del Curso", "Archivos Adjuntos"];
}

const NewRefoundForm = () => {
    
  const [form, setForm] = useState({
        bagde: '1234',
        nombre: 'Alvaro Hernandez Vargas',
        categoriaSelected: '',
        universidadSelected: '',
        centroTecnicoSelected: '',
        centroIdiomasSelected:'',
        certificacionSelected:'',
        ciscoSelected:'',
        Otros:'',
        curso:'',
        numeroFacInp:'',
        fechaCert:'',
        intFechaInicio: new Date(),
        intFechaFin: new Date(),
        email: ''
  });

  useEffect(() => { 
    dispatch(getCategoriaEstudio());
  }, []);
  
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const categoriasDeEstudio = useSelector(state => state.reembolsosEducativos.categoriasDeEstudio);

    const handleChange = (event) => {
      const name = event.target.name;
      setForm({
        ...form,
        [name]: event.target.value,
      });
    };
    
    const handleNext = () => {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    const handleSubmit = () =>{
      
    }

    const handleDateChangeStartDate = date => {
      setForm({
        ...form,
        intFechaInicio: date,
      });
    };

    const handleDateChangeEndDate = date => {
      setForm({
        ...form,
        intFechaFin: date,
      });
    };

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
          case 0:
            return (
              <div>
                <TextField name="bagde" value={form.bagde} className="mr-24 mt-24" style={{ width: "calc(50% - 24px)" }} label="Bagde" InputProps={{
                  readOnly: true,
                }} />
                <TextField name="nombre" value={form.nombre} className="mr-24 mt-24" style={{ width: "calc(50% - 24px)" }} label="Nombre"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <FormControl  className="form-control-leader mt-24">
                  <InputLabel id="CategoriaEstudio">Categoría de estudio*</InputLabel>
                  <Select labelId="CategoriaEstudio"  onChange={event => handleChange(event)}
                    value={form.categoriaSelected}
                    name="categoriaSelected"
                    validators={[
                      "required",
                    ]}
                  >
                    {categoriasDeEstudio.map(categoria => (
                      <MenuItem key={`categoria-${categoria.id}`} value={categoria.item || ""}>
                        {categoria.item || "This is a test"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
          );
          case 1:
            return (
              <div>
                <FormControl className="mr-24 mt-24 form-control-leader">
                <InputLabel id="CategoriaEstudio">Label Change Dinamic*</InputLabel>
                <Select labelId="CategoriaEstudio" name="CategoriaEstudio">
                    {/* {categoriasDeEstudio.map(categoria => (
                                    <MenuItem key={`categoria-${categoria.id}`} value={categoria.item ?categoria.item : ""}>
                                      {categoria.item || " "}
                                    </MenuItem>
                                  ))} */}
                                  <MenuItem key="" value="">
                                      Seleccionar
                                  </MenuItem>
                </Select>
              </FormControl>

              <TextField className="mr-24 mt-24" style={{width: "calc(50% - 24px)"}} label="Nombre de la materia o curso*" name="curso" value={form.curso} onChange={event => handleChange(event)}/>

              <TextField className="mr-24 mt-24" style={{width: "calc(50% - 24px)"}} label="Factura*"
                name="numeroFacInp" value={form.numeroFacInp} onChange={event => handleChange(event)}
              />

                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <KeyboardDatePicker
                    className="mr-24 mt-24"
                    style={{width: "calc(50% - 24px)"}}
                    margin="none"
                    id="mui-pickers-date"
                    label="Fecha de Inicio*"
                    inputVariant="standard"
                    type="text"
                    autoOk={true}
                    value={form.intFechaInicio}
                    name="intFechaInicio"
                    onChange={handleDateChangeStartDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>


                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <KeyboardDatePicker
                    className="mr-24 mt-24"
                    style={{width: "calc(50% - 24px)"}}
                    margin="none"
                    id="mui-pickers-date"
                    label="Fecha de Finalización*"
                    inputVariant="standard"
                    type="text"
                    autoOk={true}
                    value={form.intFechaFin}
                    name="intFechaFin"
                    onChange={handleDateChangeEndDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>

              <TextField className="mr-24 mt-24" style={{width: "calc(50% - 24px)"}} label="Correo Electrónico*" />
              </div> 
            );           
          case 2:
            return <UploadForm/> 
          default:
            return "";
        }
    } 

    return (
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
          <div>
            <div className="flex flex-middle mb-16">
              <Icon>done</Icon> <span className="ml-8">Done</span>
            </div>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset
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
                onClick={handleNext}
                disabled={form.categoriaSelected ? false : true}
              >
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </SimpleCard>
    </div>
    )
}

export default NewRefoundForm
