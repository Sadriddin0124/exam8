"use client"
import { getEmployeeGuides } from '@/api-service/employee.service'
import MediaCard from '@/app/ui/dashboard/employee/employeeCard'
import { IEmployeeGuides } from '@/types/user.types'
import React, { useEffect, useState } from 'react'

const Employee = () => {
  const [guidesStatus, setGuidesStatus] = useState<IEmployeeGuides[]>([])
  useEffect(()=> {
    receiveEmployeeGuides()
  },[])
  const receiveEmployeeGuides = async() => {
    const response = await getEmployeeGuides()
    console.log(response);
    setGuidesStatus(response?.data?.data)
  }
 
  return (
    <div>
      {
        guidesStatus?.map((item,index)=> {
          return <div key={index}>
            <MediaCard guides={item}/>

          </div>
        })
      }
    </div>
  )
}

export default Employee
