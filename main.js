import { Point, Line, Triangle } from "./js/shapes.js";
import { rngColor, clearCanvas } from "./js/rendering.js";
import { rnd, rndElem, minmax, arrayOf, sleep } from "./js/utils.js";
import { Config } from "./js/config.js";
import { bindControlsToConfig } from "./js/controls.js";

export const config = new Config({
  color: rngColor(),
  theme: rngColor(),
  radius: 1,
  iterations: 100_000,
  delay: 0,
  instant: true,
});

bindControlsToConfig(config);

class Sierpinski {
  constructor(triangle, config = new Config()) {
    this.config = config;
    this.triangle = triangle;

    triangle.draw(config.theme);
  }

  async runSimulation() {
    const point = this.#getStartingPoint();
    if (this.config.instant) {
      this.#generatePointsInstantly(point, this.config.iterations);
    } else {
      await this.#generatePoints(point, this.config.iterations);
    }
  }

  #getStartingPoint() {
    const { a, b, c } = this.triangle;
    const [minX, maxX] = minmax(a.x, b.x, c.x);
    const [minY, maxY] = minmax(a.y, b.y, c.y);

    let point = new Point(rnd(maxX, minX), rnd(maxY, minY));

    while (!this.triangle.isWithin(point)) {
      point = new Point(rnd(maxX, minX), rnd(maxY, minY));
    }

    return point;
    //   return new Line(point, rndElem([a, b, c])).midpoint();
  }

  #getNextPoint(point) {
    const { a, b, c } = this.triangle;
    return new Line(point, rndElem([a, b, c])).midpoint();
  }

  async #generatePoints(point, remainingIterations) {
    await sleep(this.config.delay);

    point = this.#getNextPoint(point);
    point.draw(this.config.color, this.config.radius);

    if (remainingIterations <= 0) return point;
    return this.#generatePoints(point, remainingIterations - 1);
  }

  #generatePointsInstantly(point, iterations) {
    for (const i of arrayOf(iterations)) {
      point = this.#getNextPoint(point);
      point.draw(this.config.color, this.config.radius);
    }
  }
}

const A = new Point(0, -400);
const B = new Point(400, 400);
const C = new Point(-400, 400);

const triangle = new Triangle(A, B, C);

new Sierpinski(triangle, config).runSimulation();

document.querySelector("button").addEventListener("click", () => {
  clearCanvas();
  new Sierpinski(triangle, config).runSimulation();
});
