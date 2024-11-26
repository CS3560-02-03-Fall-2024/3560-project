import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface InputProps {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
}
export default function Input({ label, onChange, type = "text" }: InputProps) {
  return (
    <div className="flex flex-col gap-x-[5px]">
      <p>{label}</p>
      <input
        type={type}
        className="p-2 rounded-lg border-[1px] w-full border-black"
        onChange={onChange}
      />
    </div>
  );
}
