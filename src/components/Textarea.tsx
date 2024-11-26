import { ChangeEventHandler } from "react";

interface InputProps {
  label: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}
export default function Textarea({ label, onChange }: InputProps) {
  return (
    <div className="flex flex-col gap-x-[5px]">
      <p>{label}</p>
      <textarea
        className="p-2 rounded-lg border-[1px] w-auto border-black"
        onChange={onChange}
      />
    </div>
  );
}
