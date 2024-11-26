import Button from "./Button";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between w-full">
      <p>Logo</p>
      <div className="flex flex-row gap-x-20 items-center">
        <NavbarItem href="/" text="Active Reports" />
        <NavbarItem href="/reports" text="Public Reports" />
        <Button label="Logout" />
      </div>
    </div>
  );
}
