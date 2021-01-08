import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row, Collapse } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../Utils/ImageSlider";
import {continents, price} from "../LandingPage/Sections/Datas";
import CheckBox from "../LandingPage/Sections/CheckBox";
import RadioBox from "../LandingPage/Sections/RadioBox"

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [Filters, setFilters] = useState([
    {
      continents: [],
      price: []
    }
  ])
  
  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProduct(body);
  }, []);

  const getProduct = (body) => {
    axios.post("/api/product/products", body).then((res) => {
      if (res.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...res.data.productInfo]);
        } else {
          setProducts(res.data.productInfo);
        }
        setPostSize(res.data.postSize);
      } else {
        alert("fail to get products from DB");
      }
    });
  };

  const moreHandeler = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getProduct(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    console.log(product);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          /**/
          cover={<ImageSlider images={product.images} />}
        >
          <Meta title={product.title} description={`$${product.price}`}></Meta>
        </Card>
      </Col>
    );
  });

  const filterResult = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters
     
    };
    getProduct(body)
    setSkip(0)
  }

  const handleFilter = (filters, category) => {
      const newFilters = {...Filters}
      newFilters[category] = filters

      if (category === "price") {
        let priceValue = handlePrice(filters)
        newFilters[category] = priceValue
      }
      
      filterResult(newFilters)
      setFilters(newFilters)
  }

  const handlePrice = (value) => {
    const data = price;
    let array = [];
    for (const key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array
        
      }
    }
    return array
  }

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          products <Icon type="rocket"></Icon>
        </h2>
      </div>
      {/* fileter*/}
      <Row gutter={[16,16]}>
        <Col lg={12} xs={24}>
        {/* CheckBox */}
        <CheckBox list={continents} handleFilter={filters => handleFilter(filters,"continents")}/>
        </Col>  
         <Col lg={12} xs={24}>
        {/* Radio Box */}
        <RadioBox list={price} handleFilter={filters=>handleFilter(filters,"price")}/>
        </Col>
        </Row>

      
      

      {/* search */}
      {/* cards */}
      <Row gutter={[16, 16]}>{renderCards}</Row>
      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={moreHandeler}>more</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
