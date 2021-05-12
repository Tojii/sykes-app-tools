import React, { useEffect, useState } from 'react'
import MyMetrics from './components/MyMetrics';
import { connect } from "react-redux";
import { getGrowthOpportunityMetrics } from "../../redux/actions/GrowthOpportunityActions"
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { Breadcrumb } from "matx";
import {
    Dialog
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
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
    const { history, metrics, getGrowthOpportunityMetrics, user, open, handleClose } = props;

    useEffect(() =>{
      getGrowthOpportunityMetrics(user.badge);
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
                <DialogContent>
                  <MyMetrics metrics={metrics} history={history}/>
                </DialogContent>
            </Dialog>
        </>
        : <Loading />
    )
}

const mapStateToProps = ({ growthReducer, user }) => {
    const { metrics } = growthReducer;
    return {
        metrics,
        user
    };
};

export default connect(mapStateToProps, {
  getGrowthOpportunityMetrics,
})(Metrics);