"use client";
import {
  getGuidesBulk,
  getUsersBulk,
  postBulk,
} from "@/api-service/bulk.service";
import { IEmployee } from "@/types/employee.types";
import { IGuides } from "@/types/guide.types";
import { Button } from "@mui/material";
import React, {
  useEffect,
  useState,
} from "react";
const Bulk = () => {
  const [guides, setGuides] = useState<IGuides[]>([]);
  const [users, setUsers] = useState<IEmployee[]>([]);
  const [guidesId, setGuidesId] = useState<string | undefined>("");
  useEffect(() => {
    receiveGuides();
    receiveUsers();
  }, []);
  const receiveGuides = async () => {
    const response = await getGuidesBulk();
    setGuides(response?.data?.data);
  };
  const receiveUsers = async () => {
    const response = await getUsersBulk();
    setUsers(response?.data?.data);
  };
  const index: number[] = [];
  for (let i = 0; i < users.length; i++) {
    index.push(i);
  }
  let value: any[] = [];
  const hanleSubmit = async (e: any) => {
    e.preventDefault();
    let result: any[] = [];
    let target = e.target;
    index.map((item) => {
      result.push(target[item]);
    });
    let filter = result?.filter((item) => item?.checked === true);
    for (let i = 0; i < filter.length; i++) {
      value.push(filter[i]?.value);
    }
    const response = await postBulk({ guide_id: guidesId, user_ids: value });
    console.log(response);
    if (response?.status === 201) {
      window.location.reload()
    }
    
  };
  const SaveUserID = (id: string | undefined) => {
    setGuidesId(id);
  };
  return (
    <div className="flex w-[100%] justify-center flex-col items-center">
      <div className="flex">
        <div className="w-[300px]">
        <h1 className="text-[30px]">Guides</h1>
          {guides?.map((item, index) => {
            return (
              <div key={index} className="flex gap-[10px]">
                <input
                  onChange={() => SaveUserID(item?._id)}
                  className="w-[20px] h-[20px]"
                  type="checkbox"
                  id={item?._id}
                />
                <label
                  htmlFor={item?._id}
                  className="text-[20px] cursor-pointer"
                >
                  {item?.title}
                </label>
              </div>
            );
          })}
        </div>
        <form onSubmit={hanleSubmit} className="w-[300px]">
          <h1 className="text-[30px]">Users</h1>
          {users?.map((item, index) => {
            return (
              <div key={index} className="flex gap-[10px]">
                <input
                  value={item?._id}
                  className="w-[20px] h-[20px]"
                  type="checkbox"
                  id={item?._id}
                />
                <label
                  htmlFor={item?._id}
                  className="text-[20px] cursor-pointer"
                >
                  {item?.first_name} {item?.last_name}
                </label>
              </div>
            );
          })}
          <Button type="submit" variant="outlined">Submit</Button>
        </form>
      </div>
      
    </div>
  );
};

export default Bulk;
