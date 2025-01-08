import { rngColor } from "./rendering.js";

const defaultConfig = {
  theme: rngColor(),
  color: rngColor(),
  radius: 1,
  iterations: 10_000,
  delay: 0,
  instant: false,
};

export class Config {
  constructor({
    color,
    theme,
    radius,
    iterations,
    delay,
    instant,
  } = defaultConfig) {
    this.theme = theme;
    this.color = color;
    this.radius = radius;
    this.iterations = iterations;
    this.delay = delay;
    this.instant = instant;
  }
}
