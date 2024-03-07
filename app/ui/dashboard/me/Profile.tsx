"use client";
import { MeTypes } from "@/types/me.types";
import { Button } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";

const Profile = ({ profile }: { profile: MeTypes }) => {
  const [openModal, setModal] = useState<boolean>(false);
  const [imgLink, setImgLink] = useState<string>("")
  const toggle = () => {
    setModal(false);
  };
  const editProfile = () => {
    setModal(true)
    setImgLink(profile?.avatar)
  }
  return (
    <div className="w-[100%] flex flex-col p-[50px] ">
      <EditProfileModal open={openModal} toggle={toggle} editItem={profile} imgLink={imgLink} setImgLink={setImgLink}/>
      <h1 className="text-[26px] my-[10px]">Personal Info:</h1>
      <div className="w-[100%] flex border-[2px] p-[40px] justify-center gap-[200px] flex-wrap relative">
        <div className="w-[300px] h-[300px]">
          <Image
            src={"/user.png"}
            alt="profile"
            width={300}
            height={300}
            className=" rounded-full w-[100%] h-[100%]"
          />
        </div>
        <div className="flex flex-col items-start ">
          <div className="flex gap-[10px] items-center">
            <h1 className="text-[20px]">First Name:</h1>
            <p>{profile?.first_name}</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <h1 className="text-[20px]">Last Name:</h1>
            <p>{profile?.last_name}</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <h1 className="text-[20px]">Username:</h1>
            <p>••••••••</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <h1 className="text-[20px]">Password:</h1>
            <p>••••••••</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <h1 className="text-[20px]">Age:</h1>
            <p>{profile?.age}</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <h1 className="text-[20px]">Role:</h1>
            <p>{profile?.role}</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <h1 className="text-[20px]">Total guides:</h1>
            <p>{profile?.total_guides}</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <h1 className="text-[20px]">Read guides:</h1>
            <p>{profile?.read_guides}</p>
          </div>
          <div className="flex gap-[10px] flex-col">
            <h1 className="text-[20px]">Description:</h1>
            <p>{profile?.description}</p>
          </div>
        </div>
        <div className="absolute right-[20px]">
          <Button onClick={editProfile} variant="contained" className="bg-blue-500">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
