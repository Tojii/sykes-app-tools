import React, { useState } from "react";
import { Grid, Fab, Icon, Card, Divider } from "@material-ui/core";
import { setApplyData } from "../../../redux/actions/ApplyActions";
import { connect } from "react-redux";

const ResumeStep = ({ apply, setApplyData, setDisableNext }) => {

    const [showError, setShowError] = useState(false);
    const [file, setFile] = useState({});

    const handleFileSelect = (event) => {
        let files = event.target.files;
        for (const iterator of files) {
            let invalid = iterator.size > 2000000
            setFile(iterator)
            setShowError(invalid);
            setDisableNext(invalid);
            apply['resume'] = iterator
            setFile(iterator)
            setApplyData(apply);
        }
    };

    return (
        <>
            <Grid item lg={12} className="px-sm-24 text-center">
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
                    accept=".doc, .docx, .pdf"
                />
            </Grid>
            <Card className="mb-24" elevation={2}>
            <div className="p-16">
              <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                direction="row"
              >
                <Grid item lg={6} md={6}>
                  Nombre
                </Grid>
                <Grid item lg={6} md={6}>
                  Estado
                </Grid>
              </Grid>
            </div>
            <Divider></Divider>
                <div className="px-16 py-16" key={file.name}>
                    <Grid
                        container
                        spacing={2}
                        justify="center"
                        alignItems="center"
                        direction="row"
                    >
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            {file.name}
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            {showError ? (
                                <div className="flex flex-middle">
                                    <Icon color="error">error</Icon>
                                    <p className="px-16">El archivo supera el tamaño permitido</p>
                                </div>
                            ) : file.size && <Icon color="primary">check</Icon> }
                        </Grid>
                    </Grid>
                </div>
          </Card>
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