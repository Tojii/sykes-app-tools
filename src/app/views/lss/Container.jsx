import React, { Component } from "react";
import { Breadcrumb } from "matx";
import {
    Button,
    Icon, Grid
  } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { SimpleCard } from "matx";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { connect } from "react-redux";
import ThankYou from './ThankYou';

class Wrapper extends Component {

  render() {
    return (
      this.props.lss.loading ? <Loading /> : 
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Leader Satisfaction Survey", path: "lss" },
            ]}
          />
        </div>
        {
          this.props.lss.hasAnswered  ? 
          <ThankYou /> :
          this.props.children
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lss: state.lss
});

export default connect(mapStateToProps)(Wrapper);