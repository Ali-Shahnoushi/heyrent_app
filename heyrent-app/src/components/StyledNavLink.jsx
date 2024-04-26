import React from "react";
import { NavLink } from "react-router-dom";
import "./StyledNavLink.css";

export default function StyledNavLink({ children, to, isIcon = false }) {
  return (
    <NavLink
      to={to}
      className={`flex gap-[0.7rem] justify-start items-start ${
        isIcon ? "py-[0.4rem] px-[0.4rem] icon" : "py-[0.7rem] px-[1.4rem]"
      }  rounded-md transition-all duration-300 hover:bg-slate-700 hover:text-primary text-[1.2rem]`}
    >
      {children}
    </NavLink>
  );
}
