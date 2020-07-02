import React, { Component } from "react";
import { Breadcrumb } from "matx";
import SimpleForm from "../../material-kit/forms/SimpleFormLeader";
import {
    Button,
    Icon, Grid
  } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { SimpleCard } from "matx";
import Loading from "../../../../matx/components/MatxLoadable/Loading";

class LSSHome extends Component {



  render() {
    var isLoading = false;
    

    return (
      isLoading ? <Loading /> : 
      
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "LSS", path: "lss" },
            ]}
          />
        </div>
        <SimpleCard>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <h1>Leader Satisfaction Survey</h1>
              <br></br>
              <p>Al ingresar a la encuesta debe completar todas las preguntas.</p>
              <p>Recuerde seleccionar su perfil según su posicón actual: "Direct" (Customer Service, Tech Support, Sales) y "Indirect/Business Partners" (Human Capital, Performance Excellence, IT, Finance, Administration, Team Managers, SMEs, Supervisors, Temporary backups).</p>
              <Button color="primary" variant="contained" component={Link} to="/lss/form">
                <Icon>add</Icon>
                <span className="pl-8 capitalize">Leader Satisfaction Survey</span>
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} className="h-200vh">
              <img src="/assets/images/illustrations/teamwork.svg" alt="" />
            </Grid>
            <Grid item xs={12} sm={8}></Grid>
          </Grid>

            
        </SimpleCard>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lss: state.lss
});


export default LSSHome;
