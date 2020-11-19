import React from "react";
import UserForm from "./components/UserForm"

const EditUser = (props) => {
    const { 
        user,
        match,
        history,
    } = props

    return (
        <>
            <UserForm {...props} />
        </>
    )
}

export default EditUser;