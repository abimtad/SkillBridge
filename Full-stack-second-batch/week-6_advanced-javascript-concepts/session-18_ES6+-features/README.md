# Session 18 - ES6+ Features Lab

This lesson is split into five parts with live UI output and challenges.
Open `index.html` in a local server and click each section to run.

## Quick start

- `npm install` (optional; no dependencies)
- `npm run start`
- Open `http://localhost:5173`

> To see your code changes, save your file and then **refresh the browser**.

Run the Node version:
- `npm run run:node`

## Lesson flow

### 1) Arrow functions and lexical this

Goals:
- Compare classic functions vs arrow functions as methods
- See how lexical `this` behaves in callbacks

Challenge ideas:
- Convert the arrow method into a classic method and keep `this` correct
- Replace the timeout arrow with a normal function and fix `this`

### 2) Template literals and string methods

Goals:
- Interpolation and multiline strings
- Tagged templates and modern string helpers

Challenge ideas:
- Add `padStart` and `padEnd`
- Create a custom tag that highlights words

### 3) Default parameters and rest parameters

Goals:
- Default parameter values instead of manual guards
- Rest parameters vs the legacy `arguments`

Challenge ideas:
- Add a default currency and format the label
- Show how `undefined` triggers defaults

### 4) Destructuring assignment

Goals:
- Object and array destructuring
- Renaming, defaults, rest, and swapping

Challenge ideas:
- Destructure nested properties in one line
- Collect remaining values with rest

### 5) Modules (import/export)

Goals:
- Named exports, default exports
- Module boundaries and reuse

Challenge ideas:
- Create a barrel file (index.js) in `lib/`
- Swap a named export to default

## Suggested extensions

- Add a new section for spread syntax
- Add a new section for classes
- Turn challenges into TODOs and check off once completed
