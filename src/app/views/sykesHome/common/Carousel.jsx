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
        width: 300,
      },
      420: {
        slidesPerView: 1,
        spaceBetween: 0,
        width: 320,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 0,
        width: 390,
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
      1280: {
        slidesPerView: 1,
        width: 940,
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
                  <div className="swiper-slide p-4 pb-24">{child}</div>
                ))}
              </div>

              {/* pagination */}
              <div className="swiper-pagination relative mt-24" />
            </div>

            {/* navigation */}
            <Fab className="carousel__button-prev bg-white">
              <NavigateBefore />
            </Fab>
            <Fab className="carousel__button-next bg-white">
              <NavigateNext />
            </Fab>
          </div>
        </CardContent>
      </Card>
      </div>
      
    );
}

export default Carousel;
