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
import PropTypes from "prop-types";
import ThankYou from './ThankYou';
import {
  getValidation
} from "../../redux/actions/LSSActions";

class Wrapper extends Component {

  componentDidMount() {
    //this.props.getValidation(this.props.user.username);
  }
  
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
  getValidation: PropTypes.func.isRequired,
  lss: state.lss,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { getValidation }
)(Wrapper);