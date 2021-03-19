import React, { useState, Component, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Grid, 
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { GetBenefitsById, GetBenefitsLocations} from "../../redux/actions/BenefitsActions";
import history from "history.js";
import { useParams } from "react-router";
import LocationsTable from "./ubicacionesTable"
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles({
    cardcarrito: {     
        marginLeft: "3%",
        width: "96%",
        marginTop: "3%",
    },
    formcard: {
        "@media (min-width: 1023px)": {
            marginLeft: "0%",
            width: "100%",
        },
        "@media (min-width: 1024px)": {
            marginLeft: "25%",
            width: "50%",
        }
     
    },
    sectionbutton: {
        marginLeft: "25%",
        width: "50%",
        marginTop: "3%",
        marginBottom: "2%",
        textAlign: "center"
    },
    cellspace:{
        whiteSpace: "unset",
    }
});

const AdminBenefitDetalle = (props) => {
    
    const benefit = useSelector(state => state.benefit.benefit);
    const isLoading  = useSelector(state => state.benefit.loading);
    const isLoadingLocation  = useSelector(state => state.benefit.loadingLocation);
    const benefitslocations = useSelector(state => state.benefit.benefitslocations);
    const dispatch = useDispatch();
    const classes = useStyles();
    let { id } = useParams();

    useEffect(() => {
        dispatch(GetBenefitsById(id));
        dispatch(GetBenefitsLocations());
    }, []);

    const handleBack = () => {
        history.push("/Benefits/AdminFormBenefits"); 
    }

    return (
        <div className="m-sm-30">
            {(isLoading || isLoadingLocation) ? <Loading/> : 
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}> 
                    <Card className={classes.formcard} elevation={6}>                              
                            <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Detalles del beneficio</h2>
                             <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Name:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].name }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Detail:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].detail }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Description:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].description }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Benefit Information:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].benefitInfo }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Link:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].link }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Facebook:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].facebook }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Instagram:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].instagram }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Email:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].email }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Active:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ 
                                            benefit[0] == undefined ? "" :  <Chip style={{backgroundColor: benefit[0].active ? "green" : "red", margin: "1%", color: "white"}} label={benefit[0].active ? "Active" : "Inactive"} key={benefit[0].active ? "Active" : "Inactive"} />}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Logo:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{
                                             benefit[0] == undefined ? null : <img
                                             className={classes.sectionbutton}                                         
                                             alt="..."
                                             src={`${benefit[0].logo}`}
                                             />
                                        }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"100%"} className={classes.cellspace + " pl-sm-24"}>
                                            <h6>Localizaciones:</h6>
                                        </TableCell>
                                        <TableCell ><LocationsTable benefitslocations={benefitslocations} type={"detail"} /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className={classes.sectionbutton}>
                                <Button variant="contained" onClick={handleBack} color="primary">
                                    VOLVER
                                </Button>
                            </div>
                    </Card>
                </Grid>
          </Grid>}
        </div>
    );
}

export default AdminBenefitDetalle