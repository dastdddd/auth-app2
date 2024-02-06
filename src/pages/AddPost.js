import React from "react";
import { useState } from "react";
import { postApi } from "../services/post-api";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [createPost, { isError, isLoading }] = postApi.useCreatePostMutation();

  const handleClick = async () => {
    try {
      const formData = new FormData(); //FormData(отправить форм) - фото жоното турган команда
      formData.append("image", image); //append - добавить форм data(key, state)
      formData.append("text", text);
      formData.append("title", title);
      await createPost(formData).unwrap();
      navigate("/"); //успешный болсо шлавныйга чык
    } catch (error) {
      console.log(error);
    }
  };

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="addPost">
      <label className="add-file">
        Прикрепить файл
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          //файлды алыш учун
          hidden
        />
      </label>
      <div className="img">
        {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
        {/*image && - Сурот бар болсо чык болбосо чыкпа */}
      </div>
      <div className="texts">
        <label>
          Заголовок:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок"
          />
        </label>
        <label>
          Text
          <textarea
            name=""
            value={text}
            onChange={(e) => setText(e.target.value)}
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </label>
      </div>
      <button onClick={handleClick}>
        {isLoading ? "Загрузка..." : "Добавить"}
      </button>
    </form>
  );
};

export default AddPost;
