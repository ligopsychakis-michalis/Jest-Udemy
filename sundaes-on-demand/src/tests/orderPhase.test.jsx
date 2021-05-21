import { findByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  // add ice cream scoops
  const chocolateScoops = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  const vanillaScoops = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(chocolateScoops);
  userEvent.clear(vanillaScoops);
  userEvent.type(chocolateScoops, "1");
  userEvent.type(vanillaScoops, "2");
  // add ice cream toppings
  const mmsTopping = await screen.findByRole("checkbox", { name: "M&Ms" });
  userEvent.click(mmsTopping);

  // find and click order button
  const orderButton = screen.getByRole("button", {
    name: "Order Sundae!",
  });
  userEvent.click(orderButton);

  // check summary information based on order
  await screen.findByText("Scoops: $6.00");
  await screen.findByText("1 Chocolate");
  await screen.findByText("2 Vanilla");
  await screen.findByText("Toppings: $1.50");
  await screen.findByText("M&Ms");
  await screen.findByText("Total: $7.50");

  // accept terms and conditions and click button to confirm order
  const acceptTerms = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  userEvent.click(acceptTerms);
  userEvent.click(confirmButton);

  // check that "Loading" appears until orderNumber arrives from the server
  screen.getByText("Loading", { exact: false });

  // confirm order number on confirmation page
  await screen.findByRole("heading", { name: /thank you/i });
  screen.getByText(/order number/i);

  // check that "Loading" disappears after orderNumber arrived from the server
  const loading = screen.queryByText("Loading", { exact: false });
  expect(loading).not.toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: "Create new order",
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // await items to appear on screen
  await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await screen.findByRole("checkbox", { name: "M&Ms" });
});

test("optional toppings on summary phase", async () => {
  render(<App />);

  // add ice cream scoops
  const chocolateScoops = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.type(chocolateScoops, "2");

  // click the order button
  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  userEvent.click(orderButton);

  // check toppings header not to be in the document
  await screen.findByText("Scoops", { exact: false });
  const toppingsHeader = screen.queryByText("Toppings", {
    exact: false,
  });
  expect(toppingsHeader).not.toBeInTheDocument();
});
