import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      className={`${props.className} ${classes.input}`}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export default Input; //ovo ti ne treba
