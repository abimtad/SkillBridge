export const arrowThisSection = {
  id: "arrow-this",
  title: "Arrow Functions and Lexical this",
  summary: "Compare classic functions, arrow functions, and how this is resolved.",
  tags: ["Arrow", "this", "Lexical"],
  challenges: [
    "Refactor the object methods to keep this stable without bind().",
    "Convert the timeout callback to a normal function and fix this.",
    "Explain which lines depend on lexical this vs dynamic this.",
  ],
  run() {
    const lines = [];

    // --- Teaching: object with both classic method and arrow "method" ---
    const counter = {
      name: "Shift Tracker",
      count: 0,
      // Classic method: "this" is the object when you call counter.incClassic()
      incClassic() {
        this.count += 1;
        return this.count;
      },
      // Arrow as "method": "this" is NOT the object — it comes from outer scope (lexical)
      incArrow: () => {
        return this;
      },
      // Arrow in callback: captures "this" from incWithTimeout's scope (the counter object)
      incWithTimeout() {
        setTimeout(() => {
          this.count += 2;
        }, 0);
      },
    };

    lines.push("--- 1. Classic method (dynamic this) ---");
    lines.push("When we call counter.incClassic(), 'this' is the counter object.");
    lines.push(`Result: count = ${counter.incClassic()}`);

    lines.push("");
    lines.push("--- 2. Arrow used as a method (no own this) ---");
    lines.push("Arrow functions don't bind their own 'this'. Here it's window/undefined.");
    lines.push(`counter.incArrow() === counter? ${counter.incArrow() === counter}`);

    lines.push("");
    lines.push("--- 3. Arrow in setTimeout (lexical this) ---");
    lines.push("The arrow inside incWithTimeout inherits 'this' from incWithTimeout (the counter).");
    counter.incWithTimeout();
    lines.push(`Right after scheduling timeout, count is still: ${counter.count}`);
    lines.push("(After timeout runs, count would be increased by 2.)");

    lines.push("");
    lines.push("--- 4. Arrow closing over a variable ---");
    const makeGreeter = function (label) {
      return () => `${label} from arrow`; // arrow captures 'label' from outer scope
    };
    const greeter = makeGreeter("Hello");
    lines.push(`makeGreeter("Hello")() → "${greeter()}"`);

    return lines;
  },
};
