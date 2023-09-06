import { URL_BASE_GROUPS_CREATOR_API } from "../constants";

export const createGroup = async (members) => {
  const response = await fetch(
    `${URL_BASE_GROUPS_CREATOR_API}/groups
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
