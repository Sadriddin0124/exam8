"use client"
import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const Pagination = ({ count, pageNum }: { count: number | undefined, pageNum: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams ? searchParams : "");
  const page = Number(params.get("page")) || 1
  const ITEM_PER_PAGE = 3
  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < Number(count)
  const handleChangePage =(type: string)=> {
    type === "prev" ? params.set("page", (page - 1).toString()) : params.set("page", (page + 1).toString())
    replace(`${pathname}?${params}`)
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }
  return (
    <div className="flex w-[100%] justify-evenly">
      <IconButton disabled={!hasPrev} onClick={()=>handleChangePage("prev")}>
        <ArrowBackIosIcon/>
      </IconButton>
      <h1 className="text-[26px]">{pageNum}</h1>
      <IconButton disabled={!hasNext} onClick={()=>handleChangePage("next")}>
        <ArrowForwardIosIcon/>
      </IconButton>
    </div>
  );
};

export default Pagination;
