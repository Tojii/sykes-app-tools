import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton,
    Tooltip
  } from "@material-ui/core";
import {getAllRaft} from "../../redux/actions/RaftActions";
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from "mui-datatables";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const Home = () => {
    const raft = useSelector(state => state.raft.raftlist);
    const user = useSelector(state => state.user.badge);
    const dispatch = useDispatch();
    const columns = ["Primer Nombre", "Segundo Nombre", "Primer Apellido", "Segundo Apellido", "Telefono", "Detalle", "Fecha Referencia", "Badge", "RAFTID", "Puesto", "Campaña"];

    useEffect(() => {
        async function fetchData() {
            // You can await here
            await dispatch(getAllRaft(user));
          }
          fetchData();
        console.log("raft list", raft);
        console.log("user", user)
    }, []);

    // const getMuiTheme = () =>
    // createMuiTheme({
    //   overrides: {
    //     MUIDataTable: {
    //       paper: {
    //         boxShadow: "none",
    //         "-webkit-box-shadow": "none",
    //         '-moz-box-shadow': "none"         
    //       }
    //     },
    //   }
    // });

    const addButton = () => {
        return (
            <React.Fragment>
              <Tooltip title={"Nuevo"}>
                <IconButton component={Link} to="/Raft/Form">
                  <AddIcon/>
                </IconButton>
              </Tooltip>
            </React.Fragment>
        );
    }

    const options = {
        filterType: 'dropdown',
        isRowSelectable: (dataIndex, selectedRows) => {
            //prevents selection of any additional row after the third
            if (selectedRows.data.length > 0 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
            //prevents selection of row with title "Attorney"
            return raft[dataIndex][1] != "Attorney";
        },
        selectableRowsHeader: false,
        filter: true,
        responsive: "vertical",    
        onDownload: (buildHead, buildBody, columns, data) => {
            return "\uFEFF" + buildHead(columns) + buildBody(data); 
        },
        print: false,
        customToolbar: () => {
            return (addButton());
        }
    };

    return (
        <div className="m-sm-30" style={{boxShadow: "none"}}>
            <MUIDataTable 
                title={"RAFT"} 
                data={raft.map(item => {
                    return [
                        item.firstName,
                        item.secondName,
                        item.lastName,
                        item.secondLastName,
                        item.phone,
                        item.detalis,
                        item.dateRefered,
                        item.badge,
                        item.raftId,
                        item.job,
                        item.campaing,
                    ]
                })} 
                columns={columns} 
                options={options} 
            />
        </div>
    )
}

export default Home
