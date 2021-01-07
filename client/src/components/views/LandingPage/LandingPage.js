import React, { useEffect,useState}from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Icon, Col, Card, Row } from "antd"
import Meta from "antd/lib/card/Meta"


function LandingPage() {

    const [Products, setProducts] = useState([])

  useEffect(() => {
    axios.post("/api/product/products").then((res) => {
      if (res.data.success) {
        setProducts(res.data.productInfo)
      } else {
        alert("fail to get products from DB");
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
      console.log(product)
        return <Col lg={6} md={8} xs={24} key={index}>        
        <Card
            
            cover={<img sytle={{width: '100%', maxHeight: '150px' }}src={`http://localhost:5000/${product.images[0]}`} />}
        >
            <Meta
                title={product.title}
                description={`$${product.price}`}>
            </Meta>
        </Card>
        </Col>
  })

  
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>products <Icon type="rocket"></Icon></h2>
      </div>
        {/* fileter*/}


        {/* search */}


        {/* cards */}
        <Row gutter={[16,16]}>
        {renderCards}
        </Row>

      <div style={{ display: 'flex', justifyContent: "center" }}>
        <button>more</button>
      </div>
    </div>
  );
}

export default LandingPage;
