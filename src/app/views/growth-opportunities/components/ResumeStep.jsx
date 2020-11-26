import React, { useState } from "react";
import { Grid, Fab, Icon } from "@material-ui/core";
import { setApplyData } from "../../../redux/actions/ApplyActions";
import { connect } from "react-redux";

const ResumeStep = ({ apply, setApplyData, props }) => {

    const handleFileSelect = (event) => {
        let files = event.target.files;
        for (const iterator of files) {
            var reader = new FileReader();
            reader.readAsDataURL(iterator);
            reader.onload = function () {
                apply['resume'] = reader.result
                setApplyData(apply);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    };

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
                    onChange={handleFileSelect}
                    id="upload-single-file"
                    type="file"
                />
            </Grid>
        </>
    );
}

const mapStateToProps = ({ applyReducer }) => {
    const { apply } = applyReducer;
    return {
        apply,
    };
};

export default connect(mapStateToProps, {
    setApplyData,
})(ResumeStep);