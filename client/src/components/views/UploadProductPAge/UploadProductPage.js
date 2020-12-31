import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../Utils/FileUpload"

const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage() {
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
  const [image, setimage] = useState([]);

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

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Product</Title>
      </div>
      <Form>
        <FileUpload />
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
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button>submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
