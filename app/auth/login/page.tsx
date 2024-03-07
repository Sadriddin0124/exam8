"use client"
import React from "react";
import Input from "@mui/material/Input";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import { Login } from "@/api-service/auth-service";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter()
  const handleSubmit = async(formData: FormData) => {
    const payload = {
      username: (formData.get("username") as string),
      password: (formData.get("password") as string)
    }
    const response = await Login({...payload})
    console.log(response);
    if (response?.status === 200) {
      if (response?.data?.data?.role === "admin") {
        router.push("/dashboard/admin")
      }else {
        router.push("/dashboard/employee")

      }
    }
  }
  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <Card variant="outlined">
        <CardContent className="flex flex-col items-center">
          <h1 className="text-[32px] font-[500]">Login</h1>
          <form action={handleSubmit} className="flex flex-col p-[20px] gap-[20px]">
            <Input name="username" className="w-[300px]" placeholder="Username"/>
            <Input name="password" className="w-[300px]" placeholder="Password"/>
            <Button type="submit" variant="outlined">LOG IN</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
