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
import { Register } from "../slices/userRegisterSlice";
import FormContainer from "../components/FormContainer";

function RegisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const register = useSelector((state) => state.userRegister);
  const { status, loading, error } = register;
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/login";
  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("password do not match");
    } else {
      dispatch(Register({ name, email, password }));
    }
  };
  useEffect(() => {
    console.log(redirect);
    if (status) {
      navigate(redirect);
    }
  }, [navigate, status, redirect]);

  return (
    <FormContainer>
      <h1>
        Sign Up <i className="fa fa-upload" aria-hidden="true"></i>
      </h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl
            required
            type="name"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>email address</FormLabel>
          <FormControl
            required
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>password</FormLabel>
          <FormControl
            required
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="confirm Password">
          <FormLabel>Confirmpassword</FormLabel>
          <FormControl
            required
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button className="my-3" type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}></Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
