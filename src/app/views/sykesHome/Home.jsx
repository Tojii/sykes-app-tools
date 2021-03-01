import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Grid, } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux'
import Carousel from "./common/Carousel";
import { makeStyles } from '@material-ui/core/styles';
import {
    GetImages
} from "../../redux/actions/CommonActions";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import Swiper from "swiper";
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
});

const Home = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.common.images);
    const isLoading = useSelector(state => state.common.loading);
    const classes = useStyles();

    // const images = [
    //     { imageUrl: "https://images.freeimages.com/images/large-previews/058/computer-abbreviations-4-1242020.jpg" },
    //     { imageUrl: "https://media.istockphoto.com/photos/programming-source-code-abstract-background-picture-id1047259374" },
    //     { imageUrl: "https://images.freeimages.com/images/large-previews/fb2/html-1241980.jpg" }
    // ]

    useEffect(() => {
        dispatch(GetImages());
    }, []);

    return (
        <div className={classes.widthCarousel}>
            { isLoading ? <Loading /> :
                <div>
                    <Carousel>
                        {images.map((image, index) => (
                            <div key={index} className="pb-16">
                                <img
                                    height={"515px"}
                                    width={"390px"}
                                    //className="p-0 m-0 pb-24 pt-16" 
                                    alt="..."
                                    src={`data:image/png;base64,${image.content}`}
                                    onClick={image.url ? function () {
                                        window.location.href = image.url;
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
    )
}

export default Home
