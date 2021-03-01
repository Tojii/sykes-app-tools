import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Zoom from '@material-ui/core/Zoom';
import { red } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import history from "history.js";
import {getLikesDislikes, addLikesDislikes} from "./LikesDislikesService";

const MODULE = "EmployeeTools";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(1),
        bottom: theme.spacing(1),
        right: theme.spacing(2),
    },

    fabRed: {
        color: theme.palette.common.white,
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[600],
        },
    },
}));

export const LikesDislikesHome = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(false);
    const user = useSelector(state => state.user);

    useEffect(() => {
        async function getValue() {
            let url =  history.location.pathname.split('/');
            var secondSegment = url[1];
            let data = { 
                url: secondSegment.toUpperCase(), 
                module: MODULE, 
                username: user.username, 
                expirationDays: 0,
                answer : 0
            }; 
            const resp = await getLikesDislikes(data);
            setValue(false);
            setTimeout(() => setValue(!resp), 2000);
        }
        getValue();
    }, [history.location.pathname]);

    const onHandleClick = async (val) => {
        setValue(false);
        let url = history.location.pathname.split('/');
        var secondSegment = url[1];
        let data = { 
            url: secondSegment.toUpperCase(), 
            module: MODULE, 
            userName: user.username, 
            expirationDays: 0,
            answer : val
        };
        const value = await addLikesDislikes(data);
    }

    return (
        <div className={classes.root}>
            <Zoom in={value}>
                <div className={classes.fab}>
                    <Tooltip TransitionComponent={Zoom} title="Like" aria-label="Like" arrow>
                        <Fab
                            className={classes.margin}
                            color="primary"
                            onClick={() => onHandleClick(1)}>
                            <ThumbUpIcon />
                        </Fab>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Dislike" aria-label="Dislike" arrow>
                        <Fab
                            className={classes.fabRed}
                            color="inherit"
                            onClick={() => onHandleClick(0)}>
                            <ThumbDownIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </Zoom>
        </div>
    );
};