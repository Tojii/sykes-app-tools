import React, { useEffect } from "react";
import {
    Card,
    CardActions,
    Grid,
    Table,
    TableRow,
    TableCell,
    TableBody,
    ListItem,
    Button
} from "@material-ui/core";
import { getGrowthOpportunity } from "../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";

const OpportunityDetail = (props) => {
    const { history, match, growth_opportunity, getGrowthOpportunity } = props

    useEffect(() =>{
        getGrowthOpportunity(match.params.opp_id);
    }, []);
    
    const handleApply = () => {
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
                        <h3 className="p-sm-24">Trilingual Technical Support Agent II for its Intel account</h3>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell width={"25%"} className="pl-sm-24 border-none">OppeningID</TableCell>
                                    <TableCell className="px-sm-24 border-none">{ growth_opportunity.id }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell width={"25%"} className="pl-sm-24 border-none">Job Position</TableCell>
                                    <TableCell className="px-sm-24 border-none">Trilingual Technical Support Agent II for its Intel account</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell width={"25%"} className="pl-sm-24 border-none">Area</TableCell>
                                    <TableCell className="px-sm-24 border-none">Dawn acquisitions</TableCell>
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
                                        <p><strong>Objective:</strong></p>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border-none" />
                                    <TableCell className="px-sm-24 border-none">
                                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                                        </p>
                                        <p><strong>Requirements:</strong></p>
                                        <ListItem>Contrary to popular belief, Lorem Ipsum is not simply random text.</ListItem>
                                        <ListItem>Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum".</ListItem>
                                        <ListItem>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.</ListItem>
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-sm-24 border-none">Start Date</TableCell>
                                    <TableCell className="px-sm-24 border-none">10/11/2020 5:00:00 PM</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="px-sm-24 border-none">Expiration Date</TableCell>
                                    <TableCell className="px-sm-24 border-none">21/12/2020 5:00:00 PM</TableCell>
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

const mapStateToProps = ({ growthReducer }) => {
    const { growth_opportunity } = growthReducer;
    return {
        growth_opportunity,
    };
};

export default connect(mapStateToProps, {
    getGrowthOpportunity,
})(OpportunityDetail);