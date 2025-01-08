export const rnd = (max = 1, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const rndElem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const minmax = (...nums) => [Math.min(...nums), Math.max(...nums)];

export const arrayOf = (length) => Array.from({ length }, (_, i) => i);

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
