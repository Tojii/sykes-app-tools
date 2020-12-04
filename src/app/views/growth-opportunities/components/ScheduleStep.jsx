import React, { useState, useEffect } from "react";
import { Grid, FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { setApplyData } from "../../../redux/actions/ApplyActions"
import format from "date-fns/format";

const daysCount = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const ScheduleStep = (props) => {
    const { apply, setApplyData, setDisableNext } = props

    const [days, setDays] = useState({
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true,
        Saturday: false,
        Sunday: false,
    });

    const [times, setTimes] = useState({
        startTime: new Date().setHours(8, 0, 0),
        endTime: new Date().setHours(17, 0, 0),
    });

    useEffect(() => {
        buildScheduleDays();
        buildScheduleTimes();
        setApplyData(apply);
        apply['workSchedule'] !== "" ? setDisableNext(false) : setDisableNext(true)
    }, [days, times])

    const handleDayChange = (day) => event => {
        setDays({...days, [day]: event.target.checked})
    }

    const handleTimeChange = (time) => value => {
        setTimes({...times, [time]: value})
    }

    const buildScheduleDays = () => {
        apply["workSchedule"] = Object.keys(days).map((day) => {
            return (days[day] && day ) 
        }).filter(Boolean).join(", ");
    }

    const buildScheduleTimes = () => {
        Object.keys(times).map((time) => {
            apply[time] = format(times[time], "P p").toString()
        })
    }

    return (
        <>
        <Grid container>
            <Grid item lg={12} className="px-sm-24">
                <h3>Schedule</h3>
                    <FormGroup row>
                    {daysCount.map((day, index) => {
                        return (
                            <FormControlLabel
                                key={index}
                                className={"capitalize"}
                                control={
                                    <Switch
                                        checked={days[day]}
                                        color="primary"
                                        onChange={handleDayChange(day)}
                                        value={days[day]}
                                    />}
                                label={day}
                            />
                        );
                    })}
                    </FormGroup>
            </Grid>
            <Grid item lg={6} className="p-sm-24">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        className="mb-16 w-100"
                        margin="none"
                        id="start-time"
                        label="Start Time"
                        value={times["startTime"]}
                        onChange={handleTimeChange("startTime")}
                        KeyboardButtonProps={{
                            "aria-label": "change time"
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item lg={6} className="p-sm-24">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        className="mb-16 w-100"
                        margin="none"
                        id="end-time"
                        label="End Time"
                        value={times["endTime"]}
                        onChange={handleTimeChange("endTime")}
                        KeyboardButtonProps={{
                            "aria-label": "change time"
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
        </Grid>
        </>
    );
}

const mapStateToProps = ({ applyReducer }) => {
    const { apply } = applyReducer;
    return {
        apply,
    };
};

export default connect(mapStateToProps, {
    setApplyData,
})(ScheduleStep);