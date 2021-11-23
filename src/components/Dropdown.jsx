import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const DropDown = ({ label, name, defaultValue = "", required, options }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const optionsSelect = [
    ["", "Seleccione una opción", true],
    ...Object.entries(options),
  ];
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  return (
    <label htmlFor={name} className="flex flex-col my-3 w-50">
      <span className="mb-2 text-xl font-semibold">{label}</span>
      <select
        required={required}
        name={name}
        className="input form-control form-select"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {optionsSelect.map((o) => {
          return (
            <option key={nanoid()} value={o[0]} disabled={o[2] ?? false}>
              {o[1]}
            </option>
          );
        })}
      </select>
      <div className="valid-feedback">Correcto!</div>
      <div className="invalid-feedback">
        Seleccione un Estado para el Usuario.
      </div>
    </label>
  );
};

export default DropDown;
