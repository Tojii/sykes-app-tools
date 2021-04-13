import React, { useState, useEffect } from "react";
import { Grid, Card, CardActionArea, Typography, CardContent, CardMedia, FormControl, InputLabel } from "@material-ui/core";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import NotFound from "../sessions/NotFound"
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumb } from "matx";
import Places from '../../components/maps/Places';
import { GetBenefitsById, GetBenefitsLocationsByProvincia, GetBenefitsLocationsByProvinciaCanton, UpdateBenefit, AddBenefit, GetBenefits, GetBenefitsActive, GetBenefitsCategory, GetBenefitsLocations } from "../../redux/actions/BenefitsActions";
import { isMdScreen } from "utils";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { GetProvince, GetCantons, GetDistricts } from "../../redux/actions/LocationActions";

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
        textAlign: "-webkit-center",
        marginLeft: isMdScreen() ? "20%" : "0%"
    },
    root: {
        maxWidth: 345,
        boxShadow: "5px 4px 16px 0px rgb(0 0 0 / 0.4)",
    },
      media: {
        width: "200px",
        height: "100px"
    },
})

const HomeBenefits = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const benefit = useSelector(state => state.benefit.benefit);
    const benefitscategories = useSelector(state => state.benefit.benefitscategories);
    const benefitslocations = useSelector(state => state.benefit.benefitslocations);
    const benefitslocationsCanton = useSelector(state => state.benefit.benefitslocationsCanton);
    const isLoading  = useSelector(state => state.benefit.loading); 
    const loadingLocation  = useSelector(state => state.benefit.loadingLocation); 
    const provinces = useSelector(state => state.locations.provinces);
    const [province, setProvince] = useState("");
    const [canton, setCanton] = useState("");
    const [cantons, setCantons] = useState([]);
    //const [disableCanton, setDisableCanton] = useState(true);
    //let cantons = [];
    const location = { address: 'San José, Costa Rica', lat: 9.903329970416294, lng: -84.08271419551181 } // our location object from earlier
    //const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    //console.log("user",user)
    const onChangeLocation = (lat, lng) => {
        console.log("lat", lat);
        console.log("lng", lng);
    }

    const handleChangeProvince = (event) => {
        //setDisableCanton(false);
        //setDisableDistrict(true);
        dispatch(GetBenefitsLocationsByProvincia(event.target.value));
        
        const name = event.target.name;
        setProvince(event.target.value)
        setCanton("")
    };

    const handleChangeCanton = (event) => {
        //setDisableCanton(false);
        //setDisableDistrict(true);
        dispatch(GetBenefitsLocationsByProvinciaCanton(province, event.target.value));
        setCanton(event.target.value)
    };
    
    useEffect(() => {
        dispatch(GetBenefitsLocations());
        dispatch(GetBenefitsById("2"));
        dispatch(GetBenefitsCategory());
        dispatch(GetProvince());
    }, [])

    useEffect(() => {
        setCantons (Array.from(new Set(benefitslocations.map((item, index) => {
            return item.canton
        }))))
        console.log("cantons",cantons)
    }, [benefitslocations])

    return (
        <div className="m-sm-30">
              {console.log(benefitscategories)}
            <div className="mb-sm-30">
                <Breadcrumb
                routeSegments={[
                { name: "Benefits Home", path: "/Benefits/Home" },              
                ]}
                />
            </div>
            {(user.badge == undefined || isLoading || loadingLocation) 
                ? <Loading /> :
                <div className={classes.margindiv}>
                    <h1 style={{ color: "limegreen", marginTop: "2%", fontWeight: "bold"}} className="mb-20">CATEGORIAS</h1>
                    <h5> All SYKES employees can take advantage of these exclusive agreements. </h5>
                    {/* <Card className="m-sm-30"> */}
                    <Grid container spacing={2} direction="row">
                        <Grid className={classes.gridtext} item lg={6} md={6} sm={6} xs={12}>
                            <Grid container spacing={2}> 
                                {benefitscategories.map((item, index) => {
                                return (
                                    <Grid key={item.id} item lg={3} md={3} sm={3} xs={7} className={classes.box}>
                                        <a href={`/Benefits/Category/${item.idCategory}`}>
                                            <Card className={classes.root}>
                                                <CardActionArea>
                                                    <img
                                                        className={classes.media}
                                                        alt="..."
                                                        src={`${item.image}`}
                                                    />
                                                    <CardContent style={{textAlign: "center"}}>
                                                    <Typography style={{textAlign: "center", color: "orchid", fontWeight: "bold"}} gutterBottom variant="subtitle1" component="p">
                                                        {item.name.toUpperCase()}
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </a>
                                    </Grid>
                                )})}
                            </Grid>
                        </Grid>
                        <Grid className={classes.gridtext} item lg={6} md={6} sm={6} xs={12}>
                            <Grid container spacing={2}> 
                                <FormControl style={{ width: "44%", marginLeft: isMdScreen() ? "3%" : "4%" }}>
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
                                <FormControl style={{ width: "44%", marginLeft: isMdScreen() ? "3%" : "4%" }}>
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
                                <div style={{ height: "400px", padding: isMdScreen() ? "10px" : "25px", width: "100%", marginLeft: isMdScreen() ? "3%" : "1%" }}>
                                    <Places locations={ benefitslocationsCanton ? benefitslocationsCanton : [] } lat={location.lat} lng={location.lng} zoomLevel={7} draggable={false} onChangeLocation={onChangeLocation} show /> {/* include it here */}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* </Card> */}
                </div> 
            }
        </div>
    )
}

export default HomeBenefits;