interface ButtonProps {
  label: string;
  onClick?: () => void;
}
export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button className="px-5 py-[10.5px] bg-primary text-white rounded-xl" onClick={onClick}>
      {label}
    </button>
  );
}
