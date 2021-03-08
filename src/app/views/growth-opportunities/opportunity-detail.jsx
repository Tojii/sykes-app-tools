import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGrowthOpportunity } from "app/redux/actions/GrowthOpportunityActions";
import Job from "./components/Job"
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { useParams } from "react-router";

export default function (props) {
    const dispatch = useDispatch();
    const job = useSelector(state => state.growth.growth_opportunity);
    let { opp_id } = useParams();

    useEffect(() => {
        dispatch(getGrowthOpportunity(opp_id));
    }, [opp_id]);

    return (
        (!job 
            ? <Loading /> 
            : <Job {...props} />
        )
    )
};