import React from "react";
import { Breadcrumb } from "matx";
import Detalles from "./detalleBenefits";

function Form() {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                routeSegments={[
                { name: "Benefits Home", path: "/Benefits/Home" },
                { name: "Detalle", path: "/Benefits/Detalle" },                
                ]}
            />
            </div>
            <Detalles />
        </div>
    )
}

export default Form