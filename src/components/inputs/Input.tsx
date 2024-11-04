import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  errors: FieldErrors;
  success?: boolean;
  small?: boolean;
  standard?: boolean;
  large?: boolean;
  placeholder?: string;
  full?: boolean;
  background?: boolean;
  redRequired?: boolean;
  value?: string;
  register: UseFormRegister<FieldValues>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled = false,
  formatPrice = false,
  required = false,
  errors,
  success = false,
  small = false,
  standard = false,
  large = false,
  placeholder = '',
  full = false,
  background = false,
  redRequired,
  value,
  register,
  onChange
}) => {
  const getHeightClass = () => {
    if (small) return 'h-10';
    if (standard) return 'h-12';
    if (large) return 'h-14';
    return 'h-8';
  };

  const getBodyClass = () => {
    if (small || standard || large) return 'body-1b';
    return 'body-2b';
  };

  const formatValue = (value: string) => {
    if (formatPrice) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(Number(value));
    }
    return value;
  };

  const error = errors[id]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`${getBodyClass()}
          ${error ? 'text-[#F04438]' : 'text-gray-50'}
          ${background ? 'gray-700' : 'light-50'}
          mb-1
          `}
      >
        {label}
        {
          redRequired && (
            <span className='body-1b text-[#F04438]'>*</span>
          )
        }
      </label>
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        value={value}
        {...register(id, { 
          required,
          pattern: type === 'email' ? {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter a valid email address (English letters only)',
          } : undefined
        })}
        className={`px-3 body-2r bg-transparent border rounded outline-none transition disabled:opacity-70
                    disabled:cursor-not-allowed 
                    ${getHeightClass()}
                    ${full ? 'w-[320px]' : 'w-full'}
                    ${background ? 'bg-white' : 'bg-transparent'}
                    ${background ? 'gray-900' : 'text-white'}
                    ${success ? 'border-[#12B76A]' : 'border-[#9fa0a1]'}
                    ${error ? 'focus:border-[#F04438]' : 'focus:border-white'}`}
        onChange={(e) => {
          e.target.value = formatValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
      />
      {error && (
        <span className="text-[#F04438] text-sm mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
