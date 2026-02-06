const output = document.getElementById("output");

const logStep = (title, message) => {
  console.log(`\n${title}`);
  console.log(message);

  const row = document.createElement("div");
  row.className = "row";
  row.textContent = `${title} → ${message}`;
  output.appendChild(row);
};

// Step 1: Object creation and properties
const person = {
  name: "Aisha",
  age: 19,
  isStudent: true,
};

logStep("Step 1", `Name: ${person.name}, Age: ${person.age}, Student: ${person.isStudent}`);

person.favoriteColor = "Teal";
person.age = 20;

logStep("Step 1", `Updated Age: ${person.age}, Favorite Color: ${person.favoriteColor}`);

// Step 2: Object methods and 'this'
person.greet = function () {
  return `Hello! I am ${this.name}.`;
};

person.haveBirthday = function () {
  this.age += 1;
  return this.age;
};

logStep("Step 2", person.greet());
logStep("Step 2", `New Age After Birthday: ${person.haveBirthday()}`);

// Step 3: Object destructuring and spread operator
const { name, age } = person;
logStep("Step 3", `Destructured → name: ${name}, age: ${age}`);

const personCopy = { ...person };
const student = { ...person, course: "Advanced JavaScript" };

logStep("Step 3", `personCopy name: ${personCopy.name}`);
logStep("Step 3", `student course: ${student.course}`);

// Step 4: Object.keys(), Object.values(), Object.entries()
const keys = Object.keys(person);
const values = Object.values(person);
const entries = Object.entries(person);

logStep("Step 4", `Keys: ${keys.join(", ")}`);
logStep("Step 4", `Values: ${values.join(", ")}`);

entries.forEach(([key, value]) => {
  logStep("Step 4", `${key}: ${value}`);
});

// Step 5: Introduction to prototypes
function Book(title, author) {
  this.title = title;
  this.author = author;
}

Book.prototype.describe = function () {
  return `${this.title} by ${this.author}`;
};

const book1 = new Book("Eloquent JavaScript", "Marijn Haverbeke");
const book2 = new Book("You Don't Know JS", "Kyle Simpson");

logStep("Step 5", book1.describe());
logStep("Step 5", book2.describe());
