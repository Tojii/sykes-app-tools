import React, { Component } from "react";
import { Breadcrumb } from "matx";
import SimpleForm from "../material-kit/forms/SimpleFormLeader";
import {
    Button,
    Icon
  } from "@material-ui/core";

class StartForm extends Component {
  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Start", path: "/start" },
            ]}
          />
        </div>
        <div style={{textAlign: "center"}}>
            <h2>Leader Satisfaction Survey</h2>
            <br></br>
            <h4>Al ingresar a la encuesta debe completar todas las preguntas.</h4>
            <br></br>
            <h4>Recuerde seleccionar su perfil según su posicón actual: "Direct" (Customer Service, Tech Support, Sales) y "Indirect/Business Partners" (Human Capital, Performance Excellence, IT, Finance, Administration, Team Managers, SMEs, Supervisors, Temporary backups).</h4>
            <br></br>
            <Button color="primary" variant="contained" href="/start/basicleader">
            <Icon>add</Icon>
            <span className="pl-8 capitalize">Leader Satisfaction Survey</span>
          </Button>
        </div>
      </div>
    );
  }
}

export default StartForm;
