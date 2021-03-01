import React, { useEffect } from "react";
import CampaignTable from "./ventasTables/CampaignTable"
import ComprasTable from "./ventasTables/ComprasTable"
import {
    Card,
    Grid,
} from "@material-ui/core";
import { getGrowthOpportunities, getJobsApplied } from "../../redux/actions/GrowthOpportunityActions"
import { connect } from "react-redux";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import NotFound from "../sessions/NotFound"
import { useSelector, useDispatch } from 'react-redux';

const HomeVentas = () => {
    const user = useSelector(state => state.user.user);
    const admin = (user != null && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    //console.log("user",user)
    
    useEffect(() => {
      
    }, [])

    return (
        <>
        {(user == null) 
            ? <Loading /> :
             admin ? <>
                {/* <Card className="m-sm-30"> */}
                    <Grid >
                        <CampaignTable admin={false}/>
                    </Grid>
                {/* </Card>
                <Card className="m-sm-30"> */}
                    <Grid >
                        <ComprasTable admin={false}/>
                    </Grid>
                {/* </Card> */}
            </> : <NotFound/>
            }
    </>
    )
}

// const mapStateToProps = state => ({
//     user: state.user,
// });

export default HomeVentas;