import React, { Component } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import SimpleForm from "./SimpleFormLeader";
import Tour from "reactour";
import "./styletour.css";

class SimpleFormTour extends Component {
  constructor() {
    super();
    this.state = {
      isTourOpen: true,
      isShowingMore: false
    };
  }
 
  disableBody = target => disableBodyScroll(target);
  enableBody = target => enableBodyScroll(target);

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  render() {
    const { isTourOpen, isShowingMore } = this.state;
    const accentColor = "#5cb7b7";
    return (
      <div overflow="hidden">
        <SimpleForm/>
        <Tour
          onRequestClose={this.closeTour}
          steps={steps}
          isOpen={isTourOpen}
          disableKeyboardNavigation={['esc']}
          closeWithMask={false}
          scrollDuration={2}
          // maskClassName="mask"
          // className="helper"
          // rounded={5}
          // accentColor={accentColor}
          onAfterOpen={this.disableBody}
          onBeforeClose={this.enableBody}
        />
      </div>
    );
  }
}

const steps = [
  {
    selector: '[data-tut="tour_step1_posicion"]',
    content: `Ok, esto es lo primero.`,
  },
  {
    selector: '[data-tut="reactour__select"]',
    content: `Ok, esto es lo tercero.`
  },
  {
    selector: '[data-tut="reactour__rate"]',
    content: `Ok, esto es lo segundo.`,
    action: node => {
    // by using this, focus trap is temporary disabled
    node.focus()
    console.log('yup, the target element is also focused!')
    }
  }

];

export default SimpleFormTour;
