import React, { useState } from "react";
import {
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";

const ConfirmStep = () => {
    return (
        <>
            <Grid item lg={12} className="px-sm-24">
                <h3>Confirm application</h3>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell width={"35%"} className="pl-sm-24">Job Id:</TableCell>
                            <TableCell className="pl-sm-24">1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"}className="pl-sm-24">Badge:</TableCell>
                            <TableCell className="pl-sm-24">1234</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"}className="pl-sm-24">Employee name:</TableCell>
                            <TableCell className="pl-sm-24">González Barrantes Gerald Josué</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"}className="pl-sm-24">Email:</TableCell>
                            <TableCell className="pl-sm-24">gerald@gmail.com</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"}className="pl-sm-24">Phone:</TableCell>
                            <TableCell className="pl-sm-24">88888888</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"}className="pl-sm-24">Work schedule:</TableCell>
                            <TableCell className="pl-sm-24">Monday, Tuesday, Wednesday</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"}className="pl-sm-24">Start time:</TableCell>
                            <TableCell className="pl-sm-24">8:00 AM</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"35%"}className="pl-sm-24">End time:</TableCell>
                            <TableCell className="pl-sm-24">5:00 PM</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </>
    )
}

export default ConfirmStep;