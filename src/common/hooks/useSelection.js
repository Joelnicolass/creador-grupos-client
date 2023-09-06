import { useState } from "react";

const useSelection = ({
  max = 1,
  repeat = false,
  onSelectionChange = (el) => {},
  onMaxSelection = (el) => {},
}) => {
  const [selections, setSelections] = useState([]);

  const validateMax = (length) => {
    if (repeat) return true;

    const isValid = length < max;
    if (!isValid) onMaxSelection();

    return isValid;
  };

  const isSelected = (el) => selections.includes(el);

  const deselect = (el) => {
    setSelections(selections.filter((s) => s !== el));
    onSelectionChange(el);
  };

  const select = (el) => {
    if (!validateMax(selections.length)) return;
    setSelections([...selections, el]);
    onSelectionChange(el);
  };

  const handleSelection = (el) => {
    if (isSelected(el)) deselect(el);
    else select(el);
  };

  const clearSelections = () => {
    setSelections([]);
  };

  return {
    selections,
    isSelected,
    handleSelection,
    clearSelections,
  };
};

export default useSelection;
