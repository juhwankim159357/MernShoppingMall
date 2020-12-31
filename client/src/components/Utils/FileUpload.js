import React from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";
import { useState } from "react";

function FileUpload() {
  const [Images, setImages] = useState([]);
  const dropHandeler = (files) => {
    let formData = new FormData();
    const config = { header: { "content-type": "multipart/form-data" } };
    formData.append("file", files[0]);
    axios.post("/api/product/image", formData, config).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setImages([...Images, res.data.filePath]);
      } else {
        alert("Fail to upload image");
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandeler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 300,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "300px",
          height: "300px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width:"300px", height:"100%"}}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
