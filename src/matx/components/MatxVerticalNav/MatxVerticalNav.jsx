import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase";
import MatxVerticalNavExpansionPanel from "./MatxVerticalNavExpansionPanel";
import { withStyles } from "@material-ui/styles";
import { useSelector, useDispatch } from 'react-redux'
import Loading from "../../../matx/components/MatxLoadable/Loading"

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
    console.log("nav",user)
    if ( user!=undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) { 
        data.map((item, index) => {
          if (data[index].name == "LSS") {
            if ((user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('LSS_User')) || (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('LSS_Owner'))) {
              data[index].display = null;
            } else {
              data[index].display = "none";
            }
          }
          if (item.children) {
            item.children.map((item2, index2) => {
              if (data[index].name == "Venta de Activos") {
                if ((user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User')) || (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner'))) {
                  data[index].display = null;
                  if(item2.name == "Ventas Home") {
                    data[index].children[index2].display = null;  
                  }
                } else {
                  data[index].display = "none";
                  if(item2.name == "Ventas Home") {
                    data[index].children[index2].display = "none";  
                  }
                }
              }
              if (data[index].name == "Benefits") {
                if ((user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_User')) || (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner'))) {
                  data[index].display = null;
                  if(item2.name == "Benefits Home") {
                    data[index].children[index2].display = null;  
                  }
                } else {
                  data[index].display = "none";
                  if(item2.name == "Benefits Home") {
                    data[index].children[index2].display = "none";  
                  }
                }
              }
              if ((user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner'))) {
                if(item2.name == "Administración Campaña" || item2.name == "Administración Inventario" || item2.name == "Consulta de Compras" || item2.name == "Consulta sobre Artículos Comprados") {
                  data[index].children[index2].display = null;  
                }
              } else {
                if(item2.name == "Administración Campaña" || item2.name == "Administración Inventario" || item2.name == "Consulta de Compras" || item2.name == "Consulta sobre Artículos Comprados") {
                  data[index].children[index2].display = "none";  
                }
              }
              if ((user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner'))) {
                if(item2.name == "Admin Benefits") {
                  data[index].children[index2].display = null;  
                }
              } else {
                if(item2.name == "Admin Benefits") {
                  data[index].children[index2].display = "none";  
                }
              }
            })
          }
        })   
    }
    // Se trae la variable con los tabs que deben mostrarse y se revisa para modificar el display, en caso de ser false se pone display "none" 
    // y en caso de true no se hace nada para que se muestre
    return data.map((item, index) => { 
      if (item.children) {
        return (
          <MatxVerticalNavExpansionPanel item={item} key={index} display={item.display ? item.display : null}>
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
    console.log("nav user", this.props.user);
    return (
      <div className="navigation">
        {this.renderLevels(this.props.navigation, this.props.user)}
      </div>
    );
  }
}

export default withStyles(styles)(MatxVerticalNav);