import React from "react";
import { Breadcrumb } from "matx";
import AdminTable from "./tables/adminBenefitsTable";

function Form() {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Benefits Home", path: "/Benefits/Home" },
                        { name: "Configuraciones", path: `/Benefits/Configuration` },
                        { name: "Admin Beneficios", path: "/Benefits/AdminFormBenefits" },
                    ]}
                />
            </div>
            <AdminTable />
        </div>
    )
}

export default Form