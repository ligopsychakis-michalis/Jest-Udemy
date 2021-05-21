import React from "react";
import Options from "../entry/Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Button from "react-bootstrap/Button";

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  const disabled = orderDetails.totals.scoops === "$0.00" ? true : false;

  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        disabled={disabled}
        onClick={() => setOrderPhase("review")}
        variant="primary"
      >
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
