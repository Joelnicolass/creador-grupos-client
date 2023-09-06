import React from "react";
import { FaUser } from "react-icons/fa";

import styles from "./SelectedStudentsList.module.css";
import IconFIllIndicator from "../../../../common/components/IconFillIndicator/IconFIllIndicator";
import FadeIn from "../../../../common/components/animations/FadeIn";

const SelectedStudentsList = ({ selections }) => {
  const getStyleUl = (hasShow) => {
    return {
      style: {
        display: `${hasShow ? "none" : "flex"}`,
      },
    };
  };

  return (
    <div>
      <h2>Estudiantes seleccionados</h2>
      <div className={styles.container}>
        <IconFIllIndicator
          IconComponent={FaUser}
          selectionsLenght={selections.length}
        />

        <ul {...getStyleUl(selections.length === 0)}>
          {selections.map((student) => (
            <FadeIn
              key={student}
              className={styles.ul_item}
              direction="left"
              distance="50px"
            >
              <li>
                <FaUser />
                {student}
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectedStudentsList;
