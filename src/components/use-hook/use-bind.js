import { useState } from "react";

function useBind(initialValue) {
  const [value, setValue] = useState(initialValue || "");
  const onChange = e => {
    setValue(e.target.value);
  };
  return { value, onChange };
}

export default useBind;
