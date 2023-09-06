import React from "react";

import styles from "./IconFillIndicator.module.css";

const IconFIllIndicator = ({
  IconComponent,
  selectionsLenght,
  quantity = 5,
  ...props
}) => {
  const getStyleIcon = (index, selectionsLenght) => {
    return {
      style: {
        opacity: `${index < selectionsLenght ? "1" : "0.2"}`,
      },
    };
  };

  return (
    <div className={styles.container}>
      {Array.from({ length: quantity }).map((_, index) => (
        <li key={index} className={styles.container_item}>
          <IconComponent
            {...getStyleIcon(index, selectionsLenght)}
            {...props}
          />
        </li>
      ))}
    </div>
  );
};

export default IconFIllIndicator;
