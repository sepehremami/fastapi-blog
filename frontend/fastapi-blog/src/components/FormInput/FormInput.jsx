import React from 'react';

function FormInput({label, name, error, value, onChange, type = "text"}) {
  return <div className="gap-10">
            <label className="mr-10" htmlFor={name}>{label}</label>
            <input
                type={type} 
                name={name}
                value={value} 
                onChange={onChange}
                className={`${!error ? "mb-6 border-teal-500 " : "border-red-500 "}`}
            />
            {error && <span className='' >{error}</span>}
        </div>
}

export default FormInput;
