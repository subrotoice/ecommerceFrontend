import { NavLink } from "react-router-dom";

export interface MenuItem {
  label: string;
  url: string;
}

const NavLinks = () => {
  const menuItems: MenuItem[] = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Career", url: "/career" },
  ];
  return (
    <>
      {menuItems.map((menuItem) => (
        <li key={menuItem.url}>
          <NavLink to={menuItem.url}>{menuItem.label}</NavLink>
        </li>
      ))}
    </>
  );
};

export default NavLinks;
