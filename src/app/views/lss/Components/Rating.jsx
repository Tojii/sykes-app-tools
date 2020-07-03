import React, { useState } from "react";

import RemoveIcon from '@material-ui/icons/Remove';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledRating = withStyles({
    iconFilled: {
      color: '#1D6AF9',
    },
    iconHover: {
      color: '#1664F4',
    },
    largeIcon: {
      fontSize: '5.1875rem',
      width: 60,
      height: 60,
    },
  })(Rating);

const useStyles = makeStyles(theme => ({
    wrapper: {
        minHeight: '62px'
    }
  }));
  
export function RatingField(props) {
  const classes = useStyles();
    
  const [inputValue, setInputValue] = useState("");
  const [inputText, setInputText] = useState("");

  const rate = ["","Nunca","Casi nunca", "A veces", "Casi siempre", "Siempre"];

  const handleChange = event => {
    setInputValue(event.target.value);
    setInputText(rate[event.target.value]);

    props.setFieldValue(props.name, event.target.value);
  };

  const handleChangeActive = (event, value) => {
    setInputText(value !== -1 ? rate[value] : rate[inputValue]);
  };

  return (
    <div className={classes.wrapper}>
      <StyledRating
        name={props.name}
        onChange={handleChange}
        onChangeActive={handleChangeActive}
        value={inputValue}
        icon={<RemoveIcon fontSize="large" />}
        />
        <div mb={3}>{inputText}</div>
    </div>
  );
}