import React from "react";
import {
    Grid,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    makeStyles,
    Card,
    Fab,
    Icon,
    Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    rowHeader: {
        background: '#039be5',
        "& .tdHeader": {
            color: 'white !important',
            border: '1px solid white',
        },
    },
    spanRow: {
        background: 'white',
    },
    metricsModal: {
        overflow: "hidden",
        [theme.breakpoints.down("xs")]: {
            overflow: "unset",
        },
    },
    gridtext: {
        wordWrap: "break-word"
    }
  })
);

const MyMetrics = ({ metrics, history }) => {
    const classes = useStyles();

    const handleClose = () => {
        history.push('/growth-opportunities');
    }

    return (
        <>
            <Grid className={classes.metricsModal} container md={12} xs={11} spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={2} className="m-24">
                        <Grid item xs={11} md={3}>
                            <Card className="play-card p-sm-24 bg-paper h-100" elevation={6}>
                                <div className="flex flex-middle">
                                    <p className="m-0" style={{
                                        fontSize: "44px",
                                        opacity: 0.6,
                                        color: 'primary'
                                    }}>{ metrics.tenure_in_Months || ""}</p>
                                    <div className="ml-12">
                                    <h6 className="m-0 mt-4 text-primary font-weight-500">
                                        Tenure
                                    </h6>
                                    <small className="text-muted">months</small>
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={11} md={3}>
                            <Card className="play-card p-sm-24 bg-paper h-100" elevation={6}>
                                <div className="flex flex-middle">
                                    <p className="m-0" style={{
                                        fontSize: "44px",
                                        opacity: 0.6,
                                        color: 'primary'
                                    }}>{ metrics.final_Score || ""}</p>
                                    <div className="ml-12">
                                    <h6 className="m-0 mt-4 text-primary font-weight-500">
                                        English Level
                                    </h6>
                                    <small className="text-muted">{ metrics.fecha_de_Evaluacion ? new Date(metrics.fecha_de_Evaluacion).toLocaleDateString() : ""}</small>
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={11} md={5}>
                            <Card elevation={3} className="play-card p-sm-24 bg-paper h-100">
                                <div className="flex flex-middle">
                                    {/* <Fab
                                    size="medium"
                                    className="bg-light-warning circle-44 box-shadow-none"
                                    > */}
                                    <Icon className="text-warning">warning</Icon>
                                    {/* </Fab> */}
                                    <div>
                                        <h6 className="font-weight-500 text-warning m-0 ml-12">
                                            Warnings
                                        </h6>
                                        <h3 className="font-weight-500 m-0 ml-12">
                                            { 
                                                metrics.eWarning_Action == "Verbal" 
                                                    ? "N/A"
                                                    : metrics.eWarning_Action || "N/A"
                                            }
                                        </h3>
                                    </div>
                                </div>
                                <div className="pt-16 flex flex-middle">
                                    <h3 className="m-0 text-muted flex-grow-1">
                                        { 
                                            metrics.dA_Category == "Verbal" 
                                                ? "N/A"
                                                : metrics.dA_Category || ""
                                        }
                                    </h3>
                                    <span className="font-size-13 text-warning ml-4">
                                        { 
                                            metrics.eWarning_Date == "Verbal" 
                                                ? "N/A"
                                                : metrics.eWarning_Date || ""
                                        }
                                    </span>
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={2} className="mx-24">
                        <Grid item xs={12} md={11}>
                            <Card elevation={3} className="play-card p-sm-24 bg-paper h-100">
                                <h4>Your current metrics</h4>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell rowSpan={1} className="pl-sm-24"/>
                                            <TableCell className="pl-sm-24">Score</TableCell>
                                            <TableCell className="pl-sm-24">Month</TableCell>
                                            <TableCell className="pl-sm-24">Year</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>PA1</TableCell>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>{ metrics.evA_1 ? (metrics.evA_1 > 0 ? metrics.evA_1 : "") : "" }</TableCell>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>{ metrics.evA_1_Period || "" }</TableCell>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>{ metrics.evA_1_Year || "" }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>PA2</TableCell>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>{ metrics.evA_2 ? (metrics.evA_2 > 0 ? metrics.evA_2 : "") : "" }</TableCell>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>{ metrics.evA_2_Period || "" }</TableCell>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>{ metrics.evA_2_Year || "" }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>PA3</TableCell>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>{ metrics.evA_3 ? (metrics.evA_3 > 0 ? metrics.evA_3 : "") : "" }</TableCell>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>{ metrics.evA_3_Period || "" }</TableCell>
                                            <TableCell className={classes.gridtext + " pl-sm-24"}>{ metrics.evA_3_Year || "" }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="pl-sm-24">PA Overall</TableCell>
                                            <TableCell colSpan={3} align={"center"} className={classes.gridtext + " pl-sm-24"}>{ metrics.last_3_Months_Average ? (metrics.last_3_Months_Average > 0 ? metrics.last_3_Months_Average : "") : "" }</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={2} className="m-24">
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={handleClose}
                        >Close</Button>
                    </Grid>
                </Grid> */}
            </Grid>
        </>
    )
}

export default MyMetrics
