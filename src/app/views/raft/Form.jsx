import React from "react";
import { Breadcrumb } from "matx";
import NewFormRaft from "./FormRaft";

function Form() {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                routeSegments={[
                { name: "Raft", path: "/Raft/Home" },
                { name: "Nuevo", path: "/Raft/FormRefer" },                
                ]}
            />
            </div>
            <NewFormRaft />
        </div>
    )
}

export default Form