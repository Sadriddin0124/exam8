"use client";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import RuleIcon from "@mui/icons-material/Rule";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SegmentIcon from '@mui/icons-material/Segment';
import Image from "next/image";
type SideBar = {
  path: string;
  value: string;
  icon: ReactNode;
};
const Sidebar = ({ open, toggle }: { open: boolean; toggle: () => void }) => {
  const [sideBarList, setSidebarList] = useState<Array<SideBar>>([
    {
      path: "/dashboard/admin/me",
      value: "profile",
      icon: <AccountCircleIcon />,
    },
    { path: "/dashboard/admin", value: "users", icon: <PeopleAltIcon /> },
    { path: "/dashboard/admin/guides", value: "guides", icon: <SegmentIcon /> },
    { path: "/dashboard/admin/unread", value: "unread", icon: <RuleIcon /> },
    { path: "/dashboard/admin/bulk", value: "bulk", icon: <RuleIcon /> },
  ]);
  const [sideBarEmployeeList, setSidebarEmployeeList] = useState<
    Array<SideBar>
  >([
    {
      path: "/dashboard/employee/me",
      value: "Profile",
      icon: <AccountCircleIcon />,
    },
    { path: "/dashboard/employee", value: "Guides", icon: <RuleIcon /> },
  ]);
  const pathname = usePathname();
  return (
    <aside
      className={`shadow-lg bg-white w-[250px] min-h-[100vh]  fixed flex flex-col items-center relative py-[20px] transition-all top-0 z-10 ${
        open ? "left-[0]" : "left-[-100%]"
      }`}
    >
      <button className="right-[10px] absolute text-slate-500" onClick={toggle}>
        <CloseIcon />
      </button>
      <div className="w-[200px] h-[200px]">
        <Image
          src={"/logo.jpg"}
          alt="logo"
          width={200}
          height={200}
          className=" h-[100%] rounded-full object-cover border-[5px] border-[#9333EA]"
        />
      </div>
      <ul
        className={`w-[100%] py-[20px] flex-col gap-[10px] font-[500] ${
          pathname.split("/")[2] === "admin" ? "flex" : "hidden"
        }`}
      >
        {sideBarList?.map((item, index) => (
          <li
            key={index}
            className={`pe-[20px] rounded-e-md flex justify-between hover:text-white hover:bg-purple-600 transition-all items-center ${
              pathname === item.path ? "bg-purple-600 text-white" : "text-slate-500"
            }`}
          >
            <Link
              href={item.path}
              className="px-[20px] py-[8px] text-[22px] flex gap-[10px] items-center "
            >
              {item.icon}
              {item.value}
            </Link>
            {pathname === item?.path ? <DownloadDoneIcon /> : ""}
          </li>
        ))}
      </ul>
      <ul
        className={
          pathname.split("/")[2] === "employee"
            ? "w-[100%] py-[20px] flex flex-col gap-[10px] font-[500]"
            : "hidden"
        }
      >
        {sideBarEmployeeList?.map((item, index) => (
          <li
            key={index}
            className={`pe-[20px] flex justify-between items-center hover:text-white hover:bg-purple-600 transition-all ${
              pathname === item.path ? "bg-purple-600 text-white" : "text-black"
            }`}
          >
            <Link
              href={item.path}
              className="px-[20px] py-[8px] text-[24px] w-[100%] h-[100%] flex gap-[10px] items-center "
            >
              {item.icon}
              {item.value}
            </Link>
            {pathname === item?.path ? <DownloadDoneIcon /> : ""}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
