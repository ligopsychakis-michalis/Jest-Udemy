import { useState } from "react";
import "./App.css";

export function replaceCamelWithSpaces(colorName) {
  let name = colorName.replace(/\B([A-Z])\B/g, " $1");
  name = name[0].toUpperCase() + name.substr(1, name.length);
  return name;
}

function App() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("mediumVioletRed");
  const newButtonColor =
    buttonColor === "mediumVioletRed" ? "midnightBlue" : "mediumVioletRed";

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        textAlign: "center",
        paddingTop: "50px",
        backgroundColor: "#00aadd",
      }}
    >
      <button
        disabled={isDisabled}
        onClick={() => setButtonColor(newButtonColor)}
        style={{
          backgroundColor: isDisabled ? "gray" : buttonColor,
          fontSize: "2em",
          color: "white",
        }}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>
      <br />
      <br />
      <input
        id="disable-button"
        style={{ width: "50px", height: "50px" }}
        type="checkbox"
        onClick={(e) => setIsDisabled(e.target.checked)}
      />
      <br />
      <label
        style={{ fontWeight: "bold", fontSize: "1.2em" }}
        htmlFor={"disable-button"}
      >
        Disable button
      </label>
    </div>
  );
}

export default App;
