import React, { useEffect } from "react";
import { Button, Card, Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { GetBenefitsById, GetBenefitsLocations} from "../../redux/actions/BenefitsActions";
import history from "history.js";
import { useParams } from "react-router";
import LocationsTable from "./tables/ubicacionesTable"
import Chip from '@material-ui/core/Chip';
import Links from "./tables/benefitsLinkstable"
import NotFound from "../sessions/NotFound";


const useStyles = makeStyles({
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
    
    const dispatch = useDispatch();
    let { id } = useParams();
    const classes = useStyles();
    const benefit = useSelector(state => state.benefit.benefit);
    const isLoading  = useSelector(state => state.benefit.loading);
    const isLoadingLocation  = useSelector(state => state.benefit.loadingLocation);
    const user = useSelector(state => state.user);
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner')) : false

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
            admin ? <Grid container spacing={2}>
                <Grid item md={12} xs={12}> 
                    <Card className={classes.formcard} elevation={6}>                              
                            <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Detalles del beneficio</h2>
                             <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Nombre:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].name }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Detalle:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].detail }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Descripción:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].description }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Información del Beneficio:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].benefitInfo }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Link:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].link }</TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Facebook:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].benefit.facebook }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Instagram:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].benefit.instagram }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Email:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].benefit.email }</TableCell>
                                    </TableRow> */}
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Activo:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ 
                                            benefit[0] == undefined ? "" : <Chip style={{backgroundColor: benefit[0].active ? "#4cb050" : "#939598", margin: "1%", color: "white"}} label={benefit[0].active ? "Active" : "Inactive"} key={benefit[0].active ? "Active" : "Inactive"} />}
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
                                        <TableCell colSpan={2} className="px-sm-24 border-none"> 
                                            <LocationsTable benefitslocations={benefit[0] ? benefit[0].benefitLocations : []} type={"detail"} /> 
                                        </TableCell>
                                    </TableRow>
                                    <TableRow> 
                                        <TableCell colSpan={2} className="px-sm-24 border-none"> 
                                            <Links admin={false} benefitsform={[]} setBenefitsLinks={() => {}} benefitsLinks={benefit[0] ? benefit[0].benefitLinks : []} />
                                        </TableCell>
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
            </Grid> : <NotFound/>}
        </div>
    );
}

export default AdminBenefitDetalle