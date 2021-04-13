import React from "react";
import { Breadcrumb } from "matx";
import Detalles from "./detalleBenefits";
import history from "history.js";

function Form() {
    return (
        <div className="m-sm-30">
            {console.log("detalle", history.location.prev)}
            <div className="mb-sm-30">
                <Breadcrumb
                routeSegments={[
                { name: "Benefits Home", path: "/Benefits/Home" },
                { name: "Categoría", path: history.location.prev },  
                { name: "Detalle", path: "/Benefits/Detalle" },                
                ]}
            />
            </div>
            <Detalles />
        </div>
    )
}

export default Form