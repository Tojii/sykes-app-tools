import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Carousel from "../sykesHome/common/Carousel";
import { makeStyles } from '@material-ui/core/styles';
import {
    GetDiscounts
} from "../../redux/actions/BenefitsDiscountActions";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { Breadcrumb } from "matx";
import NotFound from '../sessions/NotFound';

const useStyles = makeStyles({

    widthCarousel: {
        margin: "auto",
        // when window width is <= 480px
        "@media (min-width: 1023px)": {
            width: "100%",
        },
        "@media (min-width: 1024px)": {
            width: "50%",
        },
        "@media (width: 280px)": {
            width: "100%",
        },
        "@media (width: 540px)": {
            width: "100%",
        },
        "@media (min-width: 1025px)": {
            width: "30%",
        },
        "@media (min-width: 2048px)": {
            width: "27%",
        },
        "@media (min-width: 2560px)": {
            width: "21%",
        },
        "@media (min-width: 3500px)": {
            width: "14%",
        }
    },
    imageCarousel: {
        "@media (min-width: 0px)": {
            maxHeight: "515px",
            width: "390px"
        },
        "@media (min-width: 1025px)": {

        },
    },
});

const Home = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.discount.benefitsdiscounts);
    const isLoading = useSelector(state => state.discount.loading);
    const user = useSelector(state => state.user);
    const benefitUser = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner')) : false
    const classes = useStyles();

    useEffect(() => {
        dispatch(GetDiscounts());
    }, []);

    const showCarousel = () => {
        if (images.filter(function (image) {
            var d = new Date();
            var start = new Date(image.startDate);
            var end = new Date(image.endDate);
            d.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            if (start.getTime() > d.getTime() || end.getTime() < d.getTime()) { //use only active discounts
                //console.log(start.getTime(), d.getTime(), end.getTime())
                return false; // skip
            }
            return true;
        }).length == 0) { return false }
        else { return true }
    }

    return (
        <div className="m-sm-30">
            { isLoading ? <Loading /> :
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: "Benefits Home", path: "/Benefits/Home" },
                            { name: "Promociones", path: `/Benefits/MontlyDiscounts` },
                        ]}
                    />
                </div>}
            <div className={classes.widthCarousel}>
                {isLoading ? <Loading /> :
                    benefitUser ? <div>
                        {showCarousel() ? <Carousel>
                            {images.filter(function (image) {
                                var d = new Date();
                                var start = new Date(image.startDate);
                                var end = new Date(image.endDate);
                                d.setHours(0, 0, 0, 0);
                                start.setHours(0, 0, 0, 0);
                                end.setHours(0, 0, 0, 0);
                                console.log(start.getTime(), d.getTime(), end.getTime())
                                if (start.getTime() > d.getTime() || end.getTime() < d.getTime()) { //use only active discounts
                                    //console.log(start.getTime(), d.getTime(), end.getTime())
                                    return false; // skip
                                }
                                return true;
                            }).map((image, index) => (
                                <div key={index} className={classes.divImage + " pb-16"}>
                                    <img
                                        style={{ cursor: "pointer" }}
                                        className={classes.imageCarousel}
                                        alt="..."
                                        src={`${image.image}`}
                                        onClick={image.benefit != undefined && image.benefit.idBenefit ? function () {
                                            window.location.href = `${process.env.PUBLIC_URL}/Benefits/Detalle/${image.benefit.idBenefit}`;
                                        } : null}
                                    />
                                </div>
                            ))}
                        </Carousel> : <h4 style={{ textAlign: "center" }}>No hay promociones disponibles en este momento.</h4>}
                    </div> : <NotFound />}
            </div>
        </div>
    )
}

export default Home
