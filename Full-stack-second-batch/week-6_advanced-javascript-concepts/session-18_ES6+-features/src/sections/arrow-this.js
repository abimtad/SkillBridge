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

    const counter = {
      name: "Shift Tracker",
      count: 0,
      incClassic() {
        this.count += 1;
        return this.count;
      },
      incArrow: () => {
        return this;
      },
      incWithTimeout() {
        setTimeout(() => {
          this.count += 2;
        }, 0);
      },
    };

    lines.push("Classic method keeps dynamic this:");
    lines.push(`count after incClassic: ${counter.incClassic()}`);

    lines.push("Arrow used as a method does not bind this:");
    lines.push(`incArrow result (expect window/undefined): ${counter.incArrow()}`);

    counter.incWithTimeout();
    lines.push("Timeout uses arrow to keep lexical this:");
    lines.push(`count immediately after scheduling: ${counter.count}`);

    const makeGreeter = function (label) {
      return () => `${label} from arrow`; // arrow captures label
    };

    const greeter = makeGreeter("Hello");
    lines.push(greeter());

    return lines;
  },
};
