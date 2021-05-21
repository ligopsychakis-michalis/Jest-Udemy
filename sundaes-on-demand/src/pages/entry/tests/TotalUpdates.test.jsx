import React from "react";
import { render } from "../../../test-utils/testing-library-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("scoop subtotal updates when needs", async () => {
  render(<Options optionType="scoops" />);

  // subtotal starts from $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // subtotal updates when vanilla increaces to 1 scoop
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  //subtotal updates when chocolate increaces to 2 scoops
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("topping subtotal updates when needs", async () => {
  render(<Options optionType="toppings" />);

  // subtotal starts from $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // subtotal updates when Cherries checked
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // subtotal updates when M&Ms checked
  const MmsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
  userEvent.click(MmsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // subtotal updates when Cherries unchecked
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test.skip("starts from 0.00", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("updates if scoops added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    // starts from 0.00
    expect(grandTotal).toHaveTextContent("0.00");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("updates if toppings added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const MmsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });

    userEvent.click(MmsCheckbox);
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");

    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("updates if item removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const MmsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });

    userEvent.click(MmsCheckbox);
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    userEvent.click(MmsCheckbox);

    expect(grandTotal).toHaveTextContent("4.00");
  });
});

test("no scoops subtotal updates for invalid scoop count", async () => {
  render(<Options optionType="scoops" />);

  // scoop subtotal starts from 0.00
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");

  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // scoop subtotal not updates when invalid input
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-3");
  expect(scoopSubtotal).toHaveTextContent("0.00");
});
