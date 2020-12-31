import React from "react";
import {
    Card,
    CardActions,
    Grid,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Button
} from "@material-ui/core";
import { connect } from "react-redux";
import ReactHtmlParser from 'react-html-parser';
import { setLoading } from "../../../redux/actions/ApplyActions";

const Job = (props) => {
    const { history, match, growth_opportunity, apply, setLoading } = props
    
    const handleApply = () => {
        setLoading();
        apply["backResume"] = false;
        apply["backSchedule"] = false;
        apply["backvalidation"] = false;
        history.push(`${match.url}/apply`);
    }

    const handleClose = () => {
        history.push('/growth-opportunities');
    }

    return (
        <>
            <Card className="m-sm-30">
                <Grid container>
                    <Grid item lg={12}>
                        <h3 className="p-sm-24">{growth_opportunity.title}</h3>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell width={"25%"} className="pl-sm-24 border-none">OppeningID</TableCell>
                                    <TableCell className="px-sm-24 border-none">{ growth_opportunity.id }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell width={"25%"} className="pl-sm-24 border-none">Job Position</TableCell>
                                    <TableCell className="px-sm-24 border-none">{growth_opportunity.title}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell width={"25%"} className="pl-sm-24 border-none">Area</TableCell>
                                    <TableCell className="px-sm-24 border-none">{growth_opportunity.area}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        width={"25%"}
                                        className="pl-sm-24 border-none"
                                        style={{ verticalAlign: 'top' }}
                                    >
                                        Description
                                    </TableCell>
                                    <TableCell className="px-sm-24 border-none" style={{ verticalAlign: 'top' }}>
                                        { ReactHtmlParser(growth_opportunity.description) }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-sm-24 border-none">Start Date</TableCell>
                                    <TableCell className="px-sm-24 border-none">{growth_opportunity.startDate}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-sm-24 border-none">Expiration Date</TableCell>
                                    <TableCell className="px-sm-24 border-none">{growth_opportunity.expirationDate}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <CardActions style={{ justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApply()}
                    >
                        Apply
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleClose()}
                    >
                        Close
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

const mapStateToProps = ({ growthReducer, applyReducer }) => {
    const { growth_opportunity } = growthReducer;
    const { apply } = applyReducer;
    return {
        growth_opportunity,
        apply,
    };
};

export default connect(mapStateToProps, {setLoading})(Job);