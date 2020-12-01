import React from "react";
import { Breadcrumb } from "matx";
import NewRefoundForm from "./NewRefoundForm";

function Form() {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                routeSegments={[
                { name: "Nuevo", path: "/ReembolsoEducativo/Nuevo" },
                { name: "Reembolso Educativo" }
                ]}
            />
            </div>
            <NewRefoundForm />
        </div>
    )
}

export default Form
