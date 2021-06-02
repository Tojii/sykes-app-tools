import React, { useEffect } from "react";
import {
    Grid,
    Table,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { setApplyData } from "../../../redux/actions/ApplyActions"
import { connect } from "react-redux";

const ConfirmStep = (props) => {
    const { apply, user, growth_opportunity, setDisableNext } = props

    useEffect(() => {
        setDisableNext(false);
    }, [])
    return (
        <>
            <Grid item lg={12} className="px-sm-24">
                <h3>Confirm application</h3>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell width={"35%"} className="pl-sm-24">Job Id:</TableCell>
                            <TableCell className="pl-sm-24">{growth_opportunity.openingId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"} className="pl-sm-24">Badge:</TableCell>
                            <TableCell className="pl-sm-24">{user.badge}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"} className="pl-sm-24">Employee name:</TableCell>
                            <TableCell className="pl-sm-24">{user.fullname}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"} className="pl-sm-24">Email:</TableCell>
                            <TableCell className="pl-sm-24">{user.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"} className="pl-sm-24">Phone:</TableCell>
                            <TableCell className="pl-sm-24">{user.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"} className="pl-sm-24">Work schedule:</TableCell>
                            <TableCell className="pl-sm-24">{apply.workSchedule}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"} className="pl-sm-24">Start time:</TableCell>
                            <TableCell className="pl-sm-24">{apply.startTime}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"} className="pl-sm-24">End time:</TableCell>
                            <TableCell className="pl-sm-24">{apply.endTime}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </>
    )
}

const mapStateToProps = state => ({
    apply: state.apply.apply,
    growth_opportunity: state.growth.growth_opportunity,
    user: state.user,
});

export default connect(mapStateToProps, {
    setApplyData,
})(ConfirmStep);