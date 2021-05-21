import { render } from "../../../test-utils/testing-library-utils";
import { screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handle errors for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http:/localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http:/localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test.skip("not a real test", () => {});

test("order button not to be enabled if no scoops entered", async () => {
  render(<OrderEntry />);

  // clear chocolate input
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  // check order button to be disabled
  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  expect(orderButton).toBeDisabled();

  // choose a chocolate scoop and check if order button is enabled
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "1");
  expect(orderButton).toBeEnabled();

  // clear the chocolate scoop and check if order button is disabled
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "0");
  expect(orderButton).toBeDisabled();
});
