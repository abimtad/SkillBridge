import { sections } from "./sections/index.js";

const sectionRoot = document.getElementById("sections");
const runAllBtn = document.getElementById("runAll");
const clearAllBtn = document.getElementById("clearAll");

const renderLines = (outputEl, lines) => {
  outputEl.innerHTML = "";
  lines.forEach((line) => {
    const div = document.createElement("div");
    div.className = "line";
    div.textContent = line;
    outputEl.appendChild(div);
  });
};

const renderSection = (section) => {
  const card = document.createElement("article");
  card.className = "section-card";

  const header = document.createElement("div");
  header.className = "section-header";

  const titleWrap = document.createElement("div");
  const title = document.createElement("h2");
  title.className = "section-title";
  title.textContent = section.title;

  const meta = document.createElement("p");
  meta.className = "section-meta";
  meta.textContent = section.summary;

  titleWrap.append(title, meta);

  const tags = document.createElement("div");
  section.tags.forEach((tag) => {
    const badge = document.createElement("span");
    badge.className = "tag";
    badge.textContent = tag;
    tags.appendChild(badge);
  });

  header.append(titleWrap, tags);

  const actions = document.createElement("div");
  actions.className = "section-actions";

  const runBtn = document.createElement("button");
  runBtn.className = "btn primary";
  runBtn.textContent = "Run Section";

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn ghost";
  resetBtn.textContent = "Clear";

  actions.append(runBtn, resetBtn);

  const output = document.createElement("div");
  output.className = "output";

  const challengeTitle = document.createElement("strong");
  challengeTitle.textContent = "Challenges";

  const challengeList = document.createElement("ul");
  challengeList.className = "challenge-list";
  section.challenges.forEach((challenge) => {
    const item = document.createElement("li");
    item.textContent = challenge;
    challengeList.appendChild(item);
  });

  card.append(header, actions, output, challengeTitle, challengeList);

  runBtn.addEventListener("click", () => {
    const lines = section.run();
    renderLines(output, lines);
  });

  resetBtn.addEventListener("click", () => {
    output.innerHTML = "";
  });

  return card;
};

sections.forEach((section, index) => {
  const card = renderSection(section);
  card.style.animationDelay = `${index * 0.08}s`;
  sectionRoot.appendChild(card);
});

runAllBtn.addEventListener("click", () => {
  document.querySelectorAll(".section-card").forEach((card, index) => {
    const output = card.querySelector(".output");
    const lines = sections[index].run();
    renderLines(output, lines);
  });
});

clearAllBtn.addEventListener("click", () => {
  document.querySelectorAll(".output").forEach((output) => {
    output.innerHTML = "";
  });
});
