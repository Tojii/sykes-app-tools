import React, { Component } from "react";

class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        <div className="flex flex-middle brand">
          <img src={"./assets/images/logo.png"} alt="SYKES" />
          <span className="brand__text"></span>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Brand;
