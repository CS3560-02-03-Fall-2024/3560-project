import { ChangeEventHandler } from "react";

interface SelectProps {
  placeholder: string;
  label: string;
  options: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function Select({
  placeholder,
  label,
  options,
  onChange,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-y-[5px]">
      <p> {label}</p>
      <select
        onChange={onChange}
        className="bg-transparent rounded-lg border-[1px] border-black p-3 w-fit"
      >
        <option disabled>{placeholder}</option>
        {options.map((option, idx) => {
          return (
            <option key={idx} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
