import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardActionArea, CardContent, CardMedia, Divider, Tooltip, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Panel } from '@bumaga/tabs'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { GetBenefitsById, GetBenefitsCategoryById } from "../../redux/actions/BenefitsActions";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import Places from '../../components/maps/Places';
import { isMdScreen } from "utils";
import { Breadcrumb } from "matx";
import history from "history.js";
import { useParams } from "react-router";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { GetProvince, GetCantons, GetDistricts } from "../../redux/actions/LocationActions";

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
    typostyle: {
        textAlign: "center",
        borderTop: "outset",
        borderTopColor: "orange",
        borderTopWidth: "thin",
        color: "orange"
    },
    tabList: {
        display: "flex",
    },
    box: {
        marginTop: "10px",
        marginBottom: "10px",
        textAlign: "-webkit-center"
    },
    root: {
        width: 345,
        //height: 415,
        boxShadow: "5px 4px 16px 0px rgb(0 0 0 / 0.4)",
    },
    media: {
        maxWidth: "200px",
        maxHeight: "100px"
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
        //margin: "5%",
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
    const benefit = useSelector(state => state.benefit.benefit);
    const benefitscategory = useSelector(state => state.benefit.benefitscategory);
    const isLoading  = useSelector(state => state.benefit.loading); 
    const provinces = useSelector(state => state.locations.provinces);
    const [province, setProvince] = useState("");
    const [canton, setCanton] = useState("");
    const [cantons, setCantons] = useState([]); 
    let { id } = useParams(); 
    // const user = useSelector(state => state.user);
    //const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    //console.log("user",user)
    const promociones = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //const promociones = "";
    const location = { address: 'San José, Costa Rica', lat: 9.903329970416294, lng: -84.08271419551181 } // our location object from earlier

    useEffect(() => {
        //dispatch(GetBenefitsById("6"));
        dispatch(GetBenefitsCategoryById(id));
        dispatch(GetProvince());
    }, [])

    const handleChangeProvince = (event) => {
        //setDisableCanton(false);
        //setDisableDistrict(true);
        //dispatch(GetBenefitsLocationsByProvincia(event.target.value));
        
        const name = event.target.name;
        setProvince(event.target.value)
        setCanton("")
    };

    const handleChangeCanton = (event) => {
        //setDisableCanton(false);
        //setDisableDistrict(true);
        //dispatch(GetBenefitsLocationsByProvinciaCanton(province, event.target.value));
        setCanton(event.target.value)
    };

    return (
        <>
            {console.log("category", benefitscategory)}
            
            { isLoading ? <Loading/> :
            <div className="m-sm-30">
                <div className="mb-sm-30">
                        <Breadcrumb
                        routeSegments={[
                        { name: "Benefits Home", path: "/Benefits/Home" },
                        { name: "Categoría", path: "/Benefits/Home" },               
                        ]}
                    />
                </div>
                <div className={classes.margindiv}>
                    <h1 style={{ color: "limegreen", marginTop: "2%", fontWeight: "bold"}} className="mb-20">{benefitscategory[0] && benefitscategory[0].name ? benefitscategory[0].name.toUpperCase() : ""}</h1>
                    <h5> All Sykes employees can take advantage of these exclusive agreements. </h5>
                    <Card className={classes.cardContainer} elevation={6}>     
                        <Tabs style={{marginLeft: "2%", marginTop: "2%",}}>
                            <div className={classes.tabs}>
                                <Panel>
                                    <div style={{marginBottom: "1%" }}>
                                    <FormControl style={{ width: "40%", marginLeft: isMdScreen() ? "3%" : "1%" }}>
                                        <InputLabel id="demo-simple-select-label">Provincia</InputLabel>
                                            <Select 
                                            label="Province*" 
                                            name="province"
                                            
                                            //className={classes.textvalidator} 
                                            value={province} 
                                            onChange={handleChangeProvince} 
                                            validators={["required"]}
                                            errorMessages={["Este campo es requerido"]}
                                            >
                                            {provinces.map(province => (
                                                <MenuItem key={`province-${province.code}`} id={province.code} value={province.name ? province.name : ""}>
                                                {province.name || " "}
                                                </MenuItem>
                                            ))}
                                            </Select> 
                                    </FormControl>
                                    <FormControl style={{ width: "40%", marginLeft: isMdScreen() ? "3%" : "1%" }}>
                                        <InputLabel id="demo-simple-select-label">Cantón</InputLabel>
                                            <Select 
                                            label="Province*" 
                                            name="canton"
                                            
                                            //className={classes.textvalidator} 
                                            value={canton} 
                                            onChange={handleChangeCanton} 
                                            validators={["required"]}
                                            errorMessages={["Este campo es requerido"]}
                                            >
                                            {cantons.map(canton => (
                                                <MenuItem key={`canton-${canton}`} id={canton} value={canton ? canton : ""}>
                                                {canton || " "}
                                                </MenuItem>
                                            ))}
                                            </Select> 
                                    </FormControl>
                                    </div>
                                    <div style={{backgroundColor: "lightgray"}}>
                                        <Grid container spacing={2}> 
                                            {(benefitscategory[0] != undefined && benefitscategory[0].benefits != undefined) ? benefitscategory[0].benefits.filter(function(item) {
    // if (province != "" && province != item.name ) {
    //   return false; // skip
    // }
    return true;
  })                                            .map((item, index) => {
                                                return (
                                                <Grid key={item.idBenefit} item lg={4} md={4} sm={4} xs={12} className={classes.box}>
                                                    <a onClick={() => history.push({pathname: `/Benefits/Detalle/${item.idBenefit}`, prev: history.location.pathname})} >
                                                        <Card className={classes.root}>
                                                            <CardActionArea>
                                                                <img
                                                                    className={classes.media}
                                                                    alt="..."
                                                                    src={`${item.logo}`}
                                                                />
                                                                <CardContent>
                                                                    <Typography className={classes.typostyle} gutterBottom variant="h6" component="h6">
                                                                        {item.name}
                                                                    </Typography>
                                                                    <Typography style={{textAlign: "justify", color: "gray"}} gutterBottom variant="body2" component="p">
                                                                        {item.description}
                                                                    </Typography>
                                                                    <Divider style={{backgroundColor: "orange", marginTop:"3%"}} />
                                                                </CardContent>
                                                            </CardActionArea>
                                                            <div style={{textAlign: "right", marginRight: "5%"}}>
                                                                <Tooltip title="San José, Avenida 2, Calle 15, Frente a la plaza de la democracia" arrow>
                                                                    <img
                                                                    className={classes.miniatureimage}
                                                                    alt="..."
                                                                    src={require('./images/ubicacion.png')}
                                                                    />
                                                                </Tooltip>
                                                            </div>
                                                        </Card>
                                                    </a>
                                                </Grid>
                                            )}) : null}
                                        </Grid>
                                    </div>
                                </Panel>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            </div>}
        </>
    )
}

export default DetalleBenefits;
