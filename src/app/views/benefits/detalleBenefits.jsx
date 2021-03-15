import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
    Button,
    Card
  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, useTabState, Panel } from '@bumaga/tabs'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    GetImages
} from "../../redux/actions/CommonActions";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

  const cn = (...args) => args.filter(Boolean).join(' ')

  const Tab = ({ children }) => {
    const { isActive, onClick } = useTabState()
    const classes = useStyles();
  
    return (
      <button className={cn(classes.tab, isActive && classes.tabActive)} onClick={onClick}>
        {children}
      </button>
    )
  }

  const useStyles = makeStyles({
    tabs: {
        boxSizing: "border-box",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        "@media (min-width: 1024px)": {
            padding: "24px 32px",
        },
        border: "1px solid #f1f1f1",
        backgroundColor: "#fff",
    },
    tabList: {
        display: "flex",
    },
    tab: {
        outline: "none",
        cursor: "pointer",
        border: "none",
        
        "@media (min-width: 0px)": {
            fontSize: "13px",
            lineHeight: "17px",
            padding: "10px 8px",
        },
        "@media (min-width: 1024px)": {
            fontSize: "16px",
            lineHeight: "24px",
            padding: "8px 16px",
        },
        color: "#484748",
        backgroundColor: "#fff",
        border: "1px solid #f1f1f1",
    },
    cardContainer:{
        marginBottom:"2%" 
    },
    tabActive: {
        backgroundColor: "#039be5",
        borderColor: "transparent",
        color: "white",
        cursor: "default",
    },
    paper: {
        margin: '3%',
        "@media (min-width: 0px)": {
            marginTop: "5%"
        },
        "@media (min-width: 1024px)": {
            width: "90%",
        },
        boxShadow: "5px 4px 16px 0px rgb(0 0 0 / 0.4)",
    },
    papercardinfo: {
        "@media (min-width: 0px)": {
            marginTop: "0%",
            margin:"3%",
        },
        "@media (min-width: 1024px)": {
            width: "80%",
            marginTop: "8%",
            margin:"8%",
        },
        boxShadow: "5px 4px 16px 0px rgb(0 0 0 / 0.4)",
    },

    lineGrid: {
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
        width: "100%",
        marginLeft: "0%",
    },

    lineTypo: {
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
        marginLeft: "0%",
    },

    graytext: {
        color: "gray",
    },

    miniatureimage: {
        margin: "5%",
        maxWidth: "20px"
    },

    margindiv: {
        "@media (min-width: 0px)": {
            marginBottom: "30%",
        },
        "@media (min-width: 1024px)": {
            marginBottom: "5%",
        },
    }   
})

const mapStyles = {
    width: '50%',
    height: '50%',
  };

const DetalleBenefits = (props) => {
    const classes = useStyles();
    const images = useSelector(state => state.common.images);
    const dispatch = useDispatch();
    // const user = useSelector(state => state.user);
    //const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    //console.log("user",user)
    const promociones = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //const promociones = "";

    useEffect(() => {
        dispatch(GetImages());
    }, [])

    return (
        <>
            <div className={classes.margindiv}>
                <h1 style={{ color: "limegreen", marginTop: "2%", fontWeight: "bold"}} className="mb-20">RESTAURANTS</h1>
                <h5> All Sykes employees can take advantage of these exclusive agreements. </h5>
                <Card className={classes.cardContainer} elevation={6}>
                    <h2 style={{ color: "orange", marginLeft: "2%", marginTop: "2%",}} className="mb-20">Restaurante: TONI's PIZZA</h2>      
                    <Tabs style={{marginLeft: "2%", marginTop: "2%",}}>
                        <div className={classes.tabs}>
                        <div className={classes.tabList} >
                            <Tab>DESCRIPCIÓN</Tab>

                            <Tab>BENEFICIO</Tab>

                            <Tab>UBICACIÓN</Tab>
                        </div>
                        <Panel >
                            <div style={{backgroundColor: "lightgray"}}>
                                <Grid container spacing={2} direction="row">
                                    <Grid className={classes.gridtext} item lg={7} md={7} sm={7} xs={12}>
                                        <Paper className={classes.paper}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm container>
                                                    <Grid item xs container direction="column" spacing={2}>
                                                        <Grid item xs>
                                                            <Typography className={classes.lineTypo} style={{marginLeft: "2%"}} gutterBottom variant="subtitle1">
                                                                DESCRIPCIÓN
                                                            </Typography>
                                                            <Typography style={{marginLeft: "3%", textAlign: "justify",}} variant="body2" gutterBottom>
                                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                                                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                                                                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                                                                in culpa qui officia deserunt mollit anim id est laborum.
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid className={classes.gridtext} item lg={4} md={4} sm={4} xs={12}>
                                        <Paper className={classes.papercardinfo}>
                                            <div className={classes.lineGrid} style={{textAlignLast: "center"}}>
                                                <img
                                                    style={{maxWidth: "100px", margin: "5%"}}
                                                    alt="..."
                                                    src={`data:image/png;base64,${images[0] ? images[0].content : null}`}
                                                />
                                            </div>
                                            <Grid container spacing={2} justify="center" alignItems="center" direction="row" className={classes.lineGrid}>
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <div style={{textAlignLast: "center"}}>
                                                        <img
                                                            className={classes.miniatureimage}
                                                            alt="..."
                                                            src={`data:image/png;base64,${images[0] ? images[0].content : null}`}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                    San José, Avenida 2, Calle 15. Frente a la Plaza de la democracia
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} justify="center" alignItems="center" direction="row" className={classes.lineGrid}>
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <div style={{textAlignLast: "center"}}>
                                                        <img
                                                            className={classes.miniatureimage}
                                                            alt="..."
                                                            src={`data:image/png;base64,${images[0] ? images[0].content : null}`}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                    2222-2222
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} justify="center" alignItems="center" direction="row" className={classes.lineGrid}>
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <div style={{textAlignLast: "center"}}>
                                                        <img
                                                            className={classes.miniatureimage}
                                                            alt="..."
                                                            src={`data:image/png;base64,${images[0] ? images[0].content : null}`}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                    + (506) 8888-2222
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} justify="center" alignItems="center" direction="row" className={classes.lineGrid}>
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <div style={{textAlignLast: "center"}}>
                                                        <img
                                                            className={classes.miniatureimage}
                                                            alt="..."
                                                            src={`data:image/png;base64,${images[0] ? images[0].content : null}`}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item lg={9} md={9} sm={9} xs={9}>
                                                <a href="https://www.tonispizza.com" style={{color: "#039be5"}}>
                                                    www.tonispizza.com
                                                </a>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <div style={{textAlignLast: "center"}}>
                                                        <img
                                                            className={classes.miniatureimage}
                                                            alt="..."
                                                            src={`data:image/png;base64,${images[0] ? images[0].content : null}`}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <div style={{textAlignLast: "center"}}>
                                                        <img
                                                            className={classes.miniatureimage}
                                                            alt="..."
                                                            src={`data:image/png;base64,${images[0] ? images[0].content : null}`}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <div style={{textAlignLast: "center"}}>
                                                        <img
                                                            className={classes.miniatureimage}
                                                            alt="..."
                                                            src={`data:image/png;base64,${images[0] ? images[0].content : null}`}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <div style={{textAlignLast: "center"}}>
                                                        <a href={images[0] ? images[0].url : null}>
                                                            <img
                                                                className={classes.miniatureimage}
                                                                alt="..."
                                                                src={`data:image/png;base64,${images[0] ? images[0].content : null}`}
                                                            />
                                                        </a>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Paper> 
                                        {promociones != "" ?
                                        <Paper className={classes.papercardinfo}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm container>
                                                    <Grid item xs container direction="column" spacing={2}>
                                                        <Grid item xs>
                                                            <Typography className={classes.lineTypo} style={{marginLeft: "2%"}} gutterBottom variant="subtitle1">
                                                                PROMOCIONES
                                                            </Typography>
                                                            <Typography style={{marginLeft: "3%", textAlign: "justify", display:"inline-block"}} variant="body2" gutterBottom>
                                                            {promociones}
                                                            </Typography>                                                      
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                        : null}
                                    </Grid>
                                </Grid>
                            </div>
                        </Panel>
                        <Panel>
                            <div style={{backgroundColor: "lightgray"}}>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography className={classes.lineTypo} style={{marginLeft: "2%"}} gutterBottom variant="subtitle1">
                                                        BENEFICIO
                                                    </Typography>
                                                    <Typography style={{width:"75%", marginLeft: "3%", textAlign: "justify", display:"inline-block", verticalAlign: "top"}} variant="body2" gutterBottom>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                                                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                                                        in culpa qui officia deserunt mollit anim id est laborum.
                                                    </Typography>
                                                    <img
                                                        style={{marginLeft: "3%", maxWidth: "100px"}}
                                                        alt="..."
                                                        src={`data:image/png;base64,${images[0] ? images[0].content : null}`}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        </Panel>
                        <Panel>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="row" spacing={2}>
                                            <Grid item xs>
                                                <Typography style={{marginLeft: "2%"}} gutterBottom variant="subtitle1">
                                                    UBICACIÓN
                                                </Typography>
                                                <div>
                                                <Map
                                                    google={props.google}
                                                    zoom={8}
                                                    style={mapStyles}
                                                    initialCenter={{ lat: 47.444, lng: -122.176}}
                                                    >
                                                    <Marker position={{ lat: 48.00, lng: -122.00}} />
                                                    </Map>
                                                </div>
                                            
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Panel>
                        </div>
                    </Tabs>
                </Card>
            </div>
        </>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB3-J3RDKzLfnq123ytQGHFxXSxU_SizaU'
  })(DetalleBenefits);