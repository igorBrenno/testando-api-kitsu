import React, { useState } from "react";
import useDebouce from "./useDeBounce";

const SearchInput = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebouce(onChange, 500);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }
  return <input type="search" value={displayValue} onChange={handleChange} />;
};

export default SearchInput;
