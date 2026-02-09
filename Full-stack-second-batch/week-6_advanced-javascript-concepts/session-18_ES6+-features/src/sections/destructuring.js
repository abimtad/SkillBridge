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

    const {
      day,
      instructor: teacher,
      room: { name: roomName },
    } = schedule;

    lines.push(`Day: ${day}`);
    lines.push(`Teacher: ${teacher}`);
    lines.push(`Room: ${roomName}`);

    const [firstTopic, secondTopic, ...restTopics] = schedule.topics;
    lines.push(`Topics: ${firstTopic}, ${secondTopic}`);
    lines.push(`More: ${restTopics.join(", ")}`);

    let a = "left";
    let b = "right";
    [a, b] = [b, a];
    lines.push(`Swap: a=${a}, b=${b}`);

    return lines;
  },
};
