export const add = (a, b) => a + b;

export const formatTotal = (label, total) => `${label} total: ${total}`;

const sumAll = (...values) => values.reduce((acc, val) => acc + val, 0);

export default sumAll;
