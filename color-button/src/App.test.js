import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("renders learn react link", () => {
  render(<App />);
});

test("button has correct initial color and initial text", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  expect(colorButton).toHaveStyle({ backgroundColor: "mediumVioletRed" });
});

test("button turns midnightBlue when clicked", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "midnightBlue" });
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  expect(checkbox).not.toBeChecked();
});

test("checkbox disables the button when is checked and enables the button when is not", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  // check that when checkbox is checked, button is desabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  // check that when checkbox is not checked, button is enabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("button turns to gray when is disabled", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  // check that when checkbox is checked, button is gray
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  // check that when checkbox unchecked again the button turns into it's previous style-state ( mediumVioletRed or midnightBlue )
  // check for mediumVioletRed
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "mediumVioletRed" });
  expect(colorButton).toHaveTextContent("Change to Midnight Blue");
  // check for midnightBlue
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "midnightBlue" });
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "midnightBlue" });
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
