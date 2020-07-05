import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup'; // for everything
import { RatingField } from './Components/Rating';
import { SurveyRating } from './Components/SurveyRating';
import { useSelector, useDispatch } from 'react-redux'
import {
  getAccount,
  getSupervisorAccount,
  getJefeDirecto,
  submitData
} from "../../redux/actions/LSSActions";
import {
  Button,
  Icon,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { SimpleCard } from "matx";
import { AutocompleteField } from './Components/AutocompleteField';
import history from "history.js";
import { Link } from 'react-router-dom';

const Survey = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(state=>state.lss.accounts);
  const jefes = useSelector(state=>state.lss.jefes);
  const supervisor_accounts = useSelector(state=>state.lss.supervisor_accounts);
  const [isLoading, setIsLoading] = useState(false);
  const [showRetroalimentacionYSeguimiento, setShowRetroalimentacionYSeguimiento] = useState(false);
  const [showJefeDirecto, setShowJefeDirecto] = useState(false);
  const rate = ["","Nunca","Casi nunca", "A veces", "Casi siempre", "Siempre"];

  useEffect(() => {
    dispatch(getAccount());
   }, []);

  const formData = {
    CuentaArea: '',
    JefeDirecto: '',
    Posicion: '',
    reunionesultimomes: '',
    OneOnOneUltimas2semanas: '',
    AyudaMano: '',
    EventosVoluntariado: '',
    CimaDeConfianza: '',
    SituacionesAdversas: '',
    Escuchar: '',
    Cooperacion: '',
    SituacionesConflictivas: '',
    RelacionesInterpersonales: '',
    Guiar: '',
    Recursos: '',
    Planes: '',
    Objetivos: '',
    Monitorea: '',
    Responsabiliza: '',
    TomaEnCuentaOpinion: '',
    retroalimentacion: '',
    conversaciones: '',
    estrategias: '',
    balance: '',
    entendimiento: '',
    barreras: '',
    seguimiento: '',
    perseverante: '',
    general: '',
    Sugerencias: ''
  };

  const Schema = () => {
      return yup.object().shape({
        CuentaArea: yup
            .string()
            .required('Requerido'),
        JefeDirecto: yup
            .string()
            .required('Requerido'),
        Posicion: yup
            .string()
            .required('Requerido'),
        reunionesultimomes: yup
            .string()
            .when("Posicion", {
              is: "Direct",
              then: (x) => x.required('Requerido')
            }),
        OneOnOneUltimas2semanas: yup
            .string()
            .when("Posicion", {
              is: "Direct",
              then: (x) => x.required('Requerido')
            }),
        AyudaMano: yup
            .string()
            .when("Posicion", {
              is: "Direct",
              then: (x) => x.required('Requerido')
            }),
        EventosVoluntariado: yup
            .string()
            .when("Posicion", {
              is: "Direct",
              then: (x) => x.required('Requerido')
            }),
        CimaDeConfianza: yup
              .string()
              .required('Requerido'),
        SituacionesAdversas: yup
              .string()
              .required('Requerido'),
        Escuchar: yup
              .string()
              .required('Requerido'),
        Cooperacion: yup
              .string()
              .required('Requerido'),
        SituacionesConflictivas: yup
              .string()
              .required('Requerido'),
        RelacionesInterpersonales: yup
              .string()
              .required('Requerido'),
        Guiar: yup
              .string()
              .required('Requerido'),
        Recursos: yup
              .string()
              .required('Requerido'),
        Planes: yup
              .string()
              .required('Requerido'),
        Objetivos: yup
              .string()
              .required('Requerido'),
        Monitorea: yup
              .string()
              .required('Requerido'),
        Responsabiliza: yup
              .string()
              .required('Requerido'),
        TomaEnCuentaOpinion: yup
              .string()
              .required('Requerido'),
        retroalimentacion: yup
              .string()
              .required('Requerido'),
        conversaciones: yup
              .string()
              .required('Requerido'),
        estrategias: yup
              .string()
              .required('Requerido'),
        balance: yup
              .string()
              .required('Requerido'),
        entendimiento: yup
              .string()
              .required('Requerido'),
        barreras: yup
              .string()
              .required('Requerido'),
        seguimiento: yup
              .string()
              .required('Requerido'),
        perseverante: yup
              .string()
              .required('Requerido'),
        general: yup
              .string()
              .required('Requerido'),
        Sugerencias: yup
              .string()
              .required('Requerido')
      })
  };

  const handleSubmit = async (values) => {
    console.log("values", values);
    setIsLoading(true);
    const data = values
    //"JefeDirectoPersona": values.username, 
    data.CimaDeConfianza = rate[data.CimaDeConfianza];
    data.SituacionesAdversas = rate[data.SituacionesAdversas];
    data.Escuchar = rate[data.Escuchar];
    data.Cooperacion = rate[data.Cooperacion];
    data.SituacionesConflictivas = rate[data.SituacionesConflictivas];
    data.RelacionesInterpersonales = rate[data.RelacionesInterpersonales];
    data.Guiar = rate[data.Guiar];
    data.Recursos = rate[data.Recursos];
    data.Planes = rate[data.Planes];
    data.Objetivos = rate[data.Objetivos];
    data.Monitorea = rate[data.Monitorea];
    data.Responsabiliza = rate[data.Responsabiliza];
    data.TomaEnCuentaOpinion = rate[data.TomaEnCuentaOpinion];
    data.retroalimentacion = rate[data.retroalimentacion];
    data.conversaciones = rate[data.conversaciones];
    data.estrategias = rate[data.estrategias];
    data.balance = rate[data.balance];
    data.entendimiento = rate[data.entendimiento];
    data.barreras = rate[data.barreras];
    data.seguimiento = rate[data.seguimiento];
    data.perseverante = rate[data.perseverante];
    data.general = rate[data.general];
  
    console.log("values", data);
    // await dispatch(submitData(data));
    // history.push('/lss/thankyou');

    setIsLoading(false);
  }

  const handleFieldChange = (event, setFieldValue) => { 
    setFieldValue([event.target.name], event.target.value);
  }

  const handleAccountChange = (event, setFieldValue) => {
    dispatch(getSupervisorAccount(event.target.value));
    handleFieldChange(event, setFieldValue);
  }

  const handlePosicionChange = (event, setFieldValue) => { 
    setShowRetroalimentacionYSeguimiento(event.target.value === "Direct");
    handleFieldChange(event, setFieldValue);
  }

  const handleJefeDirectoChange = (event, setFieldValue) => { 
    setShowJefeDirecto(event.target.value === "Jefe-Directory");
    handleFieldChange(event, setFieldValue);
  }

  return (
    <Formik
        enableReinitialize
        initialValues={{ ...formData }}
        onSubmit={handleSubmit}
        validationSchema={Schema}
    >
        {({ values, errors, touched, setFieldValue }) => (
            <Form>
                <SimpleCard title="Información personal">
                <Grid spacing={10} container>
                  <Grid item sm={6} xs={12}>
                    <FormControl className="form-control-leader" error={errors.CuentaArea}>          
                      <InputLabel id="CuentaArea">Cuenta area *</InputLabel>
                      <Select labelId="CuentaArea" className="mr-24" name="CuentaArea" onChange={event => handleAccountChange(event, setFieldValue)}>
                          {accounts.map(account => (
                            <MenuItem key={`account-${account}`} value={account.name}>
                              {account.name}
                            </MenuItem>
                          ))}
                      </Select>
                      {errors.CuentaArea && touched.CuentaArea ? <div  className="input-feedback">{errors.CuentaArea}</div> : null}
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl className="form-control-leader" error={errors.JefeDirecto}>
                    <InputLabel id="JefeDirecto">Mi supervisor directo es *</InputLabel>         
                    <Select labelId="JefeDirecto" className="mr-24" name="JefeDirecto" onChange={event => handleJefeDirectoChange(event, setFieldValue)}>
                      {supervisor_accounts.map(supervisor => (
                        <MenuItem key={`supervisor-${supervisor}`} value={supervisor.name}>
                          {supervisor.name}
                        </MenuItem>
                      ))}
                      <MenuItem key="jefe-directo" value="Jefe-Directory">
                          * No Aparece en la lisa 
                      </MenuItem>
                    </Select>
                    <h7 style={{width: "calc(90% - 24px)", color: "#ffa420", display: "block"}}>Si su líder directo no aparece en la lista, seleccione: No aparece en la lista y proceda a ingresar el  nombre de su líder de manera manual en la opción que se habilita.</h7>
                    {errors.JefeDirecto && touched.JefeDirecto ? <div  className="input-feedback">{errors.JefeDirecto}</div> : null}
                  </FormControl> 
                    </Grid>
                  </Grid>
                  <Grid spacing={10} container>
                    {!showJefeDirecto ? null : (
                      <Grid item sm={6} xs={12}>
                        <FormControl className="form-control-leader">
                          <AutocompleteField name="JefeDirecto" value={jefes.map(jefe => (jefe.fullName))} 
                          onInputChange={getJefeDirecto} onChange={setFieldValue} options={jefes.map(jefe => (jefe.fullName))} label="Jefe Directo *" />
                        </FormControl>
                      </Grid>
                      )
                    }
                    <Grid item sm={6} xs={12}>
                      <label style={{display: "inline-block"}}>Posición *</label>
                      <RadioGroup
                          className="mb-16"
                          name="Posicion"
                          onChange={event => handlePosicionChange(event, setFieldValue)}
                          row
                        >
                        <FormControlLabel
                          value="Direct"
                          control={<Radio color="primary" />}
                          label="Direct"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Indirect"
                          control={<Radio color="primary" />}
                          label="Indirect/Business Partners"
                          labelPlacement="end"
                        />
                        <h7 style={{ width: "calc(70% - 24px)", color: "#ffa420", display: "block"}}>*Direct (Customer Service, Tech Support, Sales) </h7>
                        <h7 style={{ width: "calc(70% - 24px)", color: "#ffa420", display: "block"}}>*Indirect/Business Partners (Human Capital, Performance Excellence, IT, Finance, Administration, Team Managers, SMEs, Supervisors, Temporary backups)</h7>
                        {errors.Posicion && touched.Posicion ? <div  className="input-feedback">{errors.Posicion}</div> : null}
                      </RadioGroup>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                    </Grid>
                  </Grid>     
                </SimpleCard>
                <div className="py-12" />
                { !showRetroalimentacionYSeguimiento ? null : (
                  <>
                  <SimpleCard title="Retroalimentación y seguimiento">
                    <Grid spacing={5} container>
                      <Grid item sm={6} xs={12}>
                        {/* <FormControl className="form-control-leader"> */}
                        <label>¿Ha tenido una reunión de equipo en el último mes? *</label>
                        <RadioGroup
                            className="mb-16"
                            name="reunionesultimomes"
                            onChange={event => handleFieldChange(event, setFieldValue)}
                            row
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio color="primary" />}
                              label="Si"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio color="primary" />}
                              label="No"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                          {errors.reunionesultimomes && touched.reunionesultimomes ? <div  className="input-feedback">{errors.reunionesultimomes}</div> : null}

                      {/* </FormControl> */}
                      </Grid>
                    <Grid item sm={6} xs={12}>
                      {/* <FormControl className="form-control-leader"> */}
                        <label>¿Ha tenido una sesión 1-1 con su supervisor directo en las últimas 2 semanas? *</label>
                        <RadioGroup
                            className="mb-16"
                            //value={gender}
                            name="OneOnOneUltimas2semanas"
                            onChange={event => handleFieldChange(event, setFieldValue)}
                            row
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio color="primary" />}
                              label="Si"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio color="primary" />}
                              label="No"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                          {errors.OneOnOneUltimas2semanas && touched.OneOnOneUltimas2semanas ? <div  className="input-feedback">{errors.OneOnOneUltimas2semanas}</div> : null}
                      {/* </FormControl>  */}
                    </Grid>
                  </Grid>
                    <Grid spacing={5} container>
                      <Grid item sm={6} xs={12}>
                        <label>¿Hay alguien disponible para ayudarle cada vez que levanta la mano o que solicita ayuda durante una llamada? *</label>
                        <RadioGroup
                            className="mb-16"
                            name="AyudaMano"
                            onChange={event => handleFieldChange(event, setFieldValue)}
                            row
                          >
                            <FormControlLabel
                              value="Si"
                              control={<Radio color="primary" />}
                              label="Si"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio color="primary" />}
                              label="No"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                          {errors.AyudaMano && touched.AyudaMano ? <div  className="input-feedback">{errors.AyudaMano}</div> : null}
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <label>¿Logra divulgar los eventos de voluntariado y promover la participación activamente? *</label>
                          <RadioGroup
                              className="mb-16"
                              name="EventosVoluntariado"
                              onChange={event => handleFieldChange(event, setFieldValue)}
                              row
                            >
                              <FormControlLabel
                                value="Si"
                                control={<Radio color="primary" />}
                                label="Si"
                                labelPlacement="end"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio color="primary" />}
                                label="No"
                                labelPlacement="end"
                              />
                            </RadioGroup>
                            {errors.EventosVoluntariado && touched.EventosVoluntariado ? <div  className="input-feedback">{errors.EventosVoluntariado}</div> : null}
                      </Grid>
                  </Grid>        
                  </SimpleCard> 
                  <div className="py-12" />
                  </>
                  )} 
                <SimpleCard>
                <p><strong>Deseamos obtener la siguiente información para seguir mejorando nuestra experiencia SYKES. Sus respuestas serán procesadas con estricta confidencialidad. Cada líder recibirá una serie de recomendaciones basadas en la retroalimentación que usted dará a continuación, siempre y cuando él/ella tenga 5 o más reportes directos.</strong></p>
                <p><strong>Por favor conteste las siguientes preguntas en relación a las 7 competencias esenciales de cada líder SYKES con la mayor sinceridad y objetividad posible.</strong></p>
                <p><strong>Para cada uno de los siguientes enunciados responda de acuerdo a la escala de valor ascendente donde NUNCA significa que su líder no exhibe este comportamiento y SIEMPRE significa que su líder si lo demuestra de manera contundente.</strong></p>
                </SimpleCard>
                <div className="py-12" />
                <SimpleCard title="Relación en el equipo">
                  <SurveyRating label="Establece un clima de confianza en el grupo, generando un ambiente de entusiasmo, compromiso y respeto. *" name="CimaDeConfianza" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                  <SurveyRating label="Maneja adecuadamente sus emociones frente a situaciones adversas. *" name="SituacionesAdversas" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                  <SurveyRating label="Habilita espacios para escuchar a cada miembro del equipo. *" name="Escuchar" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                </SimpleCard>
                <div className="py-12" />
                <SimpleCard title="Colaboración y trabajo en equipo">
                  <SurveyRating label="Muestra habilidad para guiar y dirigir un grupo en la consecución de objetivos y metas conjuntas. *" name="Cooperacion" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                  <SurveyRating label="Maneja y resuelve de forma efectiva situaciones conflictivas. *" name="SituacionesConflictivas" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                  <SurveyRating label="Cultiva y mantiene relaciones interpersonales positivas y equitativas. *" name="RelacionesInterpersonales" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                </SimpleCard>
                <div className="py-12" />
                <SimpleCard title="Planeamiento">
                  <SurveyRating label="Muestra habilidad para guiar y dirigir un grupo en la consecución de objetivos y metas conjuntas. *" name="Guiar" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                  <SurveyRating label="Identifica y facilita los recursos y herramientas necesarios para alcanzar objetivos. *" name="Recursos" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                  <SurveyRating label="Crea y establece planes y fechas límite de manera efectiva y realista. *" name="Planes" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Ejecución">
                <SurveyRating label="Logra transmitir sus ideas y objetivos de forma clara y efectiva. *" name="Objetivos" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Monitorea el progreso y dirige los esfuerzos para alcanzar metas y objetivos. *" name="Monitorea" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Responsabiliza a los miembros de su equipo en la consecusion de objetivos. *" name="Responsabiliza" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Trato a sus colaboradores">
                <SurveyRating label="Toma en cuenta la opinión de su equipo para tomar decisiones. *" name="TomaEnCuentaOpinion" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Brinda y reacciona positivamente a la retroalimentación. *" name="retroalimentacion" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Facilita conversaciones con los integrantes de su equipo sobre desarrollo y planes de crecimiento individuales. *" name="conversaciones" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Pensamiento estratégico">
                <SurveyRating label="Establece estrategias para alcanzar metas individuales y de equipo. *" name="estrategias" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Genera un balance entre necesidades organizacionales y las actividades diarias. *" name="balance" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Demuestra entendimiento y comunica la misión y estrategias de la organización. *" name="entendimiento" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Enfoque a resultados">
                <SurveyRating label="Identifica y elimina barreras para alcanzar resultados. *" name="barreras" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Brinda el seguimiento adecuado para resolver pendientes. *" name="seguimiento" setFieldValue={setFieldValue} errors={errors} touched={touched} />
                <SurveyRating label="Es perseverante en la búsqueda de la mejora continua. *" name="perseverante" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" /> 
              <SimpleCard title="Satisfacción general">
                <SurveyRating label="En general estoy satisfecho y recomiendo a mi líder por la experiencia que he tenido al laborar con el/ella. *" name="general" setFieldValue={setFieldValue} errors={errors} touched={touched} />
              </SimpleCard>
              <div className="py-12" />
              <SimpleCard title="Sugerencias adicionales para su líder">
                <Grid container>
                    <Grid item sm={6} xs={12}> 
                      <label name className="label-rating">Sugerencias *</label>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                    <Field as="textarea"
                        name="Sugerencias"
                        rows="5" style={{width: "100%"}}
                        error={touched.Sugerencias && errors.Sugerencias}
                        helperText={touched.Sugerencias && errors.Sugerencias}
                        className={
                          errors.Sugerencias && touched.Sugerencias
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.Sugerencias && touched.Sugerencias ? <div  className="input-feedback">{errors.Sugerencias}</div> : null}
                    </Grid>
                </Grid>            
              </SimpleCard>
              <div className="py-12"/>
              <Grid container justify="flex-end">

                <Button className="mr-12" color="" 
                  component={Link} to="/lss"
                  disabled={isLoading}
                  variant="contained">
                  <Icon>close</Icon>
                  <span className="pl-8 capitalize">Cancel</span>
                </Button>
                <Button type="submit" color="primary" variant="contained" 
                    disabled={isLoading}
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