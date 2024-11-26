"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarItemProps {
  href: string;
  text: string;
}

export default function NavbarItem({ href, text }: NavbarItemProps) {
  const pathName = usePathname();

  return (
    <Link
      className={href !== pathName ? "text-primary" : "text-secondary underline"}
      href={href}
    >
      {text}
    </Link>
  );
}
