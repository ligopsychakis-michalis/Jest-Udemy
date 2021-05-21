import { render } from "../../../test-utils/testing-library-utils";
import { findAllByAltText, screen, waitFor } from "@testing-library/react";
import OrderConfirmation from "../OrderConfirmation";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handle errors for scoops and toppings routes", async () => {
    server.resetHandlers(
      rest.post("http:/localhost:3030/order", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderConfirmation />)

    await screen.findByText(/an unexpected error occured/i, { exact: false });
});    