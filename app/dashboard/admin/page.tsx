"use client";
import { getUsers } from "@/api-service/users.service";
import AddEmployeeModal from "@/app/ui/dashboard/admin/users/AddUserModal";
import DeleteEmployeeModal from "@/app/ui/dashboard/admin/users/DeleteUserModal";
import EmployeeCard from "@/app/ui/dashboard/admin/users/UserCard";
import Pagination from "@/app/ui/pagination/pagination";
import Search from "@/app/ui/search/Search";
import { IEmployee } from "@/types/employee.types";
import { Button, Input } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
const edit_obj = {
  _id: "",
  avatar: "",
  description: "",
  first_name: "",
  last_name: "",
  password: "",
  role: "",
  username: "",
  age: "",
};
const Employee = ({ searchParams }: { searchParams: { page: string } }) => {
  const page = Number(searchParams?.page) || 1;
  const [employees, setEmployees] = useState<Array<IEmployee>>([]);
  const [employeeModal, setEmployeeModal] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<IEmployee>(edit_obj);
  const [avatarLink, setAvatarLink] = React.useState<string>("");
  const [deleteItem, setDeleteItem] = useState<IEmployee>(edit_obj);
  const [deleteEmployeeModal, setDeleteEmployeeModal] =
    useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [count, setCount] = useState(4)
  useEffect(() => {
    receiveUsers(query, page);
  }, []);
  const [ITEM_PER_PAGE, setITEM_PER_PAGE] = useState<number>(4);
  const receiveUsers = async (query: string, page: number) => {
    const response = await getUsers(query, page, ITEM_PER_PAGE);
    setCount(response?.data?.pageInfo?.total);
    setEmployees(response?.data?.data);
  };
  const toggle = () => {
    setEmployeeModal(false);
    setEditItem(edit_obj);
    setAvatarLink("");
    setDeleteEmployeeModal(false);
    setDeleteItem(edit_obj);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setQuery(search);
    setITEM_PER_PAGE(count);
    receiveUsers(search, page);
    if (search === "") {
      window.location.reload()
    }
  };

  return (
    <div className="w-[100%] flex flex-col px-[20px] gap-[20px]">
      <AddEmployeeModal
        open={employeeModal}
        toggle={toggle}
        editItem={editItem}
        setAvatarLink={setAvatarLink}
        avatarLink={avatarLink}
      />
      <DeleteEmployeeModal
        open={deleteEmployeeModal}
        toggle={toggle}
        deleteItem={deleteItem}
      />
      <div className="w-[100%] flex gap-[20px] items-center">
        <Button
          onClick={() => setEmployeeModal(true)}
          variant="contained"
          className="w-[200px] bg-purple-600"
        >
          Add new user
        </Button>
        <input placeholder="Searching for users" className="w-[300px] py-[8px] border px-[15px] rounded-md outline-none" onChange={handleSearch} />
        <div className="w-[200px]">
          <Pagination count={count} pageNum={page}/>
        </div>
      </div>
      <div className="w-[100%] flex flex-wrap gap-[20px]">
        {employees?.map((item, index) => {
          return (
            <div key={index}>
              <EmployeeCard
                item={item}
                setEmployeeModal={setEmployeeModal}
                setEditItem={setEditItem}
                setAvatarLink={setAvatarLink}
                setDeleteItem={setDeleteItem}
                setDeleteEmployeeModal={setDeleteEmployeeModal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Employee;
