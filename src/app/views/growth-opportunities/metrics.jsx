import React, { useEffect, useState } from 'react'
import MyMetrics from './components/MyMetrics';
import { connect } from "react-redux";
import { getMetrics } from "../../redux/actions/MetricsActions"
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { Breadcrumb } from "matx";
import {
    Dialog
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

const Metrics = (props) => {
    const { history, metrics, getMetrics, user, open, handleClose } = props;

    useEffect(() =>{
        getMetrics(user.badge);
    }, []);

    return (
        metrics ?
        <>
            <Dialog maxWidth="md" onClose={handleClose} open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                
                 </DialogTitle>
                {/* <div className="mb-sm-30">
                    <Breadcrumb
                    routeSegments={[
                    { name: "Growth Opportunities", path: "/growth-opportunities" },
                    { name: "Metrics", path: "/my-metrics" },                
                    ]}
                />
                </div> */}
                <MyMetrics metrics={metrics} history={history}/>
            </Dialog>
        </>
        : <Loading />
    )
}

const mapStateToProps = state => ({
  metrics: state.metrics.metrics,
  user: state.user.user,
});

export default connect(mapStateToProps, {
    getMetrics,
})(Metrics);