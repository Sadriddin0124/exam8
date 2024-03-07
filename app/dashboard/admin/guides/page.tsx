"use client";
import { getGuides } from "@/api-service/guides.service";
import { IGuides } from "@/types/guide.types";
import React, { ChangeEvent, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddGuideModal from "@/app/ui/dashboard/admin/guides/AddGuideModal";
import Loading from "@/helpers/loading/Loading";
import DeleteGuideModal from "@/app/ui/dashboard/admin/guides/DeleteGuideModal";
import Pagination from "@/app/ui/pagination/pagination";
import { Input } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from '@mui/icons-material/BorderColor';
const Guides = ({ searchParams }: { searchParams: { page: string } }) => {
  const page = Number(searchParams?.page) || 1;
  const edit_obj = { id: "", content: "", title: "" };
  const [guides, setGuides] = useState<Array<IGuides>>([]);
  const [openAddGuide, setOpenAddGuide] = React.useState(false);
  const [editItem, setEditItem] = useState<IGuides>(edit_obj);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteGuide, setDeleteGuide] = useState<IGuides>(edit_obj);
  const [openDeleteGuide, setOpenDeleteGuide] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    receiveGuides(query, page);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const [ITEM_PER_PAGE, setITEM_PER_PAGE] = useState<number>(4);
  const receiveGuides = async (query: string, page: number) => {
    const response = await getGuides(query, page, ITEM_PER_PAGE);
    setCount(response?.data?.pageInfo?.total);
    setGuides(response?.data?.data);
  };
  const toggle = () => {
    setOpenAddGuide(false);
    setOpenDeleteGuide(false);
    setEditItem(edit_obj);
    setDeleteGuide(edit_obj);
  };
  const editGuide = (item: IGuides) => {
    setOpenAddGuide(!openAddGuide);
    setEditItem(item);
  };
  const removeGuide = (item: IGuides) => {
    setDeleteGuide(item);
    setOpenDeleteGuide(!openDeleteGuide);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setQuery(search);
    receiveGuides(search, page);
    setITEM_PER_PAGE(count);
    if (search === "") {
      window.location.reload();
    }
  };
  const theme = useTheme();
  return (
    <div className="w-[100%] flex flex-col gap-[20px] pt-[20px] p-[20px]">
      <AddGuideModal open={openAddGuide} toggle={toggle} editItem={editItem} />
      <DeleteGuideModal
        open={openDeleteGuide}
        toggle={toggle}
        deleteItem={deleteGuide}
      />
      <div className="flex w-[100%] gap-[20px]">
        <button
          onClick={() => setOpenAddGuide(!openAddGuide)}
          className="py-[8px] bg-purple-600 rounded-md mx-[20px] text-white whitespace-nowrap px-[15px]"
        >
          Add new guide
        </button>
        <Input onChange={handleSearch} placeholder="Searching for guides" />
        <div className="w-[200px]">
          <Pagination count={count} pageNum={page} />
        </div>
      </div>
      <div
        className={
          loading === false
            ? "hidden"
            : " w-[100%] h-[100%] flex justify-center items-center"
        }
      >
        <Loading />
      </div>
      <div
        className={`w-[100%] flex flex-wrap justify-between gap-[10px] p-[20px] ${
          loading ? "hidden" : ""
        }`}
      >
        {guides?.map((item, index) => {
          return (
            <Card
              sx={{ display: "flex", flexDirection: "column", width: "350px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {item?.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => editGuide(item)}
                    aria-label="delete"
                    size="large"
                  >
                    <BorderColorIcon fontSize="inherit" color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => removeGuide(item)}
                    aria-label="delete"
                    size="large"
                  >
                    <DeleteIcon fontSize="inherit" color="error" />
                  </IconButton>
                </CardActions>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  className="h-[150px] overflow-y-auto"
                >
                  {item?.content}
                </Typography>
              </Box>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Guides;
