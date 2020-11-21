import React, { useState } from "react";
import { Grid, FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

const daysCount = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const ScheduleStep = () => {
    const [days, setDays] = useState({});
    const [times, setTimes] = useState({});

    const handleDayChange = (day) => event => {
        setDays({...days, [day]: event.target.checked})
    }

    const handleTimeChange = (time) => value => {
        setTimes({...times, [time]: value})
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
                                control={
                                    <Switch
                                        checked={days[day]}
                                        color="primary"
                                        onChange={handleDayChange(day)}
                                        value={day}
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
                        value={times["start"]}
                        onChange={handleTimeChange("start")}
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
                        value={times["end"]}
                        onChange={handleTimeChange("end")}
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

export default ScheduleStep;