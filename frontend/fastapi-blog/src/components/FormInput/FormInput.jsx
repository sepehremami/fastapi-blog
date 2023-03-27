import React from 'react';

function FormInput({label, name, error, value, onChange, type = "text"}) {
  return <div className="mt-4">
            <label className="block text-gray-700 dark:text-slate-200" htmlFor={name}>{label}</label>
            <input
                type={type} 
                name={name}
                value={value} 
                onChange={onChange}
                className={`${!error ? "mb-6 border-teal-500 " : "border-red-500"} w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                          focus:bg-white focus:outline-none ` }
            />
            {error && <span className='' >{error}</span>}

  </div>
}

export default FormInput;
