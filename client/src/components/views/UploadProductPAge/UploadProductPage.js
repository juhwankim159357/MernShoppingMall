import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../Utils/FileUpload"
import Axios from "axios";

//test
const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage(props) {
  const continents = [
    { key: 1, value: "Afica" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" },
  ];

  const [titlename, settitlename] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [images, setimages] = useState([]);

  const titleChangeHandler = (e) => {
    settitlename(e.currentTarget.value);
  };

  const descChangeHandler = (e) => {
    setdesc(e.currentTarget.value);
  };

  const priceChangeHandler = (e) => {
    setprice(e.currentTarget.value);
  };

  const continentsChangeHandler = (e) => {
    setContinent(e.currentTarget.value);
  };
  const updateImages = (newImages) => {
    setimages(newImages)
    console.log(newImages)
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    if(!titlename || !desc || !price || !Continent || !images){
      return alert("fill all elements")
    }
    const body = {
      //logined User
      writer: props.user.userData._id,
      title: titlename,
      description: desc,
      price: price,
      images: images,
      continents: Continent,

    }

    Axios.post("/api/product", body)
    .then(res => {
      if(res.data.success){
        alert("product upload success")
        props.history.push('/')
      } else {
        alert("product upload fail")
      }
    })

  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Product</Title>
      </div>
      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages}/>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={titleChangeHandler} value={titlename} />
        <br />
        <br />
        <label>desc</label>
        <TextArea onChange={descChangeHandler} value={desc} />
        <br />
        <br />
        <label>price</label>
        <Input type="number" onChange={priceChangeHandler} value={price} />
        <br />
        <br />
        <select onChange={continentsChangeHandler} value={Continent}>
          {continents.map((item) => (
            <option key={item.key} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType="submit">submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
