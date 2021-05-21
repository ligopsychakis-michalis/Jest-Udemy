import { render } from "../../../test-utils/testing-library-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altTexts = scoopImages.map((image) => image.alt);
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altTexts = toppingImages.map((topping) => topping.alt);
  expect(altTexts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fuge topping",
  ]);
});

test.only("scoop options turn to red when invalid input", async () => {
  render(<Options optionType="scoops" />);

  // give an invalid input and check that has 'is-invalid' class
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '-3');
  expect(chocolateInput).toHaveClass('is-invalid')

  // give a valid input and check that don't has 'is-invalid' class
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(chocolateInput).not.toHaveClass('is-invalid')
});
