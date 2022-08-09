import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  useSearchParams,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import Message from "../components/Message";
import { addItems, addToCart, cartRemoveItem } from "../slices/cartSlice";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  FormSelect,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";

function CartScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty"));
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [id, qty]);
  const removeFormHandler = (id) => {
    dispatch(cartRemoveItem(id));
  };
  const checkoutHandler = () => {
    navigate({ pathname: `/shipping` });
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <message>
            Your cart is empty <Link to="/">Go Back</Link>
          </message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`http://localhost:5000/api/products/${item.product}`}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}> ${item.price}</Col>
                  <Col md={2}>
                    <FormSelect
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormSelect>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        removeFormHandler(item.product);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroupItem>
            <h2>
              Subttotal (
              {cartItems.reduce((acc, item) => Number(acc + item.qty), 0)})
              items
            </h2>
            $
            {cartItems
              .reduce((acc, item) => Number(acc + item.qty * item.price), 0)
              .toFixed(2)}
          </ListGroupItem>
          <ListGroupItem>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to checkout
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  );
}

export default CartScreen;
