# Objects & Prototypes: Step-by-Step Project

This mini-project is a guided, hands-on walkthrough. Students will complete each step in order and run the page in a browser to see results.

## How to run
1. Open `index.html` in a browser.
2. Open DevTools Console to view outputs.

---

## Step 1: Object creation and properties
**Goal:** Create objects and read/update properties.

- Create `person` with `name`, `age`, `isStudent`.
- Log properties.
- Add a new property `favoriteColor`.
- Update `age`.

---

## Step 2: Object methods and `this`
**Goal:** Add methods and use `this`.

- Add `greet()` to `person` that returns a message using `this.name`.
- Add `haveBirthday()` that increments `this.age`.

---

## Step 3: Object destructuring and spread operator
**Goal:** Use destructuring and spread to copy/extend objects.

- Destructure `name` and `age` from `person`.
- Create `personCopy` using spread.
- Create `student` using spread and add `course`.

---

## Step 4: `Object.keys()`, `Object.values()`, `Object.entries()`
**Goal:** Inspect object structure.

- Log keys, values, entries of `person`.
- Loop over entries and print `key: value`.

---

## Step 5: Introduction to prototypes
**Goal:** Understand prototype-based inheritance.

- Create a constructor `Book(title, author)`.
- Add method `describe()` on `Book.prototype`.
- Create two books and call `describe()`.

---

## Extension Challenges
- Add a `fullName` getter to `person` using `Object.defineProperty`.
- Create a `Teacher` constructor that reuses `person` data and adds `subject`.
- Use `Object.entries()` to build a list in the DOM.
