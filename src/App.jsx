import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { FaUser } from "react-icons/fa";

const URL_BASE_API = "https://creador-grupos-sv-production.up.railway.app";

const getAllStudents = async () => {
  const response = await fetch(`${URL_BASE_API}/students`);
  const data = await response.json();
  return data;
};

const getAllGroups = async () => {
  const response = await fetch(`${URL_BASE_API}/groups`);
  const data = await response.json();
  return data;
};

const createGroup = async (members) => {
  const response = await fetch(
    `${URL_BASE_API}/groups
  `,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ members }),
    }
  );
  const data = await response.json();
  return data;
};

const App = () => {
  const [query, setQuery] = useState("");

  const [selectedStudents, setSelectedStudents] = useState([]); // ["email1", "email2"]

  const {
    data: students,
    error: errorStudents,
    isLoading: isLoadingStudents,
    mutate: mutateStudents,
  } = useSWR("students", async () => {
    const students = await getAllStudents();
    return students.emails;
  });

  const filter = (query) => {
    if (!query) return students;
    return students.filter((student) =>
      student.toLowerCase().includes(query.toLowerCase())
    );
  };

  const validateMaxStudents = (numOfIntegrants) => {
    if (numOfIntegrants > 5) {
      openToast("No puedes seleccionar más de 5 estudiantes", "❌");
      return false;
    }
    return true;
  };

  const handleSelectStudent = (student) => {
    if (selectedStudents.includes(student)) {
      setSelectedStudents(selectedStudents.filter((s) => s !== student));
    } else {
      if (!validateMaxStudents(selectedStudents.length + 1)) return;
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const isStudentSelected = (student) => selectedStudents.includes(student);

  const openToast = (message, icon) => {
    return toast(message, {
      icon,
      style: {
        borderRadius: "10px",
        background: "linear-gradient(to right, #282828, #323040)",
        color: "#fff",
        border: "1px solid #383838",
      },
    });
  };

  const filterResult = filter(query);

  if (errorStudents) return <h1>ERROR</h1>;

  if (isLoadingStudents) return <h1>CARGANDO...</h1>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "100vw",
          height: "100vh",
          padding: "20px",
          maxWidth: "800px",
        }}
      >
        <h1>CREADOR DE GRUPOS</h1>

        <h2>Estudiantes disponibles</h2>

        <input
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #d466ff",
          }}
          type="text"
          placeholder="Buscar estudiante"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            padding: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
            height: "400px",
            maxHeight: "400px",
            overflow: "scroll",
            border: "1px solid #d466ff",
            borderRadius: "20px",
          }}
        >
          {filterResult?.length > 0 ? (
            filterResult.map((student) => (
              <div
                key={student}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid black",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "20px",
                  background: `${
                    isStudentSelected(student)
                      ? "linear-gradient(to right, #ffc44f, #ff8080)"
                      : "linear-gradient(to right, #d466ff, #7b6fff)"
                  }`,
                  width: "200px",
                  height: "50px",
                  cursor: "pointer",
                }}
                onClick={() => handleSelectStudent(student)}
              >
                <p
                  style={{
                    //ellipsis
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                  }}
                  title={student}
                >
                  {student}
                </p>
              </div>
            ))
          ) : (
            <h1>NO HAY RESULTADOS</h1>
          )}
        </div>

        <div>
          <h2>Estudiantes seleccionados</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                  }}
                >
                  <FaUser
                    style={{
                      opacity: `${
                        index < selectedStudents.length ? "1" : "0.2"
                      }`,
                    }}
                  />
                </li>
              ))}
            </div>
            <ul
              style={{
                display: `${selectedStudents.length === 0 ? "none" : "flex"}`,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
                padding: "10px",
                borderRadius: "20px",
                background: "linear-gradient(to right, #ffc44f, #ff8080)",
                width: "100%",
              }}
            >
              {selectedStudents.map((student) => (
                <li
                  key={student}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    listStyle: "none",
                    width: "100%",
                    gap: "1rem",
                  }}
                >
                  <FaUser />
                  {student}
                </li>
              ))}
            </ul>

            <button
              style={{
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #d466ff",
                background: "linear-gradient(to right, #d466ff, #7b6fff)",
                cursor: `${
                  selectedStudents.length === 0 ? "not-allowed" : "pointer"
                }`,
                width: "100%",
              }}
              onClick={async () => {
                try {
                  const group = await createGroup(selectedStudents);
                  openToast(
                    `Grupo creado con éxito: ${group.members.join(", ")}`,
                    "✅"
                  );
                  setSelectedStudents([]);
                  mutateStudents();
                } catch (error) {
                  openToast(error.message, "❌");
                }
              }}
              disabled={selectedStudents.length === 0}
            >
              CREAR GRUPOOOOO!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
