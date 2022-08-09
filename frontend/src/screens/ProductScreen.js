import React from "react";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { fetchProductDetails, setId } from "../slices/productDetailSlice";
import { productDetail } from "../slices/productDetailSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector(productDetail);
  const { id } = useParams();

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(setId(id));
    dispatch(fetchProductDetails());
  }, [dispatch, id]);

  const addtoCartHandler = () => {
    navigate({ pathname: `/cart/${id}`, search: `?qty=${qty}` });
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message varient="danger">
          <h3>error</h3>
        </Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={product.numReviews}
                  reviews
                ></Rating>
              </ListGroupItem>
              <ListGroup>Price: ${product.price}</ListGroup>
              <ListGroup>description: {product.description}</ListGroup>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormSelect
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormSelect>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <div className="d-grid gap-2">
                    <Button
                      onClick={addtoCartHandler}
                      variant="primary"
                      size="lg"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ProductScreen;
