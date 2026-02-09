export const destructuringSection = {
  id: "destructuring",
  title: "Destructuring Assignment",
  summary: "Pull values from arrays and objects with clarity.",
  tags: ["Destructuring", "Arrays", "Objects"],
  challenges: [
    "Destructure nested data from the schedule object.",
    "Use rest to collect remaining items.",
    "Swap two variables without a temp variable.",
  ],
  run() {
    const lines = [];

    const schedule = {
      day: "Friday",
      instructor: "Nadia",
      topics: ["ES6", "Destructuring", "Modules"],
      room: { name: "Lab 3", floor: 2 },
    };

    lines.push("--- 1. Object destructuring ---");
    // Extract properties; rename with : newName
    const {
      day,
      instructor: teacher,
      room: { name: roomName },
    } = schedule;
    lines.push(`day → ${day}`);
    lines.push(`instructor (renamed to teacher) → ${teacher}`);
    lines.push(`room.name (nested, renamed to roomName) → ${roomName}`);

    lines.push("");
    lines.push("--- 2. Array destructuring + rest ---");
    const [firstTopic, secondTopic, ...restTopics] = schedule.topics;
    lines.push(`firstTopic: ${firstTopic}, secondTopic: ${secondTopic}`);
    lines.push(`...restTopics: [${restTopics.join(", ")}]`);

    lines.push("");
    lines.push("--- 3. Swap without a temp variable ---");
    let a = "left";
    let b = "right";
    lines.push(`Before: a="${a}", b="${b}"`);
    [a, b] = [b, a];
    lines.push(`After [a, b] = [b, a]: a="${a}", b="${b}"`);

    lines.push("");
    lines.push("--- 4. Default values in destructuring ---");
    const { missing = "default" } = {};
    lines.push(`const { missing = "default" } = {} → missing = "${missing}"`);

    return lines;
  },
};
