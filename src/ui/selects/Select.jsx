import React from 'react';

const Select = ({ placeholder, options = [], defaultValue = "", name, onChange, value }) => {
  return (
    <div className="select-div">
      <select
        onChange={onChange}
        className="select"
        name={name}
        id={name}
        defaultValue={defaultValue}
        value={value}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <img src="images/arrow-down.svg" className="select-icon" alt="select-icon" />
    </div>
  );
};

export default Select;
