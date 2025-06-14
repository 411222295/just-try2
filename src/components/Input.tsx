import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
  multiline?: boolean;
  rows?: number;
  name?: string;
  required?: boolean;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  multiline = false,
  rows = 4,
  name,
  required = false,
  className = '',
  onKeyDown,
  disabled,
}) => {
  const inputClasses = 'w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D439B]/40 transition-all duration-300 text-gray-700 placeholder-gray-400';

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-[#5A73C5] mb-2 text-lg">
          {label}
        </label>
      )}
      
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          name={name}
          required={required}
          className={inputClasses}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          name={name}
          required={required}
          className={inputClasses}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default Input;