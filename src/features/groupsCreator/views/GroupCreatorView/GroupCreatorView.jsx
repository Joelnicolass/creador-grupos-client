import React from "react";
import useSWR from "swr";
import { createGroup, getAllStudents } from "../../services";
import { openToast } from "../../../../common/utils/toast.utils";
import useSimpleFilter from "../../../../common/hooks/useSimpleFilter";
import useSelection from "../../../../common/hooks/useSelection";
import StudentList from "../../components/StudentList/StudentList";
import styles from "./GroupCreatorView.module.css";
import InputGeneric from "../../../../common/components/InputGeneric/InputGeneric";
import SelectedStudentsList from "../../components/SelectedStudentsList/SelectedStudentsList";
import ButtonGeneric from "../../../../common/components/ButtonGeneric/ButtonGeneric";
import FadeIn from "../../../../common/components/animations/FadeIn";

const GroupCreatorView = () => {
  const {
    data: students,
    error: errorStudents,
    isLoading: isLoadingStudents,
    mutate: mutateStudents,
  } = useSWR("students", async () => {
    const students = await getAllStudents();
    return students.emails;
  });

  const { filter, handleQuery, query } = useSimpleFilter(students);

  const { selections, isSelected, handleSelection, clearSelections } =
    useSelection({
      max: 5,
      onMaxSelection: () => {
        openToast("No puedes seleccionar más de 5 estudiantes", "❌");
      },
    });

  const handleCreateGroup = async () => {
    try {
      const group = await createGroup(selections);

      openToast(`Grupo creado con éxito: ${group.members.join(", ")}`, "✅");

      clearSelections();
      mutateStudents();
    } catch (error) {
      openToast(error.message, "❌");
    }
  };

  if (errorStudents) return <h1>ERROR</h1>;

  if (isLoadingStudents) return <h1>CARGANDO...</h1>;

  return (
    <div className={styles.container}>
      <div className={styles.container_list}>
        <h1>CREADOR DE GRUPOS</h1>

        <StudentList
          students={filter(query)}
          handleSelection={handleSelection}
          isSelected={isSelected}
        >
          <InputGeneric
            type="text"
            placeholder="Buscar estudiante"
            value={query}
            onChange={handleQuery}
          />
        </StudentList>

        <SelectedStudentsList selections={selections} />

        {selections.length > 0 && (
          <ButtonGeneric
            key={selections.length}
            style={{ width: "300px", margin: "0 auto" }}
            onClick={handleCreateGroup}
            isDisabled={selections.length === 0}
            text={"CREAR GRUPOOOO!"}
          />
        )}
      </div>
    </div>
  );
};

export default GroupCreatorView;
