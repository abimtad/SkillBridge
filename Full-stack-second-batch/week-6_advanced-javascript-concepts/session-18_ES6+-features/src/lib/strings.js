export const toTitleCase = (value = "") => {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const shout = (message = "") => `${message.toUpperCase()}!`;

export default shout;
