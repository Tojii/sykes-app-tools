import React from "react";
import {
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Icon
} from "@material-ui/core";

const myApplications = [
    {
        id: 1,
        name: "Trilingual Technical Support Agent II for its Intel account",
        area: "Intel",
        status: "pending",
        date: "21/12/2020 5:00:00 PM"
    },
    {
        id: 2,
        name: "Network Engineer II for the Sungard account",
        area: "Sungard",
        status: "denied",
        date: "12/11/2020 5:00:00 PM"
    },
    {
        id: 3,
        name: "L2 Network Security Engineer for the OKTA account",
        area: "OKTA",
        status: "approved",
        date: "12/11/2020 5:00:00 PM"
    }
]

const GrowthOppTable = ({props}) => {
    const { history, match } = props
    const handleDetailsClick = (oppId) => {
        history.push(`${match.path}/${oppId}`);
    }

    return (
        <>
            <Grid item lg={12}>
                <Table>
                    <TableHead color="primary">
                        <TableRow>
                            <TableCell width={"50%"}className="pl-sm-24">Job Position</TableCell>
                            <TableCell className="pl-sm-24">Area</TableCell>
                            <TableCell className="pl-sm-24">Expiration Date</TableCell>
                            <TableCell align="center">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { myApplications.map(item => {
                            return (
                                <TableRow key={ item.id }>
                                    <TableCell className="pl-sm-24">{ item.name }</TableCell>
                                    <TableCell className="pl-sm-24">{ item.area }</TableCell>
                                    <TableCell className="pl-sm-24">{ item.date }</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleDetailsClick(item.id)}
                                        >
                                        <Icon>chevron_right</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Grid>
        </>
    )
}

export default GrowthOppTable;