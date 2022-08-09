import { Alert } from "react-bootstrap";
function Message({ varient, children }) {
  return <Alert varient={varient}>{children}</Alert>;
}
Message.defaultProps = {
  varient: "info",
};
export default Message;
