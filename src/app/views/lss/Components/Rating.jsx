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
        minHeight: '80px',
        textAlign: 'center'
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

    props.setFieldValue(props.name, rate[event.target.value]);
  };

  const handleChangeActive = (event, value) => {
    setInputText(value !== -1 ? rate[value] : rate[inputValue]);
  };

  return (
    <div className={classes.wrapper}>
      <Rating
        name={props.name}
        onChange={handleChange}
        onChangeActive={handleChangeActive}
        value={inputValue}
        size="large"
        icon={<RemoveIcon  style={{ fontSize: 52 }} />}
        />
        <div mb={3}>{inputText}</div>
    </div>
  );
}