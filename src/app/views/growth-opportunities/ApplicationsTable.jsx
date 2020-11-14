import React from "react";
import {
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { classList } from "utils";

const myApplications = [
    {
        id: 1,
        name: "Trilingual Technical Support Agent II for its Intel account",
        area: "Intel",
        status: "pending",
        date: "05/10/2020"
    },
    {
        id: 2,
        name: "Network Engineer II for the Sungard account",
        area: "Sungard",
        status: "denied",
        date: "10/11/2020"
    },
    {
        id: 3,
        name: "L2 Network Security Engineer for the OKTA account",
        area: "OKTA",
        status: "approved",
        date: "12/11/2020"
    }
]

const ApplicationsTable = () => {
    return (
        <>
            <Grid item lg={12}>
                <h3 className="p-sm-24">My applications</h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={"50%"}className="pl-sm-24">Job Position</TableCell>
                            <TableCell className="pl-sm-24">Status</TableCell>
                            <TableCell className="pl-sm-24">Application Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { myApplications.map(item => {
                            return (
                                <TableRow>
                                    <TableCell className="p-sm-24">{ item.name }</TableCell>
                                    <TableCell className="pl-sm-24 capitalize">
                                        <small
                                        className={classList({
                                            "border-radius-4 text-white px-8 py-2": true,
                                            "bg-primary": `${item.status}` === 'approved',
                                            "bg-secondary": `${item.status}` === 'pending',
                                            "bg-error": `${item.status}` === 'denied',
                                        })}
                                    >
                                        { item.status }
                                        </small>
                                    </TableCell>
                                    <TableCell className="pl-sm-24">{ item.date }</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Grid>
        </>
    )
}

export default ApplicationsTable;