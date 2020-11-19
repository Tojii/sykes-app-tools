import React from "react";
import UserForm from "../user/UserForm"

const Apply = (props) => {
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

export default Apply;