import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from '../common/AlertBanner';

function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3030/order", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setOrderNumber(data.orderNumber))
      .catch((e) => setError(true));
  }, []);

  function handleClick() {
    resetOrder();
    setOrderPhase("inProgress");
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as par our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else if (error) {
    return <AlertBanner /> ;
  } else {
    return <div>Loading...</div> ;
  }
}

export default OrderConfirmation;
