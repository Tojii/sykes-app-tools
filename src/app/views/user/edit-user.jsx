import React from "react";
import UserForm from "./components/UserForm"
import { updateUserData } from "../../redux/actions/UserActions"
import { connect } from "react-redux";

const EditUser = (props) => {
    const {
        match,
        history,
        user,
        updateUserData,
    } = props

    const handleSubmitCallback = (payload) => {
        updateUserData(payload);
    }

    return (
        <>
            <UserForm handleSubmitCallback={handleSubmitCallback} {...props} />
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