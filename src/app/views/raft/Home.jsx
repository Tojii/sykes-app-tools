import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
    Card,
    MenuItem
  } from "@material-ui/core";
import {getAllRaft} from "../../redux/actions/RaftActions";
import shortid from "shortid";
import MemberEditorDialog from "./FormRaft";
import { useSelector, useDispatch } from 'react-redux';
import { MatxMenu, MatxToolbarMenu, MatxSearchBox } from "matx";
import MUIDataTable from "mui-datatables";
import { Breadcrumb, ConfirmationDialog } from "matx";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";

const Home = () => {
    const raft = useSelector(state => state.raft.raftlist);
    const user = useSelector(state => state.user.badge);
    const dispatch = useDispatch();
    //const [page, setPage] = useState(0);
    const columns = ["Primer Nombre", "Segundo Nombre", "Primer Apellido", "Segundo Apellido", "Telefono", "Detalle", "Fecha Referencia", "Badge", "RAFTID", "Puesto", "Campaña"];

    useEffect(() => {
        async function fetchData() {
            // You can await here
            await dispatch(getAllRaft(user));
            // ...
          }
          fetchData();
        //await dispatch(getAllRaft());
        console.log("raft list", raft);
        console.log("user", user)
    }, []);

    const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            boxShadow: "none",
            "-webkit-box-shadow": "none",
            '-moz-box-shadow': "none"         
          }
        },
      }
    });

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
        print: false   
    };

    return (
        <div className="m-sm-30" style={{boxShadow: "none"}}>
            <Button
                className="mb-16"
                variant="contained"
                color="primary"
                component={Link} to="/Raft/Form"
                style={{boxShadow: "none"}}
            >
                <Icon>add</Icon>
                <span>Nuevo</span>
            </Button>
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
