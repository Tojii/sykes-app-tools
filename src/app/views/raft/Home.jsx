import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton,
    Tooltip,
    Button
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
import { XGrid, GridToolbarContainer, GridColumnsToolbarButton,
    GridFilterToolbarButton, GridToolbarExport } from '@material-ui/x-grid';
// import {
//     GridToolbarContainer,
//     GridColumnsToolbarButton,
//     GridFilterToolbarButton,
//     GridToolbar,
//     DataGrid 
//   } from '@material-ui/data-grid';
import { LicenseInfo } from '@material-ui/x-grid';

LicenseInfo.setLicenseKey(
  '95befe248c0ce994ab605af916d5400bT1JERVI6MjIwNDIsRVhQSVJZPTE2NDY0MzA5MzIwMDAsS0VZVkVSU0lPTj0x',
);

const Home = () => {
    const raft = useSelector(state => state.raft.raftlist);
    const user = useSelector(state => state.user.badge);
    const dispatch = useDispatch();
    //const columns = ["id", "Primer Nombre", "Segundo Nombre", "Primer Apellido", "Segundo Apellido", "Telefono", "Detalle", "Fecha Referencia", "Badge", "RAFTID", "Puesto", "Campaña"];

    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            {addButton()}
            <GridColumnsToolbarButton />
            <GridFilterToolbarButton />
            {/* <GridToolbarExport /> */}
          </GridToolbarContainer>
        );
      }

    const columns = [
       
        { field: 'id', headerName: 'ID', width: 130,  hide: true },
        { field: 'firstName', headerName: 'Primer Nombre', width: 155 },
        { field: 'secondName', headerName: 'Segundo Nombre', width: 165 },
        { field: 'lastName', headerName: 'Primer Apellido', width: 155 },
        { field: 'secondLastName', headerName: 'Segundo Apellido', width: 165 },
        { field: 'phone', headerName: 'Telefono', width: 130 },
        { field: 'detalis', headerName: 'Detalle', width: 130 },
        { field: 'dateRefered', headerName: 'Fecha Referencia', width: 180 },
        { field: 'badge', headerName: 'Badge', width: 100 },
        { field: 'raftId', headerName: 'RAFTID', width: 130 },
        { field: 'job', headerName: 'Puesto', width: 130 },
        { field: 'campaing', headerName: 'Campaña', width: 130 },
       
       
      ];

    useEffect(() => {
        async function fetchData() {
            // You can await here
            await dispatch(getAllRaft("19746"));
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
                <Button
                style={{color: "#039be5",
                    backgroundColor: "transparent",
                    boxShadow: "unset"}}
                component={Link} to="/Raft/MakeReferral"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                >
                    New referral
                </Button>
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

    const data = raft.map(item => {
        {
            return {
            "id": item.raftId,
            "firstName": item.firstName,
            "secondName": item.secondName,
            "lastName": item.lastName,
            "secondLastName": item.secondLastName,
            "job":item.job,
            "phone": item.phone,
            "detalis":item.detalis,
            "dateRefered":item.dateRefered,
            "badge":item.badge,
            "raftId":item.raftId,
            "campaing":item.campaing,
            
        }
        }
    })

    return (
        console.log("raft",raft),
        <div className="m-sm-30" style={{boxShadow: "none"}}>
            {/* <MUIDataTable 
                title={"RAFT"} 
                data={data} 
                columns={columns} 
                options={options} 
            /> */}

            <XGrid
                rows={data}
                columns={columns} 
                
                //options={options} 
                loading={data.length == 0}
                autoHeight
                rowsPerPageOptions={[10, 25, 50, 100]}
                pageSize={10}
                //columns={columns}
                //disableColumnMenu={true}
                pagination={true}
                //checkboxSelection
                components={{
                    Toolbar: CustomToolbar,
                  }}
            />
        </div>
    )
}

export default Home
