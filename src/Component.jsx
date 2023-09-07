import React, { useState } from "react";

function Component() {
  const [range, setRange] = useState(8); // Set a default length
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("Poor");

  const handleRangeChange = (e) => {
    const newValue = Math.min(Math.max(e.target.value, 6), 16); // Limit the range
    setRange(newValue);
    e.target.style.setProperty("--value", ((newValue - 6) / 10) * 100 + "%");
    const charset = generateCharset();
    const password = generatePassword(charset, newValue);
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const charset = generateCharset();
    const password = generatePassword(charset, range);
    setGeneratedPassword(password);
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  };

  const handleCopyClick = () => {
    // Check if the generated password is not empty
    if (generatedPassword) {
      // Create a temporary textarea element to copy the text to the clipboard
      const textarea = document.createElement("textarea");
      textarea.value = generatedPassword;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Password copied to clipboard!");
    }
  };

  // Function to generate the character set based on user selections
  const generateCharset = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz"; // Always include lowercase characters
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (characters) charset += "!@#$%^&*()_-+=[]{}|;:'<>,.?/";
    return charset;
  };

  // Function to generate a random password
  const generatePassword = (charset, length) => {
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  // Function to calculate password strength
  const calculatePasswordStrength = (password) => {
    // Your strength calculation logic goes here
    // You can return "weak", "medium", or "strong" based on your criteria
    // For this example, we'll use a simple length-based criteria
    if (password.length <= 6) {
      return "Poor";
    } else if (password.length < 10) {
      return "Medium";
    } else {
      return "Strong";
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="box">
          {/* password */}
          <div className={`d-flex password ${passwordStrength}`}>
            <span>
              {generatedPassword ? generatedPassword : "Click Generate"}
            </span>
            <i
              className="fa-regular fa-copy"
              onClick={handleCopyClick}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          {/* input with inline style to set --value CSS custom property */}
          <div className="length">
            <div className="length-top">
              <span>Character Length</span>
              <span>{range}</span>
            </div>
            <input
              className="input-range"
              type="range"
              onChange={handleRangeChange}
              value={range}
              min={6} // Set minimum value
              max={16} // Set maximum value
              name=""
              id=""
              style={{
                "--value": ((range - 6) / 10) * 100 + "%", // Adjust the style based on the new range
              }}
            />
          </div>

          {/* check boxes */}
          <div className="checks d-flex">
            <div className="checkbox-container d-flex">
              <input
                type="checkbox"
                name=""
                id="uppercase"
                onChange={(e) => setUppercase(e.target.checked)}
                checked={uppercase}
              />
              <label htmlFor="uppercase">Include Uppercase Letters</label>
            </div>
            <div className="checkbox-container d-flex">
              <input
                type="checkbox"
                name=""
                id="lowercase"
                onChange={(e) => setLowercase(e.target.checked)}
                checked={lowercase}
              />
              <label htmlFor="lowercase">Include Lowercase Letters</label>
            </div>
            <div className="checkbox-container d-flex">
              <input
                type="checkbox"
                name=""
                id="numbers"
                onChange={(e) => setNumbers(e.target.checked)}
                checked={numbers}
              />
              <label htmlFor="numbers">Include Numbers</label>
            </div>
            <div className="checkbox-container d-flex">
              <input
                type="checkbox"
                name=""
                id="characters"
                onChange={(e) => setCharacters(e.target.checked)}
                checked={characters}
              />
              <label htmlFor="characters">Include Symbols</label>
            </div>
          </div>

          {/* status */}
          <div className="status d-flex">
            <span>STRENGTH</span>
            <div className="status-right">
              <span>{passwordStrength || "null"}</span>
              <div className="status-dashes">
                {passwordStrength === "Poor" && (
                  <>
                    <span className="dashes red">-</span>
                    <span className="dashes red">-</span>
                    <span className="dashes">-</span>
                    <span className="dashes">-</span>
                    <span className="dashes">-</span>
                  </>
                )}
                {passwordStrength === "Medium" && (
                  <>
                    <span className="dashes yellow">-</span>
                    <span className="dashes yellow">-</span>
                    <span className="dashes yellow">-</span>
                    <span className="dashes">-</span>
                    <span className="dashes">-</span>
                  </>
                )}
                {passwordStrength === "Strong" && (
                  <>
                    <span className="dashes green">-</span>
                    <span className="dashes green">-</span>
                    <span className="dashes green">-</span>
                    <span className="dashes green">-</span>
                    <span className="dashes green">-</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* button */}
          <div className="button">
            <button>Generate</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Component;
