import { getGuides } from '@/api-service/guides.service';
import { getUsers } from '@/api-service/users.service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent } from 'react'

const Search = ({queryValue, pageValue}: {queryValue: string; pageValue: number}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams);
        params.set("q", e.target.value)
        replace(`${pathname}?${params}`)
        getGuides(queryValue, pageValue)
        getUsers(queryValue, pageValue)
    };
    
  return (
    <div>
      <input type="text"onChange={handleChange} name='search' placeholder={"sdf"} className='border-[2px] p-[20px] w-[100%]'/>
    </div>
  )
}

export default Search
