import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Grid, } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux'
import Carousel from "./common/Carousel";
import {
    GetImages
} from "../../redux/actions/CommonActions";

const Home = () => {
    const dispatch = useDispatch();
    //const images = useSelector(state => state.common.images);

    const images = [
        { imageUrl: "https://images.freeimages.com/images/large-previews/058/computer-abbreviations-4-1242020.jpg" },
        { imageUrl: "https://media.istockphoto.com/photos/programming-source-code-abstract-background-picture-id1047259374" },
        { imageUrl: "https://images.freeimages.com/images/large-previews/fb2/html-1241980.jpg" }
    ]

    useEffect(() => {
        dispatch(GetImages());
    }, []);

    return (
        <Carousel>
        {images.map((image, index) => (
                    <div key={index} className="pb-16">
                        <img
                            className="p-0 m-0 pb-24 pt-16"
                            src={image.imageUrl}
                            alt={`key-${images.imageName}`}
                        />
                    </div>
            // <Card className="h-100 px-24 card" key={index}>
            //     <CardContent className="testimonial1__card-content">
                    
            //     </CardContent>
            // </Card>
        ))}
    </Carousel>
    )
}

export default Home
