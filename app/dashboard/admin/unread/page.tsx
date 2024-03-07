"use client"
import { getUsersBulk } from '@/api-service/bulk.service';
import { getUserGuides } from '@/api-service/users.service';
import { IEmployee } from '@/types/employee.types';
import React, { useEffect, useState } from 'react'
type UserGuidesType = {
    _id: string;
    completed: boolean;
    guide_id: string;
    user_id: string;
  }
const page = () => {
    const [userGuides, setUserGuides] = useState<Array<UserGuidesType>>([]);
    const [users, setUsers] = useState<IEmployee[]>([]);
    useEffect(()=> {
        receiveUserGuides()
        receiveUsers()
    },[])
    const receiveUsers = async () => {
        const response = await getUsersBulk();
        setUsers(response?.data?.data);
      };
    const receiveUserGuides = async () => {
        const response = await getUserGuides();
        setUserGuides(response?.data?.data);
        console.log(response);
      };
  return (
    <div className="w-[100%] flex p-[20px] flex-col items-center">
        <h1 className='text-[34px] font-[500]'>O'qimaganlar ro'yxati</h1>
        <table className="w-[100%] border w-[800px]">
          <thead className="border">
            <tr className="border-[2px] p-[10px]">
              <th className="border-[2px] p-[10px]">Firstname</th>
              <th className="border-[2px] p-[10px]">Lastname</th>
              <th className="border-[2px] p-[10px]">Username</th>
              <th className="border-[2px] p-[10px]">Role</th>
              <th className="border-[2px] p-[10px]">Age</th>
            </tr>
          </thead>
          <tbody className="border-[2px] p-[10px]">
            {userGuides
              ?.filter((it) => it.completed == false)
              ?.map((item) =>
                users
                  ?.filter((element) => element?._id === item?.user_id)
                  ?.map((el, index) => {
                    return (
                      <tr key={index} className="border-[2px] p-[10px] p-[10px]">
                        <td className="border-[2px] p-[10px]">{el?.first_name}</td>
                        <td className="border-[2px] p-[10px]">{el?.last_name}</td>
                        <td className="border-[2px] p-[10px]">{el?.username}</td>
                        <td className="border-[2px] p-[10px]">{el?.role}</td>
                        <td className="border-[2px] p-[10px]">{el?.age}</td>
                      </tr>
                    );
                  })
              )}
          </tbody>
        </table>
      </div>
  )
}

export default page
