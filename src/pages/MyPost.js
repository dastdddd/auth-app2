import React from "react";
import { postApi } from "./../services/post-api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MyPost = () => {
  const {
    data,
    isLoading: postLoading,
    isError: postError,
  } = postApi.useGetAllPostsMeQuery("");

  const { user } = useSelector((state) => state.auth);
  //data: postData - дали другой имя чтобы не  дал конфилт с другой data

  if (postLoading) {
    return <h1>Loading</h1>;
  }

  //if (postError) {
  //  return <h1>Error</h1>;
  //}

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        className="block-flex"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {
          user !== null
            ? data?.map((item) => (
                <Card sx={{ width: 445 }}>
                  <Link to={`/${item._id}`}>
                    {/* _id - Бэкендте ушундай жазылган */}
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="400"
                      image={`http://213.171.5.191:3002/${item.imgUrl}`}
                    />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: "2px" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      <VisibilityIcon /> {item.views}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            : <div>
              <h1>Ой ой ты не авторизован</h1>
            </div>
          //p: ostData.posts? - Эгер дата барболгон болсо анда map кыл
        }
      </div>
    </div>
  );
};

export default MyPost;
