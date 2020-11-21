import React, { useState } from "react";
import { Grid, Fab, Icon } from "@material-ui/core";

const ResumeStep = () => {
    return (
        <>
            <Grid item lg={12} className="px-sm-24">
                <h3>Adjuntar currículum</h3>
                <label htmlFor="upload-single-file">
                    <Fab
                        className="capitalize"
                        color="primary"
                        component="span"
                        variant="extended"
                    >
                        <div className="flex flex-middle">
                        <Icon className="pr-8">cloud_upload</Icon>
                        <span>Upload File</span>
                        </div>
                    </Fab>
                    <p>Applicable formats: .doc, .docx, .pdf. Max sise: 2MB</p>
                </label>
                <input
                    className="display-none"
                    onChange={() => {}}
                    id="upload-single-file"
                    type="file"
                />
            </Grid>
        </>
    );
}

export default ResumeStep;