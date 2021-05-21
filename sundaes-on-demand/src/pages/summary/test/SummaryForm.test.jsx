import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("SummaryForm tests", () => {
  test("check that initial state of checkbox is not checked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    expect(checkbox).not.toBeChecked();
  });

  test("check that initial state of button is disabled", () => {
    render(<SummaryForm />);
    const button = screen.getByRole("button", { name: "Confirm order" });
    expect(button).toBeDisabled();
  });

  test("check that when checkbox is checked, the button is enabled and the opposite", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    const button = screen.getByRole("button", { name: "Confirm order" });

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    render(<SummaryForm />);

    // check that popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // check that popover appears on checkbox label's mouseover
    const checkbox = screen.getByText(/terms and conditions/i);
    userEvent.hover(checkbox);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // check that popover disappears on checkbox label's mouseout
    userEvent.unhover(checkbox);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
