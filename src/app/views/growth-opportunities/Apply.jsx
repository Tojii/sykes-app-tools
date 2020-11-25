import React from "react";
import { SimpleCard } from "matx";
import ApplyStepper from "./components/ApplyStepper"

const Apply = (props) => {

    return (
        <div className="m-sm-30">
            <SimpleCard title="Trilingual Technical Support Agent II for its Intel account">
                <ApplyStepper {...props}/>
            </SimpleCard>
        </div>
    )
}

export default Apply;