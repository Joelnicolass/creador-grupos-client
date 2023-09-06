import { useState } from "react";

const useSimpleFilter = (arr) => {
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const filter = (query) => {
    if (!query) return arr;

    return arr.filter((e) => e.toLowerCase().includes(query.toLowerCase()));
  };

  return {
    query,
    handleQuery,
    filter,
  };
};

export default useSimpleFilter;
