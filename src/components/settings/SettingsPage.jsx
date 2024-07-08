import React, { useRef, useState } from "react";
import NavTopMobile from "../../utils/NavTopMobile";
import { useNavigate } from "react-router-dom";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import { BiCalculator, BiCheckShield } from "react-icons/bi";
import useTheme from "../../hooks/useTheme";
import LogOutModal from "./comps/LogOutModal";

const SettingsPage = () => {
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const modalRef = useRef();

  const menuSettings = [
    { name: "Edit profile", icon: true, path: "/accounts/edit" },
    { name: "Personale account", icon: true },
    { name: "Switch appearance", icon: false },
    { name: "Language", icon: false },
    { name: "Notifications", icon: true },
    { name: "Log Out", icon: true },
  ];

  const title = <p className=" font-semibold">Settings</p>;
  const nav = useNavigate();
  return (
    <div className=" relative">
      <NavTopMobile
        left={
          <CgChevronLeft
            className=" cursor-pointer"
            onClick={() => {
              nav(-1);
            }}
          />
        }
        cenetr1={title}
      />
      {/* Card panel */}
      <div className=" p-5 flex flex-col gap-3 bg-bgk_account_light dark:bg-bgk_account_dark border-b dark:border-btn_dark border-btn_light">
        <p className=" font-semibold text-[1.1rem]">LOGO</p>
        <p className=" font-semibold text-[1.1rem]">Accounts Center</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius itaque
          rerum ?
        </p>
        <div>
          <div className=" flex items-center gap-3">
            <FiUser />
            <p>Personale details</p>
          </div>
          <div className=" flex items-center gap-3">
            <BiCheckShield />
            <p>Password and security</p>
          </div>
          <div className=" flex items-center gap-3">
            <BiCalculator />
            <p>Ad preferences</p>
          </div>
        </div>
        <p className=" text-btn_follow font-semibold">
          See more in Accounts Center
        </p>
        <p className=" text-txt_all_small font-semibold pt-5">ACCOUNTS</p>
      </div>
      {/*  Render navigation options */}
      {menuSettings?.map((item, i) => (
        <div
          onClick={() => {
            item?.path ? nav(item?.path) : null;
            item?.name === "Log Out" ? setOpen(true) : null;
          }}
          className=" flex items-center justify-between p-3 border-b dark:border-btn_dark border-btn_light w-full"
          key={i}
        >
          {item?.name === "Switch appearance" && (
            <button className=" w-full text-left" onClick={toggleTheme}>
              <p className=" w-full">{item.name}</p>
            </button>
          )}
          {item?.name !== "Switch appearance" && (
            <p className={`${item?.name === "Log Out" && "text-red-500"}`}>
              {item.name}
            </p>
          )}
          {item.icon && <CgChevronRight className=" text-txt_all_small" />}
        </div>
      ))}

      {open && <LogOutModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default SettingsPage;
