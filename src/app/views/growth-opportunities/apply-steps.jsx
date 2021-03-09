import React, { useEffect } from "react";
import { SimpleCard } from "matx";
import ApplyStepper from "./components/ApplyStepper"
import { connect } from "react-redux";
import { getGrowthOpportunity } from "app/redux/actions/GrowthOpportunityActions";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";

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

const ApplySteps = (props) => {
    const classes = useStyles();
    let { opp_id } = useParams();


    useEffect(() => {
        props.getGrowthOpportunity(opp_id);
    }, []);

    return (
        (!props.growth_opportunity 
            ? <Loading /> 
            :   <div className={classes.tableMargin + " m-sm-30"}>
                    <SimpleCard title={props.growth_opportunity.title}>
                        <ApplyStepper {...props}/>
                    </SimpleCard>
                </div>
        )
    )
}

const mapStateToProps = state => ({
    growth_opportunity: state.growth.growth_opportunity,
});

export default connect(mapStateToProps, {
    getGrowthOpportunity
})(ApplySteps);