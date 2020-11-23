import React from "react";
import {
    Grid,
    Table,
    TableRow,
    TableCell,
    TableBody,
    makeStyles,
    CardActions,
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
            <Grid item lg={12}>
                <h3 className="p-sm-24">Your current metrics</h3>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="pl-sm-24">Tenure</TableCell>
                            <TableCell colSpan={3} align={"center"} className="pl-sm-24">{metrics.tenure}</TableCell>
                        </TableRow>
                        <TableRow className={classes.rowHeader}>
                            <TableCell rowSpan={1} className={classes.spanRow + " pl-sm-24"}></TableCell>
                            <TableCell className="tdHeader pl-sm-24">Score</TableCell>
                            <TableCell className="tdHeader pl-sm-24">Month</TableCell>
                            <TableCell className="tdHeader pl-sm-24">Year</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="pl-sm-24">PA1</TableCell>
                            <TableCell className="pl-sm-24">0.0</TableCell>
                            <TableCell className="pl-sm-24">{"month"}</TableCell>
                            <TableCell className="pl-sm-24">{"year"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="pl-sm-24">PA2</TableCell>
                            <TableCell className="pl-sm-24">0.0</TableCell>
                            <TableCell className="pl-sm-24">{"month"}</TableCell>
                            <TableCell className="pl-sm-24">{"year"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="pl-sm-24">PA3</TableCell>
                            <TableCell className="pl-sm-24">0.0</TableCell>
                            <TableCell className="pl-sm-24">{"month"}</TableCell>
                            <TableCell className="pl-sm-24">{"year"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="pl-sm-24">PA Overall</TableCell>
                            <TableCell colSpan={3} align={"center"} className="pl-sm-24">{"0.00"}</TableCell>
                        </TableRow>
                        <TableRow className={classes.rowHeader}>
                            <TableCell rowSpan={5} className={classes.spanRow + " pl-sm-24"}>Warnings</TableCell>
                            <TableCell className="tdHeader pl-sm-24">Type</TableCell>
                            <TableCell className="tdHeader pl-sm-24">Category</TableCell>
                            <TableCell className="tdHeader pl-sm-24">Date</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="pl-sm-24">{"type"}</TableCell>
                            <TableCell className="pl-sm-24">{"category"}</TableCell>
                            <TableCell className="pl-sm-24">{"date"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="pl-sm-24">{"type"}</TableCell>
                            <TableCell className="pl-sm-24">{"category"}</TableCell>
                            <TableCell className="pl-sm-24">{"date"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="pl-sm-24">{"type"}</TableCell>
                            <TableCell className="pl-sm-24">{"category"}</TableCell>
                            <TableCell className="pl-sm-24">{"date"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="pl-sm-24">{"type"}</TableCell>
                            <TableCell className="pl-sm-24">{"category"}</TableCell>
                            <TableCell className="pl-sm-24">{"date"}</TableCell>
                        </TableRow>
                        <TableRow className={classes.rowHeader}>
                            <TableCell rowSpan={3} className={classes.spanRow + " pl-sm-24"}>English Level</TableCell>
                            <TableCell className="tdHeader pl-sm-24">Score</TableCell>
                            <TableCell colSpan={2} className="tdHeader pl-sm-24">Date</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1} className="pl-sm-24">{"0"}</TableCell>
                            <TableCell colSpan={2} className="pl-sm-24">{"date"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClose()}
                >
                    Close
                </Button>
            </CardActions>
        </>
    )
}

export default MyMetrics
