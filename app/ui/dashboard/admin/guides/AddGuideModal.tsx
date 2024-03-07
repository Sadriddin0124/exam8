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
import { postGuide, updateGuide } from "@/api-service/guides.service";
import { IGuides, IGuidesPayload } from "@/types/guide.types";

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

const AddGuideModal = ({
  open,
  toggle,
  editItem,
}: {
  open: boolean;
  toggle: () => void;
  editItem: IGuides;
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
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const payload: IGuidesPayload = {
      title: (formData.get("title") as string)
        ? (formData.get("title") as string)
        : editItem?.title,
      content: (formData.get("content") as string)
        ? (formData.get("content") as string)
        : (formData.get("content") as string),
      notify: true,
    };
    if (editItem?.title !== "") {
      const response = await updateGuide({ _id: editItem?._id, ...payload });
      if (response?.status == 200) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } else {
      const response = await postGuide({ ...payload });
      if (response?.status == 201) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };
  return (
    <Modal
      open={open}
      onClose={toggle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Guide
        </Typography>
        <form action={handleSubmit} className="flex flex-col gap-[20px]">
          <Input
            name="title"
            className="w-[100%] px-[15px] py-[8px]"
            placeholder="title"
            defaultValue={editItem?.title}
          />
          <Textarea
            aria-label="minimum height"
            name="content"
            minRows={5}
            className="w-[100%] px-[15px] py-[8px] resize-none"
            placeholder="content"
            defaultValue={editItem?.content}
          />
          <LoadingButton
            type="submit"
            color="primary"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            <span>Save</span>
          </LoadingButton>
        </form>
      </Box>
    </Modal>
  );
};
export default AddGuideModal;
