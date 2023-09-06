import React from "react";
import Chip from "../Chip/Chip";

import styles from "./StudentList.module.css";
import FadeIn from "../../../../common/components/animations/FadeIn";

const StudentList = ({ students, handleSelection, isSelected, children }) => {
  return (
    <>
      <h2>Estudiantes disponibles</h2>

      {children}

      <div className={styles.container_list}>
        {students?.length > 0 ? (
          students.map((student, i) => (
            <FadeIn key={student} delay={i * 0.05} direction="up">
              <Chip
                text={student}
                onClicked={handleSelection}
                isSelected={isSelected(student)}
              />
            </FadeIn>
          ))
        ) : (
          <div className={styles.container_no_results}>
            <h1>NO HAY RESULTADOS</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentList;
