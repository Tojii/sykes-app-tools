import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardActionArea, CardContent, Divider, Tooltip, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Panel } from '@bumaga/tabs'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {GetBenefitsCategoryById, GetPageSettings, GetBenefitsLocationsByProvincia } from "../../redux/actions/BenefitsActions";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { isMdScreen } from "utils";
import { Breadcrumb } from "matx";
import history from "history.js";
import { useParams } from "react-router";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { GetProvince } from "../../redux/actions/LocationActions";
import ValidationModal from '../growth-opportunities/components/ValidationDialog';
import NotFound from "../sessions/NotFound";

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
    typostyle: {
        textAlign: "center",
        borderTop: "outset",
        borderTopColor: "#ff9805",
        borderTopWidth: "thin",
        color: "#ff9805"
    },
    box: {
        marginTop: "10px",
        marginBottom: "10px",
        textAlign: "-moz-center",
        "@media screen and (-webkit-min-device-pixel-ratio:0)": { 
            textAlign: "-webkit-center",
        },
        marginLeft: "auto",
        marginRight: "auto",
    },
    root: {
        width: isMdScreen() ? "100%" : "70%",
        height: isMdScreen() ? "100%" : "100%",
        boxShadow: "5px 4px 16px 0px rgb(0 0 0 / 0.4)",
    },
    media: {
        maxWidth: "200px",
        maxHeight: "100px"
    },
    medialogo: {
        width: "194px",
        height: "35.5px",
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
    miniatureimage: {
        maxWidth: "30px",
        textAlign: "right"
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
    const benefitscategory = useSelector(state => state.benefit.benefitscategory);
    const benefitslocations = useSelector(state => state.benefit.benefitslocations);
    const isLoading  = useSelector(state => state.benefit.loading); 
    const isLoadingSettings  = useSelector(state => state.benefit.loadingSettings); 
    const isLoadingProvince  = useSelector(state => state.locations.loading); 
    const loadingLocation  = useSelector(state => state.benefit.loadingLocation); 
    const provinces = useSelector(state => state.locations.provinces);
    const pageSettings = useSelector(state => state.benefit.pageSettings);
    const [descriptionMessage, setDescriptionMessage] = useState("");
    const [descriptionMessageName, setDescriptionMessageName] = useState("");
    const [province, setProvince] = useState("");
    const [canton, setCanton] = useState("");
    const [cantons, setCantons] = useState([]); 
    const [disableCanton, setDisableCanton] = useState(true);
    const [openMessage, setOpenMessage] = useState(false);
    let { id } = useParams(); 
    const user = useSelector(state => state.user);
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner')) : false

    useEffect(() => {
        dispatch(GetBenefitsCategoryById(id));
        dispatch(GetProvince());
        dispatch(GetPageSettings());
    }, [])

    useEffect(() => {
        setCantons([benefitslocations.filter(function(item) {
            if (!item.benefit.active || !item.active || id == "" || id != item.benefit.category.idCategory) {
                return false; // skip
            }
            return true;
            }).map((item, index) => {
            return ( 
                item.canton
            )})
        ]);
    }, [benefitslocations])

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

    const showCards = () => {
       if (benefitscategory[0].benefits.filter(function(item) {
            var locationstemp = item.benefitLocations.filter(function(item) {
                if (province != "" && province != "all" && province != item.provincia ) {
                  return false; // skip
                }
                if (canton != "" && canton != "all" && canton != item.canton ) {
                    return false; // skip
                }
                return true;
            }).map((item, index) => {
                return { 
                    canton: item.canton,
                    provincia: item.provincia
                }})
            if (locationstemp.length == 0 || !item.active) {
              return false; // skip
            }
            return true;
        }).length == 0) {
            return true;
        } else {
            return false;
        }
    }

    function handleLocation (locations) {
        var tooltipAddress = locations.filter(function(item) {
            if (!item.principalLocation) {
            return false; // skip
            }
            return true;
        }).map((item, index) => {
            return item.address
        })
        if (tooltipAddress.length == 0) {
            tooltipAddress = locations[0] ? locations[0].address : "";
        }
        return tooltipAddress;
    }

    const handleChangeProvince = (event) => {
        setDisableCanton(false);
        if (event.target.value == "all") {
            dispatch(GetBenefitsCategoryById(id));
            setDisableCanton(true)
            setCantons([])
        } else {
            dispatch(GetBenefitsLocationsByProvincia(event.target.value));
        }
        setProvince(event.target.value)
        setCanton("")
    };

    const handleChangeCanton = (event) => {
        setCanton(event.target.value)
    };

    return (
        <>
            <div className="m-sm-30">
                {(isLoading || isLoadingSettings || isLoadingProvince || loadingLocation) ? <Loading/> :
                <div className="mb-sm-30">
                        <Breadcrumb
                        routeSegments={[
                        { name: "Benefits Home", path: "/Benefits/Home" },
                        { name: "Categoría", path: "/Benefits/Home" },               
                        ]}
                    />
                </div>}
                {(isLoading || isLoadingSettings || isLoadingProvince || loadingLocation) ? <Loading/> :
                admin ? <Card className={classes.cardContainer} elevation={6}> 
                    <div className={classes.margindiv}>
                        <h1 style={{ color: "#4cb050", marginLeft: "2%", marginTop: "2%", fontWeight: "bold"}} className="mb-20">{showImage()} &nbsp; {<span style={{color:"gray", fontWeight: "normal"}}>|</span>} &nbsp; {benefitscategory[0] && benefitscategory[0].name ? benefitscategory[0].name.toUpperCase() : ""}</h1>
                        <h5 style={{ color: "#939598", marginLeft: "2%"}}>{pageSettings[0] != null ? pageSettings[0].reminder : ""}</h5>
                            
                            {(benefitscategory[0] != null && benefitscategory[0].benefits.length != 0) ? <Tabs style={{marginLeft: "2%", marginTop: "2%",}}>
                                <div className={classes.tabs}>
                                    <Panel>
                                        <div style={{marginBottom: "1%" }}>
                                        <FormControl style={{ width: isMdScreen() ? "40%" : "15%", marginLeft: isMdScreen() ? "3%" : "1%" }}>
                                            <InputLabel id="demo-simple-select-label">Provincia</InputLabel>
                                                <Select 
                                                label="Province*" 
                                                name="province"
                                                value={province} 
                                                onChange={handleChangeProvince} 
                                                >
                                                    {provinces != null && provinces.map(province => (
                                                        <MenuItem key={`province-${province.code}`} id={province.code} value={province.name ? province.name : ""}>
                                                        {province.name || " "}
                                                        </MenuItem>
                                                    ))}
                                                    {province != "" && <MenuItem key={`province-all`} id={"all"} value={"all"}>
                                                        {"Todos"}
                                                    </MenuItem>}
                                                </Select> 
                                        </FormControl>
                                        <FormControl style={{ width: isMdScreen() ? "40%" : "15%", marginLeft: isMdScreen() ? "3%" : "1%" }}>
                                            <InputLabel id="demo-simple-select-label">Cantón</InputLabel>
                                                <Select 
                                                label="Canton*" 
                                                name="canton"
                                                disabled={disableCanton}
                                                value={canton} 
                                                onChange={handleChangeCanton} 
                                                >
                                                    {(cantons != null && cantons[0] != undefined) && cantons[0].map(canton => (
                                                        <MenuItem key={`canton-${canton}`} id={canton} value={canton ? canton : ""}>
                                                        {canton || " "}
                                                        </MenuItem>
                                                    ))}
                                                    {canton != "" && <MenuItem key={`canton-all`} id={"all"} value={"all"}>
                                                        {"Todos"}
                                                    </MenuItem>}
                                                </Select> 
                                        </FormControl>
                                        </div>
                                        {showCards() && <h4 style={{textAlign:"center"}}>No se encontró ningún beneficio.</h4>}
                                        <div style={{backgroundColor: "lightgray"}}>
                                            <Grid container spacing={2}> 
                                                {(benefitscategory[0] != undefined && benefitscategory[0].benefits != undefined) ? benefitscategory[0].benefits.filter(function(item) {
                                                    var locationstemp = item.benefitLocations.filter(function(item) {
                                                        if (province != "" && province != "all" && province != item.provincia ) {
                                                          return false; // skip
                                                        }
                                                        if (canton != "" && canton != "all" && canton != item.canton ) {
                                                            return false; // skip
                                                        }
                                                        return true;
                                                    }).map((item, index) => {
                                                        return { 
                                                            canton: item.canton,
                                                            provincia: item.provincia
                                                        }})
                                                    if (locationstemp.length == 0 || !item.active) {
                                                      return false; // skip
                                                    }
                                                    //console.log("temp", locationstemp)
                                                    return true;
                                                }).map((item, index) => {
                                                    return (
                                                    <Grid key={item.idBenefit} item lg={4} md={4} sm={4} xs={11} className={classes.box}>
                                                        <Card className={classes.root}>
                                                                <CardActionArea>
                                                                    <div style={{textAlign: "center"}}>
                                                                        <a onClick={() => history.push({pathname: `/Benefits/Detalle/${item.idBenefit}`, prev: history.location.pathname})} >
                                                                            <img
                                                                                className={classes.media}
                                                                                alt="..."
                                                                                src={`${item.logo}`}
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                    <CardContent>
                                                                        <a onClick={() => history.push({pathname: `/Benefits/Detalle/${item.idBenefit}`, prev: history.location.pathname})} >
                                                                            <Typography className={classes.typostyle} gutterBottom variant="h6" component="h6">
                                                                                {item.name}
                                                                            </Typography>
                                                                        </a>
                                                                        <a onClick={() => (item.description.length < 215) && history.push({pathname: `/Benefits/Detalle/${item.idBenefit}`, prev: history.location.pathname})} >
                                                                            <Typography style={{minHeight: "100px", textAlign: "justify", color: "#939598"}} gutterBottom variant="body2" component="p">
                                                                                <a onClick={() => history.push({pathname: `/Benefits/Detalle/${item.idBenefit}`, prev: history.location.pathname})} >
                                                                                    {`${item.description.substr(0, 215)}${(item.description.length >= 215) ? "... " : ""}`}
                                                                                </a>
                                                                                <a onClick={() => {setDescriptionMessageName(item.name); setDescriptionMessage(item.description); setOpenMessage(true)}} >
                                                                                    <Typography style={{display: "inline", textAlign: "justify", textDecoration: "underline", color: "#039be5"}}>{`${(item.description.length >= 215) ? "Ver más" : ""}`}</Typography>
                                                                                </a>
                                                                            </Typography>
                                                                        </a>
                                                                        {<ValidationModal idioma={"Español"} path={""} state={`Descripción de ${descriptionMessageName}`} save={() => {}} message={descriptionMessage} setOpen={setOpenMessage} open={openMessage} />}
                                                                        <Divider style={{backgroundColor: "#ff9805", marginTop:"3%"}} />
                                                                    </CardContent>
                                                                </CardActionArea>
                                                                <div style={{textAlign: "right", marginRight: "5%"}}>
                                                                    <Tooltip title={handleLocation(item.benefitLocations)} arrow>
                                                                        <img
                                                                        className={classes.miniatureimage}
                                                                        alt="..."
                                                                        src={require('./images/ubicacion.png')}
                                                                        />
                                                                    </Tooltip>
                                                                </div>
                                                            </Card>
                                                    </Grid>
                                                )}) : null}
                                            </Grid>
                                        </div>
                                    </Panel>
                                </div>
                            </Tabs>
                            : <h4 style={{ marginTop: "5%", color: "#484748", marginLeft: "2%"}}>Lo sentimos, no se encontraron beneficios para esta categoría.</h4>
                            } 
                    </div>
                </Card> : <NotFound/>}
            </div>
        </>
    )
}

export default DetalleBenefits;
