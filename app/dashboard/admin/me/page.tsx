"use client";
import { getProfileData } from "@/api-service/me.service";
import Profile from "@/app/ui/dashboard/me/Profile";
import { MeTypes } from "@/types/me.types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Me = () => {
  const [profile, setProfile] = useState<Array<MeTypes>>([]);
  useEffect(() => {
    receivePRofileData();
  }, []);
  const receivePRofileData = async () => {
    const response = await getProfileData();
    console.log(response);
    setProfile([response?.data?.data]);
  };
  return (
    <div>
      <Profile profile={profile[0]}/>
    </div>
  );
};

export default Me;
