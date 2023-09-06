import { URL_BASE_GROUPS_CREATOR_API } from "../constants";

export const getAllStudents = async () => {
  const response = await fetch(`${URL_BASE_GROUPS_CREATOR_API}/students`);
  const data = await response.json();
  return data;
};
