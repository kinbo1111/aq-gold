import React from "react";

interface SelectBoxProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value: string;
  label?: string;
  border?: boolean;
  detail?: boolean;
  standard?: boolean;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  onChange,
  value,
  label,
  border,
  detail,
  standard,
}) => {
  return (
    <div className="relative inline-block w-full">
      {label && (
        <label
          className={`block
        ${border ? "sub-2r" : "body-1b"}
        ${border ? "text-white" : "gray-700"}
        ${border ? "mb-3" : "mb-1"}
      `}
        >
          {label}
        </label>
      )}
      <div className={`relative
        ${detail ? "max-w-[355px]" : "max-w-[160px]"}
        ${standard ? "triangle" : "arrow"}
      `}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
          relative selectbox block w-full px-3 py-2 body-1r border border-[#9fa0a1] focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm rounded
            ${border ? "b-gray-600" : "bg-white"}
            ${border ? "light-50" : "gray-700"}
            ${standard ? "h-10" : "h-12"}
          `}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={
                `py-3 cursor-pointer
                ${standard? "b-gray-600" : "bg-white"}
                `}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectBox;
