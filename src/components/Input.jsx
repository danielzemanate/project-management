import React from "react";

const Input = ({ label, name, defaultValue, type, required }) => {
  return (
    <label htmlFor={name} className="flex flex-col my-3 form-label">
      <span className="mb-2 text-xl font-semibold">{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        className="input px-3 form-control w-80"
        defaultValue={defaultValue}
      />
      <div className="valid-feedback">Correcto!</div>
      <div className="invalid-feedback">Introduzca un {name} valido.</div>
    </label>
  );
};

export default Input;
