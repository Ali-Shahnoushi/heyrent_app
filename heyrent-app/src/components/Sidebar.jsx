import React from "react";
import BrandLogo from "./BrandLogo";
import { FiHome, FiUsers, FiFolder, FiSettings } from "react-icons/fi";
import { BiCar } from "react-icons/bi";
import { MdOutlineDiscount } from "react-icons/md";
import StyledNavLink from "./StyledNavLink";

export default function Sidebar() {
  return (
    <aside className="bg-gray-0 py-[2.4rem] px-[1.8rem] border-l border-slate-700 row-start-1 row-end-[-1]">
      <BrandLogo />{" "}
      <nav className="mt-7">
        <ul className="flex flex-col gap-[0.75rem]">
          <li>
            <StyledNavLink to="/dashboard">
              <FiHome />
              <span>داشبورد</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/rents">
              <FiFolder />
              <span>اجاره‌ها</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/cars">
              <BiCar />
              <span>ماشین‌ها</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/users">
              <FiUsers />
              <span>کاربران</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/coupons">
              <MdOutlineDiscount />
              <span>تخفیف‌ها</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/settings">
              <FiSettings />
              <span>تنظیمات</span>
            </StyledNavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
