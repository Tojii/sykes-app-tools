import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardActionArea, CardContent, CardMedia, Divider, Tooltip } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Panel } from '@bumaga/tabs'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { GetBenefitsById } from "../../redux/actions/BenefitsActions";
import Loading from "../../../matx/components/MatxLoadable/Loading";
import Places from '../../components/maps/Places';
import { isMdScreen } from "utils";

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
        maxWidth: 345,
        boxShadow: "5px 4px 16px 0px rgb(0 0 0 / 0.4)",
    },
    media: {
        maxWidth: "200px",
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
    const descriptionRef = useRef(null);
    const benefiRef = useRef(null);
    const ubicationRef = useRef(null);
    const benefit = useSelector(state => state.benefit.benefit);
    const isLoading  = false; //useSelector(state => state.benefit.loading);  
    // const user = useSelector(state => state.user);
    //const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    //console.log("user",user)
    const promociones = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //const promociones = "";
    const location = { address: 'San José, Costa Rica', lat: 9.903329970416294, lng: -84.08271419551181 } // our location object from earlier

    useEffect(() => {
        dispatch(GetBenefitsById("6"));
    }, [])

    const onChangeLocation = (lat, lng) => {
        console.log("lat", lat);
        console.log("lng", lng);
    }

    const executeScrollDescription = () => descriptionRef.current.scrollIntoView()   
    const executeScrollBenefit = () => benefiRef.current.scrollIntoView()   
    const executeScrollUbication = () => ubicationRef.current.scrollIntoView()  

    return (
        <>
            {/* {console.log(benefit)} */}
            
            { isLoading ? <Loading/> :
            <div className={classes.margindiv}>
                <h1 style={{ color: "limegreen", marginTop: "2%", fontWeight: "bold"}} className="mb-20">{benefit[0] && benefit[0].benefit ? benefit[0].benefit.category.name.toUpperCase() : ""}</h1>
                <h5> All Sykes employees can take advantage of these exclusive agreements. </h5>
                <Card className={classes.cardContainer} elevation={6}>     
                    <Tabs style={{marginLeft: "2%", marginTop: "2%",}}>
                        <div className={classes.tabs}>
                            <Panel>
                                <div style={{backgroundColor: "lightgray"}}>
                                    <Grid container spacing={2}> 
                                        <Grid item lg={4} md={4} sm={4} xs={12} className={classes.box}>
                                            <a href={`https://www.google.com`}>
                                                <Card className={classes.root}>
                                                    <CardActionArea>
                                                        <img
                                                            className={classes.media}
                                                            alt="..."
                                                            src={require('./images/pizza.png')}
                                                        />
                                                        <CardContent>
                                                            <Typography className={classes.typostyle} gutterBottom variant="h6" component="h6">
                                                                Restaurant: TONI's PIZZA
                                                            </Typography>
                                                            <Typography style={{textAlign: "justify", color: "gray"}} gutterBottom variant="body2" component="p">
                                                                Description: Esto es una descripción del restaurante y se va a mostrar en la página de categorías para ver que tal se ve en el bloque
                                                            </Typography>
                                                            <Divider style={{backgroundColor: "orange", marginTop:"3%"}} />
                                                        </CardContent>
                                                    </CardActionArea>
                                                    <div style={{textAlign: "right", marginRight: "5%"}}>
                                                        <Tooltip title="San José, Avenida 2, Calle 15, Frente a la plaza de la democracia" arrow>
                                                            <img
                                                            className={classes.miniatureimage}
                                                            title= "Esto es un hover"
                                                            alt="..."
                                                            src={require('./images/ubicacion.png')}
                                                            />
                                                        </Tooltip>
                                                    </div>
                                                </Card>
                                            </a>
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={12} className={classes.box}>
                                            <Card className={classes.root}>
                                                <CardActionArea>
                                                    <img
                                                        className={classes.media}
                                                        alt="..."
                                                        src={require('./images/pizza.png')}
                                                    />
                                                    <CardContent>
                                                        <Typography className={classes.typostyle} gutterBottom variant="h6" component="h6">
                                                            Restaurant: TONI's PIZZA
                                                        </Typography>
                                                        <Typography style={{textAlign: "justify", color: "gray"}} gutterBottom variant="body2" component="p">
                                                            Description: Esto es una descripción del restaurante y se va a mostrar en la página de categorías para ver que tal se ve en el bloque
                                                        </Typography>
                                                        <Divider style={{backgroundColor: "orange", marginTop:"3%"}} />
                                                    </CardContent>
                                                </CardActionArea>
                                                <div style={{textAlign: "right", marginRight: "5%"}}>
                                                <Tooltip title="San José, Avenida 2, Calle 15, Frente a la plaza de la democracia" placement="bottom" arrow>
                                                    <img
                                                    className={classes.miniatureimage}
                                                    title= "Esto es un hover"
                                                    alt="..."
                                                    src={require('./images/ubicacion.png')}
                                                    />
                                                </Tooltip>
                                                </div>
                                            </Card>
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={12} className={classes.box}>
                                            <Card className={classes.root}>
                                                <CardActionArea>
                                                    <img
                                                        className={classes.media}
                                                        alt="..."
                                                        src={require('./images/pizza.png')}
                                                    />
                                                    <CardContent>
                                                        <Typography className={classes.typostyle} gutterBottom variant="h6" component="h6">
                                                            Restaurant: TONI's PIZZA
                                                        </Typography>
                                                        <Typography style={{textAlign: "justify", color: "gray"}} gutterBottom variant="body2" component="p">
                                                            Description: Esto es una descripción del restaurante y se va a mostrar en la página de categorías para ver que tal se ve en el bloque
                                                        </Typography>
                                                        <Divider style={{backgroundColor: "orange", marginTop:"3%"}} />
                                                    </CardContent>
                                                </CardActionArea>
                                                <div style={{textAlign: "right", marginRight: "5%"}}>
                                                <Tooltip title="San José, Avenida 2, Calle 15, Frente a la plaza de la democracia" placement="bottom" arrow>
                                                    <img
                                                    className={classes.miniatureimage}
                                                    title= "Esto es un hover"
                                                    alt="..."
                                                    src={require('./images/ubicacion.png')}
                                                    />
                                                </Tooltip>
                                                </div>
                                            </Card>
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={12} className={classes.box}>
                                            <Card className={classes.root}>
                                                <CardActionArea>
                                                    <img
                                                        className={classes.media}
                                                        alt="..."
                                                        src={require('./images/pizza.png')}
                                                    />
                                                    <CardContent>
                                                        <Typography className={classes.typostyle} gutterBottom variant="h6" component="h6">
                                                            Restaurant: TONI's PIZZA
                                                        </Typography>
                                                        <Typography style={{textAlign: "justify", color: "gray"}} gutterBottom variant="body2" component="p">
                                                            Description: Esto es una descripción del restaurante y se va a mostrar en la página de categorías para ver que tal se ve en el bloque
                                                        </Typography>
                                                        <Divider style={{backgroundColor: "orange", marginTop:"3%"}} />
                                                    </CardContent>
                                                </CardActionArea>
                                                <div style={{textAlign: "right", marginRight: "5%"}}>
                                                <Tooltip title="San José, Avenida 2, Calle 15, Frente a la plaza de la democracia" placement="bottom" arrow>
                                                    <img
                                                    className={classes.miniatureimage}
                                                    title= "Esto es un hover"
                                                    alt="..."
                                                    src={require('./images/ubicacion.png')}
                                                    />
                                                </Tooltip>
                                                </div>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Panel>
                        </div>
                    </Tabs>
                </Card>
            </div>}
        </>
    )
}

export default DetalleBenefits;
