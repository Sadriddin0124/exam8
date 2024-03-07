"use client";
import { getUsers } from "@/api-service/users.service";
import React, { Dispatch, SetStateAction } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IEmployee } from "@/types/employee.types";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from '@mui/icons-material/BorderColor';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EmployeeCard = ({
  item,
  setEditItem,
  setEmployeeModal,
  setAvatarLink,
  setDeleteEmployeeModal,
  setDeleteItem,
}: {
  item: IEmployee;
  setEmployeeModal: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<IEmployee>>;
  setAvatarLink: Dispatch<SetStateAction<string>>;
  setDeleteEmployeeModal: Dispatch<SetStateAction<boolean>>;
  setDeleteItem: Dispatch<SetStateAction<IEmployee>>;
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const editEmployee = () => {
    setEmployeeModal(true);
    setEditItem(item);
    setAvatarLink(item?.avatar);
  };
  const removeEmployee = () => {
    setDeleteEmployeeModal(true);
    setDeleteItem(item);
  };
  return (
    <Card sx={{ width: 350 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item?.first_name?.slice(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${item?.first_name} ${item?.last_name}`}
        subheader={`Age: ${item?.age}`}
      />
      <CardMedia
        component="img"
        height="150"
        image={
          `http://localhost:8080/${item?.avatar}` || "/upload.jpg"
        }
        alt={item?.first_name}
        className="h-[200px] object-fit-cover"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`role: ${item?.role}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`username: ${item?.username}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="h-[100px] overflow-y-auto">
          {item?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="flex gap-[20px] w-[100%] justify-end">
          <IconButton onClick={editEmployee} aria-label="delete" size="large">
            <BorderColorIcon fontSize="inherit" color="primary"/>
          </IconButton>
          <IconButton onClick={removeEmployee} aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" color="error"/>
          </IconButton>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default EmployeeCard;
