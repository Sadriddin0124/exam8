import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createUser, updateUser, uploadImage } from "@/api-service/users.service";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Image from "next/image";
import { IEmployee } from "@/types/employee.types";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};


const AddEmployeeModal = ({
  open,
  toggle,
  editItem,
  avatarLink,
  setAvatarLink
}: {
  open: boolean;
  toggle: () => void;
  editItem: IEmployee,
  avatarLink: string,
  setAvatarLink: React.Dispatch<React.SetStateAction<string>>
}) => {
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
  const uploadFile = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const formData = new FormData
    formData.append("file", file as Blob)
    const response = await uploadImage(formData)
    setAvatarLink(response?.data?.path)
  }
  const handleSubmit = async(formData: FormData) => {
    const payload = {
      first_name: (formData.get("first_name") as string) ? (formData.get("first_name") as string) : editItem?.first_name,
      last_name: (formData.get("last_name") as string) ? (formData.get("last_name") as string) : editItem?.last_name,
      username: (formData.get("username") as string) ? (formData.get("username") as string) : editItem?.username,
      password: (formData.get("password") as string) ? (formData.get("password") as string) : editItem?.password,
      description: (formData.get("description") as string) ? (formData.get("description") as string) : editItem?.description,
      role: (formData.get("role") as string) ? (formData.get("role") as string) : editItem?.role,
      age: Number(formData.get("age")) ? Number(formData.get("age")) : editItem?.age,
      avatar: avatarLink ? avatarLink : editItem?.avatar
    }
    if (editItem?.first_name !== "") {
      const response = await updateUser({_id: editItem?._id,...payload})
      if (response?.status === 200) {
        window.location.reload()
      }
    }else {
      const response = await createUser({...payload})
      if (response?.status === 201) {
        window.location.reload()
      }
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image src={avatarLink ? `http://localhost:8080/${avatarLink}` : "/upload.jpg"} className="m-auto" width={100} height={100} alt="upload"/>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            className="w-[100%]"
          >
            Upload avatar
            <VisuallyHiddenInput type="file" onChange={uploadFile} />
          </Button>
          <form action={handleSubmit} className="flex flex-col gap-[10px] mt-[10px]">
            <Input defaultValue={editItem?.first_name} className="w-[100%] px-[10px]" name="first_name" placeholder="first_name"/>
            <Input defaultValue={editItem?.last_name} className="w-[100%] px-[10px]" name="last_name" placeholder="last_name"/>
            <Input defaultValue={editItem?.username} className="w-[100%] px-[10px]" name="username" placeholder="username"/>
            <Input defaultValue={editItem?.password} className="w-[100%] px-[10px]" name="password" placeholder="password"/>
            <Input defaultValue={editItem?.age} type="number" className="w-[100%] px-[10px]" name="age" placeholder="age"/>
            <select defaultValue={editItem?.role} name="role" className="p-[10px] outline-none border-[2px] rounded-md">
              <option value="employee">employee</option>
              <option value="admin">admin</option>
            </select>
            <Textarea defaultValue={editItem?.description} name="description" className="w-[100%] resize-none" aria-label="minimum height" minRows={3} placeholder="description" />
            <Button variant="outlined" type="submit">Save</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddEmployeeModal;
