import { render as testingLibraryRender } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

export const render = (ui, options) =>
  testingLibraryRender(ui, { wrapper: OrderDetailsProvider, ...options });
