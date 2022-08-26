import classes from "./Footer.module.css";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={classes.footer}>
      <p>
        Copyright: <span>{year}</span> @NM
      </p>
    </div>
  );
};

export default Footer;
