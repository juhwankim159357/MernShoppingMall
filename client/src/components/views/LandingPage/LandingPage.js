import React, { useEffect,useState}from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Icon, Col, Card, Row, Carousel } from "antd"
import Meta from "antd/lib/card/Meta"
import ImageSlider from "../../Utils/ImageSlider"

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
const [PostSize, setPostSize] = useState()
  useEffect(() => {

      let body = {
        skip: Skip,
        limit: Limit
      }

      getProduct(body);

  }, []);

  const getProduct = (body) => {
    axios.post("/api/product/products", body).then((res) => {
      if (res.data.success) {
        if(body.loadMore) {
            setProducts([...Products, ...res.data.productInfo])
        }
        else {
        setProducts(res.data.productInfo)
        }
        setPostSize(res.data.postSize)
      } else {
        alert("fail to get products from DB");
      }
    });
  }

  const moreHandeler = () => {
    let skip = Skip + Limit
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true
    }
    getProduct(body);
    setSkip(skip);
  }

  const renderCards = Products.map((product, index) => {
      console.log(product)
        return <Col lg={6} md={8} xs={24} key={index}>        
        <Card
            /**/
            cover={<ImageSlider  images={product.images}/>}
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
      {PostSize >= Limit &&
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <button onClick={moreHandeler}>more</button>
      </div>
      }
    </div>
  );
}

export default LandingPage;
