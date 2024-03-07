import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { Input } from '@mui/material';
import { MeTypes } from '@/types/me.types';
import { uploadImage } from '@/api-service/users.service';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { editProfileData } from '@/api-service/me.service';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditProfileModal({open, toggle, editItem, imgLink, setImgLink}: {open: boolean; toggle: ()=> void; editItem: MeTypes, imgLink: string; setImgLink: React.Dispatch<React.SetStateAction<string>>}) {
    
    const uploadFile = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        const formData = new FormData
        formData.append("file", file as Blob)
        const response = await uploadImage(formData)
        setImgLink(response?.data?.path)
      }
    const handleSubmit = async(formData: FormData) => {
        let payload = {
            description: formData?.get("description") as string,
            avatar: imgLink,
            first_name: editItem?.first_name,
            last_name: editItem?.last_name,
            username: editItem?.username,
            age: editItem?.age
        }
        const response = await editProfileData({...payload})
        // if (response?.status === 200) {
        //     window.location.reload()
        // };
        
    }
  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image src={imgLink ? `http://localhost:8080/${imgLink}` : "/upload.jpg"} className="m-auto" width={100} height={100} alt="upload"/>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            className="w-[100%] relative"
          >
            Upload avatar
            <input type="file" onChange={uploadFile} className='absolute opacity-0 cursor-pointer z-10'/>
          </Button>
          <form action={handleSubmit} className="flex flex-col gap-[10px] mt-[10px]">
            <textarea name='description'  rows={5} className='rounded-[10px] outline-none p-[10px]' defaultValue={editItem?.description}></textarea>
            <Button variant="outlined" type="submit">Save</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}