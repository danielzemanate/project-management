import React from "react";

const Input = ({ label, name, defaultValue, type, required,disabled }) => {
  return (
    <label htmlFor={name} className="flex flex-col my-3 form-label">
      <span className="mb-2 text-xl font-semibold">{label}</span>
      <input
        data-testid="input-test"
        required={required}
        type={type}
        name={name}
        className="input px-3 form-control"
        defaultValue={defaultValue}
        disabled={disabled}
      />
      <div className="valid-feedback" data-testid="test-html-input">Correcto!</div>
      <div className="invalid-feedback">Introduzca un {name} valido.</div>
    </label>
  );
};

export default Input;
