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
  })
);

const MyMetrics = ({ metrics, history }) => {
    const classes = useStyles();

    const handleClose = () => {
        history.push('/growth-opportunities');
    }

    return (
        <>
            <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={2} md={12} className="m-24">
                        <Grid item xs={3} md={3}>
                            <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                                <div className="flex flex-middle">
                                    <p className="m-0" style={{
                                        fontSize: "44px",
                                        opacity: 0.6,
                                        color: 'primary'
                                    }}>5</p>
                                    <div className="ml-12">
                                    <h6 className="m-0 mt-4 text-primary font-weight-500">
                                        Tenure
                                    </h6>
                                    <small className="text-muted">months</small>
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                                <div className="flex flex-middle">
                                    <p className="m-0" style={{
                                        fontSize: "44px",
                                        opacity: 0.6,
                                        color: 'primary'
                                    }}>{ metrics.englishScoreCurrent || ""}</p>
                                    <div className="ml-12">
                                    <h6 className="m-0 mt-4 text-primary font-weight-500">
                                        English Level
                                    </h6>
                                    <small className="text-muted">28/11/2020</small>
                                    {/* <small className="text-muted">{ metrics.englishScoreCurrentDate || "no level"}</small> */}
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Card elevation={3} className="p-16">
                                <div className="flex flex-middle">
                                    <Fab
                                    size="medium"
                                    className="bg-light-warning circle-44 box-shadow-none"
                                    >
                                    <Icon className="text-warning">warning</Icon>
                                    </Fab>
                                    <h5 className="font-weight-500 text-warning m-0 ml-12">
                                    Warnings
                                    </h5>
                                </div>
                                <div className="pt-16 flex flex-middle">
                                    <h4 className="m-0 text-muted flex-grow-1">Type</h4>
                                    {/* <h2 className="m-0 text-muted flex-grow-1">{ metrics.warningCurrentType || "" }</h2> */}
                                    <span className="font-size-13 text-warning ml-4">20/11/2020</span>
                                    {/* <span className="font-size-13 text-warning ml-4">{ metrics.warningCurrentDate || "no warnings" }</span> */}
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={2} md={12} className="mx-24">
                        <Grid item lg={11} md={11} sm={11}>
                            <Card elevation={3} className="p-44">
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
                                            <TableCell className="pl-sm-24">PA1</TableCell>
                                            <TableCell className="pl-sm-24">{0}</TableCell>
                                            <TableCell className="pl-sm-24">{""}</TableCell>
                                            <TableCell className="pl-sm-24">{""}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="pl-sm-24">PA2</TableCell>
                                            <TableCell className="pl-sm-24">{0}</TableCell>
                                            <TableCell className="pl-sm-24">{""}</TableCell>
                                            <TableCell className="pl-sm-24">{""}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="pl-sm-24">PA3</TableCell>
                                            <TableCell className="pl-sm-24">{0}</TableCell>
                                            <TableCell className="pl-sm-24">{""}</TableCell>
                                            <TableCell className="pl-sm-24">{""}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="pl-sm-24">PA Overall</TableCell>
                                            <TableCell colSpan={3} align={"center"} className="pl-sm-24">{ metrics.paCurrent }</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        </>
    )
}

export default MyMetrics
