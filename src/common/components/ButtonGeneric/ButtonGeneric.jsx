import React from "react";

import styles from "./ButtonGeneric.module.css";

const ButtonGeneric = ({ text, isDisabled = false, ...props }) => {
  return (
    <button className={styles.button_generic} disabled={isDisabled} {...props}>
      {text}
    </button>
  );
};

export default ButtonGeneric;
