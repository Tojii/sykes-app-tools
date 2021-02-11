import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase";
import MatxVerticalNavExpansionPanel from "./MatxVerticalNavExpansionPanel";
import { withStyles } from "@material-ui/styles";
import { useSelector, useDispatch } from 'react-redux'

const styles = theme => ({
  expandIcon: {
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(90deg)"
  },
  collapseIcon: {
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(0deg)"
  }
});

class MatxVerticalNav extends Component {
  state = {
    collapsed: true,
  };
  
  renderLevels = (data, user) => {
    // data[0].display = "none";
    // data[1].user = user;
    // Se trae la variable con los tabs que deben mostrarse y se revisa para modificar el display, en caso de ser false se pone display "none" 
    // y en caso de true no se hace nada para que semuestre
    return data.map((item, index) => {
      if (item.children) {
        return (
          <MatxVerticalNavExpansionPanel item={item} key={index}>
            {this.renderLevels(item.children)}
          </MatxVerticalNavExpansionPanel>
        );
      } else {
        return (
          <NavLink key={index} to={item.path} style={{display: item.display ? item.display : null}} className="nav-item">
            <TouchRipple key={item.name} name="child" className="w-100">
              {(() => {
                if (item.icon) {
                  return (
                    <Icon className="item-icon text-middle">{item.icon}</Icon>
                  );
                } else {
                  return (
                    <span className="item-icon icon-text">{item.iconText}</span>
                  );
                }
              })()}
              <span style={{paddingLeft:"15px"}} className="text-middle item-text">{item.name}</span>
              <div className="mx-auto"></div>
              {item.badge && (
                <div className={`badge bg-${item.badge.color}`}>
                  {item.badge.value}
                </div>
              )}
            </TouchRipple>
          </NavLink>
        );
      }
    });
  };

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <div className="navigation">
        {this.renderLevels(this.props.navigation, this.props.user)}
      </div>
    );
  }
}

export default withStyles(styles)(MatxVerticalNav);
