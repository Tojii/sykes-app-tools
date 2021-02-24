import React from "react";
import UserForm from "./components/UserForm"
import { updateUserData } from "../../redux/actions/UserActions"
import { connect } from "react-redux";
import {
    Card,
    Grid,
} from "@material-ui/core";

const EditUser = (props) => {
    const {
        updateUserData,
    } = props

    const handleSubmitCallback = (payload) => {
        updateUserData(payload);
    }

    return (
        <>
            <Card className="m-sm-30">
                <Grid container>
                    <UserForm handleSubmitCallback={handleSubmitCallback} {...props} />
                </Grid>
            </Card>
        </>
    )
}

const mapStateToProps = ({ user }) => {
    return {
        user
    };
};

export default connect(mapStateToProps, {
    updateUserData,
})(EditUser);