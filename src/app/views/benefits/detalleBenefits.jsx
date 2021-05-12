import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Card } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Panel } from '@bumaga/tabs'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { GetBenefitsById, GetPageSettings } from "../../redux/actions/BenefitsActions";
import { DeleteBenefitDiscount, GetDiscounts } from "../../redux/actions/BenefitsDiscountActions";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import Places from '../../components/maps/Places';
import { isMdScreen } from "utils";
import { useParams } from "react-router";
import { Breadcrumb } from "matx";
import history from "history.js";

  const cn = (...args) => args.filter(Boolean).join(' ')

  const Tab = ({ children, scroll }) => {
    const classes = useStyles();
    return (
      <button className={cn(classes.tab)} onClick={() => {scroll()}}>
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
    papercardprom: {
        "@media (min-width: 0px)": {
            marginTop: "5%",
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
        color: "#939598", 
    },
    miniatureimage: {
        margin: "5%",
        maxWidth: "30px"
    },
    medialogo: {
        width: "194px",
        height: "35.5px",
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

const DetalleBenefits = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const descriptionRef = useRef(null);
    const benefiRef = useRef(null);
    const ubicationRef = useRef(null);
    const benefit = useSelector(state => state.benefit.benefit);
    const isLoading  = useSelector(state => state.benefit.loading);
    const discounts = useSelector(state => state.discount.benefitsdiscounts);
    const isLoadingSettings  = useSelector(state => state.benefit.loadingSettings); 
    let { id } = useParams(); 
    const pageSettings = useSelector(state => state.benefit.pageSettings);
    // const user = useSelector(state => state.user);
    //const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    //console.log("user",user)
    //const promociones = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //let promociones = [];
    const [promociones, setPromociones] = useState([]);
    const location = { address: 'San José, Costa Rica', lat: 9.903329970416294, lng: -84.08271419551181 } // our location object from earlier

    useEffect(() => {
        dispatch(GetBenefitsById(id));
        dispatch(GetPageSettings()); 
        dispatch(GetDiscounts());      
    }, [])

    useEffect(() => {
            setPromociones(discounts.filter(function(item) {
                console.log("prueba", item.benefit.idBenefit,id)
                if (item.benefit.idBenefit != id) {
                return false; // skip
                }
                return true;
            }).map((item, index) => {
                return item.discountName
            }))
    }, [discounts])

    const showImage = () => {
        return (
        pageSettings[0] != null ?
          <img
          className={classes.medialogo}                                         
          alt="..."
          src={`${pageSettings[0].logo}`}
          /> : ""
        );
    }

    const onChangeLocation = (lat, lng) => {
        console.log("lat", lat);
        console.log("lng", lng);
    }

    const executeScrollDescription = () => descriptionRef.current.scrollIntoView()   
    const executeScrollBenefit = () => benefiRef.current.scrollIntoView()   
    const executeScrollUbication = () => ubicationRef.current.scrollIntoView()  

    return (
        <>
            <div className="m-sm-30">
                { (isLoading || isLoadingSettings) ? <Loading/> : <div className="mb-sm-30">
                    <Breadcrumb
                    routeSegments={[
                    { name: "Benefits Home", path: "/Benefits/Home" }, 
                    { name: "Categoría", path: `${history.location.prev ? history.location.prev : (`/Benefits/Category/${benefit[0] && benefit[0].benefit ? benefit[0].benefit.category.idCategory : ""}`)}` },  
                    { name: "Detalle", path: "/Benefits/Detalle" },                
                    ]}
                />
                </div>}
                {console.log("benefit", promociones)}
                { (isLoading || isLoadingSettings) ? <Loading/> :
                (benefit[0] != undefined && benefit[0].benefit.active) ?
                <Card className={classes.cardContainer} elevation={6}>
                    <div className={classes.margindiv}>
                        <h1 style={{ color: "#4cb050", marginLeft: "2%", marginTop: "2%", fontWeight: "bold"}} className="mb-20">{showImage()} &nbsp; {<span style={{color:"gray", fontWeight: "normal"}}>|</span>} &nbsp; {benefit[0] && benefit[0].benefit ? benefit[0].benefit.category.name.toUpperCase() : ""}</h1>
                        <h5 style={{ color: "#939598", marginLeft: "2%"}}> {pageSettings[0] != null ? pageSettings[0].reminder : ""} </h5>
                            <h2 style={{ color: "#ff9805", marginLeft: "2%", marginTop: "2%",}} className="mb-20"> {benefit[0] && benefit[0].benefit ? benefit[0].benefit.name : ""}</h2>      
                            <Tabs style={{marginLeft: "2%", marginTop: "2%",}}>
                                <div className={classes.tabs}>
                                    <div className={classes.tabList} >
                                        <Tab scroll={executeScrollDescription}>DESCRIPCIÓN</Tab>

                                        <Tab scroll={executeScrollBenefit}>BENEFICIO</Tab>

                                        <Tab scroll={executeScrollUbication}>UBICACIÓN</Tab>
                                    </div>
                                    <Panel>
                                        <div style={{backgroundColor: "lightgray"}}>
                                            <Grid container spacing={2} direction="row">
                                                <Grid className={classes.gridtext} item lg={7} md={7} sm={7} xs={12}>
                                                    <Paper className={classes.paper}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} sm container>
                                                                <Grid item xs container direction="column" spacing={2}>
                                                                    <Grid item xs>
                                                                        <Typography ref={descriptionRef} className={classes.lineTypo} style={{marginLeft: "2%"}} gutterBottom variant="subtitle1">
                                                                            DESCRIPCIÓN
                                                                        </Typography>
                                                                        <Typography style={{color: "#939598", marginLeft: "3%", textAlign: "justify",}} variant="body2" gutterBottom>
                                                                            {benefit[0] && benefit[0].benefit ? benefit[0].benefit.description : ""}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                    <Paper className={classes.paper}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} sm container>
                                                                <Grid item xs container direction="column" spacing={2}>
                                                                    <Grid item xs>
                                                                        <Typography ref={benefiRef} className={classes.lineTypo} style={{color: "#484748", marginLeft: "2%"}} gutterBottom variant="subtitle1">
                                                                            BENEFICIO
                                                                        </Typography>
                                                                        <Typography style={{color: "#939598", width: window.screen.width <= 1024 ? "100%" : "75%", marginLeft: "3%", textAlign: "justify", display:"inline-block", verticalAlign: "top"}} variant="body2" gutterBottom>
                                                                            {benefit[0] && benefit[0].benefit ? benefit[0].benefit.benefitInfo : ""}
                                                                        </Typography>
                                                                        {pageSettings[0] != null && <img
                                                                            style={{marginLeft: "3%", maxWidth: "145px"}}
                                                                            alt="..."
                                                                            src={`${pageSettings[0].badge}`}
                                                                        />}
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                    <Paper className={classes.paper}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} sm container>
                                                                <Grid item xs container direction="row" spacing={2}>
                                                                    <Grid item xs>
                                                                        <Typography ref={ubicationRef} style={{color: "#484748", marginLeft: "2%"}} gutterBottom variant="subtitle1">
                                                                            UBICACIÓN
                                                                        </Typography>
                                                                        <div style={{ height: "400px", padding: isMdScreen() ? "10px" : "25px", width: "100%", marginLeft: isMdScreen() ? "3%" : "1%" }}>
                                                                            <Places locations={ benefit[0] && benefit[0].locations ? benefit[0].locations.filter(function(item) {
                                                                                if (!item.benefit.active || !item.active) {
                                                                                  return false; // skip
                                                                                }
                                                                                return true;
                                                                            }).map((item, index) => {return item}) : [] } lat={location.lat} lng={location.lng} zoomLevel={7} draggable={false} 
                                                                            content={benefit[0] && benefit[0].locations ? benefit[0].locations.filter(function(item) {
                                                                                if (!item.benefit.active || !item.active) {
                                                                                  return false; // skip
                                                                                }
                                                                                return true;
                                                                            }).map((item, index) => {return '<div id="content">' +
                                                                            '<div id="siteNotice">' +
                                                                            "</div>" +
                                                                            `<h1 id="firstHeading" class="firstHeading">${item.benefit.name}</h1>` +
                                                                            '<div id="bodyContent">' +
                                                                            `<p><b>Address: </b> ${item.address} </p>` +
                                                                            `<p><b>Phone: </b> ${item.phone} </p>` +
                                                                            `<p><b>WhatsApp: </b> ${item.whatsApp} </p>` +
                                                                            "</div>" +
                                                                            "</div>"}) : []}
                                                                            onChangeLocation={onChangeLocation} show /> {/* include it here */}
                                                                        </div>
                                                                    
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                                <Grid className={classes.gridtext} item lg={4} md={4} sm={4} xs={12}>
                                                    <Paper className={classes.papercardinfo}>
                                                        <div className={classes.lineGrid} style={{textAlignLast: "center"}}>
                                                            {benefit[0] && benefit[0].benefit && benefit[0].benefit.logo ? <img
                                                                    style={{maxWidth: "100px", margin: "5%"}}
                                                                    alt="..."
                                                                    src={`${benefit[0] && benefit[0].benefit ? benefit[0].benefit.logo : null}`}
                                                                />
                                                            : null} 
                                                        </div>
                                                        <Grid container spacing={2} justify="center" alignItems="center" direction="row" className={classes.lineGrid}>
                                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                                <div style={{textAlignLast: "center"}}>
                                                                    <img
                                                                        className={classes.miniatureimage}
                                                                        alt="..."
                                                                        src={require('./images/ubicacion.png')}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                            {benefit[0] && benefit[0].locations[0] && benefit[0].locations.filter(function(item) {
                                                                if (!item.principalLocation) {
                                                                return false; // skip
                                                                }
                                                                return true;
                                                            }).map((item, index) => {
                                                                return (
                                                                    <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                                        {item.address}
                                                                    </Grid>
                                                                )
                                                            })}
                                                             {benefit[0] && benefit[0].locations[0] && benefit[0].locations.filter(function(item) {
                                                                if (!item.principalLocation) {
                                                                return false; // skip
                                                                }
                                                                return true;
                                                            }).map((item, index) => {
                                                                return (
                                                                    <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                                        {`+ (506) ${item.address}`}
                                                                    </Grid>
                                                                )
                                                            }).length == 0 ? <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                            {`${benefit[0] && benefit[0].locations[0] ? benefit[0].locations[0].address : ""}`}
                                                            </Grid> : null}    
                                                        </Grid>
                                                        <Grid container spacing={2} justify="center" alignItems="center" direction="row" className={classes.lineGrid}>
                                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                                <div style={{textAlignLast: "center"}}>
                                                                    <img
                                                                        className={classes.miniatureimage}
                                                                        alt="..."
                                                                        src={require('./images/phone.png')}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                            {benefit[0] && benefit[0].locations[0] && benefit[0].locations.filter(function(item) {
                                                                if (!item.principalLocation) {
                                                                return false; // skip
                                                                }
                                                                return true;
                                                            }).map((item, index) => {
                                                                return (
                                                                    <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                                        {item.phone}
                                                                    </Grid>
                                                                )
                                                            })}
                                                             {benefit[0] && benefit[0].locations[0] && benefit[0].locations.filter(function(item) {
                                                                if (!item.principalLocation) {
                                                                return false; // skip
                                                                }
                                                                return true;
                                                            }).map((item, index) => {
                                                                return (
                                                                    <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                                        {`+ (506) ${item.phone}`}
                                                                    </Grid>
                                                                )
                                                            }).length == 0 ? <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                            {`${benefit[0] && benefit[0].locations[0] ? benefit[0].locations[0].phone : ""}`}
                                                            </Grid> : null}
                                                        </Grid>
                                                        <Grid container spacing={2} justify="center" alignItems="center" direction="row" className={classes.lineGrid}>
                                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                                <div style={{textAlignLast: "center"}}>
                                                                    <img
                                                                        className={classes.miniatureimage}
                                                                        alt="..."
                                                                        src={require('./images/whatsApp.png')}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                            {benefit[0] && benefit[0].locations[0] && benefit[0].locations.filter(function(item) {
                                                                if (!item.principalLocation) {
                                                                return false; // skip
                                                                }
                                                                return true;
                                                            }).map((item, index) => {
                                                                return (
                                                                    <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                                        {`+ (506) ${item.whatsApp}`}
                                                                    </Grid>
                                                                )
                                                            })}
                                                            {benefit[0] && benefit[0].locations[0] && benefit[0].locations.filter(function(item) {
                                                                if (!item.principalLocation) {
                                                                return false; // skip
                                                                }
                                                                return true;
                                                            }).map((item, index) => {
                                                                return (
                                                                    <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                                        {`+ (506) ${item.whatsApp}`}
                                                                    </Grid>
                                                                )
                                                            }).length == 0 ? <Grid className={classes.graytext} item lg={9} md={9} sm={9} xs={9}>
                                                            {`+ (506) ${benefit[0] && benefit[0].locations[0] ? benefit[0].locations[0].whatsApp : ""}`}
                                                            </Grid> : null}
                                                        </Grid>
                                                        <Grid container spacing={2} justify="center" alignItems="center" direction="row" className={classes.lineGrid}>
                                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                                <div style={{textAlignLast: "center"}}>
                                                                    <img
                                                                        className={classes.miniatureimage}
                                                                        alt="..."
                                                                        src={require('./images/link.png')}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                            <Grid item lg={9} md={9} sm={9} xs={9}>
                                                            <a href={`https://${benefit[0] && benefit[0].benefit ? benefit[0].benefit.link : ""}`} style={{color: "#039be5"}}>
                                                                {benefit[0] && benefit[0].benefit ? benefit[0].benefit.link : ""}
                                                            </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                                                            {benefit[0] && benefit[0].benefit && benefit[0].benefit.instagram ?
                                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                                <div style={{textAlignLast: "center"}}>
                                                                    <a href={`https://${benefit[0] && benefit[0].benefit ? benefit[0].benefit.instagram : ""}`}>
                                                                        <img
                                                                            className={classes.miniatureimage}
                                                                            alt="..."
                                                                            src={require('./images/instagram.png')}
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </Grid> : null}
                                                            {benefit[0] && benefit[0].benefit && benefit[0].benefit.facebook ?
                                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                                <div style={{textAlignLast: "center"}}>
                                                                    <a href={`${benefit[0] && benefit[0].benefit ? benefit[0].benefit.facebook : ""}`}> 
                                                                        <img
                                                                            className={classes.miniatureimage}
                                                                            alt="..."
                                                                            src={require('./images/facebook.png')}
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </Grid> : null}
                                                            {benefit[0] && benefit[0].benefit && benefit[0].benefit.email ?
                                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                                <div style={{textAlignLast: "center"}}>
                                                                    <a href={`https://${benefit[0] && benefit[0].benefit ? benefit[0].benefit.email : ""}`}>
                                                                        <img
                                                                            className={classes.miniatureimage}
                                                                            alt="..."
                                                                            src={require('./images/correo.png')}
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </Grid> : null}
                                                        </Grid>
                                                    </Paper> 
                                                    {promociones.length > 0 ?
                                                    <Paper className={classes.papercardprom}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} sm container>
                                                                <Grid item xs container direction="column" spacing={2}>
                                                                    <Grid item xs>
                                                                        <Typography className={classes.lineTypo} style={{color: "#484748", marginLeft: "2%"}} gutterBottom variant="subtitle1">
                                                                            PROMOCIONES
                                                                        </Typography>
                                                                        <Typography style={{color: "#939598", marginLeft: "3%", textAlign: "justify", display:"inline-block"}} variant="body2" gutterBottom>
                                                                        {promociones[0]}
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
                                </div>
                            </Tabs>
                    </div>
                </Card> : <h4 style={{textAlign:"center"}}>El beneficio no se encuentra disponible en este momento.</h4>}
            </div>
        </>
    )
}

export default DetalleBenefits;
