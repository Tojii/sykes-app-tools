import React, { useState, useEffect } from "react";
import { Grid, Card, FormControl, InputLabel, Tooltip, Button } from "@material-ui/core";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumb } from "matx";
import Places from '../../components/maps/Places';
import { GetBenefitsLocationsByProvincia, GetBenefitsLocationsByProvinciaCanton, GetPageSettings, GetBenefitsCategory, GetBenefitsLocations } from "../../redux/actions/BenefitsActions";
import { isMdScreen } from "utils";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import SettingsIcon from "@material-ui/icons/Settings";
import { GetProvince } from "../../redux/actions/LocationActions";
import history from "history.js";
import NotFound from "../sessions/NotFound";

const useStyles = makeStyles({
    cardContainer: {
        marginBottom: "5%"
    },
    box: {
        marginTop: "10px",
        marginBottom: "10px",
        textAlign: "-webkit-center",
        marginLeft: isMdScreen() ? "20%" : "0%"
    },
    root: {
        maxWidth: 164,
    },
    media: {
        width: "90%",
        height: "90%"
    },
    mediafooter: {
        marginTop: "3%"
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
    },
})

const HomeBenefits = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const benefitscategories = useSelector(state => state.benefit.benefitscategories);
    const benefitslocations = useSelector(state => state.benefit.benefitslocations);
    const benefitslocationsCanton = useSelector(state => state.benefit.benefitslocationsCanton);
    const isLoading = useSelector(state => state.benefit.loading);
    const isLoadingSettings = useSelector(state => state.benefit.loadingSettings);
    const loadingLocation = useSelector(state => state.benefit.loadingLocation);
    const isLoadingProvince = useSelector(state => state.locations.loading);
    const provinces = useSelector(state => state.locations.provinces);
    const [province, setProvince] = useState("");
    const [category, setCategory] = useState("");
    const [canton, setCanton] = useState("");
    const [cantons, setCantons] = useState([]);
    const pageSettings = useSelector(state => state.benefit.pageSettings);
    const [disableCanton, setDisableCanton] = useState(true);
    const location = { address: 'San José, Costa Rica', lat: 9.603329970416294, lng: -84.08271419551181 } // our location object from earlier
    const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner')) : false
    const benefitUser = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Benefits_Owner')) : false
    const onChangeLocation = (lat, lng) => {
        console.log("lat", lat);
        console.log("lng", lng);
    }

    const configurationButton = () => {
        return (
            <React.Fragment>
                <Tooltip title={"Configuraciones"}>
                    <Button
                        component={Link} to="/Benefits/Configuration"
                        variant="contained"
                        color="primary"
                        startIcon={<SettingsIcon />}
                    >
                        Configuraciones
                </Button>
                </Tooltip>
            </React.Fragment>
        );
    }

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

    const handleChangeProvince = (event) => {
        setDisableCanton(false);
        if (event.target.value == "all") {
            dispatch(GetBenefitsLocations());
            setCantons([])
            setDisableCanton(true);
        } else {
            dispatch(GetBenefitsLocationsByProvincia(event.target.value));
        }
        setProvince(event.target.value)
        setCanton("")
    };

    const handleChangeCanton = (event) => {
        if (event.target.value == "all") {
            dispatch(GetBenefitsLocationsByProvincia(province));
        } else {
            dispatch(GetBenefitsLocationsByProvinciaCanton(province, event.target.value));
        }
        setCanton(event.target.value)
    };

    const handleChangeCategory = (event) => {
        (province != "" && province != "all" && canton == "") && dispatch(GetBenefitsLocationsByProvincia(province));
        (province != "" && province != "all" && canton != "") && dispatch(GetBenefitsLocationsByProvincia(province));
        ((province == "" && canton == "") || (province == "" && canton == "" && event.target.value == "all") || province == "all") && dispatch(GetBenefitsLocations());
        setCategory(event.target.value)
        setCanton("")
    };

    useEffect(() => {
        dispatch(GetBenefitsLocations());
        dispatch(GetBenefitsCategory());
        dispatch(GetProvince());
        dispatch(GetPageSettings());
    }, [])

    useEffect(() => {
        setCantons(Array.from(new Set(benefitslocations.filter(function (item) {
            if (!item.benefit.active || !item.active || (category != "" && category != "all" && category != item.benefit.category.idCategory)) {
                return false; // skip
            }
            return true;
        }).map((item, index) => {
            return item.canton
        }))))
    }, [benefitslocations])

    return (
        <div className="m-sm-30">
            {(user.badge == undefined || isLoading || loadingLocation || isLoadingSettings || isLoadingProvince) ? <Loading /> : <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Benefits Home", path: "/Benefits/Home" },
                    ]}
                />
            </div>}
            {(user.badge == undefined || isLoading || loadingLocation || isLoadingSettings || isLoadingProvince) ? <Loading /> :
                benefitUser ? <Card className={classes.cardContainer} elevation={6}>
                    <div className={classes.margindiv}>
                        <h1 style={{ color: "#4cb050", marginTop: "2%", marginLeft: "1%", fontWeight: "bold" }} className="mb-20">{showImage()} &nbsp; {<span style={{ color: "gray", fontWeight: "normal" }}>|</span>} &nbsp; CATEGORIAS &nbsp; {admin ? <span style={{ color: "gray", fontWeight: "normal" }}>|</span> : null} &nbsp; {admin ? configurationButton() : null}</h1>
                        <Grid style={{ marginLeft: "0.5%" }} container spacing={2} direction="row">
                            <Grid key={1} className={classes.gridtext} item lg={6} md={6} sm={6} xs={12}>
                                <h5 style={{ color: "#939598", marginLeft: window.screen.width >= 1024 ? "1%" : null, textAlign: "justify", width: window.screen.width <= 1024 ? "95%" : null }}>{pageSettings[0] != null ? pageSettings[0].reminder : ""}</h5>
                                <Grid container spacing={2}>
                                    <Grid key={0} item lg={3} md={3} sm={3} xs={7} className={classes.box}>
                                        <a style={{ cursor: "pointer" }} onClick={() => history.push({ pathname: `/Benefits/Category` })}>
                                            <img
                                                className={classes.media}
                                                alt="..."
                                                src={require('./images/ALL.png')}
                                            />
                                        </a>
                                    </Grid>
                                    {benefitscategories.sort(function (a, b) {
                                        var textA = a.order;
                                        var textB = b.order;
                                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                                    }).map((item, index) => {
                                        return (
                                            <Grid key={item.idCategory} item lg={3} md={3} sm={3} xs={7} className={classes.box}>
                                                <a style={{ cursor: "pointer" }} onClick={() => history.push({ pathname: `/Benefits/Category/${item.idCategory}` })} >
                                                    {item.image && <img
                                                        className={classes.media}
                                                        alt="..."
                                                        src={`${item.image}`}
                                                    />}
                                                </a>
                                            </Grid>
                                        )
                                    })}
                                    <Grid key={"discount"} item lg={3} md={3} sm={3} xs={7} className={classes.box}>
                                        <a style={{ cursor: "pointer" }} onClick={() => history.push({ pathname: `/Benefits/MontlyDiscounts` })}>
                                            <img
                                                className={classes.media}
                                                alt="..."
                                                src={require('./images/DISCOUNT.png')}
                                            />
                                        </a>
                                    </Grid>
                                </Grid>
                                {pageSettings[0] != null && <img
                                    className={classes.mediafooter}
                                    alt="..."
                                    src={`${pageSettings[0].footer}`}
                                />}
                            </Grid>
                            <Grid key={2} className={classes.gridtext} item lg={6} md={6} sm={6} xs={12}>
                                <Grid container>
                                    <div style={{ color: "#939598", width: "90%", marginLeft: "4%" }}>
                                        <h5 >{pageSettings[0] != null ? pageSettings[0].header : ""}</h5>
                                    </div>
                                    <FormControl style={{ width: isMdScreen() ? "25%" : "20%", marginLeft: isMdScreen() ? "3%" : "4%" }}>
                                        <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                                        <Select
                                            label="Category*"
                                            name="category"
                                            value={category}
                                            onChange={handleChangeCategory}
                                        >
                                            {benefitscategories.map(category => (
                                                <MenuItem key={`category-${category.idCategory}`} id={category.idCategory} value={category.idCategory ? category.idCategory : ""}>
                                                    {category.name || " "}
                                                </MenuItem>
                                            ))}
                                            {category != "" && <MenuItem key={`category-all`} id={"all"} value={"all"}>
                                                {"Todas"}
                                            </MenuItem>}
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{ width: isMdScreen() ? "25%" : "20%", marginLeft: isMdScreen() ? "3%" : "4%" }}>
                                        <InputLabel id="demo-simple-select-label">Provincia</InputLabel>
                                        <Select
                                            label="Province*"
                                            name="province"
                                            value={province}
                                            onChange={handleChangeProvince}
                                        >
                                            {provinces.map(province => (
                                                <MenuItem key={`province-${province.code}`} id={province.code} value={province.name ? province.name : ""}>
                                                    {province.name || " "}
                                                </MenuItem>
                                            ))}
                                            {province != "" && <MenuItem key={`province-all`} id={"all"} value={"all"}>
                                                {"Todas"}
                                            </MenuItem>}
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{ width: isMdScreen() ? "25%" : "20%", marginLeft: isMdScreen() ? "3%" : "4%" }}>
                                        <InputLabel id="demo-simple-select-label">Cantón</InputLabel>
                                        <Select
                                            label="Canton*"
                                            name="canton"
                                            value={canton}
                                            disabled={disableCanton}
                                            onChange={handleChangeCanton}
                                        >
                                            {cantons.map(canton => (
                                                <MenuItem key={`canton-${canton}`} id={canton} value={canton ? canton : ""}>
                                                    {canton || " "}
                                                </MenuItem>
                                            ))}
                                            {canton != "" && <MenuItem key={`canton-all`} id={"all"} value={"all"}>
                                                {"Todos"}
                                            </MenuItem>}
                                        </Select>
                                    </FormControl>
                                    <div style={{ height: "655px", padding: isMdScreen() ? "10px" : "25px", width: "100%", marginLeft: isMdScreen() ? "3%" : "1%" }}>
                                        <Places
                                            locations={benefitslocationsCanton ? benefitslocationsCanton.filter(function (item) {
                                                if (item.ubicationType == "Remota" || !item.benefit.active || !item.active || (category != "" && category != "all" && category != item.benefit.category.idCategory)) {
                                                    return false; // skip
                                                }
                                                return true;
                                            }).map((item, index) => { return item }) : []}
                                            content={benefitslocationsCanton ? benefitslocationsCanton.filter(function (item) {
                                                if (item.ubicationType == "Remota" || !item.benefit.active || !item.active || (category != "" && category != "all" && category != item.benefit.category.idCategory)) {
                                                    return false; // skip
                                                }
                                                return true;
                                            }).map((item, index) => {
                                                return '<div id="content">' +
                                                    '<div id="siteNotice">' +
                                                    "</div>" +
                                                    `<h1 id="firstHeading" class="firstHeading">${item.benefit.name}</h1>` +
                                                    '<div id="bodyContent">' +
                                                    `<p><b>Address: </b> ${item.address} </p>` +
                                                    `<p><b>Phone: </b> ${item.phone} </p>` +
                                                    `<p style="display:${!item.whatsApp ? "none" : null};"><b>WhatsApp: </b> ${item.whatsApp} </p>` +
                                                    `<a style="color:#039be5; text-decoration: underline;" href="${process.env.PUBLIC_URL}/Benefits/Detalle/${item.benefit.idBenefit}">Ver detalle</a>` +
                                                    "</div>" +
                                                    "</div>"
                                            }) : []}
                                            lat={location.lat} lng={location.lng} zoomLevel={8} draggable={false} onChangeLocation={onChangeLocation} show /> {/* include it here */}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Card> : <NotFound />
            }
        </div>
    )
}

export default HomeBenefits;