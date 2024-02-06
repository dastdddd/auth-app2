import React from "react";
import { postApi } from "./../services/post-api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const List = () => {
  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
  } = postApi.useGetAllPostsQuery("");
  //data: postData - дали другой имя чтобы не  дал конфилт с другой data
  console.log(postData);
  if (postLoading) {
    return <h1>Loading</h1>;
  }

  if (postError) {
    return <h1>Error</h1>;
  }

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
          postData.posts?.map((item) => (
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
          //postData.posts? - Эгер дата барболгон болсо анда map кыл
        }
      </div>
    </div>
  );
};

export default List;
