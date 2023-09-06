import React from "react";

import styles from "./InputGeneric.module.css";

const InputGeneric = ({ ...props }) => {
  return <input className={styles.input} {...props} />;
};

export default InputGeneric;
