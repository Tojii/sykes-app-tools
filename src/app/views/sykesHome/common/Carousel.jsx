import React, { useState, useEffect, Children } from "react";
import Swiper from "swiper";
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from "@material-ui/core";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import { Card, CardContent, Grid, } from "@material-ui/core";

const useStyles = makeStyles({
  
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  buttonright: {
    background: "#fff",
    "@media (min-width: 1023px)": {
      right: "0%",
    },
    "@media (min-width: 1024px)": {
      right: "25%",
    },
    "@media (min-width: 1025px)": {
      right: "35%",
    },
    "@media (min-width: 2048px)": {
      right: "36.5%",
    },
    "@media (min-width: 3500px)": {
      right: "43%",
    },
  },
  buttonleft: {
    background: "#fff",
    "@media (min-width: 1023px)": {
      left: "0%", 
    },
    "@media (min-width: 1024px)": {
      left: "25%", 
    },
    "@media (min-width: 1025px)": {
      left: "35%", 
    },
    "@media (min-width: 2048px)": {
      left: "36.5%", 
    },
    "@media (min-width: 3500px)": {
      left: "43%", 
    },
  },
  divCenter: {
    alignSelf: "center"
  }
});

export const Carousel = (props) => {
  const classes = useStyles();
  
  const swiperOptions = {
    direction: "horizontal",
    allowSlideNext: true,
    allowSlidePrev: true,
    slidesPerView: 1,
    spaceBetween: 32,
    width: 1320,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },

    breakpoints: {
      // when window width is <= 480px
      360: {
        slidesPerView: 1,
        spaceBetween: 0,
        width: 280,
      },
      410: {
        slidesPerView: 1,
        spaceBetween: 0,
        width: 290,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 0,
        width: 330,
      },
      540: {
        slidesPerView: 1,
        spaceBetween: 0,
        width: 450,
      },
      768: {
        slidesPerView: 1,
        width: 680,
      },
      // when window width is <= 640px
      1024: {
        slidesPerView: 1,
        width: 950,
      },
      1080: {
        slidesPerView: 1,
        width: 240,
      },
      1280: {
        slidesPerView: 1,
        width: 225,
      },
      1920: {
        slidesPerView: 1,
        width: 1560,
      },
      2560: {
        slidesPerView: 1,
        width: 2260,
      }
    },

    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      bulletActiveClass: "bullet-active",
      clickable: true
    },

    navigation: {
      nextEl: ".carousel__button-next",
      prevEl: ".carousel__button-prev"
    }
  };


  useEffect(() => {
    new Swiper(".swiper-container", swiperOptions);
  }, []);

    let { children } = props;

    return (
      <div className="container">
        <Card className={classes.root + "m-5"}>
        <CardContent className="">
          <div className="w-100">
            <div className="swiper-container mx-28">
              <div className="swiper-wrapper">
                {Children.map(children, (child, index) => (
                  <div className={classes.divCenter + " swiper-slide p-4 pb-24"}>{child}</div>
                ))}
              </div>

              {/* pagination */}
              <div className="swiper-pagination relative mt-24" />
            </div>

            {/* navigation */}
            <Fab className= {classes.buttonleft + " carousel__button-prev bg-white"}>
              <NavigateBefore />
            </Fab>
            <Fab className={classes.buttonright + " carousel__button-next bg-white"}>
              <NavigateNext />
            </Fab>
          </div>
        </CardContent>
      </Card>
      </div>
      
    );
}

export default Carousel;
