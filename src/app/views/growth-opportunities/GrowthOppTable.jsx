import React, { useEffect, useState } from "react";
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
import { getGrowthOpportunities } from "../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";

const GrowthOppTable = ({
    growth_opportunities, 
    getGrowthOpportunities, 
    props
}) => {
    const { history, match } = props

    useEffect(() =>{
        getGrowthOpportunities();
    }, []);
    
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
                        { growth_opportunities.map(item => {
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

const mapStateToProps = ({ growthReducer }) => {
    const { growth_opportunities } = growthReducer;
    return {
        growth_opportunities,
    };
};

export default connect(mapStateToProps, {
    getGrowthOpportunities,
})(GrowthOppTable);
