import React, { Component } from "react";
import { Breadcrumb } from "matx";
import SimpleFormTour from "./SimpleFormLeaderTour";
import Container from './Container';

class Form extends Component {
  render() {
    return (
      <Container>
        <SimpleFormTour />
      </Container>
    );
  }
}

export default Form;
