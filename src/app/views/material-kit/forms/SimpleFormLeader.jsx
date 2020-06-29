import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  FormControl,
  Select,
  Box,
  Checkbox
} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
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

class SimpleForm extends Component {
  state = {
    positions: "",
    relacion_equipo_rating1: 0,
    relacion_equipo_hover1: 0,
    relacion_equipo_rating2: 0,
    relacion_equipo_hover2: 0,
    relacion_equipo_rating3: 0,
    relacion_equipo_hover3: 0,
    colaboracion_equipo_rating1: 0,
    colaboracion_equipo_hover1: 0,
    colaboracion_equipo_rating2: 0,
    colaboracion_equipo_hover2: 0,
    colaboracion_equipo_rating3: 0,
    colaboracion_equipo_hover3: 0,
    planeamiento_rating1: 0,
    planeamiento_hover1: 0,
    planeamiento_rating2: 0,
    planeamiento_hover2: 0,
    planeamiento_rating3: 0,
    planeamiento_hover3: 0,
    ejecucion_rating1: 0,
    ejecucion_hover1: 0,
    ejecucion_rating2: 0,
    ejecucion_hover2: 0,
    ejecucion_rating3: 0,
    ejecucion_hover3: 0,
    trato_colaboradores_rating1: 0,
    trato_colaboradores_hover1: 0,
    trato_colaboradores_rating2: 0,
    trato_colaboradores_hover2: 0,
    trato_colaboradores_rating3: 0,
    trato_colaboradores_hover3: 0,
    pensamiento_estrategico_rating1: 0,
    pensamiento_estrategico_hover1: 0,
    pensamiento_estrategico_rating2: 0,
    pensamiento_estrategico_hover2: 0,
    pensamiento_estrategico_rating3: 0,
    pensamiento_estrategico_hover3: 0,
    enfoque_resultados_rating1: 0,
    enfoque_resultados_rating1: 0,
    enfoque_resultados_rating2: 0,
    enfoque_resultados_rating2: 0,
    enfoque_resultados_rating3: 0,
    enfoque_resultados_rating3: 0,
    satisfaccion_general_rating1: 0,
    satisfaccion_general_hover1: 0,
    error_cuenta: false,
    error_supervisor: false,
    error_general: false,
    cuenta_area: "",
    supervisor_directo: "",
    sugerencia: "",
    retroalimentacion_1: "",
    retroalimentacion_2: "",
    retroalimentacion_3: "",
    retroalimentacion_4: ""
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = event => {
    if (this.state.cuenta_area === "") {
      this.setState({ "error_cuenta": true });
    } else {
      this.setState({ "error_cuenta": false });
    }

    if(this.state.supervisor_directo === "") {
      this.setState({ "error_supervisor": true });
    } else {
      this.setState({ "error_supervisor": false });
    }

    if(this.state.error_cuenta || this.state.error_supervisor || this.state.relacion_equipo_rating1 === 0 || this.state.relacion_equipo_rating2 === 0 || this.state.relacion_equipo_rating3 === 0
      || this.state.colaboracion_equipo_rating1 === 0 || this.state.colaboracion_equipo_rating2 === 0 || this.state.colaboracion_equipo_rating3 === 0
      || this.state.planeamiento_rating1 === 0 || this.state.planeamiento_rating2 === 0 || this.state.planeamiento_rating3 === 0
      || this.state.ejecucion_rating1 === 0 || this.state.ejecucion_rating2 === 0 || this.state.ejecucion_rating3 === 0
      || this.state.trato_colaboradores_rating1 === 0 || this.state.trato_colaboradores_rating2 === 0 || this.state.trato_colaboradores_rating3 === 0
      || this.state.pensamiento_estrategico_rating1 === 0 || this.state.pensamiento_estrategico_rating2 === 0 || this.state.pensamiento_estrategico_rating3 === 0
      || this.state.enfoque_resultados_rating1 === 0 || this.state.enfoque_resultados_rating2 === 0 || this.state.enfoque_resultados_rating3 === 0
      || this.state.satisfaccion_general_rating1 === 0 || this.state.sugerencia === "" || this.state.positions === ""){
      this.setState({ "error_general": true });
    } else {
      if (this.state.positions === "Direct" ) {
        if (this.state.retroalimentacion_1 === "" || this.state.retroalimentacion_2 === "" || this.state.retroalimentacion_3 === "" || this.state.retroalimentacion_4 === "") {
          this.setState({ "error_general": true });
        } else {
          this.setState({ "error_general": false });
          console.log("submitted");
          // console.log(event);
        }
      } else {
        this.setState({ "error_general": false });
        console.log("submitted");
        // console.log(event);
      }
    }
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });

    if (event.target.name === "cuenta_area" && event.target.value !== "") {
      this.setState({ "error_cuenta": false });
    }

    if (event.target.name === "supervisor_directo" && event.target.value !== "") {
      this.setState({ "error_supervisor": false });
    }
    if (event.target.name === "positions" && event.target.value === "Indirect") {
      this.setState({ "retroalimentacion_1": "" });
      this.setState({ "retroalimentacion_2": "" });
      this.setState({ "retroalimentacion_3": "" });
      this.setState({ "retroalimentacion_4": "" });
    }
    // console.log(this.state.positions);
  };

  handleDateChange = date => {
    console.log(date);

    this.setState({ date });
  };

  render() {
    let {
      username,
      firstName,
      creditCard,
      mobile,
      password,
      confirmPassword,
      gender,
      date,
      email
    } = this.state;
    const labels = {
      1: 'Nunca',
      2: 'Casi nunca',
      3: 'A veces',
      4: 'Casi siempre',
      5: 'Siempre',
    };
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <SimpleCard title="Información personal">
            <FormControl className="form-control-leader">          
              <InputLabel id="cuenta">Cuenta area *</InputLabel>
              <Select data-tut="reactour__select" labelId="cuenta" className="mr-24" name="cuenta_area" onChange={this.handleChange} required style={{width: "calc(90% - 24px)"}}>
                <MenuItem value={0}>Seleccione...</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="form-control-leader">
              <InputLabel id="cuenta">Mi supervisor directo es *</InputLabel>         
              <Select labelId="cuenta" className="mr-24" required style={{width: "calc(90% - 24px)"}}>
                <MenuItem value={0}>Seleccione...</MenuItem>
              </Select>
              <h7 style={{width: "calc(90% - 24px)", color: "#ffa420", display: "block"}}>Si su líder directo no aparece en la lista, seleccione: No aparece en la lista y proceda a ingresar el  nombre de su líder de manera manual en la opción que se habilita.</h7>
            </FormControl>

            <FormControl className="form-control-leader"  data-tut="tour_step1_posicion">
              <label style={{display: "inline-block"}}>Posición *</label>
              &nbsp;
              <RadioGroup
                  required
                  className="mb-16"
                  //value={gender}
                  name="positions"
                  onChange={this.handleChange}
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
                </RadioGroup>
            </FormControl>        
          </SimpleCard>
          <div className="py-12" />

          {this.state.positions === "Indirect" ? null : (
          <SimpleCard title="Retroalimentación y seguimiento">
            <FormControl className="form-control-leader">
              <label style={{width: "calc(90% - 24px)", display: "inline-block"}}>¿Ha tenido una reunión de equipo en el último mes? *</label>
              &nbsp;
              <RadioGroup
                  className="mb-16"
                  //value={gender}
                  name="retroalimentacion_1"
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio color="primary" />}
                    label="Yes"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio color="primary" />}
                    label="No"
                    labelPlacement="end"
                  />
                </RadioGroup>
            </FormControl>
            <FormControl className="form-control-leader">
              <label style={{width: "calc(90% - 24px)", display: "inline-block"}}>¿Ha tenido una sesión 1-1 con su supervisor directo en las últimas 2 semanas? *</label>
              &nbsp;
              <RadioGroup
                  className="mb-16"
                  //value={gender}
                  name="retroalimentacion_2"
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio color="primary" />}
                    label="Yes"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio color="primary" />}
                    label="No"
                    labelPlacement="end"
                  />
                </RadioGroup>
            </FormControl> 
            <FormControl className="form-control-leader">
              <label style={{width: "calc(90% - 24px)", display: "inline-block"}}>¿Hay alguien disponible para ayudarle cada vez que levanta la mano o que solicita ayuda durante una llamada? *</label>
              &nbsp;
              <RadioGroup
                  className="mb-16"
                  //value={gender}
                  name="retroalimentacion_3"
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio color="primary" />}
                    label="Yes"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio color="primary" />}
                    label="No"
                    labelPlacement="end"
                  />
                </RadioGroup>
            </FormControl> 
            <FormControl className="form-control-leader">
              <label style={{width: "calc(90% - 24px)", display: "inline-block"}}>¿Logra divulgar los eventos de voluntariado y promover la participación activamente? *</label>
              &nbsp;
              <RadioGroup
                  className="mb-16"
                  //value={gender}
                  name="retroalimentacion_4"
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio color="primary" />}
                    label="Yes"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio color="primary" />}
                    label="No"
                    labelPlacement="end"
                  />
                </RadioGroup>
            </FormControl>         
          </SimpleCard> )}
          <div className="py-12" />
          <SimpleCard>
          <p><strong>Deseamos obtener la siguiente información para seguir mejorando nuestra experiencia SYKES. Sus respuestas serán procesadas con estricta confidencialidad. Cada líder recibirá una serie de recomendaciones basadas en la retroalimentación que usted dará a continuación, siempre y cuando él/ella tenga 5 o más reportes directos.</strong></p>
          <p><strong>Por favor conteste las siguientes preguntas en relación a las 7 competencias esenciales de cada líder SYKES con la mayor sinceridad y objetividad posible.</strong></p>
          <p><strong>Para cada uno de los siguientes enunciados responda de acuerdo a la escala de valor ascendente donde NUNCA significa que su líder no exhibe este comportamiento y SIEMPRE significa que su líder si lo demuestra de manera contundente.</strong></p>
          </SimpleCard>
          <div className="py-12" />

          <SimpleCard title="Relación en el equipo">
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Establece un clima de confianza en el grupo, generando un ambiente de entusiasmo, compromiso y respeto. *  </label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="relacion_equipo_rating1"
                      value={this.state.value}
                      onChange={(event, newValue) => {
                       
                        this.setState({ "value": newValue });
                      }}
                      onChangeActive={(event, newHover) => {
                       
                        this.setState({ "hover": newHover });
                      }}
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                    {this.state.value !== null && <Box mb={3}>{labels[this.state.hover !== -1 ? this.state.hover : this.state.value]}</Box>}
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Maneja adecuadamente sus emociones frente a situaciones adversas. *  </label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="relacion_equipo_rating2"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Habilita espacios para escuchar a cada miembro del equipo. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="relacion_equipo_rating3"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
          </SimpleCard>
          <div className="py-12" />

          <SimpleCard title="Colaboración y trabajo en equipo">
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Fomenta el trabajo en equipo e incentiva la cooperación. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="colaboracion_equipo_rating1"
                      // value={value}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Maneja y resuelve de forma efectiva situaciones conflictivas. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="colaboracion_equipo_rating2"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Cultiva y mantiene relaciones interpersonales positivas y equitativas. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="colaboracion_equipo_rating3"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
          </SimpleCard>
          <div className="py-12" />

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
                      // value={value}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                      icon={<MaximizeIcon fontSize="large" />}
                    />
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
                      icon={<MaximizeIcon fontSize="large" />}
                    />
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
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
          </SimpleCard>
          <div className="py-12" />

          <SimpleCard title="Ejecución">
            {/* <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Logra transmitir sus ideas y objetivos de forma clara y efectiva. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="ejecucion_rating1"
                      // value={value}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>*/}
            <div>
              <FormControl className="form-control-leader" xs={12} sm={7}>
                <div >
                  <label className="label-rating">Monitorea el progreso y dirige los esfuerzos para alcanzar metas y objetivos. *</label>
                </div>
              </FormControl> 
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="ejecucion_rating2"
                      icon={<MaximizeIcon fontSize="large" iconStyle={StyledRating.largeIcon} />}
                    />
                  </Box>
              </FormControl>
             </div>
            {/*<div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Responsabiliza a los miembros de su equipo en la consecusion de objetivos. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="ejecucion_rating3"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div> */}
          </SimpleCard>
          <div className="py-12" />

          <SimpleCard title="Trato a sus colaboradores">
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Toma en cuenta la opinión de su equipo para tomar decisiones. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="trato_colaboradores_rating1"
                      // value={value}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Brinda y reacciona positivamente a la retroalimentación. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="trato_colaboradores_rating2"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Facilita conversaciones con los integrantes de su equipo sobre desarrollo y planes de crecimiento individuales. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="trato_colaboradores_rating3"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
          </SimpleCard>
          <div className="py-12" />

          <SimpleCard title="Pensamiento estratégico">
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Establece estrategias para alcanzar metas individuales y de equipo. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="pensamiento_estrategico_rating1"
                      // value={value}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Genera un balance entre necesidades organizacionales y las actividades diarias. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="pensamiento_estrategico_rating2"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Demuestra entendimiento y comunica la misión y estrategias de la organización. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="pensamiento_estrategico_rating3"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
          </SimpleCard>
          <div className="py-12" />

          <SimpleCard title="Enfoque a resultados">
            <div>         
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Identifica y elimina barreras para alcanzar resultados. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="enfoque_resultados_rating1"
                      // value={value}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Brinda el seguimiento adecuado para resolver pendientes. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="enfoque_resultados_rating2"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Es perseverante en la búsqueda de la mejora continua. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="enfoque_resultados_rating3"
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div> 
          </SimpleCard>
          <div className="py-12" /> 

          <SimpleCard title="Satisfacción general">
            <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">En general estoy satisfecho y recomiendo a mi líder por la experiencia que he tenido al laborar con el/ella. *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform" root="ratingform" >
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <StyledRating
                      name="satisfaccion_general_rating1"
                      // value={value}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                      icon={<MaximizeIcon fontSize="large" />}
                    />
                  </Box>
              </FormControl>
            </div>
          </SimpleCard>
          <div className="py-12" />

          <SimpleCard title="Sugerencias adicionales para su líder">
           <div>
              <FormControl className="form-control-leader">
                <div >
                  <label className="label-rating">Sugerencias *</label>
                </div>
              </FormControl>
              <FormControl className="ratingform">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <textarea rows="5" style={{width: "100%"}}></textarea>
                  </Box>
              </FormControl>
            </div>
            
          </SimpleCard>
          <div className="py-12"/>
          <Grid container justify="flex-end">
            <Button className="mr-12" color="" variant="contained" href="/lss">
              <Icon>close</Icon>
              <span className="pl-8 capitalize">Cancel</span>
            </Button>
            <Button color="primary" variant="contained" type="submit">
              <Icon>send</Icon>
              <span className="pl-8 capitalize">Save</span>
              </Button>
          </Grid>
        </ValidatorForm>
      </div>
    );
  }
}

export default SimpleForm;