import React, { useEffect } from "react";
import { Grid, Card, CardActionArea, Typography, CardContent, CardMedia } from "@material-ui/core";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import NotFound from "../sessions/NotFound"
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumb } from "matx";

const useStyles = makeStyles({
    tableMargin: {     
        "@media (min-width: 0px)": {
            marginBottom: "25%",
        },
        "@media (min-width: 1024px)": {
            marginBottom: "5%",
        },
    },
    box: {
        marginTop: "10px",
        marginBottom: "10px",
        textAlign: "-webkit-center"
    },
    root: {
        maxWidth: 345,
    },
      media: {
        maxWidth: "150px",
    },
})

const HomeVentas = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    //const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    //console.log("user",user)
    
    useEffect(() => {
      
    }, [])

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                    <Breadcrumb
                    routeSegments={[
                    { name: "Benefits Home", path: "/Benefits/Home" },              
                    ]}
                />
            </div>
            {(user.badge == undefined) 
                ? <Loading /> :
                <div>
                    {/* <Card className="m-sm-30"> */}
                        <Grid container spacing={2}> 
                            <Grid item xs={4} className={classes.box}>
                                <a href={`https://www.google.com`}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <Typography style={{textAlign: "center"}} gutterBottom variant="h5" component="h2">
                                                Restaurants
                                            </Typography>
                                            <CardContent style={{textAlign: "center"}}>
                                            <img
                                                className={classes.media}
                                                alt="..."
                                                src={require('./images/facebook.png')}
                                            />
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </a>
                            </Grid>
                            <Grid item xs={4} className={classes.box}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <Typography style={{textAlign: "center"}} gutterBottom variant="h5" component="h2">
                                            Restaurants
                                        </Typography>
                                        <CardContent style={{textAlign: "center"}}>
                                        <img
                                            className={classes.media}
                                            alt="..."
                                            src={require('./images/facebook.png')}
                                        />
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={4} className={classes.box}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <Typography style={{textAlign: "center"}} gutterBottom variant="h5" component="h2">
                                            Restaurants
                                        </Typography>
                                        <CardContent style={{textAlign: "center"}}>
                                        <img
                                            className={classes.media}
                                            alt="..."
                                            src={require('./images/facebook.png')}
                                        />
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={4} className={classes.box}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <Typography style={{textAlign: "center"}} gutterBottom variant="h5" component="h2">
                                            Restaurants
                                        </Typography>
                                        <CardContent style={{textAlign: "center"}}>
                                        <img
                                            className={classes.media}
                                            alt="..."
                                            src={require('./images/facebook.png')}
                                        />
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                    {/* </Card> */}
                </div> 
            }
        </div>
    )
}

export default HomeVentas;