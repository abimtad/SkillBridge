// ===============================
// ES6+ Concepts in One File
// - Arrow functions & lexical this
// - Template literals & string methods
// - Default & rest parameters
// - Destructuring assignment
// ===============================

// ---------------------------------
// 1. Arrow functions & lexical `this`
// ---------------------------------

// Classic function as a method (dynamic `this`)
const userClassic = {
  name: "Alice",
  hobbies: ["coding", "music", "running"],
  showHobbiesWithClassic: function () {
    console.log("Classic function - `this` can be tricky:");
    console.log("Hi, I'm " + this.name + " and I like:");
    this.hobbies.forEach(function (hobby) {
      // Here `this` is NOT the userClassic object by default
      console.log("- " + hobby + " (this.name is:", this && this.name, ")");
    });
    console.log("\n");
  },
};

// Arrow function as a method helper (lexical `this`)
const userArrow = {
  name: "Bob",
  hobbies: ["drawing", "gaming", "reading"],
  showHobbiesWithArrow: function () {
    console.log("Arrow function - lexical `this`:");
    console.log(`Hi, I'm ${this.name} and I like:`);

    // Arrow function captures `this` from the outer scope (showHobbiesWithArrow)
    this.hobbies.forEach((hobby) => {
      console.log(`- ${hobby} (this.name is: ${this.name})`);
    });

    console.log("\n");
  },
};

// Run them
userClassic.showHobbiesWithClassic();
userArrow.showHobbiesWithArrow();

// Another lexical `this` example with setTimeout
const counter = {
  value: 0,
  startClassic: function () {
    console.log("Counter with classic function in setTimeout:");
    setTimeout(function () {
      // `this` is not the counter object here; it's the global / undefined in strict mode
      console.log("Classic setTimeout this.value:", this && this.value);
    }, 500);
  },
  startArrow: function () {
    console.log("Counter with arrow function in setTimeout:");
    setTimeout(() => {
      // Arrow function keeps `this` as the counter object
      this.value++;
      console.log("Arrow setTimeout this.value:", this.value);
    }, 1000);
  },
};

counter.startClassic();
counter.startArrow();

// ---------------------------------
// 2. Template literals & string methods
// ---------------------------------

const firstName = "Charlie";
const language = "JavaScript";
const topic = "ES6+ features";
const level = "intermediate";

// Template literal: interpolation + multi-line
const introMessage = `
Hello, ${firstName}!

Welcome to ${language} ${topic}.
Your current level: ${level.toUpperCase()}.
`;

// String methods with template literals
console.log("Template literals & string methods:");
console.log(introMessage.trim()); // trim removes leading/trailing whitespace

const phrase = `Learning ${language} is fun!`;

// Common string methods
console.log("Original phrase:", phrase);
console.log("Length:", phrase.length);
console.log("Uppercase:", phrase.toUpperCase());
console.log("Includes 'fun':", phrase.includes("fun"));
console.log("Starts with 'Learning':", phrase.startsWith("Learning"));
console.log("Ends with '!':", phrase.endsWith("!"));
console.log("Replace 'fun' with 'powerful':", phrase.replace("fun", "powerful"));
console.log("\n");

// ---------------------------------
// 3. Default parameters & rest parameters
// ---------------------------------

// Default parameters: used when argument is missing or undefined
function greet(name = "Guest", greeting = "Hello") {
  console.log(`${greeting}, ${name}!`);
}

console.log("Default parameters:");
greet("Dana", "Hi"); // Both values provided
greet("Eli"); // Uses default greeting
greet(); // Uses both defaults
console.log("\n");

// Rest parameters: gather variable number of arguments into an array
function sumNumbers(label = "Sum", ...numbers) {
  const total = numbers.reduce((acc, n) => acc + n, 0);
  console.log(`${label}:`, total);
}

console.log("Rest parameters:");
sumNumbers("Total of 1,2,3", 1, 2, 3);
sumNumbers("Total of many numbers", 5, 10, 15, 20);
sumNumbers(); // label="Sum", numbers=[]
console.log("\n");

// Rest parameters in another example
function logMessages(prefix = "LOG", ...messages) {
  messages.forEach((msg, index) => {
    console.log(`${prefix} #${index + 1}: ${msg}`);
  });
}

console.log("More rest parameter usage:");
logMessages("INFO", "App started", "User logged in", "Data loaded");
console.log("\n");

// ---------------------------------
// 4. Destructuring assignment
// ---------------------------------

// Array destructuring
const colors = ["red", "green", "blue", "yellow"];

const [primary1, primary2, primary3] = colors;
console.log("Array destructuring:");
console.log("Primary colors:", primary1, primary2, primary3);

// Skip elements and use default value
const [firstColor, , thirdColor, fourthColor = "no color", fifthColor = "default color"] = colors;
console.log("First:", firstColor);
console.log("Third:", thirdColor);
console.log("Fourth:", fourthColor);
console.log("Fifth (default):", fifthColor);
console.log("\n");

// Object destructuring
const person = {
  name: "Fiona",
  age: 28,
  city: "Berlin",
  skills: ["JS", "React", "Node"],
};

console.log("Object destructuring:");

// Basic destructuring with renaming and default
const {
  name: personName,
  age,
  city = "Unknown",
  country = "Unknown country", // default value for missing property
} = person;

console.log(`Name: ${personName}, Age: ${age}, City: ${city}, Country: ${country}`);

// Nested destructuring
const {
  skills: [skill1, skill2, skill3],
} = person;

console.log("Skills:", skill1, skill2, skill3);
console.log("\n");

// Destructuring in function parameters
function showPerson({ name, age, city = "Unknown" }) {
  console.log(`showPerson -> ${name} is ${age} years old and lives in ${city}.`);
}

showPerson(person);

// Destructuring arrays in parameters
function printCoordinates([x = 0, y = 0]) {
  console.log(`Coordinates: x=${x}, y=${y}`);
}

printCoordinates([10, 20]);
printCoordinates([5]); // y uses default 0
printCoordinates([]); // x and y use defaults
console.log("\n");

// ---------------------------------
// Quick summary at runtime
// ---------------------------------

console.log(
  "All ES6+ examples have been executed. Open this file and walk through the code + console output to learn each concept."
);

