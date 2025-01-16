const inputField = document.getElementById("input");
const outputField = document.getElementById("output");
const toMorseBtn = document.getElementById("toMorseBtn");
const toTextBtn = document.getElementById("toTextBtn");

let isTextToMorse = true; // Track current mode

// Validation regex for text input (letters, numbers, and spaces only)
const validTextRegex = /^[A-Z0-9\s]*$/;

// Validation regex for Morse input (dots, dashes, and spaces only)
const validMorseRegex = /^[.\s\-]*$/;

// Prevent invalid characters based on the current mode
inputField.addEventListener("input", (event) => {
  const value = event.target.value;

  // Validate based on the current mode
  if (isTextToMorse && !validTextRegex.test(value)) {
    // Remove invalid characters for text input
    event.target.value = value.replace(/[^A-Z0-9\s]/g, "");
  } else if (!isTextToMorse && !validMorseRegex.test(value)) {
    // Remove invalid characters for Morse input
    event.target.value = value.replace(/[^.\s\-]/g, "");
  }
});

const translate = (toMorse) => {
  const input = inputField.value.trim();

  if (!input) {
    outputField.value = "Please enter valid input!";
    return;
  }

  if (toMorse) {
    // Text to Morse translation
    outputField.value = textToMorse(input);
  } else {
    // Morse to Text translation
    outputField.value = morseToText(input);
  }
};

toMorseBtn.addEventListener("click", () => {
  isTextToMorse = true; // Set to text-to-morse mode
  translate(true);
}); // Translate text to Morse

toTextBtn.addEventListener("click", () => {
  isTextToMorse = false; // Set to Morse-to-text mode
  translate(false);
}); // Translate Morse to text

// Example translation functions
const textToMorse = (text) => {
  const morseDictionary = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
    I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
    Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..", " ": "/",
    0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....",
    7: "--...", 8: "---..", 9: "----.", 
  };

  return text
    .toUpperCase()
    .split("")
    .map((char) => morseDictionary[char] || "") // Translate each character to Morse
    .join(" ");
};

const morseToText = (morse) => {
  const textDictionary = {
    ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F", "--.": "G",
    "....": "H", "..": "I", ".---": "J", "-.-": "K", ".-..": "L", "--": "M", "-.": "N",
    "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T", "..-": "U",
    "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y", "--..": "Z", "/": " ",
    "-----": "0", ".----": "1", "..---": "2", "...--": "3", "....-": "4", ".....": "5",
    "-....": "6", "--...": "7", "---..": "8", "----.": "9",
  };

  return morse
    .split(" ")
    .map((char) => textDictionary[char] || "") // Translate each Morse symbol to text
    .join("");
};
