import React, { useEffect } from "react";
// import CampaignTable from "./ventasTables/CampaignTable"
// import ComprasTable from "./ventasTables/ComprasTable"
import {
    Card,
    Grid,
} from "@material-ui/core";
import { getGrowthOpportunities, getJobsApplied } from "../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import NotFound from "../sessions/NotFound"
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tableMargin: {     
        "@media (min-width: 0px)": {
            marginBottom: "25%",
        },
        "@media (min-width: 1024px)": {
            marginBottom: "5%",
        },
    },
})

const AdminBenefits = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    //const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    //console.log("user",user)
    
    useEffect(() => {
      
    }, [])

    return (
        <>

        </>
    )
}

export default AdminBenefits;