"use client";
import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../sidebar/Sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [sideBarVisible, setSideBarVisible] = useState<boolean>(false);
  const pathname = usePathname();
  console.log(pathname.split("/")[2]);
  
  return (
    <div className="h-[64px] fixed w-[100%] z-50">
      <Box sx={{ position: "relative", zIndex: "56", height: "64px", width: "100%"}}>
      <AppBar position="static" className="bg-white">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            className="text-black"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setSideBarVisible(!sideBarVisible)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div className={pathname.split("/")[2] === "employee" ? "block text-black font-[500]" : "hidden" }>{pathname === "/dashboard/employee" ? "Guides" : "Profile"}</div>
            <div className={pathname.split("/")[2] === "admin" ? "block text-black font-[500]" : "hidden" }>{pathname === "/dashboard/admin" ? "Users":  pathname === "/dashboard/admin/guides" ? "Guides" : "Profile"}</div>
          </Typography>
          <Button variant="outlined">
            <Link href="/auth/login">Login</Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Sidebar open={sideBarVisible} toggle={()=>setSideBarVisible(false)}/>
    </Box>
    </div>
  );
}
