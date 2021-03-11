import React, { useEffect } from "react";
import {
    Button,
    Card
  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, useTabState, Panel } from '@bumaga/tabs'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

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
        //width: "450px",
      
        padding: "24px 32px",
        border: "1px solid #f1f1f1",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 24px 0px rgba(0, 0, 0, 0.1)",
      
        //margin: "80px 0",
    },
    tabList: {
    display: "flex",
    
    paddingBottom: "24px",
    },

    tab: {
        outline: "none",
        cursor: "pointer",
        border: "none",
        fontSize: "16px",
        lineHeight: "24px",
        padding: "8px 16px",
        color: "#484748",
        backgroundColor: "#fff",
        border: "1px solid #f1f1f1",
        //boxShadow: "0px 2px 16px 0px rgba(0, 0, 0, 0.1)",
        //marginRight: "24px",
       
    },
    tabActive: {
        backgroundColor: "#039be5",
        borderColor: "transparent",
        color: "white",
        cursor: "default",
    }
      
})
  
  

const HomeVentas = () => {
    const classes = useStyles();
    // const user = useSelector(state => state.user);
    //const admin = (user != undefined && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != undefined) ? (user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_User') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('System_Admin') || user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('AssetsSale_Owner')) : false
    //console.log("user",user)
    
    useEffect(() => {
      
    }, [])

    return (
        <>
            <div>
                <h1 style={{ color: "limegreen", marginTop: "2%", fontWeight: "bold"}} className="mb-20">RESTAURANTS</h1>
                <h5> All Sykes employees can take advantage of these exclusive agreements. </h5>
                <Card elevation={6}>
                    <h2 style={{ color: "orange", marginLeft: "2%", marginTop: "2%",}} className="mb-20">Restaurante: TONI's PIZZA</h2>
                    
                    <Tabs style={{marginLeft: "2%", marginTop: "2%",}}>
                        <div className={classes.tabs}>
                        <div className={classes.tabList} >
                            <Tab>DESCRIPCIÓN</Tab>

                            <Tab>BENEFICIO</Tab>

                            <Tab>UBICACIÓN</Tab>
                        </div>

                        {/* <div className='tab-progress' /> */}

                        <Panel >
                            <div style={{backgroundColor: "lightgray"}}>
                            <p>
                            In sociology, anthropology, and linguistics, structuralism is the
                            methodology that implies elements of human culture must be understood
                            by way of their relationship to a broader, overarching system or
                            structure. It works to uncover the structures that underlie all the
                            things that humans do, think, perceive, and feel. Alternatively, as
                            summarized by philosopher Simon Blackburn, structuralism is "the
                            belief that phenomena of human life are not intelligible except
                            through their interrelations. These relations constitute a structure,
                            and behind local variations in the surface phenomena there are
                            constant laws of abstract structure".
                            </p>
                            </div>
                        </Panel>
                        <Panel>
                            <div style={{backgroundColor: "lightgray"}}>
                                <Paper style={{width: "50%"}}>
                                    <Grid container spacing={2}>
                                        {/* <Grid item>
                                            <ButtonBase className={classes.image}>
                                            
                                            </ButtonBase>
                                        </Grid> */}
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1">
                                                    Descripción
                                                    </Typography>
                                                    <Typography style={{marginLeft: "2%"}} variant="body2" gutterBottom>
                                                    If you want to refer a friend press the button!
                                                    </Typography>
                                                    {/* <Typography variant="body2" color="textSecondary">
                                                    ID: 1030114
                                                    </Typography> */}
                                                </Grid>
                                            </Grid>
                                            {/* <Grid item>
                                            <Typography variant="subtitle1">$19.00</Typography>
                                            </Grid> */}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        </Panel>
                        </div>
                    </Tabs>


                </Card>
            </div>

        </>
    )
}

export default HomeVentas;