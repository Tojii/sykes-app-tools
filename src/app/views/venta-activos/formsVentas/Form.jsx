import React from "react";
import { Breadcrumb } from "matx";
import NewFormVentas from "./FormVentas";

function Form() {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                routeSegments={[
                { name: "Ventas", path: "/Ventas" },
                { name: "Nuevo", path: "/Ventas/Form" },                
                ]}
            />
            </div>
            <NewFormVentas />
        </div>
    )
}

export default Form