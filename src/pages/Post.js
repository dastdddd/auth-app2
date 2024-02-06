import React from "react";
import { useParams, useNavigate } from "react-router-dom"; //List.jsтен route параметрин алат <Link to={`/${item._id}`}>
import { postApi } from "../services/post-api";
import { useSelector } from "react-redux";

const Post = () => {
  const params = useParams(); //useParams - обьект берет
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = postApi.useGetPostQuery(params.id); //params.id - тутуп туруп кайра бертат анткени Link to жонотконбуз
  const [removePost] = postApi.useRemovePostMutation();

  if (isLoading) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
    );
  }

  if (isError) {
    return <h1 style={{ textAlign: "center", marginTop: "50px" }}>Error</h1>;
  }

  const removeData = async () => {
    try {
      await removePost(params.id).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <img
        width={500}
        height={400}
        style={{ objectFit: "cover" }}
        src={`http://213.171.5.191:3002/${data?.imgUrl}`}
      />
      {user?._id === data?.author && (
        <button onClick={removeData}>DELETE</button>
      )}
      {/* user дин _id и пользовательдин постун автору бири бирине барабар же окшош болсо анан button чык*/}
      {/* data.author тоже _id === user._id -> _id */}
    </div>
  );
};

export default Post;
