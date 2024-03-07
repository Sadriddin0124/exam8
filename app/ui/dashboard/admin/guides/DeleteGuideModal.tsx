import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from '@mui/icons-material/Delete';
import { IGuides } from "@/types/guide.types";
import { deleteGuide } from "@/api-service/guides.service";
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

const DeleteGuideModal = ({
  open,
  toggle,
  deleteItem
}: {
  open: boolean;
  toggle: () => void;
  deleteItem: IGuides
}) => {
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
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
            color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
            background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
            border: 1px solid ${
              theme.palette.mode === "dark" ? grey[700] : grey[200]
            };
            box-shadow: 0px 2px 2px ${
              theme.palette.mode === "dark" ? grey[900] : grey[50]
            };
        
            &:hover {
              border-color: ${blue[400]};
            }
        
            &:focus {
              border-color: ${blue[400]};
              box-shadow: 0 0 0 3px ${
                theme.palette.mode === "dark" ? blue[600] : blue[200]
              };
            }
        
            // firefox
            &:focus-visible {
              outline: 0;
            }
          `
  );
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async() => {
    setLoading(true)
    const response = await deleteGuide(deleteItem?._id)
    if (response?.status === 200) {
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }
  };
  return (
    <Modal
      open={open}
      onClose={toggle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} >
        <div className="w-[100%] flex flex-col items-center gap-[20px]">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure, you want to delete <span className="text-[red]">{deleteItem?.title}</span> ?
        </Typography>
        <DeleteIcon className="text-[140px] text-[red] border-[3px] border-[red] rounded-full p-[10px]"/>
        <div className="w-[100%] flex justify-center gap-[10px]">
          <Button variant="contained" className=" bg-blue-400">
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            color="error"
            loading={loading}
            onClick={handleSubmit}
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="outlined"
          >
            <span>delete</span>
          </LoadingButton>
        </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteGuideModal;
