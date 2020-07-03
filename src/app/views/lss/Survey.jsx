import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup'; // for everything
import { RatingField } from './Components/Rating';
import { SurveyRating } from './Components/SurveyRating';

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import history from "history.js";
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  Box,
  Checkbox
} from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import {
  getAccount,
  getSupervisorAccount,
  submitData
} from "../../redux/actions/LSSActions";
import MenuItem from '@material-ui/core/MenuItem';
import RemoveIcon from '@material-ui/icons/Remove';
import Rating from '@material-ui/lab/Rating';
import MaximizeIcon from '@material-ui/icons/Maximize';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import { SimpleCard } from "matx";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

const StyledRating = withStyles({
  iconFilled: {
    color: '#1D6AF9',
  },
  iconHover: {
    color: '#1664F4',
  },
  largeIcon: {
    fontSize: '5.1875rem',
    width: 60,
    height: 60,
  },
})(Rating);

const Survey = () => {
  const formData = {
    ejecucion_rating1: '',
    ejecucion_rating2: '',
    ejecucion_rating3: '',
    trato_colaboradores_rating1: '',
    trato_colaboradores_rating2: '',
    trato_colaboradores_rating3: '',
    pensamiento_estrategico_rating1: '',
    pensamiento_estrategico_rating2: '',
    pensamiento_estrategico_rating3: '',
    enfoque_resultados_rating1: '',
    enfoque_resultados_rating2: '',
    enfoque_resultados_rating3: '',
    satisfaccion_general_rating1: '',
    sugerencia: ''
  };

  const Schema = () => {
      return yup.object().shape({
        trato_colaboradores_rating1: yup
              .string()
              .required('Requerido'),
        trato_colaboradores_rating2: yup
              .string()
              .required('Requerido'),
        trato_colaboradores_rating3: yup
              .string()
              .required('Requerido'),
        enfoque_resultados_rating1: yup
              .string()
              .required('Requerido'),
        enfoque_resultados_rating2: yup
              .string()
              .required('Requerido'),
        enfoque_resultados_rating3: yup
              .string()
              .required('Requerido'),
        enfoque_resultados_rating1: yup
              .string()
              .required('Requerido'),
        enfoque_resultados_rating2: yup
              .string()
              .required('Requerido'),
        enfoque_resultados_rating3: yup
              .string()
              .required('Requerido'),
        satisfaccion_general_rating1: yup
              .string()
              .required('Requerido'),
        sugerencia: yup
              .string()
              .required('Requerido'),

                
      })
  };


  const handleSubmit = async (values) => {
    console.log("values", values);
  }

  return (
    <Formik
        enableReinitialize
        initialValues={{ ...formData }}
        onSubmit={handleSubmit}
        validationSchema={Schema}
        // validate={validate}
    >
        {({ values, errors, touched, setFieldValue }) => (
            <Form>
                        <SimpleCard title="Planeamiento">
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Muestra habilidad para guiar y dirigir un grupo en la consecución de objetivos y metas conjuntas. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="planeamiento_rating1"
                      value={this.state.planeamiento_rating1}
                      onChange={(event, newValue) => {
                       
                        this.setState({ "planeamiento_rating1": newValue });
                      }}
                      onChangeActive={(event, newHover) => {
                       
                        this.setState({ "planeamiento_hover1": newHover });
                      }}
                      icon={<RemoveIcon fontSize="large" />}
                    />
                    {this.state.planeamiento_rating1 !== null && <Box mb={3}>{labels[this.state.planeamiento_hover1 !== -1 ? this.state.planeamiento_hover1 : this.state.planeamiento_rating1]}</Box>}
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Identifica y facilita los recursos y herramientas necesarios para alcanzar objetivos. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="planeamiento_rating2"
                      value={this.state.planeamiento_rating2}
                      onChange={(event, newValue) => {
                       
                        this.setState({ "planeamiento_rating2": newValue });
                      }}
                      onChangeActive={(event, newHover) => {
                       
                        this.setState({ "planeamiento_hover2": newHover });
                      }}
                      icon={<RemoveIcon fontSize="large" />}
                    />
                    {this.state.planeamiento_rating2 !== null && <Box mb={3}>{labels[this.state.planeamiento_hover2 !== -1 ? this.state.planeamiento_hover2 : this.state.planeamiento_rating2]}</Box>}
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Crea y establece planes y fechas límite de manera efectiva y realista. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="planeamiento_rating3"
                      value={this.state.planeamiento_rating3}
                      onChange={(event, newValue) => {
                       
                        this.setState({ "planeamiento_rating3": newValue });
                      }}
                      onChangeActive={(event, newHover) => {
                       
                        this.setState({ "planeamiento_hover3": newHover });
                      }}
                      icon={<RemoveIcon fontSize="large" />}
                    />
                    {this.state.planeamiento_rating3 !== null && <Box mb={3}>{labels[this.state.planeamiento_hover3 !== -1 ? this.state.planeamiento_hover3 : this.state.planeamiento_rating3]}</Box>}
                  </Box>
              </FormControl>
            </div>
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Ejecución">
                <SurveyRating label="Logra transmitir sus ideas y objetivos de forma clara y efectiva. *" name="ejecucion_rating1" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Monitorea el progreso y dirige los esfuerzos para alcanzar metas y objetivos. *" name="ejecucion_rating2" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Responsabiliza a los miembros de su equipo en la consecusion de objetivos. *" name="ejecucion_rating3" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Trato a sus colaboradores">
                <SurveyRating label="Toma en cuenta la opinión de su equipo para tomar decisiones. *" name="trato_colaboradores_rating1" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Brinda y reacciona positivamente a la retroalimentación. *" name="trato_colaboradores_rating2" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Facilita conversaciones con los integrantes de su equipo sobre desarrollo y planes de crecimiento individuales. *" name="trato_colaboradores_rating3" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Pensamiento estratégico">
                <SurveyRating label="Establece estrategias para alcanzar metas individuales y de equipo. *" name="pensamiento_estrategico_rating1" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Genera un balance entre necesidades organizacionales y las actividades diarias. *" name="pensamiento_estrategico_rating2" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Demuestra entendimiento y comunica la misión y estrategias de la organización. *" name="pensamiento_estrategico_rating3" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Pensamiento estratégico">
                <SurveyRating label="Establece estrategias para alcanzar metas individuales y de equipo. *" name="pensamiento_estrategico_rating1" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Genera un balance entre necesidades organizacionales y las actividades diarias. *" name="pensamiento_estrategico_rating2" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Demuestra entendimiento y comunica la misión y estrategias de la organización. *" name="pensamiento_estrategico_rating3" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Enfoque a resultados">
                <SurveyRating label="Identifica y elimina barreras para alcanzar resultados. *" name="enfoque_resultados_rating1" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Brinda el seguimiento adecuado para resolver pendientes. *" name="enfoque_resultados_rating2" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Es perseverante en la búsqueda de la mejora continua. *" name="enfoque_resultados_rating3" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" /> 
              <SimpleCard title="Satisfacción general">
                <SurveyRating label="En general estoy satisfecho y recomiendo a mi líder por la experiencia que he tenido al laborar con el/ella. *" name="satisfaccion_general_rating1" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Sugerencias adicionales para su líder">
                <Grid container>
                    <Grid item sm={6} xs={12}> 
                      <label name className="label-rating">Sugerencias *</label>
                    </Grid>
                    <Grid sm={6} xs={12}>
                    <Field as="textarea"
                        name="sugerencia"
                        placeholder="Sugerencia"
                        rows="5" style={{width: "100%"}}
                        error={touched.sugerencia && errors.sugerencia}
                        helperText={touched.sugerencia && errors.sugerencia}
                        className={
                          errors.sugerencia && touched.sugerencia
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.sugerencia && touched.sugerencia ? <div  className="input-feedback">{errors.sugerencia}</div> : null}
                    </Grid>
                </Grid>            
              </SimpleCard>
              <div className="py-12"/>
              <Grid container justify="flex-end">
                <Button className="mr-12" color="" 
                  // disabled={this.state.disabled_button} 
                  variant="contained" href="/lss">
                  <Icon>close</Icon>
                  <span className="pl-8 capitalize">Cancel</span>
                </Button>
                <Button color="primary" variant="contained" 
                    // disabled={this.state.disabled_button} 
                    type="submit">
                  <Icon>send</Icon>
                  <span className="pl-8 capitalize">Save</span>
                  </Button>
              </Grid>
            </Form>
        )}
    </Formik>
  )

}

export default Survey;