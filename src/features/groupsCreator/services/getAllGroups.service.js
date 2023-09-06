import { URL_BASE_GROUPS_CREATOR_API } from "../constants";

export const getAllGroups = async () => {
  const response = await fetch(`${URL_BASE_GROUPS_CREATOR_API}/groups`);
  const data = await response.json();
  return data;
};
