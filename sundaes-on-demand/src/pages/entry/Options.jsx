import React, { useEffect, useState } from "react";
import ScoopOption from "../entry/ScoopOption";
import ToppingOption from "../entry/ToppingOption";
import Row from "react-bootstrap/Row";
import AlertBanner from "../../pages/common/AlertBanner";
import { pricePerItem } from "../../constants/index";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    fetch(`http://localhost:3030/${optionType}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>
        {items.length > 0 ? (
          items.map((item) => (
            <ItemComponent
              key={item.name}
              name={item.name}
              imagePath={item.imagePath}
              updateItemCount={(itemName, newItemCount) =>
                updateItemCount(itemName, newItemCount, optionType)
              }
            />
          ))
        ) : (
          <></>
        )}
      </Row>
    </>
  );
};

export default Options;
