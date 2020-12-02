import React from "react";
import { Breadcrumb } from "matx";
import NewRefoundForm from "./NewRefoundForm";

function Form() {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                routeSegments={[
                { name: "Lista reembolsos Educativos", path: "/ReembolsoEducativo/ListaReembolsos" },
                { name: "Nuevo" }
                ]}
            />
            </div>
            <NewRefoundForm />
        </div>
    )
}

export default Form
