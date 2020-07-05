import React, { useState } from 'react';
import { RatingField } from './Rating';
import {
    TextField,
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'


export function AutocompleteField (props){
    
    const dispatch = useDispatch();
    //const [InputJefeDirecto, setInputJefeDirecto] = useState("");
    const [JefeDirecto, setJefeDirecto] = useState("");
    
    const handleChange = (value) => {       
        props.onChange(props.name, value);       
        console.log("changeAutocomplete",value);
        setJefeDirecto(value); 
    };
    
    const handleChangeActive = async (value) => {
        //setInputJefeDirecto(value);
        console.log("changeActiveAutocomplete",value);                   
        await dispatch(props.onInputChange(value)); 
    };
    
    return(
    <Autocomplete
        value={JefeDirecto}
        name={props.name}
        onChange={(event, newValue) => {
            handleChange(newValue)
        }} 
        //inputValue={InputJefeDirecto}
        onInputChange={async (event, newInputValue) => {
            await handleChangeActive(newInputValue);
        }} 
        id="controllable-states-demo"
        options={props.options}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label={props.label} />}
    />
    );
};