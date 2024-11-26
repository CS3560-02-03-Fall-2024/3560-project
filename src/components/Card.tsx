import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="flex flex-col drop-shadow-md py-5 px-[27px] gap-y-[9.5px] border-off-grey border-[1px] rounded-xl">
      <h3 className="font-bold text-2xl">{title}</h3>
      {children}
    </div>
  );
}
