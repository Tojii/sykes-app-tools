import React, { Component } from "react";
import { Breadcrumb } from "matx";
import SimpleFormTour from "../../material-kit/forms/SimpleFormLeaderTour";

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
        <SimpleFormTour />
      </div>
    );
  }
}

export default BasicForm;
