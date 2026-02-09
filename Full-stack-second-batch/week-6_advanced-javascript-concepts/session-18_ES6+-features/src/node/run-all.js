import { sections } from "../sections/index.js";

sections.forEach((section) => {
  console.log(`\n=== ${section.title} ===`);
  section.run().forEach((line) => console.log(line));
});
