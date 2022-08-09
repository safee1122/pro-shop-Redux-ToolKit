import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import Loader from "./../components/Loader";
import { userLogin } from "../slices/userLoginSlice";
import FormContainer from "../components/FormContainer";

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useSelector((state) => state.user);
  const { userInfo, loading, error } = login;
  const redirect = searchParams.get("redirect")
    ? `/${searchParams.get("redirect")}`
    : "/";
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email">
          <FormLabel>email address</FormLabel>
          <FormControl
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>password</FormLabel>
          <FormControl
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button className="my-3" type="submit" variant="primary">
          Sign in
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            New Customer?
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
