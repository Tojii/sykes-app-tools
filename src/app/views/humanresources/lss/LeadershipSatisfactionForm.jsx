import React, { Component } from "react";
import { Breadcrumb } from "matx";
import SimpleForm from "../../material-kit/forms/SimpleFormLeader";

class BasicForm extends Component {
  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "LSS", path: "/hr/lss" },
              { name: "Leadership Satisfaction Form" }
            ]}
          />
        </div>
        <SimpleForm />
      </div>
    );
  }
}

export default BasicForm;
