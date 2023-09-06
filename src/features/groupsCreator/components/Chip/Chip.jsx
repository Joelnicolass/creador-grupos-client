import React from "react";

import styles from "./Chip.module.css";

const Chip = ({ text, isSelected, onClicked = (item) => {}, ...props }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClicked(text);
  };

  const getStyleChip = (isSelected) => {
    return {
      style: {
        background: `${
          isSelected
            ? "linear-gradient(to right, #ffc44f, #ff8080)"
            : "linear-gradient(to right, #d466ff, #7b6fff)"
        }`,
      },
    };
  };

  return (
    <div
      className={styles.chip}
      {...getStyleChip(isSelected)}
      onClick={handleClick}
      {...props}
    >
      <span className={styles.chip__text} title={text}>
        {text}
      </span>
    </div>
  );
};

export default Chip;
