import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Grid, } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux'
import Carousel from "../sykesHome/common/Carousel";
import { makeStyles } from '@material-ui/core/styles';
import {
    GetDiscounts
} from "../../redux/actions/BenefitsDiscountActions";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { Breadcrumb } from "matx";

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
            maxHeight: "370px",
            maxWidth: "370px"
        },
        "@media (min-width: 1025px)": {
            
        },
        // maxHeight:"545px", 
        // maxWidth: "1400px", 
    },
    // divImage: {
    //     textAlign: "-moz-center",
    //     "@media screen and (-webkit-min-device-pixel-ratio:0)": { 
    //         textAlign: "-webkit-center",
    //     },
    // },
    // divCarousel: {
    //     alignSelf: "center"
    // }
});

const Home = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.discount.benefitsdiscounts);
    const isLoading = useSelector(state => state.discount.loading);
    const classes = useStyles();

    useEffect(() => {
        dispatch(GetDiscounts());
    }, []);

    return (
        <div className="m-sm-30">
            { isLoading ? <Loading/> : <div className="mb-sm-30">
            <Breadcrumb
            routeSegments={[
            { name: "Benefits Home", path: "/Benefits/Home" },
            { name: "Promociones", path: `/Benefits/MontlyDiscounts` },          
            ]}
            />
            </div>}
            <div className={classes.widthCarousel}>
                { isLoading ? <Loading /> :
                    <div>
                        <Carousel>
                            {images.map((image, index) => (
                                <div key={index} className={classes.divImage + " pb-16"}>
                                    <img
                                        //maxHeight={"515px"}
                                        //width={"390px"}
                                        className={classes.imageCarousel}
                                        //className="p-0 m-0 pb-24 pt-16" 
                                        alt="..."
                                        src={`${image.image}`}
                                        onClick={image.benefit != undefined && image.benefit.idBenefit ? function () {
                                            window.location.href = `${process.env.PUBLIC_URL}/Benefits/Detalle/${image.benefit.idBenefit}`;
                                        } : null}
                                    //alt={`key-${images.imageName}`}
                                    />
                                </div>
                                // <Card className="h-100 px-24 card" key={index}>
                                //     <CardContent className="testimonial1__card-content">

                                //     </CardContent>
                                // </Card>
                            ))}
                        </Carousel>
                    </div>

                }
            </div>
        </div>
    )
}

export default Home
