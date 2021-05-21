import React, { useContext, useEffect, useMemo, useState } from "react";
import { pricePerItem } from "../constants/index";
import { formatCurrency } from "../utilities";
const OrderDetails = React.createContext();

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error("context must be used inside of the Provider");
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider({ children }) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoops = calculateSubtotal("scoops", optionCounts);
    const toppings = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoops + toppings;
    setTotals({
      scoops: formatCurrency(scoops),
      toppings: formatCurrency(toppings),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    }

    function resetOrder() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    }

    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return (
    <OrderDetails.Provider value={value}>{children}</OrderDetails.Provider>
  );
}
